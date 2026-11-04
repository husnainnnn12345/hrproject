"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  Coffee,
  Home,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { company, services } from "@/config/company";
import { useI18n, pickLocale } from "@/i18n/context";
import { useFormStore } from "@/lib/form-store";
import { buildWhatsAppUrl, defaultWhatsAppMessage, openWhatsApp } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

const orbitIcons = [Sparkles, Home, Coffee, Wrench, Building2, ShieldCheck];

export function Hero() {
  const { t, locale } = useI18n();
  const { setSelectedService, setSelectedAudience, prefillAndScrollToContact } =
    useFormStore();
  const [wordIndex, setWordIndex] = useState(0);
  const [service, setService] = useState(services[0].id);
  const [audience, setAudience] = useState<"home" | "business">("home");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const id = window.setInterval(() => {
      setWordIndex((i) => (i + 1) % t.hero.rotator.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [t.hero.rotator.length]);

  const onQuickSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSelectedService(service);
    setSelectedAudience(audience);
    const serviceTitle = pickLocale(
      services.find((s) => s.id === service)!.title,
      locale
    );
    const msg =
      locale === "ur"
        ? `Assalam o Alaikum! Quick Request:\nService: ${serviceTitle}\nType: ${audience === "home" ? "Ghar" : "Business"}\nPhone: ${phone}\nPlease guide.`
        : `Hello! Quick Request:\nService: ${serviceTitle}\nType: ${audience === "home" ? "Home" : "Business"}\nPhone: ${phone}\nPlease guide me.`;
    openWhatsApp(msg);
    void fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "hero-quick",
        service,
        audience,
        phone,
        locale,
      }),
    });
  };

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="absolute inset-0 mesh-hero grain" />
      <div className="pointer-events-none absolute -left-10 top-24 h-40 w-40 animate-float rounded-full bg-secondary/30 blur-2xl" />
      <div className="pointer-events-none absolute right-10 top-40 h-32 w-32 animate-float rounded-full bg-blue-400/30 blur-2xl [animation-delay:1s]" />

      <Container className="relative z-10 grid items-center gap-12 pb-16 lg:grid-cols-2 lg:pb-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge tone="gold" className="mb-5 bg-white/15 text-accent backdrop-blur">
              {t.hero.eyebrow}
            </Badge>
            <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="block text-white/90">{company.shortName}</span>
              <span className="mt-2 block">
                {t.hero.before}{" "}
                <span className="relative inline-flex min-h-[1.1em] min-w-[8ch] items-center text-accent">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={t.hero.rotator[wordIndex]}
                      initial={{ y: 18, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -18, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-x-0"
                    >
                      {t.hero.rotator[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                  <span className="invisible">{t.hero.rotator[0]}</span>
                </span>{" "}
                {t.hero.after}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
              {t.hero.subheading}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={buildWhatsAppUrl(defaultWhatsAppMessage(locale))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="lg" magnetic>
                  <MessageCircle className="h-5 w-5" />
                  {t.hero.ctaWhatsapp}
                </Button>
              </a>
              <Button
                variant="outline"
                size="lg"
                magnetic
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                onClick={() => prefillAndScrollToContact()}
              >
                {t.hero.ctaRequest}
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {company.trustChips.map((chip) => (
                <span
                  key={chip.en}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-secondary" />
                  {pickLocale(chip, locale)}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={onQuickSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8"
          >
            <Card glass className="border-white/25 bg-white/95 p-4 dark:bg-card/90 sm:p-5">
              <p className="mb-3 font-display text-sm font-bold text-foreground">
                {t.hero.quickTitle}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-xs font-semibold text-muted-foreground">
                  {t.hero.quickService}
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value as typeof service)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground"
                    required
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {pickLocale(s.title, locale)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs font-semibold text-muted-foreground">
                  {t.hero.quickAudience}
                  <select
                    value={audience}
                    onChange={(e) =>
                      setAudience(e.target.value as "home" | "business")
                    }
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground"
                  >
                    <option value="home">{t.hero.quickHome}</option>
                    <option value="business">{t.hero.quickBusiness}</option>
                  </select>
                </label>
                <label className="block text-xs font-semibold text-muted-foreground sm:col-span-2">
                  {t.hero.quickPhone}
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="03XX XXXXXXX"
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground"
                    required
                  />
                </label>
              </div>
              <Button type="submit" variant="secondary" className="mt-4 w-full" magnetic>
                {t.hero.quickSubmit}
              </Button>
            </Card>
          </motion.form>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="relative mx-auto aspect-square w-full max-w-md lg:max-w-lg"
        >
          {/* Placeholder slot for future hero imagery / video */}
          <div className="absolute inset-6 z-0 flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/30 bg-white/5 text-center backdrop-blur-sm">
            <p className="text-sm font-semibold text-white/80">{t.hero.imagePlaceholder}</p>
            <p className="mt-1 max-w-[14rem] text-xs text-white/55">{t.hero.imageHint}</p>
          </div>

          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="absolute h-36 w-36 rounded-full bg-secondary/30 blur-2xl" />
            <div className="relative flex h-28 w-28 flex-col items-center justify-center rounded-3xl bg-white text-navy shadow-lift dark:bg-card">
              <ShieldCheck className="h-10 w-10 text-secondary" />
              <span className="mt-1 text-[10px] font-bold uppercase tracking-wider">
                Verified
              </span>
            </div>
            <div className="animate-orbit absolute inset-8 motion-reduce:animate-none">
              {orbitIcons.map((Icon, i) => {
                const angle = (i / orbitIcons.length) * 360;
                return (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translate(0, -42%) rotate(-${angle}deg)`,
                    }}
                  >
                    <div className="flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/30 bg-white/95 text-navy shadow-soft dark:bg-card">
                      <Icon className="h-5 w-5 text-secondary" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
