import { useState } from "react";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { ScrambleText } from "./scramble";

export function CandieLogo({
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

export function SquashHamburger({
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

export function NavLink({ label, onClick }: { label: string; onClick: () => void }) {
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

export function DownloadButton({ mobile = false }: { mobile?: boolean }) {
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
