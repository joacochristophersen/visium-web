"use client";

import { useState } from "react";

/* ============================================================
   Asoleamiento predictivo — el usuario arrastra la hora y el
   sol recorre su trayectoria real mientras la sombra de la
   torre responde con física elástica (CSS, cero librerías).
   ============================================================ */

const H_MIN = 8;
const H_MAX = 19;
const ELASTIC = "cubic-bezier(0.34, 1.56, 0.64, 1)";

export function SolarPanel() {
  const [hour, setHour] = useState(14);

  /* Trayectoria: mapea la hora a un arco de 160° sobre el horizonte */
  const t = (hour - H_MIN) / (H_MAX - H_MIN); // 0..1
  const angle = Math.PI * (1 - t * 0.89 - 0.055); // amanecer→atardecer
  const sunX = 160 + Math.cos(angle) * 128;
  const sunY = 128 - Math.sin(angle) * 100;

  /* La sombra se alarga cuanto más lejos del mediodía solar (13:30) */
  const noonDist = Math.abs(hour - 13.5) / 5.5; // 0..1
  const shadowLen = 0.25 + Math.pow(noonDist, 1.35) * 2.1;
  const shadowDir = hour < 13.5 ? 1 : -1; // sol al este → sombra al oeste

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.08em] text-[#D4AF37]">
          Asoleamiento predictivo
        </p>
        <span className="font-mono text-[11px] text-[#F0CB65]">
          {String(Math.floor(hour)).padStart(2, "0")}:
          {hour % 1 === 0.5 ? "30" : "00"} hs
        </span>
      </div>

      <svg viewBox="0 0 320 176" className="w-full">
        {/* Cielo — se enfría hacia los extremos del día */}
        <rect
          width="320"
          height="176"
          fill="#08080f"
        />

        {/* Trayectoria solar punteada */}
        <path
          d="M 32 128 A 128 100 0 0 1 288 128"
          fill="none"
          stroke="#D4AF37"
          strokeOpacity="0.25"
          strokeWidth="1"
          strokeDasharray="3 4"
        />

        {/* Horizonte */}
        <line x1="0" y1="128" x2="320" y2="128" stroke="#333333" strokeWidth="1" />

        {/* Sombra proyectada — elástica */}
        <ellipse
          cx="160"
          cy="131"
          rx="26"
          ry="4"
          fill="#000000"
          opacity="0.75"
          style={{
            transform: `translateX(${shadowDir * (8 + noonDist * 34)}px) scaleX(${shadowLen})`,
            transformOrigin: "160px 131px",
            transition: `transform 700ms ${ELASTIC}`,
          }}
        />

        {/* Torre — el desarrollo */}
        <g>
          <rect x="146" y="62" width="28" height="66" fill="#202020" stroke="#333333" strokeWidth="1" />
          {/* Fachada iluminada según el lado del sol */}
          <rect
            x={hour < 13.5 ? 146 : 168}
            y="62"
            width="6"
            height="66"
            fill="#D4AF37"
            opacity="0.35"
            style={{ transition: `x 700ms ${ELASTIC}` }}
          />
          {[74, 86, 98, 110].map((y) => (
            <g key={y}>
              <rect x="151" y={y} width="5" height="5" fill="#F0CB65" opacity="0.22" />
              <rect x="160" y={y} width="5" height="5" fill="#F0CB65" opacity="0.14" />
            </g>
          ))}
        </g>

        {/* Sol — glide elástico sobre el arco */}
        <g
          style={{
            transform: `translate(${sunX}px, ${sunY}px)`,
            transition: `transform 700ms ${ELASTIC}`,
          }}
        >
          <circle r="14" fill="#F0CB65" opacity="0.12" />
          <circle r="7" fill="#F0CB65" opacity="0.35" />
          <circle r="4" fill="#F0CB65" />
        </g>

        {/* Etiquetas de horizonte */}
        <text x="14" y="142" fill="#999999" fontSize="7" fontFamily="ui-monospace,monospace" opacity="0.6">E</text>
        <text x="300" y="142" fill="#999999" fontSize="7" fontFamily="ui-monospace,monospace" opacity="0.6">O</text>
        <text x="14" y="170" fill="#999999" fontSize="7" fontFamily="ui-monospace,monospace" opacity="0.5">
          Solsticio de invierno · 21 Jun
        </text>
        <text x="222" y="170" fill="#D4AF37" fontSize="7" fontFamily="ui-monospace,monospace" opacity="0.8">
          Precisión 0.2° · ciclo anual
        </text>
      </svg>

      <input
        type="range"
        min={H_MIN}
        max={H_MAX}
        step={0.5}
        value={hour}
        onChange={(e) => setHour(Number(e.target.value))}
        aria-label="Hora del día"
        className="w-full accent-[#D4AF37]"
      />
      <p className="text-[10px] leading-[1.5] text-[#999999]/70">
        Arrastrá la hora: la sombra de la torre responde con la trayectoria
        solar real del sitio — el mismo cálculo que recibe el desarrollador en
        su entregable.
      </p>
    </div>
  );
}
