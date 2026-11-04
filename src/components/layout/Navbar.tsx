"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { company } from "@/config/company";
import { useI18n } from "@/i18n/context";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const links = [
  { href: "#services", key: "services" as const },
  { href: "#how-it-works", key: "howItWorks" as const },
  { href: "#for-businesses", key: "forBusinesses" as const },
  { href: "#why-us", key: "whyUs" as const },
  { href: "#testimonials", key: "testimonials" as const },
  { href: "#faq", key: "faq" as const },
  { href: "#contact", key: "contact" as const },
];

export function Navbar() {
  const { t, locale, toggleLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const wa = buildWhatsAppUrl(defaultWhatsAppMessage(locale));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border/60 bg-white/75 py-2 shadow-soft backdrop-blur-xl dark:bg-navy-black/75"
            : "bg-transparent py-4"
        )}
      >
        <Container className="flex items-center justify-between gap-4">
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-sm font-bold text-white shadow-soft transition group-hover:bg-secondary dark:bg-secondary dark:text-navy-black">
              HR
            </span>
            <span className="hidden min-w-0 flex-col sm:flex">
              <span className="truncate font-display text-sm font-bold leading-tight text-foreground">
                {company.shortName}
              </span>
              <span className="truncate text-[11px] text-muted-foreground">
                {company.tagline}
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-2.5 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                {t.nav[link.key]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLocale}
              className="rounded-xl border border-border bg-card/80 px-3 py-2 text-xs font-bold tracking-wide text-foreground hover:bg-muted"
              aria-label="Toggle language"
            >
              {locale === "en" ? (
                <span className="font-urdu">اردو</span>
              ) : (
                "EN"
              )}
            </button>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="hidden sm:block">
              <Button variant="whatsapp" size="sm" magnetic>
                {t.nav.getStaff}
              </Button>
            </a>
            <button
              type="button"
              className="rounded-xl border border-border bg-card p-2 lg:hidden"
              aria-label={open ? t.nav.close : t.nav.menu}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-navy-black/50 backdrop-blur-sm"
              aria-label={t.nav.close}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="absolute inset-y-0 right-0 flex w-[min(100%,22rem)] flex-col gap-2 bg-card p-6 pt-24 shadow-lift"
            >
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className="rounded-2xl px-4 py-3 font-display text-lg font-semibold text-foreground hover:bg-muted"
                >
                  {t.nav[link.key]}
                </motion.a>
              ))}
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-4"
              >
                <Button variant="whatsapp" size="lg" className="w-full">
                  {t.nav.getStaff}
                </Button>
              </a>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
