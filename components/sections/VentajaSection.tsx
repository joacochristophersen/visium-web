"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";
import { COMPARISON_ROWS } from "@/data/content";
import { fadeUp, staggerContainer, VIEWPORT } from "@/animations/variants";
import { cn } from "@/lib/utils";

function Cell({ value, gold }: { value: boolean | string; gold?: boolean }) {
  if (value === true) {
    return (
      <span className={cn("inline-flex h-6 w-6 items-center justify-center rounded-full", gold ? "bg-gold/15 text-gold" : "bg-white/8 text-[color:var(--text-muted)]")}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.03] text-[color:var(--text-faint)]">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  return (
    <span className={cn("text-center text-[11px] font-medium leading-tight", gold ? "text-gold" : "text-[color:var(--text-muted)]")}>
      {value}
    </span>
  );
}

export function VentajaSection() {
  return (
    <section id="ventaja" className="relative py-section">
      <div className="container-tight">
        <div className="mb-14 flex flex-col items-center gap-6 text-center">
          <Badge dot={false}>Sección 07 — Ventaja competitiva</Badge>
          <SplitReveal
            text="Los demás muestran espacios. VISIUM entiende compradores."
            stagger={0.045}
            className="fluid-h2 justify-center max-w-4xl text-balance text-white"
          />
          <Reveal delay={1} className="max-w-2xl">
            <p className="fluid-lead text-[color:var(--text-muted)]">
              La visualización es una commodity. La inteligencia de comportamiento
              es el foso competitivo.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="overflow-hidden rounded-5xl border border-white/10 panel">
            {/* Header */}
            <div className="grid grid-cols-[1.6fr_repeat(3,1fr)] items-stretch border-b border-white/8 text-center sm:grid-cols-[2fr_repeat(3,1fr)]">
              <div className="px-4 py-5 text-left text-[11px] uppercase tracking-wide text-[color:var(--text-faint)]">
                Capacidad
              </div>
              <div className="px-2 py-5 text-sm font-medium text-[color:var(--text-muted)]">Matterport</div>
              <div className="px-2 py-5 text-sm font-medium text-[color:var(--text-muted)]">Xplora</div>
              <div className="relative px-2 py-5 text-sm font-semibold text-gold">
                <span className="pointer-events-none absolute inset-0 bg-gold/[0.06]" />
                <span className="relative">VISIUM</span>
              </div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              {COMPARISON_ROWS.map((row, i) => (
                <motion.div
                  key={row.feature}
                  variants={fadeUp}
                  className={cn(
                    "grid grid-cols-[1.6fr_repeat(3,1fr)] items-center sm:grid-cols-[2fr_repeat(3,1fr)]",
                    i !== COMPARISON_ROWS.length - 1 && "border-b border-white/6"
                  )}
                >
                  <div className="px-4 py-4 text-left text-[13px] leading-snug text-[color:var(--text-primary)] sm:text-sm">
                    {row.feature}
                  </div>
                  <div className="flex justify-center px-2 py-4"><Cell value={row.matterport} /></div>
                  <div className="flex justify-center px-2 py-4"><Cell value={row.xplora} /></div>
                  <div className="relative flex justify-center px-2 py-4">
                    <span className="pointer-events-none absolute inset-0 bg-gold/[0.06]" />
                    <span className="relative flex"><Cell value={row.visium} gold /></span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
