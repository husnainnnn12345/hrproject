import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ForBusinesses } from "@/components/sections/ForBusinesses";
import { StaffWizard } from "@/components/sections/StaffWizard";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { company } from "@/config/company";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EmploymentAgency",
  name: company.name,
  description: company.description,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://hrstaffoutsourcing.com",
  telephone: company.contact.phone,
  email: company.contact.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: company.location.city,
    addressCountry: "PK",
  },
  areaServed: "Pakistan",
  slogan: company.tagline,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Stats />
        <Services />
        <HowItWorks />
        <ForBusinesses />
        <StaffWizard />
        <WhyUs />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
