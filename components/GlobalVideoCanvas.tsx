"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lienzo cinemático global — un único fondo de video fijo que corre debajo
 * de TODA la página. Los tres loops locales se cross-fadean según la zona
 * de scroll activa, sin cortes ni secciones aisladas.
 *
 * Las secciones ya no montan su propio <video>: declaran su zona vía los
 * anchors listados en ZONES y este componente resuelve qué loop mostrar.
 */

const VIDEOS = [
  "/videos/hero-bg.mp4",
  "/videos/living.mp4",
  "/videos/cocina.mp4",
] as const;

/** Zona de scroll → índice de video. El último anchor visible manda. */
const ZONES: { anchor: string; video: number }[] = [
  { anchor: "top", video: 0 },          // Hero → Solución: exterior
  { anchor: "demo", video: 1 },         // Demo del gemelo → Motor: living
  { anchor: "visium-score", video: 2 }, // Score → Plataforma: cocina
  { anchor: "dashboard", video: 0 },    // Dashboard → CTA: cierre exterior
];

const FADE_MS = 2400;
const FADE_EASE = "cubic-bezier(0.25, 1, 0.5, 1)";

export function GlobalVideoCanvas() {
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeRef = useRef(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let ticking = false;

    const resolveZone = () => {
      ticking = false;
      // Línea de foco: 55% del viewport — el video cambia cuando la zona
      // domina la vista, no apenas asoma.
      const focus = window.innerHeight * 0.55;
      let next = ZONES[0].video;
      for (const z of ZONES) {
        const el = document.getElementById(z.anchor);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= focus) next = z.video;
      }
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActive(next);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(resolveZone);
    };

    resolveZone();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Reproducir solo el loop visible; pausar el resto cuando terminó el fade.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      videoRefs.current.forEach((v, i) => {
        if (!v || i === active) return;
        v.pause();
      });
    }, FADE_MS);

    const current = videoRefs.current[active];
    if (current && !reducedMotion.current) {
      current.play().catch(() => {});
    }
    return () => window.clearTimeout(timer);
  }, [active]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          src={src}
          autoPlay={i === 0}
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: active === i ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ${FADE_EASE}`,
            transform: "scale(1.06)",
            filter: "blur(3px)",
            willChange: "opacity",
          }}
        />
      ))}

      {/* Overlay oscuro unificado — la tipografía Fraunces flota con contraste premium */}
      <div className="absolute inset-0 bg-black/[0.87]" />

      {/* Halo dorado sutil, constante a lo largo de todo el recorrido */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_38%,rgba(212,179,106,0.06),transparent_65%)]" />

      {/* Viñeta perimetral para asentar los rieles editoriales */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_100%_at_50%_50%,transparent_60%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
}
