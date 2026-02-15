"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursorColor?: string;
}

export const Typewriter = ({
  text,
  speed = 0.05,
  delay = 0,
  className,
  cursorColor = "var(--brand-solid-strong)",
}: TypewriterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (isInView) {
      let i = 0;
      const startTimeout = setTimeout(() => {
        const intervalId = setInterval(() => {
          setDisplayText(text.substring(0, i + 1));
          i++;
          if (i === text.length) {
            clearInterval(intervalId);
          }
        }, speed * 1000);
        return () => clearInterval(intervalId);
      }, delay * 1000);
      return () => clearTimeout(startTimeout);
    }
  }, [isInView, text, speed, delay]);

  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {displayText}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        style={{
          display: "inline-block",
          width: "2px",
          height: "1em",
          backgroundColor: cursorColor,
          marginLeft: "2px",
          verticalAlign: "middle",
        }}
      />
    </span>
  );
};
