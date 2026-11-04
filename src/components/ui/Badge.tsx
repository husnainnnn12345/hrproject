import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "teal" | "gold" | "navy" | "muted";
};

const tones = {
  default: "bg-muted text-foreground",
  teal: "bg-secondary/15 text-secondary dark:text-emerald-300",
  gold: "bg-accent/20 text-navy dark:text-accent",
  navy: "bg-navy/10 text-navy dark:bg-white/10 dark:text-white",
  muted: "bg-muted text-muted-foreground",
};

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
