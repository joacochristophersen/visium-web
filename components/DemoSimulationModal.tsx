"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { EASE_SPATIAL } from "@/animations/variants";

/* ------------------------------------------------------------------ */
/* Contexto — cualquier CTA de la página puede disparar la simulación  */
/* ------------------------------------------------------------------ */

const DemoModalContext = createContext<{ openDemoModal: () => void } | null>(null);

export function useDemoModal() {
  const ctx = useContext(DemoModalContext);
  if (!ctx) throw new Error("useDemoModal debe usarse dentro de <DemoModalProvider>");
  return ctx;
}

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openDemoModal = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <DemoModalContext.Provider value={{ openDemoModal }}>
      {children}
      <DemoSimulationModal open={open} onClose={close} />
    </DemoModalContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Coreografía de la simulación                                        */
/* ------------------------------------------------------------------ */

type Phase = "input" | "scanning" | "success";

const SCAN_LOGS = [
  "[CONECTANDO] Mapeando coordenadas satelitales mediante API espacial…",
  "[PROCESANDO] Extrayendo curvas de nivel, capas de zonificación y asoleamiento…",
  "[SINCRONIZANDO] Estructurando gemelo digital tridimensional (.obj)…",
] as const;

const LOG_STEP_MS = 1000;
const SUCCESS_AT_MS = SCAN_LOGS.length * LOG_STEP_MS + 400;

// Reemplazar por el Calendly real del equipo comercial
const CALENDLY_URL = "https://calendly.com/visium-demo/sesion-de-validacion";

function DemoSimulationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [phase, setPhase] = useState<Phase>("input");
  const [address, setAddress] = useState("");
  const [logsShown, setLogsShown] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  // Reset total al cerrar + limpieza de timers al desmontar
  useEffect(() => {
    if (!open) {
      clearTimers();
      setPhase("input");
      setAddress("");
      setLogsShown(0);
    }
    return clearTimers;
  }, [open, clearTimers]);

  // Escape para cerrar + bloqueo del scroll de fondo
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const startScan = () => {
    if (!address.trim()) return;
    setPhase("scanning");
    SCAN_LOGS.forEach((_, i) => {
      timers.current.push(setTimeout(() => setLogsShown(i + 1), (i + 1) * LOG_STEP_MS));
    });
    timers.current.push(setTimeout(() => setPhase("success"), SUCCESS_AT_MS));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_SPATIAL }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Simulación espacial VISIUM"
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.7, ease: EASE_SPATIAL }}
            className="panel-lumen relative w-full max-w-lg rounded-3xl p-8 shadow-glass sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera */}
            <div className="mb-7 flex items-start justify-between gap-4">
              <p className="font-mono text-[11px] uppercase tracking-ultrawide text-gold">
                VISIUM · Simulación espacial en tiempo real
              </p>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="-mr-2 -mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[color:var(--text-muted)] transition-colors hover:bg-white/5 hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <AnimatePresence mode="wait">
              {/* FASE 1 — Ingreso de datos */}
              {phase === "input" && (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: EASE_SPATIAL }}
                  className="flex flex-col gap-6"
                >
                  <h3 className="font-display text-2xl font-medium tracking-tightest text-white sm:text-3xl">
                    Estructurá tu gemelo digital.
                  </h3>
                  <label className="flex flex-col gap-3">
                    <span className="text-sm leading-relaxed text-[color:var(--text-muted)]">
                      Ingresá la dirección o coordenadas de tu próximo desarrollo
                    </span>
                    <input
                      autoFocus
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && startScan()}
                      placeholder="ej: Av. Libertador 2200"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-[color:var(--text-faint)] focus:border-gold/50"
                    />
                  </label>
                  <button
                    onClick={startScan}
                    disabled={!address.trim()}
                    className="btn-gold rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Iniciar Escaneo Espacial
                  </button>
                </motion.div>
              )}

              {/* FASE 2 — Consola de procesamiento */}
              {phase === "scanning" && (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: EASE_SPATIAL }}
                  className="flex flex-col gap-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="proc-blink h-2 w-2 rounded-full bg-gold" />
                    <span className="font-mono text-[11px] uppercase tracking-ultrawide text-gold">
                      Escaneo en curso — {address.trim()}
                    </span>
                  </div>
                  <div className="flex min-h-[132px] flex-col gap-3 rounded-2xl border border-white/8 bg-black/50 p-5 font-mono text-xs leading-relaxed">
                    {SCAN_LOGS.slice(0, logsShown).map((log) => (
                      <motion.p
                        key={log}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, ease: EASE_SPATIAL }}
                        className="text-[color:var(--text-muted)]"
                      >
                        <span className="text-gold">{log.slice(0, log.indexOf("]") + 1)}</span>
                        {log.slice(log.indexOf("]") + 1)}
                      </motion.p>
                    ))}
                    <span className="proc-blink text-gold">▮</span>
                  </div>
                </motion.div>
              )}

              {/* FASE 3 — Cierre comercial */}
              {phase === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE_SPATIAL }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p className="font-mono text-[11px] uppercase tracking-ultrawide text-gold">
                      Gemelo digital estructurado con éxito
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-[color:var(--text-primary)]">
                    Tu simulación personalizada para{" "}
                    <span className="font-medium text-gold">{address.trim()}</span> ha sido
                    guardada en nuestros servidores. Para activar el renderizado 3D
                    interactivo en tu pantalla, agendá una sesión de validación con
                    nuestro equipo técnico.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide"
                    >
                      Agendar sesión de validación
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                    <button
                      onClick={onClose}
                      className="rounded-full px-6 py-3.5 text-sm text-[color:var(--text-muted)] transition-colors hover:text-white"
                    >
                      Cerrar
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
