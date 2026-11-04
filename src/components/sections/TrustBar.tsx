"use client";

import { company } from "@/config/company";
import { Marquee } from "@/components/ui/Marquee";

export function TrustBar() {
  return (
    <section id="trust-bar" aria-label="Industries we serve" className="relative z-10 -mt-1">
      <Marquee items={company.marqueeItems} />
    </section>
  );
}
