import { useEffect, useRef } from "react";

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
        dir = -1; // llego al final -> reversa
      } else if (t <= 0) {
        t = 0;
        dir = 1; // llego al inicio -> adelante
      }
      v.currentTime = t;
    };

    const start = () => {
      v.pause();
      last = 0;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(step);
    };

    if (v.readyState >= 2) start();
    else v.addEventListener("loadeddata", start, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("loadeddata", start);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
    />
  );
}
