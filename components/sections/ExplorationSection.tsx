"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EXPLORE_STEPS } from "@/data/technology";
import { fadeUp, staggerContainer, VIEWPORT, scaleIn } from "@/animations/variants";

export function ExplorationSection() {
  return (
    <section id="exploration" className="relative py-section">
      {/* soft top divider */}
      <div className="container-tight mb-20">
        <div className="hairline" />
      </div>

      <div className="container-tight grid items-center gap-16 lg:grid-cols-2">
        {/* Left: copy + steps */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="Section 04 — Immersive Exploration"
            title={
              <>
                Total freedom of
                <br /> movement.
              </>
            }
            description="No rails. No fixed viewpoints. Move through the space with natural momentum, pause where you want, and discover every property on your own terms."
          />

          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mt-12 flex flex-col gap-px overflow-hidden rounded-3xl border border-white/5"
          >
            {EXPLORE_STEPS.map((step) => (
              <motion.li
                key={step.index}
                variants={fadeUp}
                className="group flex gap-6 bg-surface/20 p-6 transition-colors duration-500 hover:bg-surface/40"
              >
                <span className="text-sm font-medium text-primary">{step.index}</span>
                <div>
                  <h3 className="text-lg font-medium text-white">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--text-muted)]">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        {/* Right: immersive viewport mock with floating UI */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="perspective relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-glass">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />

            {/* Floating spatial HUD */}
            <div className="absolute left-4 top-4 glass flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Live digital twin · 60fps
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-5 top-1/3 glass rounded-2xl px-4 py-3 text-xs"
            >
              <p className="text-[color:var(--text-faint)]">Ceiling height</p>
              <p className="text-base font-medium text-white">3.10 m</p>
            </motion.div>

            <div className="absolute bottom-5 left-5 right-5 glass flex items-center justify-between rounded-2xl px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">Penthouse · West Loop</p>
                <p className="text-xs text-[color:var(--text-faint)]">Living room → Terrace</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-black">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* glow behind */}
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-primary/10 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
