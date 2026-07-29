import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { properties, getPropertyBySlug, formatPrice } from "@/lib/properties";
import PropertyDetailHero from "@/components/properties/PropertyDetailHero";
import PropertyOverview from "@/components/properties/PropertyOverview";
import RoomTypes from "@/components/properties/RoomTypes";
import PropertyFacilities from "@/components/properties/PropertyFacilities";
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

    const amenities = property.amenityKeys.map((key) => ({
        key,
        name: t(`amenities.${key}.name`),
        description: t(`amenities.${key}.description`),
    }));
    const rooms = property.rooms.map((room) => ({
        key: room.key,
        name: t(`items.${property.key}.rooms.${room.key}.name`),
        description: t(`items.${property.key}.rooms.${room.key}.description`),
        image: property.gallery[property.rooms.indexOf(room) % property.gallery.length] ?? property.image,
        occupancyLabel: t("detail.occupancy", { count: room.occupancy }),
        sizeLabel: t("detail.roomSize", { size: room.sizeSqm }),
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
            />

            <PropertyOverview
                eyebrow={t("detail.overviewEyebrow")}
                heading={t("detail.overviewHeading")}
                description={description}
                addressLabel={t("detail.addressLabel")}
                address="No 318/1 Dutugamunu Mw, Enderamulla Wattala"
                phoneLabel={t("detail.phoneLabel")}
                phone="+94 11 234 5678"
                emailLabel={t("detail.emailLabel")}
                email="stay@rakshaandridge.com"
            />
            <RoomTypes
                eyebrow={t("detail.roomsEyebrow")}
                heading={t("detail.roomsHeading")}
                rooms={rooms}
                bookLabel={t("detail.bookNow")}
            />
            <PropertyFacilities
                eyebrow={t("detail.facilitiesEyebrow")}
                heading={t("detail.facilitiesHeading")}
                amenities={amenities}
            />
            <PropertyLocation
                eyebrow={t("detail.locationEyebrow")}
                heading={t("detail.locationHeading")}
                body={t("detail.locationBody")}
                address={property.address}
                phoneLabel={t("detail.phoneLabel")}
                phone="+94 11 234 5678"
                emailLabel={t("detail.emailLabel")}
                email="stay@rakshaandridge.com"
                directionsLabel={t("detail.getDirections")}
                reserveLabel={t("detail.reserveYourStay")}
                image={property.gallery[1] ?? property.image}
                name={name}
            />
        </main>
    );
}