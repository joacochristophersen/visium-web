"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/**
 * Tarjeta de inteligencia de lead — simulación coreografiada.
 *
 * Timeline (dispara una sola vez al entrar en viewport):
 *  1. Tipeo de coordenadas del lead (Palermo) en JetBrains Mono.
 *  2. Micro-estados de procesamiento que parpadean mientras el motor "piensa".
 *  3. Llenado pausado del anillo SVG + conteo sincronizado hasta 94.
 *  4. Activación secuencial de las 4 celdas de señales.
 *  5. Lock final: badge "Alta intención" + score consolidado.
 */

const EASE_LUX: [number, number, number, number] = [0.25, 1, 0.5, 1];

const HEADER_TEXT = "Lead detectado · Penthouse · Piso 22, Palermo";

const PROCESSING_STATES = [
  "Analizando comportamiento ocular…",
  "Calculando hotspot de conversión…",
  "Mapeando cotas bidireccionales…",
];

const PROCESSING_STEP_MS = 1900;
const RING_FILL_MS = 2800;
const CELL_STAGGER_MS = 900;

interface Signal {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}

const SIGNALS: Signal[] = [
  {
    value: 52,
    label: "Eventos detectados",
    icon: <path d="M3 12h4l3 8 4-16 3 8h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
  {
    value: 4,
    label: "Visitas recurrentes",
    icon: <path d="M21 12a9 9 0 1 1-3-6.7M21 4v4h-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
  {
    value: 3,
    label: "Mediciones realizadas",
    icon: <path d="M14.5 3.5 3.5 14.5l6 6L20.5 9.5l-6-6ZM7 11l1.5 1.5M10 8l1.5 1.5M13 5l1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
  {
    value: 6,
    suffix: "m",
    label: "Tiempo de exploración",
    icon: <path d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
];

/** Contador rAF con arranque controlado por la coreografía (no por viewport). */
function StagedCounter({
  value,
  start,
  duration = 2600,
  suffix = "",
  className,
}: {
  value: number;
  start: boolean;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      // easeOutQuint — clava el número final con suavidad
      setDisplay(Math.round(value * (1 - Math.pow(1 - p, 5))));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [start, value, duration]);

  return (
    <span className={className}>
      {display}
      {suffix}
    </span>
  );
}

/** Tipeo de las coordenadas del lead, con caret parpadeante. */
function TypedHeader({ start }: { start: boolean }) {
  const [chars, setChars] = useState(0);
  const done = chars >= HEADER_TEXT.length;

  useEffect(() => {
    if (!start || done) return;
    const t = setTimeout(() => setChars((c) => c + 1), 46);
    return () => clearTimeout(t);
  }, [start, chars, done]);

  return (
    <span className="truncate font-mono text-[11px] uppercase tracking-wide text-[color:var(--text-muted)]">
      {HEADER_TEXT.slice(0, chars)}
      {!done && start && <span className="type-caret text-gold">▌</span>}
    </span>
  );
}

type Stage = "idle" | "typing" | "processing" | "scoring" | "cells" | "locked";

export function HeroIntelCard() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "-10%" });

  const [stage, setStage] = useState<Stage>("idle");
  const [procIdx, setProcIdx] = useState(0);
  const [cellsOn, setCellsOn] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));

    setStage("typing");

    // Procesamiento arranca apenas termina el tipeo (~2.1s)
    const procStart = HEADER_TEXT.length * 46 + 300;
    at(() => setStage("processing"), procStart);
    PROCESSING_STATES.forEach((_, i) =>
      at(() => setProcIdx(i), procStart + i * PROCESSING_STEP_MS),
    );

    // Score: anillo + conteo sincronizado
    const scoreStart = procStart + PROCESSING_STATES.length * PROCESSING_STEP_MS;
    at(() => setStage("scoring"), scoreStart);

    // Celdas secuenciales, apenas el anillo termina de clavar el 94
    const cellsStart = scoreStart + RING_FILL_MS - 400;
    at(() => setStage("cells"), cellsStart);
    SIGNALS.forEach((_, i) =>
      at(() => setCellsOn(i + 1), cellsStart + i * CELL_STAGGER_MS),
    );

    // Lock final
    at(() => setStage("locked"), cellsStart + SIGNALS.length * CELL_STAGGER_MS + 500);

    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const scoring = stage === "scoring" || stage === "cells" || stage === "locked";
  const locked = stage === "locked";

  return (
    <div ref={rootRef} className="glass-strong relative overflow-hidden rounded-4xl">
      {/* top gold hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-white/8 px-5 py-3.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping-radar rounded-full bg-gold opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          <TypedHeader start={stage !== "idle"} />
        </div>
        <AnimatePresence>
          {locked && (
            <motion.span
              initial={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: EASE_LUX }}
              className="hidden shrink-0 items-center gap-1.5 rounded-full border border-gold/30 bg-gold/[0.08] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gold sm:inline-flex"
            >
              Alta intención
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Línea de estado del motor — micro-estados de procesamiento */}
      <div className="flex h-8 items-center border-b border-white/[0.06] px-5 sm:px-6">
        <AnimatePresence mode="wait">
          {stage === "processing" && (
            <motion.span
              key={procIdx}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.7, ease: EASE_LUX }}
              className="proc-blink font-mono text-[10px] tracking-wide text-gold/80"
            >
              ▸ {PROCESSING_STATES[procIdx]}
            </motion.span>
          )}
          {scoring && !locked && (
            <motion.span
              key="consolidating"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_LUX }}
              className="proc-blink font-mono text-[10px] tracking-wide text-gold/80"
            >
              ▸ Consolidando VISIUM SCORE™…
            </motion.span>
          )}
          {locked && (
            <motion.span
              key="locked"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_LUX }}
              className="font-mono text-[10px] tracking-wide text-[#2ECC71]"
            >
              ✓ Análisis completo · Score consolidado en tiempo real
            </motion.span>
          )}
          {(stage === "idle" || stage === "typing") && (
            <motion.span
              key="standby"
              exit={{ opacity: 0 }}
              className="font-mono text-[10px] tracking-wide text-[color:var(--text-faint)]"
            >
              ▸ Sensor espacial en escucha…
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 gap-px sm:grid-cols-[auto_1fr]">
        {/* SCORE */}
        <div className="flex items-center gap-5 px-5 py-6 sm:px-7">
          <div className="relative flex h-[88px] w-[88px] shrink-0 items-center justify-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
              <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#D4B36A"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 44}
                initial={{ strokeDashoffset: 2 * Math.PI * 44 }}
                animate={
                  scoring
                    ? { strokeDashoffset: 2 * Math.PI * 44 * (1 - 0.94) }
                    : {}
                }
                transition={{ duration: RING_FILL_MS / 1000, ease: EASE_LUX }}
              />
            </svg>
            <div className="flex flex-col items-center font-mono leading-none">
              <StagedCounter
                value={94}
                start={scoring}
                duration={RING_FILL_MS}
                className="text-2xl font-semibold text-white"
              />
              <span className="mt-0.5 text-[9px] text-[color:var(--text-faint)]">/100</span>
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-ultrawide text-gold">
              VISIUM SCORE™
            </p>
            <p className="mt-1.5 max-w-[12rem] text-sm leading-snug text-[color:var(--text-primary)]">
              Lead con alta intención de compra
            </p>
          </div>
        </div>

        {/* SIGNALS — activación secuencial */}
        <div className="grid grid-cols-2 gap-px bg-white/[0.04]">
          {SIGNALS.map((s, i) => {
            const on = cellsOn > i;
            return (
              <motion.div
                key={s.label}
                animate={{ opacity: on ? 1 : 0.22 }}
                transition={{ duration: 1.4, ease: EASE_LUX }}
                className="flex flex-col gap-1.5 bg-[#0b0b10] px-5 py-5"
              >
                <motion.span
                  animate={on ? { scale: [0.85, 1.08, 1] } : {}}
                  transition={{ duration: 1.1, ease: EASE_LUX }}
                  className="text-gold/80"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">{s.icon}</svg>
                </motion.span>
                <span className="font-mono text-2xl font-semibold tracking-tightest text-white">
                  <StagedCounter value={s.value} start={on} duration={2000} suffix={s.suffix ?? ""} />
                </span>
                <span className="text-[11px] leading-tight text-[color:var(--text-faint)]">
                  {s.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
