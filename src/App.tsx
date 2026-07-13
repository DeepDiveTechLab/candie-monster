import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

const VIDEOS = {
  hero: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4",
  cinematic:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4",
  metrics:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4",
  technology:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4",
  footer:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4",
};

const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><";

const randChar = () =>
  SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

const screenH: CSSProperties = { height: "100dvh" };

function ScrambleIn({
  text,
  delay,
  triggered,
  className,
}: {
  text: string;
  delay: number;
  triggered: boolean;
  className?: string;
}) {
  const [started, setStarted] = useState(false);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!triggered) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [triggered, delay]);

  useEffect(() => {
    if (!started) return;
    let progress = 0;
    const id = setInterval(() => {
      progress += 0.5;
      const revealed = Math.floor(progress);
      const out = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < revealed) return ch;
          if (i < revealed + 3) return randChar();
          return "";
        })
        .join("");
      setDisplay(out);
      if (progress >= text.length) {
        clearInterval(id);
        setDisplay(text);
      }
    }, 25);
    return () => clearInterval(id);
  }, [started, text]);

  if (!triggered || !started) {
    return (
      <span
        className={className}
        dangerouslySetInnerHTML={{ __html: "&nbsp;" }}
      />
    );
  }
  return (
    <span className={className} style={{ whiteSpace: "pre" }}>
      {display.length ? display : " "}
    </span>
  );
}

function ScrambleText({
  text,
  isHovered,
  className,
}: {
  text: string;
  isHovered: boolean;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!isHovered) {
      setDisplay(text);
      return;
    }
    let frame = 0;
    const id = setInterval(() => {
      frame += 1;
      const revealed = Math.floor(frame / 4);
      const out = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < revealed) return ch;
          return randChar();
        })
        .join("");
      setDisplay(out);
      if (revealed >= text.length) {
        clearInterval(id);
        setDisplay(text);
      }
    }, 25);
    return () => clearInterval(id);
  }, [isHovered, text]);

  return (
    <span className={className} style={{ whiteSpace: "pre" }}>
      {display}
    </span>
  );
}

function CandieLogo({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const d =
    "M 1.5,23 L 1.5,33 C 1.5,38.5 6,43 11.5,43 L 16.5,43 C 22,43 26.5,38.5 26.5,33 Q 28,28 33,26.5 C 38.5,26.5 43,22 43,16.5 L 43,11.5 C 43,6 38.5,1.5 33,1.5 L 23,1.5 Q 12,12 1.5,23 Z";
  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[0, 90, 180, 270].map((deg) => (
        <path key={deg} d={d} transform={`rotate(${deg})`} />
      ))}
    </svg>
  );
}

function SquashHamburger({
  isOpen,
  mobile = false,
}: {
  isOpen: boolean;
  mobile?: boolean;
}) {
  const w = mobile ? 15 : 18;
  const h = mobile ? 10 : 12;
  const bar = mobile ? 1.2 : 1.5;
  const center = h / 2 - bar / 2;
  const spring = { type: "spring" as const, stiffness: 300, damping: 20 };
  const base: CSSProperties = {
    position: "absolute",
    left: 0,
    width: w,
    height: bar,
    background: "#fff",
    borderRadius: 2,
  };
  return (
    <div style={{ position: "relative", width: w, height: h }}>
      <motion.span
        style={{ ...base, top: 0 }}
        animate={isOpen ? { top: center, rotate: 45 } : { top: 0, rotate: 0 }}
        transition={spring}
      />
      <motion.span
        style={{ ...base, top: center }}
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={spring}
      />
      <motion.span
        style={{ ...base, top: h - bar }}
        animate={
          isOpen ? { top: center, rotate: -45 } : { top: h - bar, rotate: 0 }
        }
        transition={spring}
      />
    </div>
  );
}

const scrollToY = (y: number) =>
  window.scrollTo({ top: y, behavior: "smooth" });

function NavLink({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="text-[16px] font-normal text-white/85 hover:text-white transition-colors whitespace-nowrap"
    >
      <ScrambleText text={label} isHovered={hovered} />
    </button>
  );
}

