import type { CSSProperties } from "react";

export const VIDEOS = {
  hero: "/videos/hero_llama_video.mp4",
  cinematic: "/videos/cinematics_video.mp4",
  metrics: "/videos/metrics_video.mp4",
  technology: "/videos/technology_video.mp4",
  footer: "/videos/footer_video.mp4",
};

export const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><";

export const randChar = () =>
  SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

export const screenH: CSSProperties = { height: "100dvh" };

export const scrollToY = (y: number) =>
  window.scrollTo({ top: y, behavior: "smooth" });
