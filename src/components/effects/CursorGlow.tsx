"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { isLowEndDevice, isTouchDevice, prefersReducedMotion } from "@/lib/utils";

export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 220, damping: 28 });
  const sy = useSpring(y, { stiffness: 220, damping: 28 });

  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion() || isLowEndDevice()) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 18);
      y.set(e.clientY - 18);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[90] hidden h-9 w-9 rounded-full border border-secondary/40 bg-secondary/15 mix-blend-multiply blur-[1px] dark:mix-blend-screen md:block"
      style={{ left: sx, top: sy }}
    />
  );
}
