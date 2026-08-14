import PropertiesHero from "@/components/properties/PropertiesHero";
import PropertiesIntro from "@/components/properties/PropertiesIntro";
import PropertyCategoryBrowser from "@/components/properties/PropertyCategoryBrowser";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { getCurrencyContext } from "@/lib/currency";
import { getProperties } from "@/sanity/lib/queries";
import { adaptProperty } from "@/sanity/lib/adapters";
import type { AppLocale } from "@/sanity/lib/locale";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("properties");

    return {
        title: `${t("heading")} | Raksha & Ridge`,
        description: t("subheading"),
    };
}

export default async function Properties() {
    const { currency, rate } = await getCurrencyContext();
    const locale = (await getLocale()) as AppLocale;

    const sanityProperties = await getProperties();
    const properties = sanityProperties.map((p) => adaptProperty(p, locale));

    return (
        <main className="flex flex-1 flex-col">
            {/* <PropertiesHero /> */}
            <section className="bg-paper pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-28 xl:pt-32 2xl:pt-36">
                <PropertiesIntro />
                <PropertyCategoryBrowser currency={currency} rate={rate} properties={properties} />
            </section>

        </main>
    )
}