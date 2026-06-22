"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { VIEWPORT } from "@/animations/variants";

function HelioIcon({ active }: { active: boolean }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12" cy="12" r="4"
        stroke={active ? "#D4B36A" : "currentColor"}
        strokeWidth="1.6"
      />
      <path
        d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke={active ? "#D4B36A" : "currentColor"}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CotasIcon({ active }: { active: boolean }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 9h18M3 15h18M9 3v18M15 3v18"
        stroke={active ? "#D4B36A" : "currentColor"}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ToggleButton({
  label,
  sub,
  active,
  onToggle,
  icon,
}: {
  label: string;
  sub: string;
  active: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300",
        active
          ? "border-gold/50 bg-gold/[0.07] shadow-[0_0_24px_-6px_rgba(212,179,106,0.3)]"
          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.035]"
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-300",
          active
            ? "border-gold/40 bg-gold/15 text-gold"
            : "border-white/10 bg-white/5 text-[color:var(--text-muted)]"
        )}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-sm font-medium transition-colors duration-300",
            active ? "text-gold" : "text-white"
          )}
        >
          {label}
        </p>
        <p className="text-[11px] text-[color:var(--text-faint)]">{sub}</p>
      </div>
      {/* Status dot */}
      <span
        className={cn(
          "h-2 w-2 shrink-0 rounded-full transition-all duration-300",
          active
            ? "bg-gold shadow-[0_0_8px_4px_rgba(212,179,106,0.55)]"
            : "bg-white/12"
        )}
      />
    </button>
  );
}

const BASE_SCORE = 72;
const HELIO_DELTA = 14;
const COTAS_DELTA = 18;

