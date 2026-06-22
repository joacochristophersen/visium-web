"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GradientText } from "@/components/ui/GradientText";
import { VIEWPORT, scaleIn } from "@/animations/variants";

export function CTASection() {
  return (
    <section id="cta" className="relative px-4 py-section">
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="arc-glow container-tight relative overflow-hidden rounded-6xl border border-white/10 px-6 py-24 text-center shadow-glass"
      >
        <div className="pointer-events-none absolute inset-0 bg-mesh opacity-70" />
        <div className="pointer-events-none absolute inset-0 dotgrid opacity-20" />

        <div className="relative">
          <p className="eyebrow mb-6">Sección 10 — Empezá hoy</p>
          <h2 className="fluid-h2 mx-auto max-w-3xl text-balance text-white">
            La primera visita debería ser{" "}
            <GradientText>la que importa.</GradientText>
          </h2>
          <p className="mx-auto mt-6 max-w-xl fluid-lead text-[color:var(--text-muted)]">
            Sumá inteligencia de conversión a tu inmobiliaria. En 3 minutos de
            puesta en marcha, tu equipo empieza a priorizar compradores reales.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton href="#top" className="w-full sm:w-auto">
              Solicitar Demo
            </MagneticButton>
            <MagneticButton href="#top" variant="ghost" className="w-full sm:w-auto">
              Hablar con Ventas
            </MagneticButton>
          </div>

          <p className="mt-8 text-xs text-[color:var(--text-faint)]">
            Sin instalaciones · Funciona en cualquier navegador · Puesta en marcha en 3 minutos
          </p>
        </div>
      </motion.div>
    </section>
  );
}
