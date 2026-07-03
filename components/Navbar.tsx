"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { NAV_LINKS } from "@/data/navigation";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { VisiumLogo } from "@/components/ui/VisiumLogo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full px-5 transition-all duration-700 ease-spatial",
          scrolled
            ? "glass border-gold/[0.22] py-2.5 shadow-glass"
            : "border border-transparent bg-transparent py-3"
        )}
      >
        <a href="#top" className="group flex items-center gap-2.5" aria-label="VISIUM — inicio">
          <VisiumLogo size={26} animated />
          <span className="text-base font-semibold tracking-[0.14em]">VISIUM</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[color:var(--text-muted)] transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#cta"
            className="text-sm text-[color:var(--text-muted)] transition-colors hover:text-white"
          >
            Ingresar
          </a>
          <MagneticButton href="#cta" className="px-5 py-2.5 text-[13px]">
            Solicitar Demo
          </MagneticButton>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={cn("h-px w-5 bg-white transition", open && "translate-y-[3px] rotate-45")} />
          <span className={cn("h-px w-5 bg-white transition", open && "-translate-y-[3px] -rotate-45")} />
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass absolute left-4 right-4 top-20 flex flex-col gap-1 rounded-3xl p-4 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm text-[color:var(--text-muted)] hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-primary px-4 py-3 text-center text-sm font-medium text-black"
          >
            Solicitar Demo
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
