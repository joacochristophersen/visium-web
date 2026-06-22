import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}

/** Small glass pill used for eyebrows and status chips. */
export function Badge({ children, className, dot = true }: BadgeProps) {
  return (
    <span className={cn("chip", className)}>
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
      )}
      <span className="tracking-wide">{children}</span>
    </span>
  );
}
