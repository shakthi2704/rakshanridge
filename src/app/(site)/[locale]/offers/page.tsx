import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { getCurrencyContext } from "@/lib/currency";
import { getOffers } from "@/sanity/lib/queries";
import { adaptOffer } from "@/sanity/lib/adapters";
import type { AppLocale } from "@/sanity/lib/locale";
import OffersHero from "@/components/offers/OffersHero";
import OffersGrid from "@/components/offers/OffersGrid";
import OffersIntro from "@/components/offers/OffersIntro";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("offersPage");

    return {
        title: `${t("heading")} | Raksha & Ridge`,
        description: t("subheading"),
    };
}

function isOfferLive(validUntil: string | null): boolean {
    if (!validUntil) return true;
    return new Date(validUntil) >= new Date();
}

export default async function OffersPage() {
    const locale = (await getLocale()) as AppLocale;
    const { currency, rate } = await getCurrencyContext();

    const sanityOffers = await getOffers();
    const offers = sanityOffers
        .map((o) => adaptOffer(o, locale))
        .filter((o) => isOfferLive(o.validUntil));

    return (
        <main className="flex flex-1 flex-col">
            <OffersHero />
            <OffersIntro />
            <OffersGrid offers={offers} currency={currency} rate={rate} />
        </main>
    );
}