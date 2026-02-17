"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";
import { Typewriter } from "./Typewriter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { RevealFx } from "./RevealFx";

interface HeroProps {
  headline: ReactNode;
  subline: ReactNode;
  typingSequence?: (string | number)[];
}

export const Hero = ({ headline, subline }: HeroProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Helper to get string from ReactNode for typewriter
  const extractText = (node: ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return node.toString();
    if (node instanceof Array) return node.map(extractText).join("");
    if (typeof node === "object" && node !== null && "props" in (node as any)) {
      return extractText((node as any).props.children);
    }
    return "";
  };

  const headlineText = extractText(headline);

  return (
    <div
      ref={ref}
      className="w-full flex flex-col items-center gap-8 pt-20 pb-32 relative"
    >
      <motion.div
        className="px-6 md:px-8"
        style={{
          y,
          opacity,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <RevealFx translateY={8} delay={0.2}>
          <h1 className="text-4xl md:text-8xl font-black tracking-tighter text-center text-balance max-w-5xl text-gradient">
            {headlineText ? (
              <Typewriter text={headlineText} delay={0.2} />
            ) : (
              headline
            )}
          </h1>
        </RevealFx>

        <RevealFx translateY={12} delay={0.5}>
          <div className="min-h-16 text-2xl md:text-3xl font-semibold text-center text-gradient-primary">
            {/* Optional primary accent line */}
          </div>
        </RevealFx>

        <RevealFx translateY={12} delay={0.8}>
          <div className="max-w-2xl mx-auto px-6 py-4 rounded-3xl bg-background/5 border border-border/20 backdrop-blur-md shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-tr from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-xl md:text-2xl text-muted-foreground/90 text-center text-balance leading-relaxed relative z-10">
              {subline}
            </p>
          </div>
        </RevealFx>

        <RevealFx translateY={16} delay={1}>
          <div className="pt-12">
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 h-14 text-lg font-bold transition-all hover:scale-105 active:scale-95 glow-md hover:glow-lg bg-primary hover:bg-primary/90 text-primary-foreground border-none"
            >
              <a href="#contact">
                Start a Project
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </RevealFx>
      </motion.div>
    </div>
  );
};
