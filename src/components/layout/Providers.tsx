"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { I18nProvider } from "@/i18n/context";
import { FormStoreProvider } from "@/lib/form-store";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { IntroLoader } from "@/components/effects/IntroLoader";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <I18nProvider>
        <FormStoreProvider>
          <SmoothScroll />
          <ScrollProgress />
          <CursorGlow />
          <IntroLoader />
          {children}
          <WhatsAppFloat />
        </FormStoreProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
