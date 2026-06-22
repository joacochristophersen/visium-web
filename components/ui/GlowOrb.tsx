import { cn } from "@/lib/utils";

interface GlowOrbProps {
  className?: string;
  color?: "primary" | "highlight";
}

/** Decorative blurred ambient orb for section depth. */
export function GlowOrb({ className, color = "primary" }: GlowOrbProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-[120px]",
        color === "primary" ? "bg-primary/15" : "bg-highlight/12",
        className
      )}
    />
  );
}
