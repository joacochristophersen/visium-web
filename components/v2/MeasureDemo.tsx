"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

/* ============================================================
   Port de ViewerDemoSection sin Framer Motion:
   - Coreografía: timers vanilla (igual que el original)
   - Entradas: animación fade-up del theme de Tailwind
   - Ping del radar: SMIL (cero JS)
   - Contador de score: requestAnimationFrame (ya era vanilla)
   - Glide del cursor: transition CSS sobre transform
   ============================================================ */

const EVENT_TEMPO_MS = 2600;

const PROC_STATES = [
  "Analizando comportamiento ocular…",
  "Calculando hotspot de conversión…",
  "Mapeando cotas bidireccionales…",
  "Ponderando dwell-time por zona…",
  "Correlacionando retorno del visitante…",
  "Proyectando probabilidad de cierre…",
];

interface ClickEvent {
  id: string;
  label: string;
  points: number;
  x: number;
  y: number;
  tooltip: string;
}

const CLICK_EVENTS: ClickEvent[] = [
  { id: "measure-dorm",     label: "Midió dormitorio principal", points: 18, x: 28, y: 24, tooltip: "4.80 × 3.20 m ✓" },
  { id: "measure-closet",   label: "Validó walking closet",      points: 12, x: 22, y: 54, tooltip: "Espacio: 2.40 m ✓" },
  { id: "furniture-living", label: "Colocó muebles en living",   points: 14, x: 67, y: 42, tooltip: "Sofá 3M encaja ✓" },
  { id: "cochera",          label: "Validó cochera doble",       points: 16, x: 22, y: 78, tooltip: "5.0 × 2.5 m ✓" },
  { id: "bookmark",         label: "Guardó en favoritos",        points: 15, x: 67, y: 72, tooltip: "⭐ Guardado" },
  { id: "financing",        label: "Consultó financiamiento",    points: 24, x: 50, y: 93, tooltip: "Solicitud enviada ✓" },
];

const LEADS_DASH = [
  { prob: 91, badge: "Llamar urgente",              color: "#FF4D4D", id: "vis_a1b2c3d4", note: "Validó cochera · Midió dorm. · Pre-aprobado", fin: true,  time: "Hace 12 min" },
  { prob: 83, badge: "Financiamiento Pre-aprobado", color: "#FF4D4D", id: "vis_e5f6g7h8", note: "Regresó 3 veces · Compartió la propiedad",     fin: true,  time: "Hace 48 min" },
  { prob: 74, badge: "En seguimiento",              color: "#FF8A00", id: "vis_i9j0k1l2", note: "Midió cocina y living · Consultó amenities",   fin: false, time: "Hace 1h 30m" },
  { prob: 61, badge: "En seguimiento",              color: "#FF8A00", id: "vis_m3n4o5p6", note: "Primera visita completa",                      fin: false, time: "Hace 3h" },
  { prob: 44, badge: "Nutrir",                      color: "#FACC15", id: "vis_q7r8s9t0", note: "Vista breve · Sin interacciones",              fin: false, time: "Hace 5h" },
  { prob: 19, badge: "Baja prioridad",              color: "#3B82F6", id: "vis_u1v2w3x4", note: "Una visita rápida",                            fin: false, time: "Hace 9h" },
] as const;

/* Contador con easing cúbico — puro requestAnimationFrame */
function AnimatedScore({ target }: { target: number }) {
  const [val, setVal] = useState(0);
  const cur = useRef(0);
  const raf = useRef(0);

  useEffect(() => {
    const from = cur.current;
    if (from === target) return;
    const dur = Math.max(Math.abs(target - from) * 48, 700);
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const v = Math.round(from + (target - from) * (1 - Math.pow(1 - p, 3)));
      cur.current = v;
      setVal(v);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target]);

  return <>{val}</>;
}

/* ─── Plano 2D ─────────────────────────────────────────────── */

