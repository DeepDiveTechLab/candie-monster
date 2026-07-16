import { VIDEOS, screenH } from "./lib";
import { PingPongVideo } from "./PingPongVideo";

export function CinematicText() {
  return (
    <section
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

      <div className="relative z-20 max-w-5xl">
        <p className="font-sans font-normal text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-white leading-[1.35] tracking-[-0.02em] select-none px-6 sm:px-12 text-center">
          Hicimos historia una vez. Estamos listos para reescribirla. El lugar
          que cambió las reglas del juego regresa para transformar tu mundo otra
          vez.¿Te acuerdas de la primera vez que compraste algún 'monster'?
          Prepárate para revivir esa emoción. Volvemos a las raíces para cambiar
          el futuro. No es un regreso. Es la evolución de la leyenda.
        </p>
      </div>
    </section>
  );
}
