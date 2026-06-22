"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { LEADS, TIER_META, type LeadTier } from "@/data/content";
import { fadeUp, staggerContainer, VIEWPORT } from "@/animations/variants";

const ORDER: LeadTier[] = ["hot", "warm", "mild", "cold"];
const COUNTS: Record<LeadTier, number> = { hot: 12, warm: 28, mild: 41, cold: 63 };

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white">
      {initials}
    </span>
  );
}

export function DashboardSection() {
  return (
    <section id="dashboard" className="relative overflow-hidden py-section">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-50" />
      <div className="container-wide relative">
        <div className="mb-14 flex flex-col items-start gap-6">
          <Badge dot={false}>Sección 06 — Dashboard de conversión</Badge>
          <SplitReveal
            text="Tu pipeline, ordenado por intención de compra."
            stagger={0.045}
            className="fluid-h2 max-w-4xl text-balance text-white"
          />
          <Reveal delay={1} className="max-w-2xl">
            <p className="fluid-lead text-[color:var(--text-muted)]">
              Cada propiedad se convierte en una fuente de datos. Tu equipo prioriza
              los llamados con VISIUM SCORE™ — como HubSpot y Salesforce, pero con
              inteligencia inmobiliaria real.
            </p>
          </Reveal>
        </div>

        {/* App window */}
        <Reveal>
          <div className="overflow-hidden rounded-5xl border border-white/10 bg-[#0a0a0e] shadow-glass">
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </span>
                <span className="ml-2 font-mono text-xs text-[color:var(--text-faint)]">
                  VISIUM · Centro de Leads
                </span>
              </div>
              <span className="chip hidden sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-lead-success" />
                En vivo
              </span>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1fr_300px]">
              {/* Lead table */}
              <div className="p-4 sm:p-6">
                {/* Tier filter pills */}
                <div className="mb-5 flex flex-wrap gap-2">
                  {ORDER.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs"
                    >
                      <span className="h-2 w-2 rounded-full" style={{ background: TIER_META[t].color }} />
                      <span className="font-medium text-white">{TIER_META[t].label}</span>
                      <span className="font-mono text-[color:var(--text-faint)]">{COUNTS[t]}</span>
                    </span>
                  ))}
                </div>

                {/* Header row */}
                <div className="hidden grid-cols-[1.6fr_1fr_1.4fr_auto] gap-4 px-3 pb-3 text-[11px] uppercase tracking-wide text-[color:var(--text-faint)] sm:grid">
                  <span>Lead</span>
                  <span>Propiedad</span>
                  <span>Señal principal</span>
                  <span className="text-right">Score</span>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                  className="flex flex-col gap-2"
                >
                  {LEADS.map((lead) => (
                    <motion.div
                      key={lead.name}
                      variants={fadeUp}
                      className="grid grid-cols-1 items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-3 py-3 transition-colors hover:border-gold/25 hover:bg-white/[0.04] sm:grid-cols-[1.6fr_1fr_1.4fr_auto] sm:gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <Initials name={lead.name} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white">{lead.name}</p>
                          <span
                            className="inline-flex items-center gap-1.5 text-[11px] font-medium"
                            style={{ color: TIER_META[lead.tier].color }}
                          >
                            <span className="h-1.5 w-1.5 rounded-full" style={{ background: TIER_META[lead.tier].color }} />
                            {TIER_META[lead.tier].label}
                          </span>
                        </div>
                      </div>
                      <p className="truncate text-sm text-[color:var(--text-muted)]">{lead.property}</p>
                      <p className="truncate text-sm text-[color:var(--text-muted)]">{lead.signal}</p>
                      <div className="flex items-center gap-3 sm:justify-end">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/8 sm:w-20">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${lead.score}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="h-full rounded-full"
                            style={{ background: TIER_META[lead.tier].color }}
                          />
                        </div>
                        <span className="w-9 text-right font-mono text-sm font-semibold text-white">
                          {lead.score}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Side metrics */}
              <div className="border-t border-white/8 p-5 lg:border-l lg:border-t-0">
                <p className="mb-4 text-[11px] uppercase tracking-wide text-[color:var(--text-faint)]">
                  Esta semana
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Tasa de cierre", value: 25, suffix: "%", color: "var(--success)" },
                    { label: "Visitas evitadas", value: 40, suffix: "%", color: "var(--gold)" },
                    { label: "Leads HOT detectados", value: 12, suffix: "", color: "var(--lead-hot)" },
                  ].map((m) => (
                    <div key={m.label} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                      <AnimatedCounter
                        value={m.value}
                        suffix={m.suffix}
                        className="font-mono text-3xl font-semibold"
                      />
                      <p className="mt-1 text-xs text-[color:var(--text-muted)]">{m.label}</p>
                      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/8">
                        <div className="h-full w-2/3 rounded-full" style={{ background: m.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
