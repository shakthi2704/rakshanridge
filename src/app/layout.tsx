import type { Metadata } from "next";
import { Fraunces, Manrope, Playfair_Display_SC } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navvar";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfairSC = Playfair_Display_SC({
  variable: "--font-playfair-sc",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Raksha & Ridge | Authentic Sri Lankan Hospitality",
  description:
    "Raksha & Ridge creates exceptional hotel, resort, and villa experiences where genuine hospitality, personalized service, and thoughtfully curated stays transform every journey into a meaningful and unforgettable experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${playfairSC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}