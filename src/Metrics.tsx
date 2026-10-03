import { motion } from "framer-motion";
import { VIDEOS } from "./lib";
import { PingPongVideo } from "./PingPongVideo";

export const METRICS = [
  { value: "6 must-wanted Monsters", label: "Los dulces anfitriones de la fiesta, calidad y pureza inigualable." },
  { value: "Retail or Wholesale", label: "Precio competitivo por unidad; Precio extraordinario en paquete" },
  { value: "Your favorite payment methods", label: "Escoge si pagar con tarjeta de Debito/Credito, transfer, Apple Pay*, Google Pay* o Efectivo*" },
  { value: "Shippings anywhere in Mexico", label: "Envios en todo el pais en modalidad estandar (~1 semana), Express (~3 dias) o Priority (24 hrs)" },
]; // <-- Corregido: Se eliminó el cierre duplicado

export function Metrics() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <PingPongVideo
        src={VIDEOS.metrics}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Oscurecido solo en movil: los numeros y labels resaltan sobre el video */}
      <div className="pointer-events-none absolute inset-0 bg-black/45 md:hidden" />

      <div className="relative z-10 w-full max-w-6xl mx-auto pt-32 pb-32 px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
          className="text-white/70 md:text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20 text-center"
        >
          Whiz-Biz
        </motion.p>

        {/* Corregido: md:grid-cols-2 y lg:grid-cols-4 para acomodar los 4 elementos perfectamente */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-8">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="text-white text-[clamp(32px,6vw,64px)] font-light tracking-[-0.04em] leading-none">
                {m.value}
              </div>
              <div className="text-white/70 md:text-white/40 text-[13px] sm:text-[15px] mt-4 tracking-wide">
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
