"use client";

import { forwardRef, useRef, type ButtonHTMLAttributes, type MouseEvent } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, isTouchDevice, prefersReducedMotion } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-navy text-white shadow-soft hover:-translate-y-0.5 hover:shadow-lift glow-teal dark:bg-secondary dark:text-navy-black",
        secondary:
          "bg-secondary text-white shadow-soft hover:-translate-y-0.5 hover:shadow-lift glow-teal",
        ghost:
          "bg-transparent text-foreground hover:bg-muted border border-transparent hover:border-border",
        whatsapp:
          "bg-whatsapp text-white shadow-soft hover:-translate-y-0.5 hover:brightness-105 glow-teal",
        outline:
          "border border-border bg-card/80 text-foreground hover:bg-muted hover:-translate-y-0.5",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-base",
      },
      magnetic: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      magnetic: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, magnetic, onMouseMove, onMouseLeave, ...props }, ref) => {
    const localRef = useRef<HTMLButtonElement | null>(null);

    const setRefs = (node: HTMLButtonElement | null) => {
      localRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
      onMouseMove?.(e);
      if (!magnetic || isTouchDevice() || prefersReducedMotion()) return;
      const el = localRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    };

    const handleLeave = (e: MouseEvent<HTMLButtonElement>) => {
      onMouseLeave?.(e);
      if (!magnetic) return;
      const el = localRef.current;
      if (el) el.style.transform = "";
    };

    return (
      <button
        ref={setRefs}
        className={cn(buttonVariants({ variant, size, magnetic }), className)}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
