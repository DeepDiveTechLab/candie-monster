import type { CSSProperties } from "react";

// Fuente primaria en WebM (mucho mas ligera). El mp4 del mismo nombre se usa
// como fallback (Safari/iOS) derivandolo de esta ruta en los componentes.
export const VIDEOS = {
  hero: "/videos/Hero_llama_video.webm",
  cinematic: "/videos/Cinematics_video.webm",
  metrics: "/videos/Metrics_video.webm",
  technology: "/videos/Technology_video.webm",
  footer: "/videos/Footer_video.webm",
};

// Deriva la ruta .mp4 a partir de la .webm (mismo nombre base).
export const toMp4 = (src: string) => src.replace(/\.webm($|\?)/, ".mp4$1");

export const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><";

export const randChar = () =>
  SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

export const screenH: CSSProperties = { height: "100dvh" };

export const scrollToY = (y: number) =>
  window.scrollTo({ top: y, behavior: "smooth" });
