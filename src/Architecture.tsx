import { motion } from "framer-motion";

export const LAYERS = [
  { n: "Layer 1", role: "Capture" },
  { n: "Layer 2", role: "Process" },
  { n: "Layer 3", role: "Interface" },
];

export function Architecture() {
  return (
    <section className="relative min-h-screen w-full bg-black flex items-center justify-center px-6 py-32">
      <div className="max-w-3xl mx-auto w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0 }}
        >
          <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">
            Architecture
          </p>
          <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-10">
            Three layers. Zero friction.
          </h2>
          <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
            Sensor layer captures raw bioelectric signals. Processing layer
            isolates intent. Interface layer delivers structured output to any
            connected system.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-20 w-full flex flex-col items-center gap-4"
        >
          {LAYERS.map((l) => (
            <div
              key={l.n}
              className="w-full max-w-md h-[72px] border border-white/10 rounded-lg flex items-center justify-between px-6"
            >
              <span className="text-white/30 text-[12px] tracking-[0.15em] uppercase">
                {l.n}
              </span>
              <span className="text-white text-[16px] sm:text-[18px] font-light">
                {l.role}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
