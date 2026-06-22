"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { blurUp, fadeUp, VIEWPORT } from "@/animations/variants";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  blur?: boolean;
  as?: "div" | "span" | "li" | "section";
}

/** Scroll-triggered reveal wrapper. */
export function Reveal({
  children,
  className,
  delay = 0,
  blur = false,
}: RevealProps) {
  const variants = blur ? blurUp : fadeUp;
  return (
    <motion.div
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}
