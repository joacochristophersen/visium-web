"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GradientText } from "@/components/ui/GradientText";
import { Reveal } from "@/components/ui/Reveal";
import { fadeUp, staggerContainer, VIEWPORT } from "@/animations/variants";

const PILLARS = [
  {
    title: "El foso son los datos",
    body: "Cada recorrido entrena nuestro modelo de intención. Cuantas más propiedades, más precisa la predicción — una ventaja que se compone y nadie puede copiar.",
  },
  {
    title: "La oportunidad es LATAM",
    body: "Un mercado inmobiliario enorme, fragmentado y sub-digitalizado. El momento para definir la categoría es ahora.",
  },
  {
    title: "La visión es la categoría",
    body: "No competimos por tours. Construimos la capa de inteligencia sobre la que va a operar todo el Real Estate de la región.",
  },
];

export function FutureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section id="vision" ref={ref} className="relative overflow-hidden py-section">
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/75 to-void" />
      </motion.div>

      <div className="container-tight relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <Badge dot={false}>Sección 09 — Visión</Badge>
          <Reveal blur>
            <h2 className="fluid-h2 text-balance text-white">
              No somos una empresa de tours. Somos una empresa de{" "}
              <GradientText>datos de comportamiento inmobiliario.</GradientText>
            </h2>
          </Reveal>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-16 grid gap-5 md:grid-cols-3"
        >
          {PILLARS.map((p) => (
            <motion.div key={p.title} variants={fadeUp} className="panel rounded-4xl p-7 text-left">
              <h3 className="text-lg font-medium tracking-tightest text-white">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-muted)]">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={1} className="mt-24 text-center">
          <p className="eyebrow mb-6">La ambición</p>
          <h3 className="fluid-display mx-auto max-w-4xl text-balance text-white">
            El <GradientText>HubSpot</GradientText> del Real Estate en LATAM.
          </h3>
        </Reveal>
      </div>
    </section>
  );
}
