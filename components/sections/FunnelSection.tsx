"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";
import { FUNNEL_STAGES } from "@/data/intelligence";
import { staggerContainer, VIEWPORT } from "@/animations/variants";
import { cn } from "@/lib/utils";

const MAX = FUNNEL_STAGES[0].value;
const fmt = (n: number) => n.toLocaleString("es-AR");

export function FunnelSection() {
  return (
    <section id="embudo" className="relative overflow-hidden py-section">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-40" />
      <div className="container-tight relative">
        <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center gap-6 text-center">
          <Badge dot={false}>De señales a ventas</Badge>
          <SplitReveal
            text="El comportamiento revela quién compra."
            stagger={0.045}
            className="fluid-h2 justify-center text-balance text-white"
          />
          <Reveal delay={1}>
            <p className="fluid-lead max-w-2xl text-[color:var(--text-muted)]">
              De miles de visitantes anónimos a un puñado de compradores reales.
              VISIUM ilumina cada etapa con datos de comportamiento.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto flex max-w-2xl flex-col items-center gap-2.5"
        >
          {FUNNEL_STAGES.map((stage, i) => {
            const width = Math.max(22, (stage.value / MAX) * 100);
            return (
              <motion.div
                key={stage.label}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                style={{ width: `${width}%` }}
                className={cn(
                  "flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 backdrop-blur",
                  stage.highlight
                    ? "border-gold/50 bg-gold/[0.1] shadow-glow-soft"
                    : "border-white/10 bg-white/[0.025]"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-xl font-semibold tracking-tightest sm:text-2xl",
                    stage.highlight ? "text-gradient-gold" : "text-white"
                  )}
                >
                  {fmt(stage.value)}
                </span>
                <span
                  className={cn(
                    "truncate text-right text-[11px] uppercase tracking-wide sm:text-xs",
                    stage.highlight ? "text-gold" : "text-[color:var(--text-faint)]"
                  )}
                >
                  {stage.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        <Reveal delay={1} className="mx-auto mt-14 max-w-2xl">
          <div className="border-gold rounded-5xl p-8 text-center sm:p-10">
            <p className="text-xl font-light leading-snug text-[color:var(--text-muted)] sm:text-2xl">
              VISIUM identifica a esos{" "}
              <span className="font-medium text-gradient-gold">74</span> antes de que
              tu equipo pierda tiempo con los{" "}
              <span className="text-white">9.926 restantes.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
