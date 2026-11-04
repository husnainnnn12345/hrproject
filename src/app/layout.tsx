import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Noto_Nastaliq_Urdu } from "next/font/google";
import { company } from "@/config/company";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const urdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-urdu",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://hrstaffoutsourcing.com"),
  title: {
    default: `${company.name} | ${company.tagline}`,
    template: `%s | ${company.shortName}`,
  },
  description: company.description,
  keywords: [
    "staff outsourcing Pakistan",
    "housemaid Lahore",
    "office boy hiring",
    "manpower supply",
    "cleaning staff",
    "corporate staffing Lahore",
    "HR staffing Pakistan",
  ],
  openGraph: {
    title: `${company.name} | ${company.tagline}`,
    description: company.description,
    locale: "en_PK",
    type: "website",
    siteName: company.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} | ${company.tagline}`,
    description: company.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0B1F4B" },
    { media: "(prefers-color-scheme: dark)", color: "#070F24" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${body.variable} ${urdu.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
