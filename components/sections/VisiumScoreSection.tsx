"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SCORE_SIGNALS } from "@/data/content";
import { fadeUp, staggerContainer, VIEWPORT } from "@/animations/variants";

const SIZE = 260;
const STROKE = 14;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;
const SCORE = 94;

function ScoreGauge() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const offset = C - (SCORE / 100) * C;

  return (
    <div className="relative mx-auto flex items-center justify-center">
      <div className="pointer-events-none absolute inset-0 rounded-full bg-gold/15 blur-3xl" />
      <svg
        ref={ref}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="relative h-auto w-full max-w-[240px] -rotate-90"
      >
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={STROKE} />
        <defs>
          <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E6C98A" />
            <stop offset="100%" stopColor="#D4B36A" />
          </linearGradient>
        </defs>
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="url(#scoreGrad)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={inView ? { strokeDashoffset: offset } : {}}
          transition={{ duration: 3.0, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-baseline font-mono">
          <AnimatedCounter
            value={SCORE}
            className="font-display text-7xl font-medium text-white"
          />
          <span className="text-2xl text-[color:var(--text-faint)]">/100</span>
        </div>
        <span className="mt-1 text-[11px] uppercase tracking-ultrawide text-gold">
          Intención de compra
        </span>
      </div>
    </div>
  );
}

export function VisiumScoreSection() {
  return (
    <section id="visium-score" className="relative overflow-hidden py-section">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="container-tight relative">
        <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center gap-6 text-center">
          <Badge dot={false}>Sección 04 — VISIUM SCORE™</Badge>
          <SplitReveal
            text="No analizamos clics. Analizamos intención."
            stagger={0.05}
            className="fluid-h2 justify-center text-balance text-white"
          />
          <Reveal delay={1}>
            <p className="fluid-lead max-w-2xl text-[color:var(--text-muted)]">
              Cada propiedad recorrida genera señales de comportamiento. VISIUM
              SCORE™ las convierte en una predicción de intención de compra — el
              activo más valioso de tu inmobiliaria.
            </p>
          </Reveal>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Medidor */}
          <Reveal>
            <div className="panel-lumen relative overflow-hidden rounded-6xl p-6 sm:p-10">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Martina Acosta</p>
                  <p className="font-mono text-xs text-[color:var(--text-faint)]">
                    Penthouse · Palermo
                  </p>
                </div>
                <span className="chip">
                  <span className="h-1.5 w-1.5 rounded-full bg-lead-hot" />
                  Lead HOT
                </span>
              </div>
              <ScoreGauge />
            </div>
          </Reveal>

          {/* Señales + alerta */}
          <div className="flex flex-col gap-8">
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="grid gap-3 sm:grid-cols-2"
            >
              {SCORE_SIGNALS.map((s) => (
                <motion.li
                  key={s.label}
                  variants={fadeUp}
                  className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="flex-1 text-sm text-[color:var(--text-primary)]">
                    {s.label}
                  </span>
                  <span className="font-mono text-xs text-gold">{s.weight}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Alerta de lead caliente */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-4xl border border-lead-hot/40 bg-lead-hot/[0.07] p-6"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-lead-hot/20 blur-2xl" />
              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="relative mt-0.5 flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lead-hot opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lead-hot" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-lead-hot">
                      Alerta · Intención de compra alta
                    </p>
                    <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                      Este lead está listo para avanzar. Llamá ahora.
                    </p>
                  </div>
                </div>
                <a
                  href="#cta"
                  className="shrink-0 rounded-full bg-lead-hot px-5 py-2.5 text-center text-sm font-medium text-white transition-transform hover:scale-[1.03]"
                >
                  Llamar ahora
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
