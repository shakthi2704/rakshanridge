import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PropertiesHero from "@/components/properties/PropertiesHero";
import PropertiesIntro from "@/components/properties/PropertiesIntro";
import PropertyCategoryBrowser from "@/components/properties/PropertyCategoryBrowser";
import PropertyEssentials from "@/components/properties/PropertyEssentials";
import MainCta from "@/components/ui/MainCta";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("properties");

    return {
        title: `${t("heading")} | Raksha & Ridge`,
        description: t("subheading"),
    };
}

export default async function Properties() {
    return (
        <main className="flex flex-1 flex-col">
            <PropertiesHero />

            <PropertiesIntro />

            <PropertyCategoryBrowser />

            <PropertyEssentials />

            <MainCta />
        </main>
    );
}