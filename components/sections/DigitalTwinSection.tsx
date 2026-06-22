"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GradientText } from "@/components/ui/GradientText";
import { TiltCard } from "@/components/ui/TiltCard";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { TWIN_FEATURES } from "@/data/platform";
import { fadeUp, staggerContainer, VIEWPORT } from "@/animations/variants";
import { cn } from "@/lib/utils";

const SPAN: Record<string, string> = {
  wide: "md:col-span-2",
  tall: "md:row-span-2",
  normal: "",
};

/** Section 06 — Digital Twin Platform (bento grid of capabilities). */
export function DigitalTwinSection() {
  return (
    <section id="digital-twin" className="relative overflow-hidden py-section">
      <GlowOrb className="-right-40 top-40 h-[36rem] w-[36rem]" color="highlight" />
      <div className="container-tight relative">
        <div className="mb-16 flex flex-col items-center gap-6 text-center">
          <Badge dot={false}>Section 06 — Digital Twin Platform</Badge>
          <h2 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.04] tracking-tightest sm:text-6xl md:text-7xl">
            Not a tour. A living
            <GradientText> property OS.</GradientText>
          </h2>
          <p className="max-w-2xl text-lg text-[color:var(--text-muted)]">
            Every twin is a queryable, measurable object — ready to power
            valuation, staging, search and collaboration.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid auto-rows-[200px] grid-cols-1 gap-5 md:grid-cols-3"
        >
          {TWIN_FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className={cn("perspective", SPAN[f.span])}
            >
              <TiltCard className="h-full">
                <div className="flex h-full flex-col justify-between p-7">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold tracking-tightest text-white">
                      {f.title}
                    </h3>
                    {f.metric && (
                      <span className="text-right">
                        <span className="block text-2xl font-semibold tracking-tightest text-gradient">
                          {f.metric}
                        </span>
                        <span className="text-[10px] uppercase tracking-wide text-[color:var(--text-faint)]">
                          {f.metricLabel}
                        </span>
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-[color:var(--text-muted)]">
                    {f.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
