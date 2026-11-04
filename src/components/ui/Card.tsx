"use client";

import {
  forwardRef,
  useRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn, isTouchDevice, prefersReducedMotion } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  tilt?: boolean;
  glass?: boolean;
  children: ReactNode;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, tilt = false, glass = false, onMouseMove, onMouseLeave, children, ...props }, ref) => {
    const localRef = useRef<HTMLDivElement | null>(null);

    const setRefs = (node: HTMLDivElement | null) => {
      localRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    const handleMove = (e: MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(e);
      if (!tilt || isTouchDevice() || prefersReducedMotion()) return;
      const el = localRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (py - 0.5) * -8;
      const ry = (px - 0.5) * 8;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
    };

    const handleLeave = (e: MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(e);
      if (!tilt) return;
      const el = localRef.current;
      if (el) el.style.transform = "";
    };

    return (
      <div
        ref={setRefs}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn(
          "rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform duration-200 will-change-transform active:scale-[0.99]",
          glass && "glass",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";
