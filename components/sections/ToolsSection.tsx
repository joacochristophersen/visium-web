"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";
import { TWIN_TOOLS, type TwinTool } from "@/data/intelligence";
import { VIEWPORT } from "@/animations/variants";
import { cn } from "@/lib/utils";

/* ---- Mock visuals per tool (no screenshots needed) ---- */

function BookingMock() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full">
      <rect width="320" height="220" fill="#0b0b10" />
      {/* Calendar grid */}
      <rect x="30" y="30" width="160" height="160" rx="6" fill="#11151b" stroke="#D4B36A" strokeOpacity="0.5" strokeWidth="1" />
      {/* Header */}
      <rect x="30" y="30" width="160" height="28" rx="6" fill="#1a1a26" />
      <text x="80" y="48" fill="#E6C98A" fontSize="10" fontFamily="monospace">Julio 2026</text>
      {/* Day labels */}
      {["L","M","M","J","V","S","D"].map((d, i) => (
        <text key={i} x={38 + i * 21} y={74} fill="#5a5a70" fontSize="8" fontFamily="monospace">{d}</text>
      ))}
      {/* Day cells */}
      {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((n, i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        const isHighlight = n === 8;
        return (
          <g key={n}>
            {isHighlight && <rect x={35 + col * 21} y={80 + row * 22} width="16" height="16" rx="4" fill="#D4B36A" />}
            <text x={40 + col * 21} y={92 + row * 22} fill={isHighlight ? "#0b0b10" : "#888899"} fontSize="9" fontFamily="monospace">{n}</text>
          </g>
        );
      })}
      {/* Lead card on right */}
      <rect x="204" y="30" width="90" height="110" rx="6" fill="#11151b" stroke="#D4B36A" strokeOpacity="0.4" />
      <rect x="212" y="40" width="50" height="8" rx="2" fill="#1d1d2e" />
      <text x="212" y="54" fill="#E6C98A" fontSize="8" fontFamily="monospace">Lead calificado</text>
      <rect x="212" y="60" width="72" height="1" fill="#2a2a38" />
      <text x="212" y="75" fill="#7a7a90" fontSize="7" fontFamily="monospace">Score: 91</text>
      <text x="212" y="88" fill="#7a7a90" fontSize="7" fontFamily="monospace">Unidad: 2204</text>
      <text x="212" y="101" fill="#7a7a90" fontSize="7" fontFamily="monospace">Hora: 10:30 AM</text>
      <rect x="212" y="112" width="72" height="18" rx="4" fill="#D4B36A" />
      <text x="224" y="124" fill="#0b0b10" fontSize="8" fontFamily="monospace" fontWeight="bold">Confirmar</text>
      {/* Supabase / live badge */}
      <rect x="204" y="152" width="90" height="30" rx="4" fill="#11151b" stroke="#2ECC71" strokeOpacity="0.35" />
      <circle cx="216" cy="167" r="3" fill="#2ECC71" />
      <text x="223" y="171" fill="#4a9a6a" fontSize="7" fontFamily="monospace">Notif. en tiempo real</text>
    </svg>
  );
}

function MeasureMock() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full">
      <rect width="320" height="220" fill="#0b0b10" />
      <rect x="70" y="50" width="180" height="120" fill="#11151b" stroke="#D4B36A" strokeOpacity="0.7" strokeWidth="1.5" />
      <line x1="70" y1="36" x2="250" y2="36" stroke="#E6C98A" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="70" y1="32" x2="70" y2="40" stroke="#E6C98A" />
      <line x1="250" y1="32" x2="250" y2="40" stroke="#E6C98A" />
      <text x="148" y="28" fill="#E6C98A" fontSize="11" fontFamily="monospace">4.20 m</text>
      <line x1="56" y1="50" x2="56" y2="170" stroke="#E6C98A" strokeWidth="1" strokeDasharray="3 3" />
      <text x="20" y="114" fill="#E6C98A" fontSize="11" fontFamily="monospace">3.10 m</text>
      <circle cx="70" cy="50" r="3.5" fill="#E6C98A" />
      <circle cx="250" cy="170" r="3.5" fill="#E6C98A" />
      <line x1="70" y1="50" x2="250" y2="170" stroke="#D4B36A" strokeOpacity="0.4" strokeDasharray="2 4" />
    </svg>
  );
}

