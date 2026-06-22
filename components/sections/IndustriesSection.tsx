"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";
import { INDUSTRIES } from "@/data/industries";
import { fadeUp, staggerContainer, VIEWPORT } from "@/animations/variants";
import { cn } from "@/lib/utils";

export function IndustriesSection() {
  return (
    <section id="industries" className="relative py-section">
      <div className="container-tight">
        <div className="mb-16 flex flex-col items-center gap-6 text-center">
          <Badge dot={false}>Section 07 — Industry Use Cases</Badge>
          <SplitReveal
            text="One platform. Every kind of space."
            stagger={0.05}
            className="max-w-3xl justify-center text-4xl font-semibold leading-[1.04] tracking-tightest sm:text-6xl md:text-7xl"
          />
          <Reveal delay={1} className="max-w-2xl">
            <p className="text-lg text-[color:var(--text-muted)]">
              From a first apartment to a billion-dollar development, VISIUM gives
              every property a walkable digital twin.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid auto-rows-[280px] grid-cols-1 gap-5 md:grid-cols-3"
        >
          {INDUSTRIES.map((ind, i) => (
            <motion.article
              key={ind.id}
              variants={fadeUp}
              className={cn(
                "group relative overflow-hidden rounded-[1.75rem] border border-white/10",
                i === 0 && "md:col-span-2",
                i === 3 && "md:col-span-2"
              )}
            >
              <div
                className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[1200ms] ease-spatial group-hover:scale-100"
                style={{ backgroundImage: `url('${ind.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
              <div className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/5" />

              <div className="relative flex h-full flex-col justify-end p-8">
                <span className="mb-3 w-fit rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-wide text-highlight backdrop-blur">
                  {ind.tag}
                </span>
                <h3 className="text-2xl font-semibold tracking-tightest text-white">
                  {ind.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {ind.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
