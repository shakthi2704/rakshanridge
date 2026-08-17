import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import Container from "@/components/ui/Container";
import BookingExperience from "@/components/book/BookingContextPanel";
import { getCurrencyContext } from "@/lib/currency";
import { getProperties, getSanityOfferBySlug } from "@/sanity/lib/queries";
import { adaptProperty } from "@/sanity/lib/adapters";
import type { AppLocale } from "@/sanity/lib/locale";
import { pickLocale } from "@/sanity/lib/locale";

type Props = {
    searchParams: Promise<{ property?: string; room?: string; offer?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("bookPage");

    return {
        title: `${t("heading")} | Raksha & Ridge`,
        description: t("subheading"),
    };
}

export default async function BookPage({ searchParams }: Props) {
    const { property: propertySlug, room: roomSlug, offer: offerSlug } = await searchParams;
    const locale = (await getLocale()) as AppLocale;
    const { currency, rate } = await getCurrencyContext();
    const t = await getTranslations("bookPage.form");

    const rawProperties = await getProperties();
    const properties = rawProperties.map((p) => adaptProperty(p, locale));

    // If arriving from an offer card, resolve its title and pre-fill the
    // inquiry message so the concierge team knows which offer this refers to.
    // This is a text pre-fill only — no discount math or schema changes,
    // since a person confirms final pricing/terms with the guest directly.
    let initialMessage: string | undefined;
    if (offerSlug) {
        const offer = await getSanityOfferBySlug(offerSlug);
        if (offer) {
            initialMessage = t("offerMessagePrefix", { offer: pickLocale(offer.title, locale) });
        }
    }

    return (
        <main className="flex flex-1 flex-col bg-mist">
            <section className="flex min-h-screen items-center pt-32 pb-16 lg:pt-40 lg:pb-24">
                <Container>
                    <BookingExperience
                        properties={properties}
                        initialPropertySlug={propertySlug}
                        initialRoomSlug={roomSlug}
                        initialMessage={initialMessage}
                        currency={currency}
                        rate={rate}
                    />
                </Container>
            </section>
        </main>
    );
}