function FloorPlan({
  cursorPos,
  activeTooltip,
  completedIds,
  dimmed,
}: {
  cursorPos: { x: number; y: number } | null;
  activeTooltip: string | null;
  completedIds: Set<string>;
  dimmed: boolean;
}) {
  const cx = cursorPos ? cursorPos.x * 4 : 0;
  const cy = cursorPos ? cursorPos.y * 3 : 0;
  const tipX = Math.min(cx + 12, 270);
  const tipY = Math.max(cy - 26, 4);
  const tipW = activeTooltip ? activeTooltip.length * 6 + 18 : 80;

  return (
    <svg
      viewBox="0 0 400 300"
      className={cn("h-full w-full transition-opacity duration-500", dimmed && "opacity-40")}
    >
      <rect width="400" height="300" fill="#08080f" />

      <rect x="21" y="21" width="117" height="97"  fill="#0f0f1c" />
      <rect x="21" y="120" width="117" height="47" fill="#0c0c18" />
      <rect x="21" y="169" width="117" height="38" fill="#0c0c18" />
      <rect x="21" y="209" width="117" height="69" fill="#0f0f1c" />
      <rect x="140" y="21" width="238" height="187" fill="#0d0d1a" />
      <rect x="140" y="210" width="238" height="68" fill="#0f0f1c" />

      <rect x="20" y="20" width="360" height="260" fill="none" stroke="#2e2e42" strokeWidth="2.5" />
      <line x1="139" y1="20"  x2="139" y2="209" stroke="#2e2e42" strokeWidth="2" />
      <line x1="20"  y1="119" x2="139" y2="119" stroke="#2e2e42" strokeWidth="2" />
      <line x1="20"  y1="209" x2="380" y2="209" stroke="#2e2e42" strokeWidth="2" />
      <line x1="20"  y1="168" x2="139" y2="168" stroke="#2e2e42" strokeWidth="1.5" />

      <text x="80"  y="66"  textAnchor="middle" fill="#3a3a56" fontSize="8.5" fontFamily="ui-sans-serif,sans-serif" fontWeight="600">DORMITORIO PRINCIPAL</text>
      <text x="80"  y="79"  textAnchor="middle" fill="#2d2d45" fontSize="7"   fontFamily="ui-monospace,monospace">14 m²</text>
      <text x="80"  y="147" textAnchor="middle" fill="#3a3a56" fontSize="8"   fontFamily="ui-sans-serif,sans-serif" fontWeight="600">W. CLOSET</text>
      <text x="80"  y="158" textAnchor="middle" fill="#2d2d45" fontSize="7"   fontFamily="ui-monospace,monospace">6 m²</text>
      <text x="80"  y="191" textAnchor="middle" fill="#3a3a56" fontSize="8"   fontFamily="ui-sans-serif,sans-serif" fontWeight="600">BAÑO</text>
      <text x="80"  y="202" textAnchor="middle" fill="#2d2d45" fontSize="7"   fontFamily="ui-monospace,monospace">4 m²</text>
      <text x="80"  y="246" textAnchor="middle" fill="#3a3a56" fontSize="8"   fontFamily="ui-sans-serif,sans-serif" fontWeight="600">COCHERA</text>
      <text x="80"  y="257" textAnchor="middle" fill="#2d2d45" fontSize="7"   fontFamily="ui-monospace,monospace">15 m²</text>
      <text x="259" y="110" textAnchor="middle" fill="#3a3a56" fontSize="9"   fontFamily="ui-sans-serif,sans-serif" fontWeight="600">LIVING / COMEDOR</text>
      <text x="259" y="123" textAnchor="middle" fill="#2d2d45" fontSize="7"   fontFamily="ui-monospace,monospace">28 m²</text>
      <text x="259" y="247" textAnchor="middle" fill="#3a3a56" fontSize="8.5" fontFamily="ui-sans-serif,sans-serif" fontWeight="600">COCINA PREMIUM</text>
      <text x="259" y="259" textAnchor="middle" fill="#2d2d45" fontSize="7"   fontFamily="ui-monospace,monospace">12 m²</text>

      {/* Cotas condicionales — aparecen cuando el comprador mide */}
      {completedIds.has("measure-dorm") && (
        <g>
          <line x1="22" y1="13" x2="138" y2="13" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="22" y1="10" x2="22" y2="16" stroke="#D4AF37" strokeWidth="0.8" />
          <line x1="138" y1="10" x2="138" y2="16" stroke="#D4AF37" strokeWidth="0.8" />
          <text x="80" y="10" textAnchor="middle" fill="#D4AF37" fontSize="6.5" fontFamily="ui-monospace,monospace">4.80 m</text>
        </g>
      )}

      {completedIds.has("cochera") && (
        <g>
          <line x1="13" y1="211" x2="13" y2="277" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="10" y1="211" x2="16" y2="211" stroke="#D4AF37" strokeWidth="0.8" />
          <line x1="10" y1="277" x2="16" y2="277" stroke="#D4AF37" strokeWidth="0.8" />
          <text x="8" y="250" textAnchor="middle" fill="#D4AF37" fontSize="6.5" fontFamily="ui-monospace,monospace" transform="rotate(-90,8,250)">5.00 m</text>
        </g>
      )}

      {completedIds.has("furniture-living") && (
        <g>
          <rect x="155" y="135" width="82" height="28" rx="4" fill="#14141f" stroke="#D4AF37" strokeOpacity="0.55" strokeWidth="0.8" />
          <text x="196" y="153" textAnchor="middle" fill="#8a795c" fontSize="6.5" fontFamily="ui-monospace,monospace">Sofá 3M</text>
          <ellipse cx="285" cy="155" rx="28" ry="18" fill="#14141f" stroke="#D4AF37" strokeOpacity="0.45" strokeWidth="0.8" />
          <text x="285" y="158" textAnchor="middle" fill="#8a795c" fontSize="6" fontFamily="ui-monospace,monospace">Mesa</text>
        </g>
      )}

      {completedIds.has("bookmark") && (
        <g>
          <rect x="118" y="283" width="164" height="14" rx="3" fill="#D4AF37" fillOpacity="0.1" stroke="#D4AF37" strokeOpacity="0.4" strokeWidth="0.7" />
          <text x="200" y="293" textAnchor="middle" fill="#D4AF37" fontSize="7.5" fontFamily="ui-sans-serif,sans-serif">Consultar Financiamiento →</text>
        </g>
      )}

      {/* Cursor animado — glide fluido entre puntos de interés */}
      {cursorPos && (
        <g
          style={{
            transform: `translate(${cx}px, ${cy}px)`,
            transition: `transform 1500ms cubic-bezier(0.25, 1, 0.5, 1)`,
          }}
        >
          <circle r="10" fill="rgba(212,175,55,0.12)" stroke="#D4AF37" strokeWidth="1.2" />
          <circle r="2.8" fill="#D4AF37" />
          {/* Ping del radar — SMIL declarativo, cero JS */}
          <circle r="12" fill="none" stroke="#D4AF37" strokeWidth="0.9" opacity="0.45">
            <animate attributeName="r" values="12;26" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.45;0" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>
      )}

      {activeTooltip && cursorPos && (
        <g>
          <rect x={tipX} y={tipY} width={tipW} height="17" rx="3.5" fill="#0f2010" stroke="#2ECC71" strokeOpacity="0.65" strokeWidth="0.8" />
          <text x={tipX + 9} y={tipY + 11} fill="#2ECC71" fontSize="7.5" fontFamily="ui-monospace,monospace">{activeTooltip}</text>
        </g>
      )}

      <g transform="translate(372,32)">
        <line x1="0" y1="8" x2="0" y2="-8" stroke="#28283a" strokeWidth="1" />
        <polygon points="0,-10 -2.5,-3 2.5,-3" fill="#40405a" />
        <text x="0" y="17" textAnchor="middle" fill="#28283a" fontSize="6" fontFamily="ui-monospace,monospace">N</text>
      </g>

      <line x1="22" y1="294" x2="72" y2="294" stroke="#28283a" strokeWidth="0.8" />
      <line x1="22" y1="291" x2="22" y2="297" stroke="#28283a" strokeWidth="0.8" />
      <line x1="72" y1="291" x2="72" y2="297" stroke="#28283a" strokeWidth="0.8" />
      <text x="47" y="290" textAnchor="middle" fill="#28283a" fontSize="6" fontFamily="ui-monospace,monospace">5 m</text>
    </svg>
  );
}

