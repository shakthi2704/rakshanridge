import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
    properties,
    getPropertyAndRoom,
    slugifyRoomKey,
    formatPrice,
} from "@/lib/properties";
import RoomDetailHero from "@/components/properties/RoomDetailHero";
import RoomOverview from "@/components/properties/RoomOverview";
import PropertyFacilities from "@/components/properties/PropertyFacilities";
import SimilarRooms from "@/components/properties/SimilarRooms";
import MainCta from "@/components/ui/MainCta";

type Props = {
    params: Promise<{ locale: string; slug: string; room: string }>;
};

export function generateStaticParams() {
    return properties.flatMap((property) =>
        property.rooms.map((room) => ({
            slug: property.slug,
            room: slugifyRoomKey(room.key),
        }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, room: roomSlug } = await params;
    const match = getPropertyAndRoom(slug, roomSlug);
    if (!match) return {};

    const { property, room } = match;
    const t = await getTranslations("properties");

    return {
        title: `${t(`items.${property.key}.rooms.${room.key}.name`)} — ${t(
            `items.${property.key}.name`
        )} | Raksha & Ridge`,
        description: t(`items.${property.key}.rooms.${room.key}.description`),
    };
}

export default async function RoomDetailPage({ params }: Props) {
    const { slug, room: roomSlug } = await params;
    const match = getPropertyAndRoom(slug, roomSlug);

    if (!match) notFound();

    const { property, room } = match;
    const t = await getTranslations("properties");
    const currency = "USD" as const;

    const propertyName = t(`items.${property.key}.name`);
    const propertyLocation = t(`items.${property.key}.location`);
    const roomName = t(`items.${property.key}.rooms.${room.key}.name`);
    const longDescription = t(
        `items.${property.key}.rooms.${room.key}.longDescription`
    );
    const occupancyLabel = t("detail.occupancy", { count: room.occupancy });
    const sizeLabel = t("detail.roomSize", { size: room.sizeSqm });
    const bedsLabel = t("detail.beds", { count: room.beds });
    const bathroomsLabel = t("detail.bathrooms", { count: room.bathrooms });
    const priceLabel = t("detail.fromPerNight", {
        price: formatPrice(room.priceFrom, currency),
    });

    const roomIndex = property.rooms.findIndex((r) => r.key === room.key);
    const roomImage =
        property.gallery[roomIndex % property.gallery.length] ?? property.image;

    const amenities = property.amenityKeys.map((key) => ({
        key,
        name: t(`amenities.${key}.name`),
        description: t(`amenities.${key}.description`),
    }));

    const similarRooms = property.rooms
        .filter((r) => r.key !== room.key)
        .map((r) => {
            const rIndex = property.rooms.findIndex((x) => x.key === r.key);
            return {
                key: r.key,
                slug: slugifyRoomKey(r.key),
                name: t(`items.${property.key}.rooms.${r.key}.name`),
                image:
                    property.gallery[rIndex % property.gallery.length] ??
                    property.image,
                priceLabel: t("detail.fromPerNight", {
                    price: formatPrice(r.priceFrom, currency),
                }),
            };
        });

    return (
        <main className="flex flex-1 flex-col">
            <RoomDetailHero
                roomName={roomName}
                propertyName={propertyName}
                propertyLocation={propertyLocation}
                propertySlug={property.slug}
                image={roomImage}
            />

            <RoomOverview
                eyebrow={t("detail.roomOverviewEyebrow")}
                heading={roomName}
                description={longDescription}
                occupancyLabel={occupancyLabel}
                sizeLabel={sizeLabel}
                bedsLabel={bedsLabel}
                bathroomsLabel={bathroomsLabel}
                priceLabel={priceLabel}
                bookLabel={t("detail.bookNow")}
                roomKey={room.key}
                image={roomImage}
                roomName={roomName}
            />
            <PropertyFacilities
                eyebrow={t("detail.facilitiesEyebrow")}
                heading={t("detail.facilitiesHeading")}
                amenities={amenities}
            />

            <SimilarRooms
                eyebrow={t("detail.similarRoomsEyebrow")}
                heading={t("detail.similarRoomsHeading")}
                propertySlug={property.slug}
                rooms={similarRooms}
            />

            <MainCta />
        </main>
    );
}