function DownloadButton({ mobile = false }: { mobile?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.03, backgroundColor: "#e2e2e6" }}
      whileTap={{ scale: 0.97 }}
      className={`flex items-center gap-2 bg-white rounded-full text-black ${
        mobile ? "h-9 px-3.5 text-[13px]" : "h-12 px-6 text-[15px]"
      }`}
      style={{ fontFamily: '"Space Mono", monospace' }}
    >
      <i className="bi bi-apple" />
      <ScrambleText text="Download" isHovered={hovered} />
    </motion.button>
  );
}

function Navbar({ entranceComplete }: { entranceComplete: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full h-20 z-50 bg-transparent"
    >
      <div className="hidden sm:flex items-center justify-between h-full px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.22)" }}
            whileTap={{ scale: 0.98 }}
            className="hidden md:flex items-center gap-2 h-12 px-5 rounded-[14px] bg-white/15 backdrop-blur-md cursor-pointer"
          >
            <CandieLogo size={18} className="text-white" />
            <span className="text-[16px] font-medium tracking-tight text-white">
              candie.monster
            </span>
          </motion.div>

          <motion.div
            animate={{ width: open ? 290 : 48 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="h-12 rounded-[14px] bg-white/15 backdrop-blur-md flex items-center overflow-hidden"
          >
            <button
              onClick={() => setOpen((o) => !o)}
              className={`flex items-center justify-center transition-all ${
                open
                  ? "w-9 h-9 rounded-[11px] bg-white/10 hover:bg-white/20 ml-1.5"
                  : "w-12 h-12 rounded-[14px]"
              }`}
              aria-label="Toggle menu"
            >
              <SquashHamburger isOpen={open} />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-5 pl-4 pr-2 whitespace-nowrap"
                >
                  <NavLink
                    label="Nosotros"
                    onClick={() => scrollToY(window.innerHeight)}
                  />
                  <NavLink
                    label="Relanzamiento"
                    onClick={() => scrollToY(window.innerHeight * 2)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <DownloadButton />
      </div>

      <div className="flex sm:hidden items-center justify-between h-full px-4">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ width: open ? 0 : "auto", opacity: open ? 0 : 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="flex items-center gap-1.5 h-9 rounded-[10px] bg-white/15 backdrop-blur-md overflow-hidden"
            style={{ paddingLeft: open ? 0 : 12, paddingRight: open ? 0 : 12 }}
          >
            <CandieLogo size={14} className="text-white shrink-0" />
            <span className="text-[13px] font-medium tracking-tight text-white whitespace-nowrap">
              candie.monster
            </span>
          </motion.div>

          <motion.div
            animate={{ width: open ? "100%" : 36 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="h-9 rounded-[10px] bg-white/15 backdrop-blur-md flex items-center overflow-hidden"
          >
            <button
              onClick={() => setOpen((o) => !o)}
              className="w-9 h-9 flex items-center justify-center shrink-0"
              aria-label="Toggle menu"
            >
              <SquashHamburger isOpen={open} mobile />
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-4 pr-3 whitespace-nowrap"
                >
                  <button
                    onClick={() => scrollToY(window.innerHeight)}
                    className="text-[13px] text-white/85 hover:text-white"
                  >
                    Nosotros
                  </button>
                  <button
                    onClick={() => scrollToY(window.innerHeight * 2)}
                    className="text-[13px] text-white/85 hover:text-white"
                  >
                    Relanzamiento
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <DownloadButton mobile />
      </div>
    </motion.nav>
  );
}

function Hero({ entranceComplete }: { entranceComplete: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const seeking = useRef(false);
  const lastX = useRef<number | null>(null);
  const SENSITIVITY = 0.8;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const runSeek = () => {
      if (!video.duration) return;
      if (Math.abs(video.currentTime - targetTime.current) < 0.004) {
        seeking.current = false;
        return;
      }
      seeking.current = true;
      video.currentTime = targetTime.current;
    };

    video.addEventListener("seeked", runSeek);

    const onMove = (e: MouseEvent) => {
      if (!video.duration) return;
      if (lastX.current === null) {
        lastX.current = e.clientX;
        return;
      }
      const deltaX = e.clientX - lastX.current;
      lastX.current = e.clientX;
      const frac = (deltaX / window.innerWidth) * SENSITIVITY;
      let next = targetTime.current + frac * video.duration;
      next = Math.max(0, Math.min(video.duration - 0.05, next));
      targetTime.current = next;
      if (!seeking.current) runSeek();
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      video.removeEventListener("seeked", runSeek);
    };
  }, []);

  return (
    <section
      className="relative h-screen w-full overflow-hidden flex flex-col px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12"
      style={screenH}
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="relative flex flex-col flex-1"
      >
        <div className="flex-1" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]">
              <ScrambleIn text="Donde todo" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="empezó..." delay={500} triggered={entranceComplete} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={
                entranceComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }
              }
              transition={{
                duration: 0.9,
                ease: [0.215, 0.61, 0.355, 1.0] as [
                  number,
                  number,
                  number,
                  number
                ],
                delay: 0.2,
              }}
              className="max-w-sm text-[13px] sm:text-[15px] text-white/60 leading-relaxed"
            >
              Fuiste parte de la revolución que transformó un nicho en una
              comunidad. Nos extrañaste, te extrañamos, y el momento de volver a
              encontrarnos ha llegado. Algo grande se está construyendo
            </motion.p>
          </div>

          <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)] text-left md:text-right">
            <ScrambleIn text="... vuelve" delay={700} triggered={entranceComplete} />
            <br />
            <ScrambleIn
              text="a comenzar."
              delay={1000}
              triggered={entranceComplete}
            />
          </h1>
        </div>
      </motion.div>
    </section>
  );
}

