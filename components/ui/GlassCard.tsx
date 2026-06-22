"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Subtle pointer-tilt on hover. */
  interactive?: boolean;
}

/** Glassmorphism surface with optional hover lift. */
export function GlassCard({ children, className, interactive = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={interactive ? { y: -6 } : undefined}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "glass relative overflow-hidden rounded-4xl shadow-glass",
        "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
