"use client";

import { company } from "@/config/company";
import { useI18n } from "@/i18n/context";
import { Container } from "@/components/ui/Container";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";

const footerLinks = [
  { href: "#services", key: "services" as const },
  { href: "#how-it-works", key: "howItWorks" as const },
  { href: "#for-businesses", key: "forBusinesses" as const },
  { href: "#wizard", key: "findStaff" as const },
  { href: "#faq", key: "faq" as const },
  { href: "#contact", key: "contact" as const },
];

export function Footer() {
  const { t, locale } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="relative overflow-hidden border-t border-border bg-navy text-white">
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
      <Container className="relative grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary font-bold text-navy-black">
              HR
            </span>
            <div>
              <p className="font-display text-lg font-bold">{company.name}</p>
              <p className="text-sm text-emerald-200">{company.tagline}</p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-slate-300">
            {t.footer.blurb}
          </p>
          <p className="mt-4 text-sm font-medium text-accent">{t.footer.promise}</p>
        </div>

        <div>
          <p className="mb-4 font-display text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
            {t.footer.quickLinks}
          </p>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  {t.nav[link.key]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-display text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
            {t.footer.contact}
          </p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>{company.contact.address}</li>
            <li>
              <a className="hover:text-white" href={`tel:${company.contact.phone}`}>
                {company.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={`mailto:${company.contact.email}`}>
                {company.contact.email}
              </a>
            </li>
            <li>
              <a
                className="font-semibold text-whatsapp hover:brightness-110"
                href={buildWhatsAppUrl(defaultWhatsAppMessage(locale))}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        © {year} {company.name}. {t.footer.rights}
      </div>
    </footer>
  );
}
