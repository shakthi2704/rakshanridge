import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { properties, getPropertyBySlug, formatPrice } from "@/lib/properties";
import PropertyDetailHero from "@/components/properties/Property-detail/PropertyDetailHero";
import PropertyOverview from "@/components/properties/Property-detail/PropertyOverview";
import RoomTypes from "@/components/properties/Property-detail/RoomTypes";
import PropertyFacilities from "@/components/properties/Property-detail/PropertyFacilities";
import PropertyLocation from "@/components/properties/Property-detail/PropertyLocation";
import { getCurrencyContext } from "@/lib/currency";


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
    const { currency, rate } = await getCurrencyContext();

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
        priceLabel: t("detail.fromPerNight", { price: formatPrice(room.priceFrom, currency, rate) }),
    }));
    const priceLabel = t("detail.fromPerNight", { price: formatPrice(property.priceFrom, currency, rate) });


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
                highlights={{
                    heading: t("detail.propertyHighlights.heading"),
                    items: [
                        {
                            label: t("detail.propertyHighlights.accommodationLabel"),
                            value: t("detail.propertyHighlights.accommodationValue"),
                        },
                        {
                            label: t("detail.propertyHighlights.locationLabel"),
                            value: t("detail.propertyHighlights.locationValue"),
                        },
                        {
                            label: t("detail.propertyHighlights.experienceLabel"),
                            value: t("detail.propertyHighlights.experienceValue"),
                        },
                        {
                            label: t("detail.propertyHighlights.openingLabel"),
                            value: t("detail.propertyHighlights.openingValue"),
                        },
                    ],
                }}
            />
            <RoomTypes
                eyebrow={t("detail.roomsEyebrow")}
                heading={t("detail.roomsHeading")}
                rooms={rooms}
                bookLabel={t("detail.bookNow")}
                propertySlug={property.slug}
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