"use client";

import { useEffect, useState } from "react";

interface Pointer {
  x: number;
  y: number;
  /** Normalised -1..1 around viewport center. */
  nx: number;
  ny: number;
}

/** Tracks the pointer, normalised for parallax effects. */
export function useMousePosition(): Pointer {
  const [pointer, setPointer] = useState<Pointer>({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      setPointer({
        x: e.clientX,
        y: e.clientY,
        nx: (e.clientX / w) * 2 - 1,
        ny: (e.clientY / h) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return pointer;
}
