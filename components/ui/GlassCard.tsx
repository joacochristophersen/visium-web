"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

/** Glassmorphism surface with spotlight border that follows the cursor. */
export function GlassCard({ children, className, interactive = true }: GlassCardProps) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mouse-x", `${x}%`);
    el.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <motion.div
      whileHover={interactive ? { y: -5, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } : undefined}
      onMouseMove={interactive ? handleMouseMove : undefined}
      className={cn(
        "glass spotlight-card relative overflow-hidden rounded-4xl shadow-glass",
        "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
