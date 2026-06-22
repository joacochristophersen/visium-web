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
    <div className={cn("relative flex overflow-hidden", className)}>
      <div className="flex shrink-0 animate-marquee items-center gap-16 pr-16">
        {row.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap text-sm uppercase tracking-ultrawide text-[color:var(--text-faint)]"
          >
            {item}
          </span>
        ))}
      </div>
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg,#050505,transparent 12%,transparent 88%,#050505)",
        }}
      />
    </div>
  );
}
