"use client";

import { useEffect, useState } from "react";
import { RequestAccessButton } from "@/components/v2/RequestAccessButton";

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
        {/* Wordmark — four-bar mark echoing a light meter */}
        <a href="#top" className="flex items-center gap-2.5 text-white">
          <span aria-hidden className="flex items-end gap-[3px]">
            <span className="h-2.5 w-[2px] bg-white" />
            <span className="h-4 w-[2px] bg-white" />
            <span className="h-3 w-[2px] bg-white" />
            <span className="h-[18px] w-[2px] bg-white" />
          </span>
          <span className="text-[16px] font-medium lowercase tracking-[-0.025em]">
            visium
          </span>
          <span className="text-[11px] font-normal text-[#999999]">5.0</span>
        </a>

        <div className="hidden items-center gap-4 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-2 text-[15px] font-medium text-white transition-opacity duration-200 [transition-timing-function:cubic-bezier(0.625,0.05,0,1)] hover:opacity-60"
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
