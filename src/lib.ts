import type { CSSProperties } from "react";

// Rutas LOCALES (public/videos). OJO: en Vercel/Linux distinguen mayusculas,
// por eso los nombres deben coincidir EXACTAMENTE con los archivos subidos.
export const VIDEOS = {
  hero: "/videos/Hero_llama_video.mp4",
  cinematic: "/videos/Cinematics_video.mp4",
  metrics: "/videos/Metrics_video.mp4",
  technology: "/videos/Technology_video.mp4",
  footer: "/videos/Footer_video.mp4",
};

export const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><";

export const randChar = () =>
  SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

export const screenH: CSSProperties = { height: "100dvh" };

export const scrollToY = (y: number) =>
  window.scrollTo({ top: y, behavior: "smooth" });
