import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { properties, getPropertyBySlug, formatPrice } from "@/lib/properties";
import PropertyDetailHero from "@/components/properties/PropertyDetailHero";
import PropertyOverview from "@/components/properties/PropertyOverview";
import RoomTypes from "@/components/properties/RoomTypes";
import PropertyLocation from "@/components/properties/PropertyLocation";

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
    return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const property = getPropertyBySlug(slug);
    if (!property) return {};

    const t = await getTranslations("properties");

    return {
        title: `${t(`items.${property.key}.name`)} | Raksha & Ridge`,
        description: t(`items.${property.key}.tagline`),
    };
}

export default async function PropertyDetailPage({ params }: Props) {
    const { slug } = await params;
    const property = getPropertyBySlug(slug);

    if (!property) notFound();

    const t = await getTranslations("properties");
    const currency = "USD" as const;

    const name = t(`items.${property.key}.name`);
    const location = t(`items.${property.key}.location`);
    const tagline = t(`items.${property.key}.tagline`);
    const description = t(`items.${property.key}.description`);
    const region = t(`regions.${property.region}`);

    const amenities = property.amenityKeys.map((key) => t(`amenities.${key}`));

    const rooms = property.rooms.map((room) => ({
        key: room.key,
        name: t(`items.${property.key}.rooms.${room.key}.name`),
        description: t(`items.${property.key}.rooms.${room.key}.description`),
        occupancyLabel: t("detail.occupancy", { count: room.occupancy }),
        priceLabel: t("detail.fromPerNight", { price: formatPrice(room.priceFrom, currency) }),
    }));

    const priceLabel = t("detail.fromPerNight", { price: formatPrice(property.priceFrom, currency) });


    return (
        <main className="flex flex-1 flex-col">
            <PropertyDetailHero
                name={name}
                location={location}
                tagline={tagline}
                gallery={property.gallery}
                priceLabel={priceLabel}
            />

            <PropertyOverview
                description={description}
                amenities={amenities}
                amenitiesHeading={t("detail.amenitiesHeading")}
                priceLabel={priceLabel}
                bookLabel={t("detail.bookThisProperty")}
            />

            <RoomTypes heading={t("detail.roomsHeading")} rooms={rooms} />

            <PropertyLocation
                heading={t("detail.locationHeading")}
                location={location}
                region={region}
                backLabel={t("detail.backToProperties")}
            />
        </main>
    );
}