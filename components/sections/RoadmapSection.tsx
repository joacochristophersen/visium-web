"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { ROADMAP } from "@/data/content";
import { fadeUp, staggerContainer, VIEWPORT } from "@/animations/variants";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<string, string> = {
  live: "border-gold/55 text-gold-bright",
  next: "border-gold/30 text-gold",
  future: "border-white/15 text-[color:var(--text-faint)]",
};

export function RoadmapSection() {
  return (
    <section id="roadmap" className="relative overflow-hidden py-section">
      <div className="container-tight">
        <div className="mb-16 flex flex-col items-start gap-6">
          <Badge dot={false}>Sección 08 — Roadmap</Badge>
          <SplitReveal
            text="Construyendo el sistema operativo del Real Estate."
            stagger={0.045}
            className="fluid-h2 max-w-4xl text-balance text-white"
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="relative"
        >
          {/* Timeline spine */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/50 via-white/10 to-transparent md:left-0 md:right-0 md:top-[11px] md:h-px md:w-auto md:bg-gradient-to-r" />

          <div className="grid gap-8 md:grid-cols-5 md:gap-5">
            {ROADMAP.map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="relative pl-10 md:pl-0 md:pt-12">
                <span
                  className={cn(
                    "absolute left-0 top-0.5 flex h-6 w-6 items-center justify-center rounded-full border bg-void md:left-0 md:top-0",
                    STATUS_STYLE[item.status]
                  )}
                >
                  <span className="h-2 w-2 rounded-full bg-current" />
                </span>
                <span
                  className={cn(
                    "inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                    STATUS_STYLE[item.status]
                  )}
                >
                  {item.phase}
                </span>
                <h3 className="mt-3 text-base font-medium tracking-tightest text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-muted)]">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
