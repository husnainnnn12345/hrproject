"use client";

import { company } from "@/config/company";
import { useI18n, pickLocale } from "@/i18n/context";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/effects/Reveal";

export function Stats() {
  const { t, locale } = useI18n();

  return (
    <section id="stats" className="bg-background py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={t.stats.eyebrow}
          title={t.stats.title}
          subtitle={t.stats.placeholderNote}
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {company.stats.map((stat, i) => (
            <Reveal key={stat.id} delay={i * 0.08}>
              <div className="rounded-2xl border border-border bg-card p-5 text-center shadow-soft sm:p-6">
                <p className="font-display text-3xl font-extrabold text-navy dark:text-secondary sm:text-4xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-muted-foreground">
                  {pickLocale(stat.label, locale)}
                </p>
                {stat.placeholder ? (
                  <p className="mt-2 text-[10px] uppercase tracking-wider text-accent">
                    Placeholder
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
