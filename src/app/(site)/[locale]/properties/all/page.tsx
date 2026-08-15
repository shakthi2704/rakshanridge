import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import PropertiesHero from "@/components/properties/PropertiesHero";
import PropertiesIntro from "@/components/properties/PropertiesIntro";
import PropertyFiltersBar from "@/components/properties/PropertyFiltersBar";
import PropertyResultsGrid from "@/components/properties/PropertyResultsGrid";
import { getCurrencyContext } from "@/lib/currency";
import { getPropertiesForListing } from "@/sanity/lib/queries";
import { adaptProperty } from "@/sanity/lib/adapters";
import type { AppLocale } from "@/sanity/lib/locale";
import {
    filterProperties,
    DEFAULT_PROPERTY_FILTERS,
    PROPERTY_TYPES,
    PROPERTY_REGIONS,
    PRICE_BRACKETS,
    type PropertyType,
    type PropertyRegion,
    type PriceBracketId,
} from "@/lib/properties";

type Props = {
    searchParams: Promise<{ type?: string; region?: string; price?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("properties");

    return {
        title: `${t("heading")} | Raksha & Ridge`,
        description: t("subheading"),
    };
}

export default async function AllProperties({ searchParams }: Props) {
    const { type, region, price } = await searchParams;
    const { currency, rate } = await getCurrencyContext();
    const locale = (await getLocale()) as AppLocale;

    const sanityProperties = await getPropertiesForListing();
    const properties = sanityProperties.map((p) => adaptProperty(p, locale));

    const filters = {
        type: PROPERTY_TYPES.includes(type as PropertyType)
            ? (type as PropertyType)
            : DEFAULT_PROPERTY_FILTERS.type,
        region: PROPERTY_REGIONS.includes(region as PropertyRegion)
            ? (region as PropertyRegion)
            : DEFAULT_PROPERTY_FILTERS.region,
        price: PRICE_BRACKETS.some((b) => b.id === price)
            ? (price as PriceBracketId)
            : DEFAULT_PROPERTY_FILTERS.price,
    };

    const filtered = filterProperties(properties, filters);

    return (
        <main className="flex flex-1 flex-col">


            <section className="pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-28 xl:pt-32 2xl:pt-36">
                <PropertiesIntro />

                <div className="mt-8 sm:mt-10 lg:mt-12">
                    <Suspense fallback={null}>
                        <PropertyFiltersBar resultsCount={filtered.length} />
                    </Suspense>
                </div>

                <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
                    <PropertyResultsGrid
                        properties={filtered}
                        currency={currency}
                        rate={rate}
                    />
                </div>
            </section>
        </main>
    );
}