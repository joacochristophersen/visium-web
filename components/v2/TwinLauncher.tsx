"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

/* ============================================================
   Marco de simulación Black & Gold para el gemelo real.
   Three.js (~150 kB gz) solo baja cuando el usuario inicia el
   recorrido: dynamic import ssr:false disparado por click —
   la página estática no paga el costo del 3D. Al iniciar, el
   recorrido se abre dentro del Dashboard Analítico completo
   (header + sidebar de datos), no como visor aislado.
   ============================================================ */

const TwinDashboardModal = dynamic(
  () => import("@/components/v2/TwinDashboardModal").then((m) => m.TwinDashboardModal),
  { ssr: false }
);

const KEYS = [
  { k: "W A S D", v: "caminar" },
  { k: "mouse · ↑ ↓ ← →", v: "mirar" },
  { k: "Shift", v: "correr" },
  { k: "R / F", v: "subir / bajar" },
  { k: "Esc", v: "soltar" },
];

export function TwinLauncher() {
  const [open, setOpen] = useState(false);

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
            VISIUM · Gemelo Digital — Recorrido en primera persona
          </span>
        </div>
        <span className="hidden items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/[0.05] px-3 py-1 font-mono text-[10px] text-[#D4AF37] sm:inline-flex">
          .glb · Draco · 0.93 MB · estanco
        </span>
      </div>

      {/* Viewport */}
      <div className="relative h-[420px] sm:h-[540px]">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-gradient-to-b from-[#0a0a0e] via-[#080810] to-[#050505]">
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#999999]/60">
              Escaneo real · iPhone + Scaniverse
            </p>
            <p className="mt-1 text-lg font-semibold text-white">
              Departamento escaneado · Buenos Aires
            </p>
            <p className="text-[12px] text-[#999999]">
              De 29.7 MB crudos a 0.93 MB — 1,368 agujeros sellados por el
              pipeline espacial VISIUM
            </p>
          </div>
          <button
            onClick={() => setOpen(true)}
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
              INICIAR RECORRIDO
            </span>
          </button>
        </div>
      </div>

      {open && <TwinDashboardModal onClose={() => setOpen(false)} />}

      {/* Leyenda de controles */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-[#333333] px-5 py-3">
        {KEYS.map((it) => (
          <span key={it.k} className="font-mono text-[10px] text-[#999999]/70">
            <span className="text-[#D4AF37]">{it.k}</span> {it.v}
          </span>
        ))}
      </div>
    </div>
  );
}
