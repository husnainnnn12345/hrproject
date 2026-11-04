"use client";

import { faqs } from "@/config/company";
import { useI18n, pickLocale } from "@/i18n/context";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FAQ() {
  const { t, locale } = useI18n();

  const items = faqs.map((faq) => ({
    id: faq.id,
    question: pickLocale(faq.question, locale),
    answer: pickLocale(faq.answer, locale),
  }));

  return (
    <section id="faq" className="bg-muted/40 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={t.faq.eyebrow}
          title={t.faq.title}
          subtitle={t.faq.subtitle}
        />
        <div className="mx-auto max-w-3xl">
          <Accordion items={items} />
        </div>
      </Container>
    </section>
  );
}