function CinematicText() {
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
      <video
        src={VIDEOS.cinematic}
        autoPlay
        muted
        loop
        playsInline
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

const METRICS = [
  { value: "32 entidades", label: "Cobertura Nacional" },
  { value: "100%", label: "Pureza de Producto" },
  { value: "6", label: "Tiendas en linea" },
];

function Metrics() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <video
        src={VIDEOS.metrics}
        autoPlay
        muted
        loop
        playsInline
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

const TECH_ITEMS = [
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

function Technology() {
  return (
    <section
      className="relative h-screen w-full overflow-hidden flex flex-col px-8 sm:px-12 md:px-16 py-12 sm:py-16"
      style={screenH}
    >
      <video
        src={VIDEOS.technology}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <div className="relative flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0 }}
          className="text-white font-light text-[clamp(36px,8vw,72px)] leading-[0.95] tracking-[-0.03em]"
        >
          Espacio
          <br />
          Inteligente
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="text-white/50 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2"
        >
          Volvemos para perfeccionar cada detalle de tu experiencia, anticipando
          tus búsquedas y personalizando tus elecciones como nunca antes. No es
          solo un regreso; es la evolución inteligente de tu rincón favorito en
          internet.
        </motion.p>
      </div>

      <div className="flex-1" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.0, delay: 0.3 }}
        className="relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
      >
        {TECH_ITEMS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
          >
            <h3 className="text-white text-[14px] sm:text-[16px] font-normal mb-2">
              {item.title}
            </h3>
            <p className="text-white/40 text-[12px] sm:text-[14px] leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

const LAYERS = [
  { n: "Layer 1", role: "Capture" },
  { n: "Layer 2", role: "Process" },
  { n: "Layer 3", role: "Interface" },
];

function Architecture() {
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

function Footer() {
  return (
    <footer className="bg-black overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[400px]">
        <div className="w-full md:w-1/2 h-[300px] md:h-auto">
          <video
            src={VIDEOS.footer}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between p-10 sm:p-16">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <CandieLogo size={18} className="text-white/70" />
              <span className="text-[15px] font-medium text-white/70 tracking-tight">
                candie.monster
              </span>
            </div>
            <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm">
              The next evolution of human-machine interaction. Built for those
              who refuse to be limited by biology alone.
            </p>
          </div>

          <p className="text-white/25 text-[12px] mt-12">
            © 2026 candie.monster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [entranceComplete, setEntranceComplete] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntranceComplete(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ fontFamily: '"Space Mono", monospace' }}>
      <Navbar entranceComplete={entranceComplete} />
      <Hero entranceComplete={entranceComplete} />
      <CinematicText />
      <Metrics />
      <Technology />
      <Architecture />
      <Footer />
    </div>
  );
}
