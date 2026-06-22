"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VisiumLogoProps {
  /** Pixel size of the square mark. */
  size?: number;
  /** Enables premium reveal, hover glow and micro-movement. */
  animated?: boolean;
  /** Renders a single-tone mark using currentColor (for dark UIs, print, etc). */
  monochrome?: boolean;
  className?: string;
  title?: string;
}

/**
 * VISIUM — primary brand mark.
 * A geometric, folded-plane "V": two architectural facets (lit + shadow) meeting
 * at a precise vertex. Communicates precision, architecture and luxury, and stays
 * legible from 16px to 128px.
 */
export function VisiumLogo({
  size = 28,
  animated = false,
  monochrome = false,
  className,
  title = "VISIUM",
}: VisiumLogoProps) {
  const uid = useId().replace(/[:]/g, "");
  const gL = `vL-${uid}`;
  const gR = `vR-${uid}`;

  const leftFill = monochrome ? "currentColor" : `url(#${gL})`;
  const rightFill = monochrome ? "currentColor" : `url(#${gR})`;
  const rightOpacity = monochrome ? 0.72 : 1;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={cn("shrink-0 overflow-visible", className)}
      initial={animated ? { opacity: 0, scale: 0.82, rotate: -6 } : undefined}
      animate={animated ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      whileHover={
        animated
          ? {
              scale: 1.06,
              filter: "drop-shadow(0 0 9px rgba(212,179,106,0.7))",
            }
          : undefined
      }
    >
      <title>{title}</title>
      {!monochrome && (
        <defs>
          <linearGradient id={gL} x1="4" y1="4" x2="16" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E6C98A" />
            <stop offset="1" stopColor="#D4B36A" />
          </linearGradient>
          <linearGradient id={gR} x1="28" y1="4" x2="16" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D4B36A" />
            <stop offset="1" stopColor="#9A7B3A" />
          </linearGradient>
        </defs>
      )}

      {/* Right plane (shadow) */}
      <motion.path
        d="M28.4 4.6 L16 28 L16 15.8 L21.3 4.6 Z"
        fill={rightFill}
        opacity={rightOpacity}
        animate={
          animated && !monochrome
            ? { opacity: [rightOpacity, rightOpacity * 0.82, rightOpacity] }
            : undefined
        }
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Left plane (lit) */}
      <path d="M3.6 4.6 L16 28 L16 15.8 L10.7 4.6 Z" fill={leftFill} />

      {/* Architectural lit edge */}
      <path
        d="M3.6 4.6 L16 28"
        stroke={monochrome ? "currentColor" : "#E6C98A"}
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity={monochrome ? 0.9 : 0.55}
      />

      {/* Center fold seam */}
      {!monochrome && (
        <path d="M16 15.8 L16 28" stroke="#050505" strokeWidth="0.5" strokeLinecap="round" opacity="0.35" />
      )}
    </motion.svg>
  );
}
