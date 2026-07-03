"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GradientText } from "@/components/ui/GradientText";
import { Badge } from "@/components/ui/Badge";
import { Marquee } from "@/components/ui/Marquee";
import { HeroIntelCard } from "@/components/HeroIntelCard";
import { EASE_SPATIAL } from "@/animations/variants";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center pt-32"
    >
      {/* El video de fondo vive en GlobalVideoCanvas — lienzo continuo sin cortes */}
      <div className="pointer-events-none absolute inset-0 dotgrid opacity-[0.12] mask-fade-y" />

      {/* Rieles editoriales — fijos a los costados durante todo el recorrido */}
      <div className="pointer-events-none fixed left-5 top-1/2 z-[2] hidden -translate-y-1/2 lg:block">
        <span className="block rotate-180 font-mono text-[11px] uppercase tracking-ultrawide text-[color:var(--text-faint)] [writing-mode:vertical-rl]">
          Inteligencia de Conversión Inmobiliaria
        </span>
      </div>
      <div className="pointer-events-none fixed right-5 top-1/2 z-[2] hidden -translate-y-1/2 lg:block">
        <span className="block font-mono text-[11px] uppercase tracking-ultrawide text-[color:var(--text-faint)] [writing-mode:vertical-rl]">
          VISIUM SCORE™ · Tiempo real
        </span>
      </div>

      <div className="container-wide relative z-10 flex flex-col items-center text-center">
        {/* Super-título de marca — ultra-lujo */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: EASE_SPATIAL, delay: 0.15 }}
          className="mb-5 font-sans text-xs font-medium uppercase tracking-[0.5em] text-neutral-400 sm:text-sm"
        >
          VISIUM
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_SPATIAL, delay: 0.3 }}
          className="mb-7"
        >
          <Badge>Spatial Intelligence Platform</Badge>
        </motion.div>

        <h1 className="flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: EASE_SPATIAL, delay: 0.45 }}
            className="mb-2 text-base font-medium uppercase tracking-[0.22em] text-[color:var(--text-muted)] sm:text-lg"
          >
            Walk Through Reality.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 46, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: EASE_SPATIAL, delay: 0.6 }}
            className="fluid-display"
          >
            Vendemos <GradientText>decisiones.</GradientText>
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_SPATIAL, delay: 0.95 }}
          className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
        >
          <MagneticButton href="#cta" className="w-full max-w-xs sm:w-auto sm:max-w-none">
            Solicitar Demo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <MagneticButton href="#plataforma" variant="ghost" className="w-full max-w-xs sm:w-auto sm:max-w-none">
            Ver Plataforma
          </MagneticButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_SPATIAL, delay: 1.15 }}
          className="mt-10 mb-10 max-w-xl text-balance text-center text-sm text-neutral-400 sm:mt-8 sm:mb-8"
        >
          Spatial Intelligence para Real Estate. El dashboard predictivo que transforma visualizaciones en decisiones de compra.
        </motion.p>
      </div>

      {/* Prueba de inteligencia de comportamiento — tarjeta de lead real */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE_SPATIAL, delay: 1.3 }}
        className="relative z-10 mt-16 w-full max-w-2xl px-1"
      >
        <HeroIntelCard />
      </motion.div>

      <div className="container-wide relative z-10 mt-12 w-full pb-12">
        <p className="mb-6 text-center text-[11px] uppercase tracking-ultrawide text-[color:var(--text-faint)]">
          Inmobiliarias y desarrolladores que ya venden con datos
        </p>
        <Marquee
          items={[
            "Toribio Achával",
            "Izrastzoff",
            "Mudafy",
            "Zonaprop",
            "Argencons",
            "Consultatio",
            "RE/MAX",
            "Predial",
          ]}
        />
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
          <motion.span
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-gold"
          />
        </div>
      </div>
    </section>
  );
}
