"use client";

import { Check } from "lucide-react";
import { pricingModels } from "@/config/company";
import { useI18n, pickLocale } from "@/i18n/context";
import { useFormStore } from "@/lib/form-store";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/effects/Reveal";
import { cn } from "@/lib/utils";

export function Pricing() {
  const { t, locale } = useI18n();
  const { prefillAndScrollToContact } = useFormStore();

  return (
    <section id="pricing" className="bg-background py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={t.pricing.eyebrow}
          title={t.pricing.title}
          subtitle={t.pricing.subtitle}
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {pricingModels.map((model, i) => (
            <Reveal key={model.id} delay={i * 0.08}>
              <Card
                tilt
                className={cn(
                  "relative flex h-full flex-col",
                  "featured" in model &&
                    model.featured &&
                    "border-secondary ring-2 ring-secondary/30"
                )}
              >
                {"featured" in model && model.featured ? (
                  <Badge tone="teal" className="absolute -top-3 left-1/2 -translate-x-1/2">
                    {t.pricing.popular}
                  </Badge>
                ) : null}
                <h3 className="font-display text-2xl font-bold">
                  {pickLocale(model.name, locale)}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {pickLocale(model.summary, locale)}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {model.features[locale].map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={"featured" in model && model.featured ? "secondary" : "outline"}
                  className="mt-8 w-full"
                  onClick={() =>
                    prefillAndScrollToContact({
                      basis: model.name.en.split(" ")[0] as "Daily" | "Monthly" | "Contract",
                    })
                  }
                >
                  {pickLocale(model.cta, locale)}
                </Button>
              </Card>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">{t.pricing.note}</p>
      </Container>
    </section>
  );
}
