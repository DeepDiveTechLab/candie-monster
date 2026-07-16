import { useEffect, useRef } from "react";
import { VIDEOS, screenH } from "./lib";

export const HERO_SENSITIVITY = 0.8;

// Hero: SIN animaciones de entrada/salida. Muestra el frame central (la llama)
// desde que carga, y hace scrub con la posicion X del mouse.
export function Hero(_props: { entranceComplete: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    const sec = sectionRef.current;
    if (!v || !sec) return;

    const target = { t: 0 };
    let seeking = false;

    // Fuerza el pintado de un cuadro y se posiciona en el frame central.
    const initFrame = () => {
      if (!v.duration) return;
      target.t = v.duration / 2;
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.then(() => {
          v.pause();
          v.currentTime = target.t;
        }).catch(() => {
          v.currentTime = target.t;
        });
      } else {
        v.currentTime = target.t;
      }
    };

    const runSeek = () => {
      if (!v.duration) return;
      if (Math.abs(v.currentTime - target.t) < 0.004) {
        seeking = false;
        return;
      }
      seeking = true;
      v.currentTime = target.t;
    };

    const onMove = (e: MouseEvent) => {
      if (!v.duration) return;
      const rect = sec.getBoundingClientRect();
      const relX = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      const t = (relX - 0.5) * HERO_SENSITIVITY * v.duration + v.duration / 2;
      target.t = Math.min(v.duration - 0.05, Math.max(0, t));
      if (!seeking) runSeek();
    };

    if (v.readyState >= 2) initFrame();
    v.addEventListener("loadeddata", initFrame, { once: true });
    v.addEventListener("seeked", runSeek);
    sec.addEventListener("mousemove", onMove);

    return () => {
      v.removeEventListener("loadeddata", initFrame);
      v.removeEventListener("seeked", runSeek);
      sec.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={screenH}
      className="relative h-screen w-full overflow-hidden flex flex-col px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12"
    >
      <video
        ref={videoRef}
        src={VIDEOS.hero}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.05,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        style={{ transform: "translateY(50px)" }}
      >
        <span
          style={{
            fontFamily: '"Anton SC", sans-serif',
            fontSize: "clamp(120px, 30vw, 521px)",
            textTransform: "uppercase",
            letterSpacing: "-4px",
            lineHeight: 1,
            opacity: 0.1,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            backgroundImage:
              "radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)",
            whiteSpace: "nowrap",
          }}
        >
          candie.monster
        </span>
      </div>

      <div className="relative flex flex-col flex-1">
        <div className="flex-1" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]">
              Donde todo
              <br />
              empezó...
            </h1>

            <p className="max-w-sm text-[13px] sm:text-[15px] text-white/60 leading-relaxed">
              Fuiste parte de la revolución que transformó un nicho en una
              comunidad. Nos extrañaste, te extrañamos, y el momento de volver a
              encontrarnos ha llegado. Algo grande se está construyendo
            </p>
          </div>

          <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)] text-left md:text-right">
            ... vuelve
            <br />
            a comenzar.
          </h1>
        </div>
      </div>
    </section>
  );
}
