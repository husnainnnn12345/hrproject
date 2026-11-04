"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Home, Users } from "lucide-react";
import { company, services, type ServiceId } from "@/config/company";
import { useI18n, pickLocale } from "@/i18n/context";
import { openWhatsApp } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type WizardState = {
  audience: "home" | "business" | "";
  service: ServiceId | "";
  count: number;
  basis: "Daily" | "Monthly" | "Contract" | "";
  city: string;
  phone: string;
};

const TOTAL_STEPS = 6;

export function StaffWizard() {
  const { t, locale } = useI18n();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardState>({
    audience: "",
    service: "",
    count: 1,
    basis: "",
    city: company.cities[0],
    phone: "",
  });

  const serviceOptions = useMemo(() => {
    if (!data.audience) return services;
    return services.filter((s) =>
      (s.audience as readonly string[]).includes(data.audience)
    );
  }, [data.audience]);

  const canNext = () => {
    if (step === 0) return !!data.audience;
    if (step === 1) return !!data.service;
    if (step === 2) return data.count >= 1;
    if (step === 3) return !!data.basis;
    if (step === 4) return !!data.city;
    if (step === 5) return data.phone.trim().length >= 10;
    return false;
  };

  const serviceTitle = data.service
    ? pickLocale(services.find((s) => s.id === data.service)!.title, locale)
    : "";

  const finish = () => {
    const msg =
      locale === "ur"
        ? `Assalam o Alaikum! Find My Staff request:\nType: ${data.audience}\nService: ${serviceTitle}\nCount: ${data.count}\nBasis: ${data.basis}\nCity: ${data.city}\nPhone: ${data.phone}`
        : `Hello! Find My Staff request:\nType: ${data.audience}\nService: ${serviceTitle}\nCount: ${data.count}\nBasis: ${data.basis}\nCity: ${data.city}\nPhone: ${data.phone}`;
    openWhatsApp(msg);
    void fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "wizard", ...data, locale }),
    });
  };

  return (
    <section id="wizard" className="bg-muted/50 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={t.wizard.eyebrow}
          title={t.wizard.title}
          subtitle={t.wizard.subtitle}
        />

        <Card className="mx-auto max-w-2xl overflow-hidden p-0">
          <div className="border-b border-border bg-navy px-5 py-4 text-white">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-emerald-200">
              <span>
                {t.wizard.progress} {step + 1} {t.wizard.of} {TOTAL_STEPS}
              </span>
              <span>{Math.round(((step + 1) / TOTAL_STEPS) * 100)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/15">
              <motion.div
                className="h-full rounded-full bg-secondary"
                animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </div>

          <div className="min-h-[280px] p-5 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28 }}
              >
                {step === 0 && (
                  <div>
                    <h3 className="font-display text-xl font-bold">{t.wizard.whoTitle}</h3>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {(
                        [
                          {
                            id: "home" as const,
                            title: t.wizard.whoHome,
                            desc: t.wizard.whoHomeDesc,
                            Icon: Home,
                          },
                          {
                            id: "business" as const,
                            title: t.wizard.whoBusiness,
                            desc: t.wizard.whoBusinessDesc,
                            Icon: Building2,
                          },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() =>
                            setData((d) => ({
                              ...d,
                              audience: opt.id,
                              service: "",
                            }))
                          }
                          className={cn(
                            "rounded-2xl border p-4 text-left transition",
                            data.audience === opt.id
                              ? "border-secondary bg-secondary/10"
                              : "border-border hover:border-secondary/40"
                          )}
                        >
                          <opt.Icon className="mb-2 h-6 w-6 text-secondary" />
                          <p className="font-semibold">{opt.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{opt.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <h3 className="font-display text-xl font-bold">{t.wizard.whatTitle}</h3>
                    <div className="mt-5 grid max-h-64 gap-2 overflow-y-auto">
                      {serviceOptions.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setData((d) => ({ ...d, service: s.id }))}
                          className={cn(
                            "rounded-xl border px-4 py-3 text-left text-sm font-medium transition",
                            data.service === s.id
                              ? "border-secondary bg-secondary/10"
                              : "border-border hover:bg-muted"
                          )}
                        >
                          {pickLocale(s.title, locale)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="font-display text-xl font-bold">{t.wizard.howManyTitle}</h3>
                    <div className="mt-8 flex items-center justify-center gap-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          setData((d) => ({
                            ...d,
                            count: Math.max(1, d.count - 1),
                          }))
                        }
                      >
                        −
                      </Button>
                      <div className="flex items-center gap-2 font-display text-5xl font-bold text-navy dark:text-secondary">
                        <Users className="h-8 w-8 text-secondary" />
                        {data.count}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          setData((d) => ({ ...d, count: Math.min(100, d.count + 1) }))
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h3 className="font-display text-xl font-bold">{t.wizard.basisTitle}</h3>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {company.engagementModels.map((basis) => (
                        <button
                          key={basis}
                          type="button"
                          onClick={() => setData((d) => ({ ...d, basis }))}
                          className={cn(
                            "rounded-2xl border px-4 py-5 font-semibold transition",
                            data.basis === basis
                              ? "border-secondary bg-secondary text-white"
                              : "border-border hover:border-secondary/50"
                          )}
                        >
                          {basis}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h3 className="font-display text-xl font-bold">{t.wizard.cityTitle}</h3>
                    <select
                      value={data.city}
                      onChange={(e) =>
                        setData((d) => ({ ...d, city: e.target.value }))
                      }
                      className="mt-5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"
                    >
                      {company.cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {step === 5 && (
                  <div>
                    <h3 className="font-display text-xl font-bold">{t.wizard.phoneTitle}</h3>
                    <input
                      type="tel"
                      value={data.phone}
                      onChange={(e) =>
                        setData((d) => ({ ...d, phone: e.target.value }))
                      }
                      placeholder={t.wizard.phonePlaceholder}
                      className="mt-5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm"
                    />
                    <div className="mt-5 rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
                      <p className="font-semibold text-foreground">{t.wizard.summary}</p>
                      <ul className="mt-2 space-y-1">
                        <li>{data.audience}</li>
                        <li>{serviceTitle}</li>
                        <li>
                          {data.count} · {data.basis} · {data.city}
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-4 sm:px-8">
            <Button
              type="button"
              variant="ghost"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              {t.wizard.back}
            </Button>
            {step < TOTAL_STEPS - 1 ? (
              <Button
                type="button"
                variant="secondary"
                disabled={!canNext()}
                onClick={() => setStep((s) => s + 1)}
              >
                {t.wizard.next}
              </Button>
            ) : (
              <Button
                type="button"
                variant="whatsapp"
                disabled={!canNext()}
                onClick={finish}
              >
                {t.wizard.finish}
              </Button>
            )}
          </div>
        </Card>
      </Container>
    </section>
  );
}
