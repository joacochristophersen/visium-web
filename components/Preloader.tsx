"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { VisiumLogo } from "@/components/ui/VisiumLogo";

/**
 * Cinematic intro: a 0→100 spatial-calibration counter over a black field,
 * then a curtain reveal. Sets `data-loaded` on <html> so other elements can
 * stagger their entrance after the curtain lifts.
 */
export function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      document.documentElement.setAttribute("data-loaded", "true");
      return;
    }
    let raf = 0;
    const start = performance.now();
    const DURATION = 1900;
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      // easeInOutCubic for a weighty feel
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setDone(true);
          document.documentElement.setAttribute("data-loaded", "true");
        }, 260);
      }
    };
    raf = requestAnimationFrame(tick);
    document.body.style.overflow = "hidden";
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="arc-glow absolute inset-0" />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative flex flex-col items-center"
          >
            <VisiumLogo size={56} animated className="mb-8" />
            <span className="eyebrow mb-6">Calibrando inteligencia de conversión</span>
            <div className="flex items-baseline gap-3">
              <span className="text-7xl font-semibold tracking-tightest tabular-nums sm:text-9xl">
                {String(count).padStart(3, "0")}
              </span>
              <span className="text-2xl text-primary">%</span>
            </div>
          </motion.div>

          {/* progress hairline */}
          <div className="relative mt-10 h-px w-56 overflow-hidden bg-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-highlight"
              style={{ width: `${count}%` }}
            />
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-10 font-mono text-[11px] uppercase tracking-ultrawide text-[color:var(--text-faint)]"
          >
            VISIUM · Vendemos decisiones
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
