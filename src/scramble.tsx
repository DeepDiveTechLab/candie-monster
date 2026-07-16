import { useEffect, useState } from "react";
import { randChar } from "./lib";

export function ScrambleIn({
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

export function ScrambleText({
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
