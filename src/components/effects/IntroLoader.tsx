"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { company } from "@/config/company";
import { useI18n } from "@/i18n/context";
import { prefersReducedMotion } from "@/lib/utils";

export function IntroLoader() {
  const { t } = useI18n();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShow(false);
      return;
    }
    const timer = window.setTimeout(() => setShow(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-navy"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button
            type="button"
            onClick={() => setShow(false)}
            className="absolute right-4 top-4 rounded-xl px-3 py-1.5 text-xs font-semibold text-white/70 hover:bg-white/10 hover:text-white"
          >
            {t.common.skipIntro}
          </button>
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-lg font-bold text-white shadow-lift">
              HR
            </div>
            <p className="font-display text-lg font-bold text-white sm:text-xl">
              {company.shortName}
            </p>
            <p className="mt-1 text-sm text-emerald-200">{company.tagline}</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