function FurnitureMock() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full">
      <rect width="320" height="220" fill="#0b0b10" />
      <rect x="40" y="30" width="240" height="160" fill="#11151b" stroke="#D4B36A" strokeOpacity="0.6" />
      {/* king bed */}
      <rect x="60" y="55" width="95" height="70" rx="4" fill="#1a1a22" stroke="#E6C98A" strokeOpacity="0.7" />
      <text x="72" y="95" fill="#E6C98A" fontSize="10" fontFamily="monospace">King</text>
      {/* sofa */}
      <rect x="185" y="60" width="75" height="38" rx="6" fill="#1a1a22" stroke="#D4B36A" strokeOpacity="0.5" />
      <text x="198" y="83" fill="#9a895c" fontSize="9" fontFamily="monospace">Sofá</text>
      {/* table */}
      <rect x="185" y="120" width="70" height="46" rx="4" fill="#1a1a22" stroke="#D4B36A" strokeOpacity="0.5" />
      <text x="196" y="147" fill="#9a895c" fontSize="9" fontFamily="monospace">Mesa</text>
      <rect x="70" y="150" width="40" height="24" rx="3" fill="#1a1a22" stroke="#D4B36A" strokeOpacity="0.4" />
      <text x="60" y="166" fill="#9a895c" fontSize="8" fontFamily="monospace">Escr.</text>
    </svg>
  );
}

function NavMock() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full">
      <rect width="320" height="220" fill="#0b0b10" />
      <g stroke="#D4B36A" strokeOpacity="0.6" fill="#11151b">
        <rect x="40" y="40" width="110" height="80" />
        <rect x="150" y="40" width="90" height="80" />
        <rect x="40" y="120" width="90" height="60" />
        <rect x="130" y="120" width="110" height="60" />
      </g>
      <g fill="#9a895c" fontSize="9" fontFamily="monospace">
        <text x="58" y="84">Living</text>
        <text x="168" y="84">Cocina</text>
        <text x="56" y="154">Dorm.</text>
        <text x="150" y="154">Terraza</text>
      </g>
      <path d="M95 80 L185 80 L185 150" fill="none" stroke="#E6C98A" strokeWidth="1.5" strokeDasharray="3 4" />
      <circle cx="95" cy="80" r="5" fill="#E6C98A" />
      <circle cx="95" cy="80" r="10" fill="#E6C98A" opacity="0.2" />
    </svg>
  );
}

const MOCKS: Record<TwinTool["icon"], React.ReactNode> = {
  booking: <BookingMock />,
  measure: <MeasureMock />,
  furniture: <FurnitureMock />,
  navigate: <NavMock />,
};

export function ToolsSection() {
  return (
    <section id="herramientas" className="relative py-section">
      <div className="container-tight">
        <div className="mb-16 flex flex-col items-start gap-6">
          <Badge dot={false}>Herramientas dentro del gemelo</Badge>
          <SplitReveal
            text="Herramientas que convierten interés en señales."
            stagger={0.04}
            className="fluid-h2 max-w-4xl text-balance text-white"
          />
          <Reveal delay={1} className="max-w-2xl">
            <p className="fluid-lead text-[color:var(--text-muted)]">
              Cada herramienta del visor VISIUM no solo ayuda al comprador: convierte
              su comportamiento en inteligencia de conversión para tu equipo.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-6">
          {TWIN_TOOLS.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="panel-lumen grid items-stretch overflow-hidden rounded-5xl lg:grid-cols-2"
            >
              {/* Mock */}
              <div
                className={cn(
                  "relative min-h-[240px] border-b border-white/8 bg-[#08080c] lg:min-h-[300px] lg:border-b-0",
                  i % 2 === 1 ? "lg:order-2 lg:border-l" : "lg:border-r"
                )}
              >
                {MOCKS[tool.icon]}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/40 to-transparent" />
              </div>

              {/* Copy */}
              <div className="flex flex-col justify-center gap-5 p-8 sm:p-10">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-ultrawide text-gold">
                    Herramienta 0{i + 1} · {tool.tagline}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-medium tracking-tightest text-white sm:text-3xl">
                    {tool.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tool.features.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-[color:var(--text-muted)]"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <p className="border-l-2 border-gold/50 pl-4 text-base font-light italic leading-snug text-[color:var(--text-primary)]">
                  &ldquo;{tool.message}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
