"use client";

import { motion } from "framer-motion";
import { HeroCanvas } from "@/components/HeroCanvas";
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
      className="arc-glow relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pt-32"
    >
      {/* Entorno 3D — sutil, no compite con el mensaje */}
      <div className="absolute inset-0 opacity-70">
        <HeroCanvas />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-void to-transparent" />
      <div className="pointer-events-none absolute inset-0 dotgrid opacity-30 mask-fade-y" />

      {/* Rieles editoriales */}
      <div className="pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 lg:block">
        <span className="block rotate-180 font-mono text-[11px] uppercase tracking-ultrawide text-[color:var(--text-faint)] [writing-mode:vertical-rl]">
          Inteligencia de Conversión Inmobiliaria
        </span>
      </div>
      <div className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 lg:block">
        <span className="block font-mono text-[11px] uppercase tracking-ultrawide text-[color:var(--text-faint)] [writing-mode:vertical-rl]">
          VISIUM SCORE™ · Tiempo real
        </span>
      </div>

      <div className="container-wide relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_SPATIAL, delay: 0.3 }}
          className="mb-9"
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

        {/* Feature concept pills */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_SPATIAL, delay: 0.88 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {[
            "Spatial Intelligence",
            "Walk Through Reality",
            "Helio-View™",
            "Cotas Bidireccionales",
          ].map((concept) => (
            <span
              key={concept}
              className="inline-flex items-center rounded-full border border-gold/25 bg-gold/[0.06] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-ultrawide text-gold"
            >
              {concept}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_SPATIAL, delay: 0.95 }}
          className="mt-9 max-w-2xl text-balance fluid-lead text-[color:var(--text-muted)]"
        >
          La plataforma de Spatial Intelligence que transforma videos de
          propiedad en gemelos digitales interactivos — con{" "}
          <span className="text-gold">Helio-View™</span> para simular la luz
          solar y{" "}
          <span className="text-gold">Cotas de Medición Bidireccionales</span>{" "}
          para verificar cada espacio. Antes de la primera llamada.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_SPATIAL, delay: 1.1 }}
          className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
        >
          <MagneticButton href="#cta" className="w-full sm:w-auto">
            Solicitar Demo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <MagneticButton href="#plataforma" variant="ghost" className="w-full sm:w-auto">
            Ver Plataforma
          </MagneticButton>
        </motion.div>
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
