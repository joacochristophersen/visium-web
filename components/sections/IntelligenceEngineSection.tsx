"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { ENGINE_SIGNALS } from "@/data/intelligence";
import { fadeUp, staggerContainer, VIEWPORT } from "@/animations/variants";

const ICONS: Record<string, React.ReactNode> = {
  measure: <path d="M14.5 3.5 3.5 14.5l6 6L20.5 9.5l-6-6ZM7 11l1.5 1.5M10 8l1.5 1.5M13 5l1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  furniture: <path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3m-16 0a2 2 0 0 0-2 2v3h20v-3a2 2 0 0 0-2-2m-16 0h16M5 19v-1m14 1v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  sun: <path d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.5-5.5 1.5-1.5M5 19l1.5-1.5m0-11L5 5m13.5 13.5L17 17M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  return: <path d="M21 12a9 9 0 1 1-3-6.7M21 4v4h-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  compare: <path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4m6-16h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  share: <path d="M18 8a3 3 0 1 0-2.8-4M18 8l-8 4m8 8a3 3 0 1 0-2.8-4M18 20l-8-4M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  contact: <path d="M4 5a1 1 0 0 1 1-1h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 12l5 2v3a1 1 0 0 1-1 1A15 15 0 0 1 4 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
};

export function IntelligenceEngineSection() {
  return (
    <section id="motor" className="relative overflow-hidden py-section">
      <GlowOrb className="-left-40 top-32 h-[34rem] w-[34rem]" />
      <div className="container-tight relative">
        <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center gap-6 text-center">
          <Badge dot={false}>El motor de inteligencia VISIUM</Badge>
          <SplitReveal
            text="No vemos clics. Vemos intención."
            stagger={0.05}
            className="fluid-h2 justify-center text-balance text-white"
          />
          <Reveal delay={1}>
            <p className="fluid-lead max-w-2xl text-[color:var(--text-muted)]">
              Cada interacción dentro del gemelo digital genera señales que permiten
              identificar compradores reales — antes de la primera llamada.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Señales que suman puntos */}
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex flex-col gap-3"
          >
            {ENGINE_SIGNALS.map((s) => (
              <motion.li
                key={s.action}
                variants={fadeUp}
                className="group flex items-center gap-4 rounded-3xl border border-white/8 bg-white/[0.02] px-5 py-4 transition-colors duration-500 hover:border-gold/30"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/[0.06] text-gold">
                  <svg width="20" height="20" viewBox="0 0 24 24">{ICONS[s.icon]}</svg>
                </span>
                <span className="flex-1 text-sm font-medium uppercase tracking-wide text-[color:var(--text-primary)]">
                  {s.action}
                </span>
                <span className="font-mono text-base font-semibold text-gold">
                  +{s.points}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Motor de scoring */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <Reveal>
              <div className="panel-lumen relative overflow-hidden rounded-6xl p-8 sm:p-10">
                <div className="pointer-events-none absolute inset-0 bg-mesh opacity-50" />
                <div className="relative flex flex-col items-center text-center">
                  <p className="font-mono text-[11px] uppercase tracking-ultrawide text-gold">
                    VISIUM SCORE™
                  </p>

                  <div className="my-6 flex items-baseline font-display leading-none">
                    <AnimatedCounter value={94} className="text-7xl font-medium text-gradient-gold sm:text-8xl" />
                    <span className="ml-1 text-2xl text-[color:var(--text-faint)]">/100</span>
                  </div>

                  {/* Barra de intención */}
                  <div className="mb-6 h-2 w-full max-w-xs overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "94%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 2.8, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
                      className="h-full rounded-full bg-gradient-to-r from-gold-bright to-gold"
                    />
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-full border border-lead-hot/40 bg-lead-hot/[0.08] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-lead-hot">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lead-hot opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-lead-hot" />
                    </span>
                    HOT LEAD
                  </span>

                  <p className="mt-6 text-sm text-[color:var(--text-muted)]">
                    Cada acción suma. Al cruzar el umbral, tu equipo recibe la alerta
                    para llamar en el momento exacto.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
