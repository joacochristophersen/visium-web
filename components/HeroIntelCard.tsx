"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

interface Signal {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}

const SIGNALS: Signal[] = [
  {
    value: 52,
    label: "Eventos detectados",
    icon: <path d="M3 12h4l3 8 4-16 3 8h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
  {
    value: 4,
    label: "Visitas recurrentes",
    icon: <path d="M21 12a9 9 0 1 1-3-6.7M21 4v4h-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
  {
    value: 3,
    label: "Mediciones realizadas",
    icon: <path d="M14.5 3.5 3.5 14.5l6 6L20.5 9.5l-6-6ZM7 11l1.5 1.5M10 8l1.5 1.5M13 5l1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
  {
    value: 6,
    suffix: "m",
    label: "Tiempo de exploración",
    icon: <path d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
];

/**
 * Hero proof: a realistic VISIUM lead-intelligence card. Instead of arbitrary
 * marketing percentages, it shows the behavioral signals behind a VISIUM SCORE™
 * — concrete, explainable, and tied to a real property.
 */
export function HeroIntelCard() {
  return (
    <div className="glass-strong relative overflow-hidden rounded-4xl">
      {/* top gold hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-white/8 px-5 py-3.5 sm:px-6">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          <span className="truncate font-mono text-[11px] uppercase tracking-wide text-[color:var(--text-muted)]">
            Lead detectado · Penthouse · Piso 22, Palermo
          </span>
        </div>
        <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-gold/30 bg-gold/[0.08] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gold sm:inline-flex">
          Alta intención
        </span>
      </div>

      <div className="grid grid-cols-1 gap-px sm:grid-cols-[auto_1fr]">
        {/* SCORE */}
        <div className="flex items-center gap-5 px-5 py-6 sm:px-7">
          <div className="relative flex h-[88px] w-[88px] shrink-0 items-center justify-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
              <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#D4B36A"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 44}
                initial={{ strokeDashoffset: 2 * Math.PI * 44 }}
                whileInView={{ strokeDashoffset: 2 * Math.PI * 44 * (1 - 0.94) }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              />
            </svg>
            <div className="flex flex-col items-center font-mono leading-none">
              <AnimatedCounter value={94} className="text-2xl font-semibold text-white" />
              <span className="mt-0.5 text-[9px] text-[color:var(--text-faint)]">/100</span>
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-ultrawide text-gold">
              VISIUM SCORE™
            </p>
            <p className="mt-1.5 max-w-[12rem] text-sm leading-snug text-[color:var(--text-primary)]">
              Lead con alta intención de compra
            </p>
          </div>
        </div>

        {/* SIGNALS */}
        <div className="grid grid-cols-2 gap-px bg-white/[0.04]">
          {SIGNALS.map((s) => (
            <div key={s.label} className="flex flex-col gap-1.5 bg-[#0b0b10] px-5 py-5">
              <span className="text-gold/80">
                <svg width="18" height="18" viewBox="0 0 24 24">{s.icon}</svg>
              </span>
              <span className="font-mono text-2xl font-semibold tracking-tightest text-white">
                <AnimatedCounter value={s.value} suffix={s.suffix ?? ""} />
              </span>
              <span className="text-[11px] leading-tight text-[color:var(--text-faint)]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
