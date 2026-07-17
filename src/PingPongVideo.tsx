import { useEffect, useRef } from "react";
import { toMp4 } from "./lib";

// Video en loop "pingpong" (adelante y luego reversa, infinito).
// Solo corre cuando la seccion esta visible en pantalla, para no saturar
// los decodificadores del navegador cuando hay varios videos a la vez.
export function PingPongVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    let raf = 0;
    let dir = 1; // 1 = adelante, -1 = reversa
    let last = 0;
    let running = false;

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      if (!v.duration || v.readyState < 2) {
        last = now;
        return;
      }
      const dt = last ? (now - last) / 1000 : 0;
      last = now;

      let t = v.currentTime + dir * dt;
      if (t >= v.duration) {
        t = v.duration;
        dir = -1;
      } else if (t <= 0) {
        t = 0;
        dir = 1;
      }
      v.currentTime = t;
    };

    const startLoop = () => {
      if (running) return;
      running = true;
      last = 0;
      v.pause();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(step);
    };

    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onVisible = () => {
      if (v.readyState >= 2) startLoop();
      else v.addEventListener("loadeddata", startLoop, { once: true });
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) onVisible();
          else stopLoop();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(v);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      v.removeEventListener("loadeddata", startLoop);
    };
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
    >
      <source src={src} type="video/webm" />
      <source src={toMp4(src)} type="video/mp4" />
    </video>
  );
}
