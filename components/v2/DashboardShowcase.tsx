import { LEADS, TIER_META, type LeadTier } from "@/data/content";
import { SolarPanel } from "@/components/v2/SolarPanel";

/* ============================================================
   El entregable — la ventana de trabajo real que recibe el
   desarrollador: Centro de Leads + métricas + asoleamiento.
   Server-rendered al 100%; el único JS es el slider solar.
   ============================================================ */

const ORDER: LeadTier[] = ["hot", "warm", "mild", "cold"];
const COUNTS: Record<LeadTier, number> = { hot: 12, warm: 28, mild: 41, cold: 63 };

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white">
      {initials}
    </span>
  );
}

export function DashboardShowcase() {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#333333] bg-[#0a0a0e]">
      {/* Barra de ventana */}
      <div className="flex items-center justify-between border-b border-[#333333] px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </span>
          <span className="ml-2 font-mono text-xs text-[#999999]/60">
            VISIUM · Centro de Leads
          </span>
        </div>
        <span className="hidden items-center gap-2 rounded-full border border-[#2ECC71]/30 bg-[#2ECC71]/[0.07] px-3 py-1 text-[11px] text-[#2ECC71] sm:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2ECC71]" />
          En vivo
        </span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_320px]">
        {/* Tabla de leads */}
        <div className="p-4 sm:p-6">
          <div className="mb-5 flex flex-wrap gap-2">
            {ORDER.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs"
              >
                <span className="h-2 w-2 rounded-full" style={{ background: TIER_META[t].color }} />
                <span className="font-medium text-white">{TIER_META[t].label}</span>
                <span className="font-mono text-[#999999]/60">{COUNTS[t]}</span>
              </span>
            ))}
          </div>

          <div className="hidden grid-cols-[1.6fr_1fr_1.4fr_auto] gap-4 px-3 pb-3 text-[11px] uppercase tracking-wide text-[#999999]/60 sm:grid">
            <span>Lead</span>
            <span>Propiedad</span>
            <span>Señal principal</span>
            <span className="text-right">Score</span>
          </div>

          <div className="flex flex-col gap-2">
            {LEADS.map((lead) => (
              <div
                key={lead.name}
                className="grid grid-cols-1 items-center gap-3 rounded-[10px] border border-white/[0.06] bg-white/[0.02] px-3 py-3 transition-colors duration-300 hover:border-[#D4AF37]/30 hover:bg-white/[0.04] sm:grid-cols-[1.6fr_1fr_1.4fr_auto] sm:gap-4"
              >
                <div className="flex items-center gap-3">
                  <Initials name={lead.name} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{lead.name}</p>
                    <span
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium"
                      style={{ color: TIER_META[lead.tier].color }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: TIER_META[lead.tier].color }} />
                      {TIER_META[lead.tier].label}
                    </span>
                  </div>
                </div>
                <p className="truncate text-sm text-[#999999]">{lead.property}</p>
                <p className="truncate text-sm text-[#999999]">{lead.signal}</p>
                <div className="flex items-center gap-3 sm:justify-end">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/[0.08] sm:w-20">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${lead.score}%`, background: TIER_META[lead.tier].color }}
                    />
                  </div>
                  <span className="w-9 text-right font-mono text-sm font-semibold text-white">
                    {lead.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna lateral: métricas de la semana + simulación solar */}
        <div className="flex flex-col border-t border-[#333333] lg:border-l lg:border-t-0">
          <div className="p-5">
            <p className="mb-4 text-[11px] uppercase tracking-[0.08em] text-[#999999]/60">
              Esta semana
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Tasa de cierre", value: "25%", color: "#2ECC71", pct: 67 },
                { label: "Visitas evitadas", value: "40%", color: "#D4AF37", pct: 82 },
                { label: "Leads HOT detectados", value: "12", color: "#FF4D4D", pct: 54 },
              ].map((m) => (
                <div key={m.label} className="rounded-[10px] border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="font-mono text-2xl font-semibold text-white">{m.value}</p>
                  <p className="mt-1 text-xs text-[#999999]">{m.label}</p>
                  <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.08]">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${m.pct}%`, background: m.color, boxShadow: `0 0 8px ${m.color}` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#333333]">
            <SolarPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
