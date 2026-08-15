import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { formatPrice } from "@/lib/properties";
import PropertyDetailHero from "@/components/properties/Property-detail/PropertyDetailHero";
import PropertyOverview from "@/components/properties/Property-detail/PropertyOverview";
import RoomTypes from "@/components/properties/Property-detail/RoomTypes";
import PropertyFacilities from "@/components/properties/Property-detail/PropertyFacilities";
import PropertyLocation from "@/components/properties/Property-detail/PropertyLocation";
import { getCurrencyContext } from "@/lib/currency";
import { getProperties, getSanityPropertyBySlug } from "@/sanity/lib/queries";
import { adaptProperty } from "@/sanity/lib/adapters";
import type { AppLocale } from "@/sanity/lib/locale";
import { RESERVATION_EMAIL } from "@/lib/constants";

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
    const properties = await getProperties();
    return properties.map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, locale } = await params;
    const raw = await getSanityPropertyBySlug(slug);
    if (!raw) return {};

    const property = adaptProperty(raw, locale as AppLocale);

    return {
        title: `${property.name} | Raksha & Ridge`,
        description: property.tagline,
    };
}

export default async function PropertyDetailPage({ params }: Props) {
    const { slug, locale } = await params;
    const raw = await getSanityPropertyBySlug(slug);

    if (!raw) notFound();

    const property = adaptProperty(raw, locale as AppLocale);

    const t = await getTranslations("properties");
    const { currency, rate } = await getCurrencyContext();

    const amenities = property.amenityKeys.map((key) => ({
        key,
        name: t(`amenities.${key}.name`),
        description: t(`amenities.${key}.description`),
    }));
    const rooms = property.rooms.map((room, i) => ({
        key: room.slug,
        name: room.name,
        description: room.description,
        image: property.gallery[i % property.gallery.length] ?? property.image,
        occupancyLabel: t("detail.occupancy", { count: room.occupancy }),
        sizeLabel: t("detail.roomSize", { size: room.sizeSqm }),
        priceLabel: t("detail.fromPerNight", { price: formatPrice(room.priceFrom, currency, rate) }),
    }));


    return (
        <main className="flex flex-1 flex-col">

            <PropertyDetailHero
                name={property.name}
                location={property.location}
                tagline={property.tagline}
                gallery={property.gallery}
            />
            <PropertyOverview
                eyebrow={t("detail.overviewEyebrow")}
                heading={t("detail.overviewHeading")}
                description={property.description}
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
                email={RESERVATION_EMAIL}
                directionsLabel={t("detail.getDirections")}
                reserveLabel={t("detail.reserveYourStay")}
                image={property.gallery[1] ?? property.image}
                name={property.name}
            />

        </main>
    );
}