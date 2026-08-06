import PropertiesHero from "@/components/properties/PropertiesHero";
import PropertiesIntro from "@/components/properties/PropertiesIntro";
import PropertyCategoryBrowser from "@/components/properties/PropertyCategoryBrowser";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getSiteSettings } from "@/sanity/lib/queries";


export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("properties");

    return {
        title: `${t("heading")} | Raksha & Ridge`,
        description: t("subheading"),
    };
}

export default async function Properties() {
    const siteSettings = await getSiteSettings();
    const lkrRate = siteSettings?.exchangeRates.find((r) => r.currencyCode === "LKR")?.rate;

    return (
        <main className="flex flex-1 flex-col">
            <PropertiesHero />
            <PropertiesIntro />
            <PropertyCategoryBrowser lkrRate={lkrRate} />
        </main>
    )
}