import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { VIDEOS, screenH } from "./lib";
import { PingPongVideo } from "./PingPongVideo";

export function CinematicText() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8,
  });
  const y = useTransform(smooth, [0, 1], [60, -120]);
  const opacity = useTransform(smooth, [0.3, 0.5], [0, 1]);
  const transform = useMotionTemplate`rotateX(24deg) translateY(${y}px) translateZ(15px)`;

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={screenH}
    >
      <PingPongVideo
        src={VIDEOS.cinematic}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute top-0 left-0 w-full z-10 pointer-events-none"
        style={{
          height: 180,
          background: "linear-gradient(to bottom, #010103, transparent)",
        }}
      />

      <div className="relative z-20 max-w-5xl" style={{ perspective: 400 }}>
        <motion.p
          style={{ transform, opacity }}
          className="font-sans font-normal text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-white leading-[1.35] tracking-[-0.02em] select-none px-6 sm:px-12 text-center"
        >
          Hicimos historia una vez. Estamos listos para reescribirla. El lugar
          que cambió las reglas del juego regresa para transformar tu mundo otra
          vez.¿Te acuerdas de la primera vez que compraste algún 'monster'?
          Prepárate para revivir esa emoción. Volvemos a las raíces para cambiar
          el futuro. No es un regreso. Es la evolución de la leyenda.
        </motion.p>
      </div>
    </section>
  );
}
