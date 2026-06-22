"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";
import { PROBLEM_CARDS } from "@/data/content";
import { fadeUp, staggerContainer, VIEWPORT } from "@/animations/variants";

export function ProblemSection() {
  return (
    <section id="problema" className="relative overflow-hidden py-section">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-2 top-24 hidden font-display text-[13vw] leading-none tracking-tightest text-white/[0.02] lg:block"
      >
        Fricción
      </span>

      <div className="container-tight relative">
        <div className="flex max-w-4xl flex-col items-start gap-7">
          <Badge dot={false}>Sección 02 — El problema</Badge>
          <SplitReveal
            text="Buscar propiedades sigue roto."
            stagger={0.07}
            className="fluid-h2 text-balance text-white"
          />
          <Reveal delay={1} className="max-w-2xl">
            <p className="fluid-lead text-[color:var(--text-muted)]">
              La compra más importante en la vida de una persona todavía se decide
              con fotos editadas y visitas a ciegas. Las inmobiliarias pierden
              tiempo, y los compradores serios se pierden entre los curiosos.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-16 grid gap-5 md:grid-cols-3"
        >
          {PROBLEM_CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              className="panel group relative overflow-hidden rounded-4xl p-8 transition-colors duration-500 hover:border-white/12"
            >
              <span className="font-mono text-xs text-gold">0{i + 1}</span>
              <h3 className="mt-5 text-xl font-medium tracking-tightest text-white">
                {c.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-muted)]">
                {c.detail}
              </p>
              <div className="mt-7 h-px w-full bg-gradient-to-r from-gold/40 to-transparent transition-all duration-700 group-hover:from-gold-bright/70" />
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={1} className="mt-16">
          <div className="border-gold flex flex-col items-start gap-6 rounded-5xl p-8 sm:flex-row sm:items-center sm:gap-10 sm:p-10">
            <div className="shrink-0">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-ultrawide text-gold">
                Realidad del mercado
              </p>
              <span className="block font-display text-6xl font-medium leading-none text-gradient-gold sm:text-7xl">
                68%
              </span>
            </div>
            <p className="max-w-xl text-lg font-light leading-snug text-[color:var(--text-muted)] sm:text-xl">
              de las visitas presenciales{" "}
              <span className="text-white">no terminan en una operación.</span>{" "}
              VISIUM identifica a los compradores reales antes de que tu equipo
              suba al auto.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
