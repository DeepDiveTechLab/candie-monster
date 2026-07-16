import { VIDEOS, screenH } from "./lib";
import { PingPongVideo } from "./PingPongVideo";

export const TECH_ITEMS = [
  {
    title: "Cortical Mapping",
    desc: "Real-time spatial reconstruction of active neural regions.",
  },
  {
    title: "Signal Isolation",
    desc: "Separates cognitive intent from biological noise.",
  },
  {
    title: "State Prediction",
    desc: "Anticipates cognitive transitions before they occur.",
  },
  {
    title: "Loop Feedback",
    desc: "Closed-loop adjustment based on outcome correlation.",
  },
];

export function Technology() {
  return (
    <section
      className="relative h-screen w-full overflow-hidden flex flex-col px-8 sm:px-12 md:px-16 py-12 sm:py-16"
      style={screenH}
    >
      <PingPongVideo
        src={VIDEOS.technology}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <h2 className="text-white font-light text-[clamp(36px,8vw,72px)] leading-[0.95] tracking-[-0.03em]">
          Espacio
          <br />
          Inteligente
        </h2>

        <p className="text-white/50 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2">
          Volvemos para perfeccionar cada detalle de tu experiencia, anticipando
          tus búsquedas y personalizando tus elecciones como nunca antes. No es
          solo un regreso; es la evolución inteligente de tu rincón favorito en
          internet.
        </p>
      </div>

      <div className="relative z-10 flex-1" />

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {TECH_ITEMS.map((item) => (
          <div key={item.title}>
            <h3 className="text-white text-[14px] sm:text-[16px] font-normal mb-2">
              {item.title}
            </h3>
            <p className="text-white/40 text-[12px] sm:text-[14px] leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
