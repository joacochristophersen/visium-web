"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Reveal } from "@/components/ui/Reveal";
import { TWIN_TOOLS, type TwinTool } from "@/data/intelligence";
import { VIEWPORT } from "@/animations/variants";
import { cn } from "@/lib/utils";

/* ---- Mock visuals per tool (no screenshots needed) ---- */

function HelioMock() {
  return (
    <svg viewBox="0 0 320 220" className="h-full w-full">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4B36A" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#050505" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="320" height="220" fill="#0b0b10" />
      <rect width="320" height="160" fill="url(#sky)" />
      <path d="M30 160 A130 130 0 0 1 290 160" fill="none" stroke="#E6C98A" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="3 4" />
      <circle cx="205" cy="74" r="11" fill="#E6C98A" />
      <circle cx="205" cy="74" r="20" fill="#E6C98A" opacity="0.18" />
      <line x1="30" y1="160" x2="290" y2="160" stroke="#D4B36A" strokeOpacity="0.5" />
      {/* building silhouette */}
      <rect x="120" y="110" width="80" height="50" fill="#11151b" stroke="#D4B36A" strokeOpacity="0.6" />
      <g fill="#6b5a32" fontSize="9" fontFamily="monospace">
        <text x="30" y="178">06:00</text>
        <text x="150" y="178">13:00</text>
        <text x="258" y="178">19:00</text>
      </g>
      <rect x="30" y="194" width="260" height="3" rx="1.5" fill="#1d1d24" />
      <rect x="30" y="194" width="150" height="3" rx="1.5" fill="#D4B36A" />
      <circle cx="180" cy="195.5" r="5" fill="#E6C98A" />
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
  sun: <HelioMock />,
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
              className="panel grid items-stretch overflow-hidden rounded-5xl lg:grid-cols-2"
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
                  “{tool.message}”
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
