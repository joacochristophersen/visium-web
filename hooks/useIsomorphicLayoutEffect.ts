"use client";

import { useEffect, useLayoutEffect } from "react";

/** useLayoutEffect that degrades to useEffect on the server (no SSR warning). */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
