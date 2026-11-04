"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { howItWorks } from "@/config/company";
import { useI18n, pickLocale } from "@/i18n/context";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/effects/Reveal";

export function HowItWorks() {
  const { t, locale } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 80, damping: 28 });

  return (
    <section id="how-it-works" className="bg-background py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={t.how.eyebrow}
          title={t.how.title}
          subtitle={t.how.subtitle}
        />
        <div ref={ref} className="relative mx-auto max-w-3xl">
          <svg
            className="pointer-events-none absolute left-6 top-0 hidden h-full w-8 sm:block md:left-1/2 md:-translate-x-1/2"
            viewBox="0 0 8 800"
            preserveAspectRatio="none"
            aria-hidden
          >
            <line
              x1="4"
              y1="0"
              x2="4"
              y2="800"
              stroke="rgb(var(--border))"
              strokeWidth="3"
            />
            <motion.line
              x1="4"
              y1="0"
              x2="4"
              y2="800"
              stroke="rgb(var(--secondary))"
              strokeWidth="3"
              style={{ pathLength }}
              strokeLinecap="round"
            />
          </svg>

          <ol className="space-y-8">
            {howItWorks.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.06}>
                <li className="relative grid gap-4 sm:grid-cols-[auto_1fr] sm:gap-6 md:grid-cols-[1fr_auto_1fr]">
                  <div
                    className={`rounded-2xl border border-border bg-card p-5 shadow-soft md:col-span-1 ${
                      i % 2 === 1 ? "md:col-start-3" : "md:col-start-1"
                    }`}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">
                      Step {step.step}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold text-foreground">
                      {pickLocale(step.title, locale)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {pickLocale(step.description, locale)}
                    </p>
                  </div>
                  <div className="absolute left-0 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white shadow-soft sm:static sm:mx-auto md:col-start-2 dark:bg-secondary dark:text-navy-black">
                    {step.step}
                  </div>
                  {i % 2 === 1 ? null : <div className="hidden md:block" />}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
