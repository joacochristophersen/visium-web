/**
 * VISIUM — la "V corta": dos planos arquitectónicos (iluminado + sombra)
 * que se encuentran en un vértice preciso. Versión server-first en oro
 * pulido #D4AF37 — SVG estático, cero JS cliente.
 *
 * `uid` debe ser único por instancia en la misma página (los gradientes
 * usan IDs globales del DOM).
 */
export function VLogo({
  size = 28,
  uid = "v2",
  title = "VISIUM",
}: {
  size?: number;
  uid?: string;
  title?: string;
}) {
  const gL = `vL-${uid}`;
  const gR = `vR-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className="shrink-0 overflow-visible"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={gL} x1="4" y1="4" x2="16" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0CB65" />
          <stop offset="1" stopColor="#D4AF37" />
        </linearGradient>
        <linearGradient id={gR} x1="28" y1="4" x2="16" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D4AF37" />
          <stop offset="1" stopColor="#9A7B3A" />
        </linearGradient>
      </defs>

      {/* Plano derecho (sombra) */}
      <path d="M28.4 4.6 L16 28 L16 15.8 L21.3 4.6 Z" fill={`url(#${gR})`} />

      {/* Plano izquierdo (iluminado) */}
      <path d="M3.6 4.6 L16 28 L16 15.8 L10.7 4.6 Z" fill={`url(#${gL})`} />

      {/* Arista arquitectónica iluminada */}
      <path
        d="M3.6 4.6 L16 28"
        stroke="#F0CB65"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* Pliegue central */}
      <path d="M16 15.8 L16 28" stroke="#050505" strokeWidth="0.5" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}
