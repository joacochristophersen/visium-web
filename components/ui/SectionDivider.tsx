"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  from?: string;
  to?: string;
  className?: string;
}

/** Animated scan-line divider that draws in on scroll — marks chapter breaks. */
export function SectionDivider({ from, to, className }: SectionDividerProps) {
  return (
    <div className={cn("container-tight relative py-6", className)}>
      <div className="flex items-center gap-6">
        {from && (
          <span className="font-mono text-[11px] tracking-wide text-[color:var(--text-faint)]">
            {from}
          </span>
        )}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-px flex-1 origin-left bg-gradient-to-r from-white/20 via-primary/40 to-transparent"
        />
        {to && (
          <span className="font-mono text-[11px] tracking-wide text-primary">
            {to}
          </span>
        )}
      </div>
    </div>
  );
}
