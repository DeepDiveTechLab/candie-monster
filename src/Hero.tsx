import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { VIDEOS, toMp4, screenH } from "./lib";
import { ScrambleIn } from "./scramble";

export const HERO_SENSITIVITY = 0.8;

// El video va en loop (siempre visible). Con mouse (desktop) o con arrastre
// horizontal del dedo (movil) se pausa y hace scrub por posicion X, con
// encadenado de 'seeked'. Al soltar / salir el cursor, retoma el loop.
export function Hero(_props: { entranceComplete: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    const sec = sectionRef.current;
    if (!v || !sec) return;

    let targetT = 0;
    let seeking = false;
    let scrubbing = false;

    const clamp = (n: number, lo: number, hi: number) =>
      Math.min(hi, Math.max(lo, n));

    const runSeek = () => {
      if (!v.duration) return;
      if (Math.abs(v.currentTime - targetT) < 0.01) {
        seeking = false;
        return;
      }
      seeking = true;
      v.currentTime = targetT;
    };

    const onSeeked = () => {
      if (scrubbing) runSeek();
      else seeking = false;
    };

    const seekToClientX = (clientX: number) => {
      const rect = sec.getBoundingClientRect();
      const relX = clamp((clientX - rect.left) / rect.width, 0, 1);
      targetT = clamp(
        (relX - 0.5) * HERO_SENSITIVITY * v.duration + v.duration / 2,
        0,
        v.duration - 0.05
      );
      if (!scrubbing) {
        scrubbing = true;
        if (!v.paused) v.pause();
      }
      if (!seeking) runSeek();
    };

    const resume = () => {
      if (!scrubbing) return;
      scrubbing = false;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    // Desktop (mouse)
    const onMouseMove = (e: MouseEvent) => {
      if (!v.duration) return;
      seekToClientX(e.clientX);
    };
    const onMouseLeave = () => resume();

    // Movil (touch): solo si el gesto es horizontal, para no bloquear el scroll
    let startX = 0;
    let startY = 0;
    let horizontal = false;
    let decided = false;
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      startX = t.clientX;
      startY = t.clientY;
      horizontal = false;
      decided = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t || !v.duration) return;
      if (!decided) {
        const dx = Math.abs(t.clientX - startX);
        const dy = Math.abs(t.clientY - startY);
        if (dx + dy > 8) {
          decided = true;
          horizontal = dx > dy;
        }
      }
      if (!horizontal) return;
      seekToClientX(t.clientX);
    };
    const onTouchEnd = () => resume();

    v.addEventListener("seeked", onSeeked);
    sec.addEventListener("mousemove", onMouseMove);
    sec.addEventListener("mouseleave", onMouseLeave);
    sec.addEventListener("touchstart", onTouchStart, { passive: true });
    sec.addEventListener("touchmove", onTouchMove, { passive: true });
    sec.addEventListener("touchend", onTouchEnd);
    sec.addEventListener("touchcancel", onTouchEnd);

    return () => {
      v.removeEventListener("seeked", onSeeked);
      sec.removeEventListener("mousemove", onMouseMove);
      sec.removeEventListener("mouseleave", onMouseLeave);
      sec.removeEventListener("touchstart", onTouchStart);
      sec.removeEventListener("touchmove", onTouchMove);
      sec.removeEventListener("touchend", onTouchEnd);
      sec.removeEventListener("touchcancel", onTouchEnd);
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
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={VIDEOS.hero} type="video/webm" />
        <source src={toMp4(VIDEOS.hero)} type="video/mp4" />
      </video>

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

      {/* Degradado inferior solo en movil: mejora la lectura del texto sobre el video */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 md:hidden"
        style={{
          background:
            "linear-gradient(to top, rgba(1,1,3,0.9) 0%, rgba(1,1,3,0.5) 45%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex-1" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]">
              <ScrambleIn text="Donde todo" delay={200} triggered={true} />
              <br />
              <ScrambleIn text="empezó..." delay={500} triggered={true} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="max-w-sm text-[13px] sm:text-[15px] text-white/75 md:text-white/60 leading-relaxed"
            >
              Fuiste parte de la revolución que transformó un nicho en una
              comunidad. Nos extrañaste, te extrañamos, y el momento de volver a
              encontrarnos ha llegado. Algo grande se está construyendo
            </motion.p>
          </div>

          <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)] text-left md:text-right">
            <ScrambleIn text="... vuelve" delay={700} triggered={true} />
            <br />
            <ScrambleIn text="a comenzar." delay={1000} triggered={true} />
          </h1>
        </div>
      </div>
    </section>
  );
}
