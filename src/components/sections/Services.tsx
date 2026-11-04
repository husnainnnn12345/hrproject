"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  ChefHat,
  Coffee,
  Home,
  Paintbrush,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { services, type ServiceId } from "@/config/company";
import { useI18n, pickLocale } from "@/i18n/context";
import { useFormStore } from "@/lib/form-store";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";
import { Reveal } from "@/components/effects/Reveal";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Coffee,
  Home,
  Wrench,
  Paintbrush,
  ChefHat,
  Building2,
};

export function Services() {
  const { t, locale } = useI18n();
  const { prefillAndScrollToContact } = useFormStore();
  const [filter, setFilter] = useState<"all" | "home" | "business">("all");

  const tabs = [
    { id: "all", label: t.services.all },
    { id: "home", label: t.services.homes },
    { id: "business", label: t.services.businesses },
  ];

  const filtered = useMemo(() => {
    if (filter === "all") return services;
    return services.filter((s) =>
      (s.audience as readonly string[]).includes(filter)
    );
  }, [filter]);

  return (
    <section id="services" className="bg-muted/40 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          subtitle={t.services.subtitle}
        />
        <div className="mb-8 flex justify-center">
          <Tabs
            tabs={tabs}
            value={filter}
            onChange={(id) => setFilter(id as typeof filter)}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Sparkles;
            return (
              <Reveal key={service.id} delay={i * 0.05}>
                <Card tilt className="group relative h-full overflow-hidden">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/15 text-secondary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {pickLocale(service.title, locale)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {pickLocale(service.description, locale)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="sr-only">{t.services.basis}</span>
                    {service.bases.map((b) => (
                      <Badge key={b} tone="navy">
                        {b}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-5 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full"
                      onClick={() =>
                        prefillAndScrollToContact({
                          service: service.id as ServiceId,
                          audience: (service.audience as readonly string[]).includes(
                            "home"
                          )
                            ? "home"
                            : "business",
                        })
                      }
                    >
                      {t.services.request}
                    </Button>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
