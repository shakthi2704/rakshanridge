import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
    properties,
    getPropertyAndRoom,
    slugifyRoomKey,
    formatPrice,
} from "@/lib/properties";
import RoomDetailHero from "@/components/properties/room-detail/RoomDetailHero";
import RoomOverview from "@/components/properties/room-detail/RoomOverview";
import SimilarRooms from "@/components/properties/room-detail/SimilarRooms";
import RoomExperiences from "@/components/properties/room-detail/RoomExperiences";
// import RoomArrival from "@/components/properties/RoomArrival";
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
    const tExperiences = await getTranslations("experiences");
    const currency = "USD" as const;

    const propertyName = t(`items.${property.key}.name`);
    const propertyLocation = t(`items.${property.key}.location`);
    const roomName = t(`items.${property.key}.rooms.${room.key}.name`);
    const longDescription = t(
        `items.${property.key}.rooms.${room.key}.longDescription`
    );
    const sizeLabel = t("detail.roomSize", { size: room.sizeSqm });
    const priceLabel = t("detail.fromPerNight", {
        price: formatPrice(room.priceFrom, currency),
    });

    const roomIndex = property.rooms.findIndex((r) => r.key === room.key);
    const roomImage =
        property.gallery[roomIndex % property.gallery.length] ?? property.image;
    const roomSecondaryImage =
        property.gallery[(roomIndex + 1) % property.gallery.length] ??
        property.image;

    const amenities = property.amenityKeys.map((key) => ({
        key,
        name: t(`amenities.${key}.name`),
        description: t(`amenities.${key}.description`),
    }));

    const experienceImageOne =
        property.gallery[(roomIndex + 2) % property.gallery.length] ??
        property.image;
    const experienceImageTwo =
        property.gallery[(roomIndex + 3) % property.gallery.length] ??
        property.image;

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
                occupancy={room.occupancy}
                sizeLabel={sizeLabel}
                beds={room.beds}
                bathrooms={room.bathrooms}
                guestsCaption={t("detail.statGuests")}
                sizeCaption={t("detail.statSize")}
                bedsCaption={t("detail.statBeds")}
                bathsCaption={t("detail.statBaths")}
                priceLabel={priceLabel}
                bookLabel={t("detail.bookNow")}
                checkAvailabilityLabel={t("detail.checkAvailability")}
                roomKey={room.key}
                image={roomImage}
                secondaryImage={roomSecondaryImage}
                roomName={roomName}
            />
            <RoomExperiences
                heading={t("detail.curatedHeading")}
                intro={t("detail.curatedIntro")}
                amenities={amenities}
                imageOne={experienceImageOne}
                imageTwo={experienceImageTwo}
                captionOne={{
                    title: tExperiences("items.ceylonTeaTrails.title"),
                    description: tExperiences("items.ceylonTeaTrails.description"),
                }}
                captionTwo={{
                    title: tExperiences("items.coastalExcursions.title"),
                    description: tExperiences("items.coastalExcursions.description"),
                }}
            />
            <SimilarRooms
                eyebrow={t("detail.similarRoomsEyebrow")}
                heading={t("detail.similarRoomsHeading")}
                exploreLabel={t("detail.exploreRoom")}
                propertySlug={property.slug}
                rooms={similarRooms}
            />

            <MainCta />
        </main>
    );
}