import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: ReactNode[];
  className?: string;
}

/** Infinite horizontal marquee (pure CSS). */
export function Marquee({ items, className }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div
      className={cn("relative flex overflow-hidden", className)}
      style={{
        // Fade lateral por máscara — no pinta negro sobre el lienzo de video
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        maskImage:
          "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <div className="flex shrink-0 animate-marquee items-center gap-16 pr-16">
        {row.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap text-sm uppercase tracking-ultrawide text-[color:var(--text-faint)] transition-colors duration-700 hover:text-gold/70"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
