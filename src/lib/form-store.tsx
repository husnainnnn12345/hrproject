"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ServiceId } from "@/config/company";

type FormStore = {
  selectedService: ServiceId | "";
  selectedAudience: "home" | "business" | "";
  selectedBasis: "Daily" | "Monthly" | "Contract" | "";
  setSelectedService: (id: ServiceId | "") => void;
  setSelectedAudience: (v: "home" | "business" | "") => void;
  setSelectedBasis: (v: "Daily" | "Monthly" | "Contract" | "") => void;
  prefillAndScrollToContact: (opts?: {
    service?: ServiceId;
    audience?: "home" | "business";
    basis?: "Daily" | "Monthly" | "Contract";
  }) => void;
};

const FormStoreContext = createContext<FormStore | null>(null);

export function FormStoreProvider({ children }: { children: ReactNode }) {
  const [selectedService, setSelectedService] = useState<ServiceId | "">("");
  const [selectedAudience, setSelectedAudience] = useState<"home" | "business" | "">("");
  const [selectedBasis, setSelectedBasis] = useState<"Daily" | "Monthly" | "Contract" | "">("");

  const prefillAndScrollToContact = useCallback(
    (opts?: {
      service?: ServiceId;
      audience?: "home" | "business";
      basis?: "Daily" | "Monthly" | "Contract";
    }) => {
      if (opts?.service) setSelectedService(opts.service);
      if (opts?.audience) setSelectedAudience(opts.audience);
      if (opts?.basis) setSelectedBasis(opts.basis);
      const el = document.getElementById("contact");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  const value = useMemo(
    () => ({
      selectedService,
      selectedAudience,
      selectedBasis,
      setSelectedService,
      setSelectedAudience,
      setSelectedBasis,
      prefillAndScrollToContact,
    }),
    [
      selectedService,
      selectedAudience,
      selectedBasis,
      prefillAndScrollToContact,
    ]
  );

  return (
    <FormStoreContext.Provider value={value}>{children}</FormStoreContext.Provider>
  );
}

export function useFormStore() {
  const ctx = useContext(FormStoreContext);
  if (!ctx) throw new Error("useFormStore must be used within FormStoreProvider");
  return ctx;
}
