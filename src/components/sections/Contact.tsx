"use client";

import { useEffect, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import { company, services } from "@/config/company";
import { useI18n, pickLocale } from "@/i18n/context";
import { useFormStore } from "@/lib/form-store";
import { buildWhatsAppUrl, defaultWhatsAppMessage, openWhatsApp } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/effects/Reveal";
import { cn } from "@/lib/utils";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone required"),
  email: z.string().email().optional().or(z.literal("")),
  audience: z.enum(["home", "business"]),
  service: z.string().min(1, "Select a service"),
  basis: z.enum(["Daily", "Monthly", "Contract"]),
  message: z.string().min(5, "Please add a short note"),
});

type FormValues = z.infer<typeof schema>;

export function Contact() {
  const { t, locale } = useI18n();
  const {
    selectedService,
    selectedAudience,
    selectedBasis,
    setSelectedService,
  } = useFormStore();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      audience: "home",
      service: services[0].id,
      basis: "Monthly",
      message: "",
    },
  });

  useEffect(() => {
    if (selectedService) setValue("service", selectedService);
    if (selectedAudience) setValue("audience", selectedAudience);
    if (selectedBasis) setValue("basis", selectedBasis);
  }, [selectedService, selectedAudience, selectedBasis, setValue]);

  const onSubmit = async (values: FormValues) => {
    const serviceTitle = pickLocale(
      services.find((s) => s.id === values.service)?.title ?? {
        en: values.service,
        ur: values.service,
      },
      locale
    );

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "contact", ...values, locale }),
      });
    } catch {
      // still open WhatsApp as fallback
    }

    const msg =
      locale === "ur"
        ? `Assalam o Alaikum! Contact form:\nName: ${values.name}\nPhone: ${values.phone}\nType: ${values.audience}\nService: ${serviceTitle}\nBasis: ${values.basis}\nMessage: ${values.message}`
        : `Hello! Contact form request:\nName: ${values.name}\nPhone: ${values.phone}\nType: ${values.audience}\nService: ${serviceTitle}\nBasis: ${values.basis}\nMessage: ${values.message}`;

    openWhatsApp(msg);
    setSelectedService("");
    reset({
      name: "",
      phone: "",
      email: "",
      audience: values.audience,
      service: values.service,
      basis: values.basis,
      message: "",
    });
  };

  return (
    <section id="contact" className="bg-background py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <Card>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t.contact.name} error={errors.name?.message}>
                    <input
                      {...register("name")}
                      className={inputClass}
                      autoComplete="name"
                    />
                  </Field>
                  <Field label={t.contact.phone} error={errors.phone?.message}>
                    <input
                      {...register("phone")}
                      type="tel"
                      className={inputClass}
                      autoComplete="tel"
                    />
                  </Field>
                </div>
                <Field label={t.contact.email} error={errors.email?.message}>
                  <input
                    {...register("email")}
                    type="email"
                    className={inputClass}
                    autoComplete="email"
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label={t.contact.audience} error={errors.audience?.message}>
                    <select {...register("audience")} className={inputClass}>
                      <option value="home">{t.contact.home}</option>
                      <option value="business">{t.contact.business}</option>
                    </select>
                  </Field>
                  <Field label={t.contact.service} error={errors.service?.message}>
                    <select {...register("service")} className={inputClass}>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {pickLocale(s.title, locale)}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label={t.contact.basis} error={errors.basis?.message}>
                    <select {...register("basis")} className={inputClass}>
                      {company.engagementModels.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label={t.contact.message} error={errors.message?.message}>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder={t.contact.messagePlaceholder}
                    className={cn(inputClass, "resize-y")}
                  />
                </Field>

                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                  magnetic
                >
                  {isSubmitting ? t.contact.sending : t.contact.submit}
                </Button>
                {isSubmitSuccessful ? (
                  <p className="text-sm font-medium text-secondary">{t.contact.success}</p>
                ) : null}
              </form>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between gap-6 rounded-3xl bg-navy p-6 text-white sm:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
                  {t.contact.whatsappCta}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold">
                  {company.tagline}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {company.description}
                </p>
                <ul className="mt-6 space-y-2 text-sm text-slate-200">
                  <li>{company.contact.address}</li>
                  <li>{company.contact.phoneDisplay}</li>
                  <li>{company.contact.email}</li>
                </ul>
              </div>
              <a
                href={buildWhatsAppUrl(defaultWhatsAppMessage(locale))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="lg" className="w-full" magnetic>
                  <MessageCircle className="h-5 w-5" />
                  {t.hero.ctaWhatsapp}
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-xs font-semibold text-muted-foreground">
      {label}
      {children}
      {error ? <span className="mt-1 block text-xs text-red-500">{error}</span> : null}
    </label>
  );
}
