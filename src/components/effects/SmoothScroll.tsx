"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { isLowEndDevice, prefersReducedMotion } from "@/lib/utils";

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion() || isLowEndDevice()) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
