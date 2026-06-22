"use client";

import { createElement, type ElementType, useMemo } from "react";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";
import { cn } from "@/lib/utils";

interface SplitRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Per-word stagger (seconds). */
  stagger?: number;
  delay?: number;
}

/**
 * GSAP word-by-word reveal driven by ScrollTrigger. Each word rises and
 * un-blurs as it scrolls into view — the signature premium headline motion.
 */
export function SplitReveal({
  text,
  as: Tag = "h2",
  className,
  stagger = 0.06,
  delay = 0,
}: SplitRevealProps) {
  const words = useMemo(() => text.split(" "), [text]);

  const scope = useGsap<HTMLElement>(({ self }) => {
    const targets = self.querySelectorAll(".split-word");
    gsap.fromTo(
      targets,
      { yPercent: 120, opacity: 0, filter: "blur(12px)" },
      {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "expo.out",
        stagger,
        delay,
        scrollTrigger: { trigger: self, start: "top 82%" },
      }
    );
  }, []);

  const children = words.map((word, i) =>
    createElement(
      "span",
      { key: i, className: "split-line mr-[0.28em]" },
      createElement("span", { className: "split-word" }, word)
    )
  );

  return createElement(
    Tag,
    { ref: scope, className: cn("flex flex-wrap", className) },
    children
  );
}
