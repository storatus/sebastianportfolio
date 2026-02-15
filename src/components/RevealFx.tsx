"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealFxProps {
  children: ReactNode;
  delay?: number;
  translateY?: string | number;
  className?: string;
}

export const RevealFx = ({
  children,
  delay = 0,
  translateY = 0,
  className,
}: RevealFxProps) => (
  <motion.div
    initial={{ opacity: 0, y: translateY }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);
