"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { PLATFORM_MODULES } from "@/data/content";
import { fadeUp, staggerContainer, VIEWPORT } from "@/animations/variants";

export function PlataformaSection() {
  return (
    <section id="plataforma" className="relative overflow-hidden py-section">
      <GlowOrb className="-right-40 top-32 h-[34rem] w-[34rem]" color="highlight" />
      <div className="container-tight relative">
        <div className="mb-16 flex flex-col items-start gap-6">
          <Badge dot={false}>Sección 05 — La plataforma</Badge>
          <SplitReveal
            text="No solo mostramos propiedades. Mostramos quién va a comprarlas."
            stagger={0.045}
            className="fluid-h2 max-w-4xl text-balance text-white"
          />
          <Reveal delay={1} className="max-w-2xl">
            <p className="fluid-lead text-[color:var(--text-muted)]">
              Seis módulos que trabajan como un solo sistema operativo de
              conversión para tu inmobiliaria.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PLATFORM_MODULES.map((m) => (
            <motion.div key={m.name} variants={fadeUp} className="perspective">
              <TiltCard className="h-full">
                <div className="flex h-full flex-col gap-4 p-7">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium tracking-tightest text-white">
                      {m.name}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-wide text-[color:var(--text-faint)]">
                      {m.tag}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[color:var(--text-muted)]">
                    {m.description}
                  </p>
                  <div className="mt-auto h-px w-full bg-gradient-to-r from-gold/40 to-transparent" />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
