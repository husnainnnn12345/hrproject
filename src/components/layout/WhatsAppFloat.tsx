"use client";

import { MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  const { locale, t } = useI18n();

  return (
    <a
      href={buildWhatsAppUrl(defaultWhatsAppMessage(locale))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.hero.ctaWhatsapp}
      className="fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lift transition hover:-translate-y-1 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-whatsapp md:bottom-8 md:right-8"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 animate-ping rounded-full bg-white/80" />
    </a>
  );
}
