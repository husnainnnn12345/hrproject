"use client";

import { useState } from "react";
import { Check, Building2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { industries } from "@/config/company";
import { useI18n, pickLocale } from "@/i18n/context";
import { useFormStore } from "@/lib/form-store";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/effects/Reveal";
import { cn } from "@/lib/utils";

export function ForBusinesses() {
  const { t, locale } = useI18n();
  const { prefillAndScrollToContact } = useFormStore();
  const [active, setActive] = useState<(typeof industries)[number]["id"]>(
    industries[0].id
  );
  const current = industries.find((i) => i.id === active) ?? industries[0];

  return (
    <section id="for-businesses" className="relative overflow-hidden bg-navy py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
      <Container className="relative">
        <SectionHeading
          light
          eyebrow={t.b2b.eyebrow}
          title={t.b2b.title}
          subtitle={t.b2b.subtitle}
        />

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <Reveal>
            <div className="flex flex-wrap gap-2 lg:flex-col">
              {industries.map((industry) => (
                <button
                  key={industry.id}
                  type="button"
                  onClick={() => setActive(industry.id)}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition",
                    active === industry.id
                      ? "border-secondary bg-secondary text-navy-black"
                      : "border-white/15 bg-white/5 text-white hover:bg-white/10"
                  )}
                >
                  {pickLocale(industry.label, locale)}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-md sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/20 text-secondary">
                      <Building2 className="h-6 w-6" />
                    </span>
                    <h3 className="font-display text-2xl font-bold">
                      {pickLocale(current.label, locale)}
                    </h3>
                  </div>
                  <p className="text-slate-300">{pickLocale(current.benefits, locale)}</p>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
                        {t.b2b.typicalRoles}
                      </p>
                      <ul className="space-y-2">
                        {current.roles[locale].map((role) => (
                          <li key={role} className="flex items-start gap-2 text-sm text-slate-200">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                            {role}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
                        {t.b2b.bulletsTitle}
                      </p>
                      <ul className="space-y-2">
                        {t.b2b.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-slate-200">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    size="lg"
                    magnetic
                    className="mt-8"
                    onClick={() =>
                      prefillAndScrollToContact({
                        audience: "business",
                        service: "corporate",
                        basis: "Contract",
                      })
                    }
                  >
                    {t.b2b.cta}
                  </Button>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
