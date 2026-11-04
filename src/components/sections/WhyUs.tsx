"use client";

import {
  BadgeCheck,
  CalendarDays,
  GraduationCap,
  Headset,
  RefreshCw,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { whyUs } from "@/config/company";
import { useI18n, pickLocale } from "@/i18n/context";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/effects/Reveal";

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  RefreshCw,
  CalendarDays,
  GraduationCap,
  BadgeCheck,
  Headset,
};

export function WhyUs() {
  const { t, locale } = useI18n();

  return (
    <section id="why-us" className="bg-background py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={t.why.eyebrow}
          title={t.why.title}
          subtitle={t.why.subtitle}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, i) => {
            const Icon = iconMap[item.icon] ?? ShieldCheck;
            return (
              <Reveal key={item.id} delay={i * 0.05}>
                <Card tilt className="h-full">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white dark:bg-secondary dark:text-navy-black">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold">
                    {pickLocale(item.title, locale)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {pickLocale(item.description, locale)}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
