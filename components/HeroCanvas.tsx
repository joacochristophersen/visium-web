"use client";

import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/** SSR-disabled wrapper so Three.js only runs in the browser. */
const HeroScene = dynamic(
  () => import("@/three/HeroScene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => <CanvasFallback />,
  }
);

function CanvasFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-40 w-40 animate-pulse-glow rounded-full bg-primary/30 blur-3xl" />
    </div>
  );
}

export function HeroCanvas() {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    // Static, calm fallback for reduced-motion users.
    return (
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_45%,#000_55%,transparent)]">
      <HeroScene />
    </div>
  );
}
