import { company } from "@/config/company";

export function buildWhatsAppUrl(message: string) {
  const phone = company.contact.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string) {
  if (typeof window === "undefined") return;
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}

export function defaultWhatsAppMessage(locale: "en" | "ur" = "en") {
  if (locale === "ur") {
    return `Assalam o Alaikum! Main ${company.shortName} se staff request karna chahta/chahti hoon. Barah-e-karam guide karein.`;
  }
  return `Hello! I'd like to request staff from ${company.name}. Please guide me.`;
}
