import { motion } from "framer-motion";
import { VIDEOS } from "./lib";
import { PingPongVideo } from "./PingPongVideo";

export const METRICS = [
  { value: "32 entidades", label: "Cobertura Nacional" },
  { value: "100%", label: "Pureza de Producto" },
  { value: "6", label: "Tiendas en linea" },
];

export function Metrics() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <PingPongVideo
        src={VIDEOS.metrics}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 w-full max-w-6xl mx-auto pt-32 pb-32 px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20 text-center"
        >
          Experiencia de Compra
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="text-white text-[clamp(48px,10vw,96px)] font-light tracking-[-0.04em] leading-none">
                {m.value}
              </div>
              <div className="text-white/40 text-[13px] sm:text-[15px] mt-4 tracking-wide">
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
