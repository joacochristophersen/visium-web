"use client";

import { useEffect, useState } from "react";
import { RequestAccessButton } from "@/components/v2/RequestAccessButton";
import { VLogo } from "@/components/v2/VLogo";

const LINKS = [
  { label: "Twins", href: "#twins" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Insights", href: "#insights" },
];

/** Sequel-system top bar — transparent over the hero, pure black once scrolled. */
export function V2Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 [transition-timing-function:cubic-bezier(0.625,0.05,0,1)] ${
        scrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5">
        {/* La "V corta" — marca primaria en oro pulido */}
        <a href="#top" className="flex items-center gap-2.5 text-white">
          <VLogo size={26} uid="nav" />
          <span className="text-[16px] font-medium lowercase tracking-[-0.025em]">
            visium
          </span>
          <span className="text-[11px] font-normal text-[#D4AF37]">5.0</span>
        </a>

        <div className="hidden items-center gap-4 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-2 text-[15px] font-medium text-white transition-colors duration-200 [transition-timing-function:cubic-bezier(0.625,0.05,0,1)] hover:text-[#F0CB65]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <RequestAccessButton className="h-10" />
      </nav>
    </header>
  );
}
