import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  muted?: boolean;
}

/** Premium gradient headline text. */
export function GradientText({ children, className, muted }: GradientTextProps) {
  return (
    <span className={cn(muted ? "text-gradient-gold" : "text-gradient", className)}>
      {children}
    </span>
  );
}
