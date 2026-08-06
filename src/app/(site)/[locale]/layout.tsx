import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Playfair_Display_SC } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../../globals.css";

import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SanityLive } from "@/sanity/lib/live";
import { getSiteSettings } from "@/sanity/lib/queries";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ['latin', 'latin-ext'],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ['latin', 'latin-ext'],
  weight: ["300", "400", "500", "600"],
});

const playfairSC = Playfair_Display_SC({
  variable: "--font-playfair-sc",
  subsets: ['latin', 'latin-ext'],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Raksha & Ridge | Authentic Sri Lankan Hospitality",
  description:
    "Raksha & Ridge creates exceptional hotel, resort, and villa experiences where genuine hospitality, personalized service, and thoughtfully curated stays transform every journey into a meaningful and unforgettable experience.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  const siteSettings = await getSiteSettings();
  // console.log("SITE SETTINGS:", siteSettings);

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${manrope.variable} ${playfairSC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Navbar lkrRate={siteSettings?.exchangeRates.find((r) => r.currencyCode === "LKR")?.rate} />
          {children}
          <Footer />
        </NextIntlClientProvider>
        <SanityLive />
      </body>
    </html>
  );
}