/* ─── Panel de métricas en vivo ────────────────────────────── */

function MetricsPanel({
  score,
  alerts,
  processing,
}: {
  score: number;
  alerts: { id: string; label: string; points: number }[];
  processing: string | null;
}) {
  const SIZE = 92, STROKE = 7, R = (SIZE - STROKE) / 2, C = 2 * Math.PI * R;
  const ringColor = score >= 80 ? "#FF4D4D" : score >= 60 ? "#FF8A00" : "#D4AF37";
  const statusLabel =
    score >= 80 ? "Cierre inminente"
    : score >= 60 ? "Alta probabilidad"
    : score >= 30 ? "En evaluación"
    : "Analizando…";

  return (
    <div className="flex flex-col gap-4 border-t border-[#333333] p-5 lg:border-l lg:border-t-0">
      <p className="text-[10px] uppercase tracking-[0.08em] text-[#D4AF37]">
        VISIUM SCORE™ · Tiempo real
      </p>

      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="-rotate-90">
            <circle cx={SIZE/2} cy={SIZE/2} r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={STROKE} />
            <circle
              cx={SIZE/2} cy={SIZE/2} r={R}
              fill="none" stroke={ringColor} strokeWidth={STROKE} strokeLinecap="round"
              strokeDasharray={C}
              style={{
                strokeDashoffset: C - (score / 100) * C,
                transition: "stroke-dashoffset 2s cubic-bezier(0.25,1,0.5,1), stroke 0.6s ease",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[22px] font-semibold leading-none text-white">
              <AnimatedScore target={score} />
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[13px] font-semibold text-white">A. García</p>
          <p className="text-[10px] text-[#999999]">Unit 2204 · P. Madero</p>
          <span
            className="mt-0.5 inline-flex items-center gap-1.5 self-start rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px]"
            style={{ color: ringColor }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: ringColor }} />
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Micro-estados del motor mientras procesa */}
      <div className="flex h-6 items-center overflow-hidden">
        {processing ? (
          <span key={processing} className="proc-blink animate-fade-up font-mono text-[10px] tracking-wide text-[#D4AF37]/80">
            ▸ {processing}
          </span>
        ) : (
          <span className="font-mono text-[10px] tracking-wide text-[#999999]/60">
            ▸ Motor en escucha…
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-[10px] uppercase tracking-[0.08em] text-[#999999]/60">
          Señales detectadas
        </p>
        <div className="flex min-h-[168px] flex-col gap-1.5 overflow-hidden">
          {alerts.map((a) => (
            <div
              key={a.id}
              className="animate-fade-up flex items-center justify-between gap-2 rounded-[10px] border border-white/[0.06] bg-white/[0.025] px-3 py-2"
            >
              <p className="text-[11px] text-[#999999]">{a.label}</p>
              <span className="shrink-0 font-mono text-[10px] font-semibold text-[#2ECC71]">+{a.points}</span>
            </div>
          ))}
        </div>
      </div>

      {score >= 70 && (
        <div className="animate-fade-up mt-auto rounded-[10px] border border-[#FF4D4D]/30 bg-[#FF4D4D]/[0.07] p-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF4D4D] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF4D4D]" />
            </span>
            <p className="text-[11px] font-semibold text-[#FF4D4D]">Llamar ahora</p>
          </div>
          <p className="mt-0.5 text-[10px] text-[#999999]">Score superó umbral de cierre</p>
        </div>
      )}
    </div>
  );
}

/* ─── Central de leads (fase 3) ────────────────────────────── */

function LeadsDashboard({ step }: { step: number }) {
  return (
    <div className="flex flex-col">
      {step >= 1 && (
        <div className="animate-fade-up flex flex-wrap items-center justify-between gap-3 border-b border-[#333333] px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-semibold text-white">Central de Leads</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2ECC71]/30 bg-[#2ECC71]/[0.07] px-2.5 py-0.5 text-[10px] text-[#2ECC71]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2ECC71] shadow-[0_0_6px_2px_rgba(46,204,113,0.5)]" />
              Supabase · Live
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#999999]/60">6 leads activos</span>
            <button className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/[0.07] px-3 py-1.5 text-[10px] font-medium text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/10">
              Exportar CRM
            </button>
          </div>
        </div>
      )}

      {step >= 2 && (
        <div className="animate-fade-up grid grid-cols-3 divide-x divide-white/[0.06] border-b border-[#333333]">
          {[
            { label: "Conversión 30d", value: "31%", color: "text-[#2ECC71]" },
            { label: "Score promedio", value: "62",  color: "text-[#D4AF37]" },
            { label: "Pre-aprobados",  value: "2",   color: "text-[#FF4D4D]" },
          ].map((s) => (
            <div key={s.label} className="px-5 py-3 text-center">
              <p className={cn("font-mono text-xl font-semibold", s.color)}>{s.value}</p>
              <p className="text-[10px] text-[#999999]/60">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {step >= 3 && (
        <div className="divide-y divide-white/[0.05]">
          {LEADS_DASH.map((lead, i) => {
            if (step < 3 + i) return null;
            return (
              <div
                key={lead.id}
                className="animate-fade-up flex flex-wrap items-center gap-x-3 gap-y-1.5 px-5 py-3 sm:flex-nowrap"
              >
                <span
                  className="min-w-[44px] rounded-lg px-2 py-0.5 text-center font-mono text-[10px] font-bold"
                  style={{ backgroundColor: `${lead.color}18`, color: lead.color, border: `1px solid ${lead.color}30` }}
                >
                  {lead.prob}%
                </span>
                <span
                  className="shrink-0 rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide"
                  style={{ backgroundColor: `${lead.color}18`, color: lead.color, border: `1px solid ${lead.color}30` }}
                >
                  {lead.badge}
                </span>
                <span className="font-mono text-[10px] text-[#999999]/60">{lead.id}</span>
                <span className="flex-1 text-[11px] text-[#999999]">{lead.note}</span>
                {lead.fin && (
                  <span className="shrink-0 rounded-full border border-[#2ECC71]/30 bg-[#2ECC71]/[0.08] px-2 py-0.5 text-[9px] font-medium text-[#2ECC71]">
                    Fin. Pre-aprobado
                  </span>
                )}
                <span className="hidden shrink-0 text-[10px] text-[#999999]/60 sm:inline">{lead.time}</span>
                <button
                  className="shrink-0 rounded-full px-3 py-1.5 text-[10px] font-semibold transition-colors"
                  style={{ backgroundColor: `${lead.color}15`, color: lead.color, border: `1px solid ${lead.color}30` }}
                >
                  Llamar
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Export principal ─────────────────────────────────────── */

export function MeasureDemo() {
  const [phase,       setPhase]       = useState(0);
  const [cursorPos,   setCursorPos]   = useState<{ x: number; y: number } | null>(null);
  const [activeEvent, setActiveEvent] = useState<ClickEvent | null>(null);
  const [doneIds,     setDoneIds]     = useState<Set<string>>(new Set());
  const [alerts,      setAlerts]      = useState<{ id: string; label: string; points: number }[]>([]);
  const [score,       setScore]       = useState(0);
  const [dashStep,    setDashStep]    = useState(0);
  const [processing,  setProcessing]  = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const s = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); };

  const reset = useCallback(() => {
    clearTimers();
    setPhase(0); setCursorPos(null); setActiveEvent(null);
    setDoneIds(new Set()); setAlerts([]); setScore(0); setDashStep(0);
    setProcessing(null);
  }, []);

  const startDemo = useCallback(() => {
    clearTimers();
    setCursorPos(null); setActiveEvent(null);
    setDoneIds(new Set()); setAlerts([]); setScore(0); setDashStep(0);
    setProcessing(null);
    setPhase(1);

    let cumScore = 0;

    CLICK_EVENTS.forEach((ev, i) => {
      const base = i * EVENT_TEMPO_MS;
      s(() => {
        setCursorPos({ x: ev.x, y: ev.y });
        setProcessing(PROC_STATES[i % PROC_STATES.length]);
      }, base + 400);
      s(() => setActiveEvent(ev), base + 1600);
      s(() => {
        cumScore += ev.points;
        setScore(Math.min(cumScore, 99));
        setDoneIds((p) => new Set([...p, ev.id]));
        setAlerts((p) => [{ id: ev.id, label: ev.label, points: ev.points }, ...p]);
        setProcessing(null);
      }, base + 2100);
      s(() => setActiveEvent(null), base + EVENT_TEMPO_MS - 100);
    });

    const phase3 = CLICK_EVENTS.length * EVENT_TEMPO_MS + 900;
    s(() => { setPhase(3); setCursorPos(null); setProcessing(null); }, phase3);
    s(() => setDashStep(1), phase3 + 700);
    s(() => setDashStep(2), phase3 + 1500);
    s(() => setDashStep(3), phase3 + 2300);
    LEADS_DASH.forEach((_, i) => s(() => setDashStep(4 + i), phase3 + 2300 + i * 450));
  }, []);

  useEffect(() => () => clearTimers(), []);

  const isIdle  = phase === 0;
  const isFloor = phase === 1;
  const isDash  = phase === 3;

  return (
    <div className="overflow-hidden rounded-[10px] border border-[#333333] bg-[#0a0a0e]">
      {/* Barra de ventana */}
      <div className="flex items-center justify-between border-b border-[#333333] px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </span>
          <span className="ml-2 font-mono text-[11px] text-[#999999]/60">
            {isDash
              ? "VISIUM · Central de Leads — Puerto Madero S.A."
              : "VISIUM · Penthouse Unit 2204 — Puerto Madero"}
          </span>
        </div>
        {isFloor && (
          <span className="hidden items-center gap-1.5 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/[0.04] px-3 py-1 text-[10px] text-[#D4AF37] sm:inline-flex">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#D4AF37]" />
            Sesión activa · grabando señales
          </span>
        )}
      </div>

      {/* Fase 0 — idle */}
      {isIdle && (
        <div className="relative min-h-[460px]">
          <div className="pointer-events-none absolute inset-0">
            <FloorPlan cursorPos={null} activeTooltip={null} completedIds={new Set()} dimmed />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0e]/40 via-transparent to-[#0a0a0e]/85" />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5">
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#999999]/60">
                Plano 2D · Penthouse Unit 2204
              </p>
              <p className="mt-1 text-lg font-semibold text-white">Puerto Madero · Torre Riverside</p>
              <p className="text-[12px] text-[#999999]">142 m² · 3 ambientes · Piso 22</p>
            </div>
            <button
              onClick={startDemo}
              className="group flex items-center gap-3 rounded-full border border-white/20 bg-black/60 px-7 py-4 backdrop-blur-md transition-all duration-300 hover:scale-[1.04] hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/[0.08] hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.5)] active:scale-[0.97]"
            >
              <span className="relative flex h-8 w-8 items-center justify-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#D4AF37]/20" />
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15">
                  <svg className="h-3.5 w-3.5 translate-x-0.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
              <span className="text-[13px] font-medium tracking-wide text-white transition-colors group-hover:text-[#F0CB65]">
                INICIAR DEMO
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Fase 1 — plano + métricas en vivo */}
      {isFloor && (
        <div className="animate-fade-up grid lg:grid-cols-[1fr_300px]">
          <div className="relative min-h-[380px] border-b border-[#333333] bg-black lg:border-b-0 lg:border-r">
            <FloorPlan
              cursorPos={cursorPos}
              activeTooltip={activeEvent?.tooltip ?? null}
              completedIds={doneIds}
              dimmed={false}
            />
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/55 px-3 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2ECC71] shadow-[0_0_4px_2px_rgba(46,204,113,0.45)]" />
              <span className="font-mono text-[10px] text-[#999999]/70">Comprador · sesión activa</span>
            </div>
          </div>
          <MetricsPanel score={score} alerts={alerts} processing={processing} />
        </div>
      )}

      {/* Fase 3 — central de leads */}
      {isDash && (
        <div className="animate-fade-up">
          <LeadsDashboard step={dashStep} />
          <div className="flex items-center justify-between border-t border-[#333333] px-5 py-3">
            <p className="text-[11px] text-[#999999]/60">
              Demo completa · Pipeline comercial VISIUM 5.0
            </p>
            <button
              onClick={reset}
              className="font-mono text-[11px] text-[#D4AF37] transition-colors hover:text-white"
            >
              ↺ Reiniciar Demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