export function ViewerDemoSection() {
  const [helioActive, setHelioActive] = useState(false);
  const [cotasActive, setCotasActive] = useState(false);

  const score = Math.min(
    100,
    BASE_SCORE + (helioActive ? HELIO_DELTA : 0) + (cotasActive ? COTAS_DELTA : 0)
  );

  return (
    <section id="motor" className="relative overflow-hidden py-section">
      {/* Subtle glow behind the panel */}
      <div className="pointer-events-none absolute -left-60 top-20 h-[32rem] w-[32rem] rounded-full bg-gold/[0.04] blur-3xl" />

      <div className="container-tight relative">
        <div className="mb-14 flex flex-col items-start gap-6">
          <Badge dot={false}>Motor de Inmersión — Capas de Análisis</Badge>
          <SplitReveal
            text="Cada capa que activa el comprador revela intención de compra."
            stagger={0.04}
            className="fluid-h2 max-w-4xl text-balance text-white"
          />
          <Reveal delay={0.9} className="max-w-2xl">
            <p className="fluid-lead text-[color:var(--text-muted)]">
              <span className="text-gold">Helio-View™</span> simula la luz
              solar a cualquier hora del día.{" "}
              <span className="text-gold">
                Cotas de Medición Bidireccionales
              </span>{" "}
              verifican espacios con precisión de ±2 cm. Cada interacción suma
              puntos al VISIUM SCORE™.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="overflow-hidden rounded-5xl border border-white/10 bg-[#0a0a0e] shadow-glass">
            {/* App chrome top bar */}
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                </span>
                <span className="ml-2 font-mono text-xs text-[color:var(--text-faint)]">
                  VISIUM · Penthouse Piso 22 — Palermo Soho
                </span>
              </div>
              <span className="chip hidden sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-ping-soft" />
                Spatial Intelligence
              </span>
            </div>

            <div className="grid lg:grid-cols-[1fr_288px]">
              {/* ── Fake 3-D viewport ── */}
              <div className="relative min-h-[340px] overflow-hidden bg-[#08080e]">
                {/* Perspective grid */}
                <svg
                  className="absolute inset-0 h-full w-full opacity-[0.06]"
                  preserveAspectRatio="none"
                >
                  {Array.from({ length: 9 }).map((_, i) => (
                    <line
                      key={`v${i}`}
                      x1={`${(i + 1) * 10}%`}
                      y1="0"
                      x2={`${(i + 1) * 10}%`}
                      y2="100%"
                      stroke="#D4B36A"
                      strokeWidth="0.6"
                    />
                  ))}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <line
                      key={`h${i}`}
                      x1="0"
                      y1={`${(i + 1) * 14.28}%`}
                      x2="100%"
                      y2={`${(i + 1) * 14.28}%`}
                      stroke="#D4B36A"
                      strokeWidth="0.6"
                    />
                  ))}
                </svg>

                {/* Room silhouette */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
                  <svg width="320" height="200" viewBox="0 0 320 200" fill="none">
                    <rect x="40" y="40" width="240" height="140" stroke="#D4B36A" strokeWidth="1.2" />
                    <line x1="40" y1="40" x2="80" y2="10" stroke="#D4B36A" strokeWidth="0.8" />
                    <line x1="280" y1="40" x2="320" y2="10" stroke="#D4B36A" strokeWidth="0.8" />
                    <line x1="280" y1="180" x2="320" y2="150" stroke="#D4B36A" strokeWidth="0.8" />
                    <line x1="40" y1="180" x2="80" y2="150" stroke="#D4B36A" strokeWidth="0.8" />
                    <rect x="80" y="10" width="240" height="140" stroke="#D4B36A" strokeWidth="1.2" />
                  </svg>
                </div>

                {/* ── Helio-View overlay ── */}
                <AnimatePresence>
                  {helioActive && (
                    <motion.div
                      key="helio"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.55 }}
                      className="pointer-events-none absolute inset-0"
                    >
                      {/* Sun ray wash */}
                      <div className="absolute -top-10 left-[38%] h-[120%] w-[30%] bg-gradient-to-b from-amber-300/22 via-amber-400/08 to-transparent blur-3xl" />
                      {/* Sun disc */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="absolute left-[50%] top-6 h-4 w-4 -translate-x-1/2 rounded-full bg-amber-300 shadow-[0_0_30px_16px_rgba(251,191,36,0.45)]"
                      />
                      {/* Time card */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.35, delay: 0.2 }}
                        className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-gold/30 bg-black/75 px-4 py-2.5 backdrop-blur-sm"
                      >
                        <div className="h-4 w-4 rounded-full bg-amber-300 shadow-[0_0_10px_6px_rgba(251,191,36,0.4)]" />
                        <div>
                          <p className="font-mono text-[11px] text-gold">14:00 hs · Simulación solar</p>
                          <p className="text-[10px] text-[color:var(--text-faint)]">Orientación Norte — Entrada directa</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Cotas overlay ── */}
                <AnimatePresence>
                  {cotasActive && (
                    <motion.div
                      key="cotas"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="pointer-events-none absolute inset-0"
                    >
                      <svg className="absolute inset-0 h-full w-full">
                        {/* Horizontal cota */}
                        <motion.line
                          x1="14%" y1="58%" x2="84%" y2="58%"
                          stroke="#D4B36A" strokeWidth="1" strokeDasharray="5 3"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <line x1="14%" y1="53%" x2="14%" y2="63%" stroke="#D4B36A" strokeWidth="1" />
                        <line x1="84%" y1="53%" x2="84%" y2="63%" stroke="#D4B36A" strokeWidth="1" />
                        {/* Vertical cota */}
                        <motion.line
                          x1="52%" y1="14%" x2="52%" y2="80%"
                          stroke="#D4B36A" strokeWidth="1" strokeDasharray="5 3"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        />
                        <line x1="47%" y1="14%" x2="57%" y2="14%" stroke="#D4B36A" strokeWidth="1" />
                        <line x1="47%" y1="80%" x2="57%" y2="80%" stroke="#D4B36A" strokeWidth="1" />
                      </svg>
                      {/* Labels */}
                      <div className="absolute left-[43%] top-[60%] rounded border border-gold/35 bg-black/80 px-2 py-0.5 font-mono text-[11px] text-gold backdrop-blur-sm">
                        14.20 m
                      </div>
                      <div className="absolute left-[54%] top-[42%] rounded border border-gold/35 bg-black/80 px-2 py-0.5 font-mono text-[11px] text-gold backdrop-blur-sm">
                        3.80 m
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Idle hint when nothing active */}
                <AnimatePresence>
                  {!helioActive && !cotasActive && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <p className="font-mono text-[11px] uppercase tracking-ultrawide text-[color:var(--text-faint)]">
                        Activá una capa →
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Control panel ── */}
              <div className="flex flex-col gap-4 border-t border-white/[0.07] p-5 lg:border-l lg:border-t-0">
                <p className="text-[11px] uppercase tracking-ultrawide text-[color:var(--text-faint)]">
                  Capas de análisis espacial
                </p>

                <ToggleButton
                  label="Helio-View™"
                  sub="Simulación Solar"
                  active={helioActive}
                  onToggle={() => setHelioActive((v) => !v)}
                  icon={<HelioIcon active={helioActive} />}
                />

                <ToggleButton
                  label="Cotas"
                  sub="Medición Bidireccional"
                  active={cotasActive}
                  onToggle={() => setCotasActive((v) => !v)}
                  icon={<CotasIcon active={cotasActive} />}
                />

                {/* Live signal log */}
                <div className="flex flex-col gap-1.5">
                  <AnimatePresence>
                    {helioActive && (
                      <motion.div
                        key="helio-signal"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
                      >
                        <p className="text-[12px] text-[color:var(--text-muted)]">
                          Simuló luz natural · 14:00 hs
                        </p>
                        <span className="font-mono text-[12px] font-medium text-gold">
                          +{HELIO_DELTA}
                        </span>
                      </motion.div>
                    )}
                    {cotasActive && (
                      <motion.div
                        key="cotas-signal"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.3, delay: helioActive ? 0.06 : 0 }}
                        className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
                      >
                        <p className="text-[12px] text-[color:var(--text-muted)]">
                          Midió dormitorio · 4.2 × 3.8 m
                        </p>
                        <span className="font-mono text-[12px] font-medium text-gold">
                          +{COTAS_DELTA}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* VISIUM SCORE™ widget */}
                <div className="mt-auto rounded-2xl border border-gold/20 bg-gold/[0.04] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[11px] uppercase tracking-ultrawide text-[color:var(--text-faint)]">
                      VISIUM SCORE™
                    </p>
                    <span className="chip text-[11px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-lead-hot animate-ping" />
                      {score >= 90 ? "Lead HOT" : score >= 70 ? "Lead WARM" : "Lead MILD"}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <motion.span
                      key={score}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="font-mono text-4xl font-semibold text-white"
                    >
                      {score}
                    </motion.span>
                    <span className="text-sm text-[color:var(--text-faint)]">/100</span>
                  </div>
                  {/* Score bar */}
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-gold-deep to-gold"
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-[color:var(--text-faint)]">
                    Martina Acosta · Penthouse Palermo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
