"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/* ============================================================
   Marco Dashboard Analítico — el visor 3D deja de ser un
   elemento aislado y pasa a vivir dentro del mismo chrome que
   el resto de la plataforma VISIUM (header + sidebar de datos).
   El PointerLock queda scopeado a ".twin-viewer-stage" (ver
   TwinViewer.tsx) para que los clicks del sidebar y el botón de
   cierre nunca disparen la captura del mouse.
   ============================================================ */

const TwinViewer = dynamic(() => import("@/components/v2/TwinViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#050505]">
      <span className="font-mono text-[13px] tracking-[0.08em] text-[#F0CB65]">
        INICIANDO MOTOR ESPACIAL…
      </span>
      <div className="h-[3px] w-48 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-1/3 animate-pulse rounded-full bg-gradient-to-r from-[#F0CB65] to-[#D4AF37]" />
      </div>
    </div>
  ),
});

const SURFACES = [
  { label: "Cubiertos", value: "187 m²" },
  { label: "Terraza", value: "60 m²" },
  { label: "Ambientes", value: "4" },
  { label: "Baños", value: "3" },
];

const ZONES = ["Living - Doble Altura", "Cocina", "Suite Principal"];

function SidebarLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.08em] text-[#D4AF37]">
      {children}
    </p>
  );
}

function DashboardSidebar() {
  const [activeZone, setActiveZone] = useState(ZONES[0]);

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-y-auto border-r border-[#222222] bg-[#0a0a0e] p-5">
      {/* Unidad activa */}
      <div className="rounded-[10px] border border-white/[0.08] bg-white/[0.02] p-4">
        <SidebarLabel>Unidad activa</SidebarLabel>
        <p className="text-[19px] font-medium leading-[1.2] text-white">Living</p>
        <p className="mt-1 text-[13px] text-[#999999]">Puerto Madero Norte</p>
      </div>

      {/* Superficies */}
      <div className="rounded-[10px] border border-white/[0.08] bg-white/[0.02] p-4">
        <SidebarLabel>Superficies</SidebarLabel>
        <div className="grid grid-cols-2 gap-3">
          {SURFACES.map((s) => (
            <div key={s.label}>
              <p className="font-mono text-[17px] font-semibold text-[#F0CB65]">{s.value}</p>
              <p className="text-[11px] text-[#999999]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Valuación automática IA */}
      <div className="rounded-[10px] border border-[#D4AF37]/25 bg-[#D4AF37]/[0.05] p-4">
        <div className="mb-3 flex items-center justify-between">
          <SidebarLabel>Valuación automática IA</SidebarLabel>
          <span className="rounded-full border border-[#D4AF37]/30 bg-black/40 px-2 py-0.5 font-mono text-[9px] text-[#F0CB65]">
            Jun 2026
          </span>
        </div>
        <p className="font-mono text-[26px] font-semibold text-white">USD 412.000</p>
        <p className="mt-1 text-[12px] text-[#2ECC71]">+3.2% vs. estimación anterior</p>
      </div>

      {/* Zonas de la unidad */}
      <div className="rounded-[10px] border border-white/[0.08] bg-white/[0.02] p-4">
        <SidebarLabel>Zonas de la unidad</SidebarLabel>
        <div className="flex flex-col gap-2">
          {ZONES.map((zone) => {
            const active = zone === activeZone;
            return (
              <button
                key={zone}
                type="button"
                onClick={() => setActiveZone(zone)}
                className={`rounded-[8px] border px-3 py-2.5 text-left text-[13px] font-medium transition-colors duration-200 ${
                  active
                    ? "border-[#D4AF37]/40 bg-[#D4AF37]/[0.1] text-[#F0CB65]"
                    : "border-white/[0.06] bg-transparent text-[#999999] hover:border-white/15 hover:text-white"
                }`}
              >
                {zone}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function TwinDashboardModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black">
      {/* Header superior */}
      <div className="flex items-center justify-between border-b border-[#222222] bg-[#0a0a0e] px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className="font-display text-[15px] font-medium tracking-[-0.02em] text-white">
            VISIUM <span className="text-[#F0CB65]">5.0</span>
          </span>
          <span className="hidden items-center gap-2 rounded-full border border-[#2ECC71]/30 bg-[#2ECC71]/[0.07] px-3 py-1 font-mono text-[10px] text-[#2ECC71] sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2ECC71]" />
            Gemelo digital · en vivo
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#999999] transition-colors duration-200 hover:border-[#D4AF37]/40 hover:text-[#F0CB65]"
        >
          <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
      </div>

      {/* Cuerpo: sidebar + visor */}
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-[300px] shrink-0 sm:block">
          <DashboardSidebar />
        </aside>
        <main className="relative min-h-0 flex-1">
          <TwinViewer />
        </main>
      </div>
    </div>
  );
}
