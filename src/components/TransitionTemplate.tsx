"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TransitionTemplateProps {
  children: ReactNode;
}

export const TransitionTemplate = ({ children }: TransitionTemplateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
