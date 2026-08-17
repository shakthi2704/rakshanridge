import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { formatPrice } from "@/lib/properties";
import RoomDetailHero from "@/components/properties/room-detail/RoomDetailHero";
import RoomOverview from "@/components/properties/room-detail/RoomOverview";
import SimilarRooms from "@/components/properties/room-detail/SimilarRooms";
import RoomExperiences from "@/components/properties/room-detail/RoomExperiences";
import MainCta from "@/components/ui/MainCta";
import { getCurrencyContext } from "@/lib/currency";
import { getProperties, getSanityPropertyBySlug } from "@/sanity/lib/queries";
import { adaptProperty } from "@/sanity/lib/adapters";
import type { AppLocale } from "@/sanity/lib/locale";

type Props = {
    params: Promise<{ locale: string; slug: string; room: string }>;
    searchParams: Promise<{ offer?: string }>;
};

export async function generateStaticParams() {
    const properties = await getProperties();
    return properties.flatMap((property) =>
        (property.rooms ?? []).map((room) => ({
            slug: property.slug.current,
            room: room.slug.current,
        }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, room: roomSlug, locale } = await params;
    const raw = await getSanityPropertyBySlug(slug);
    if (!raw) return {};

    const property = adaptProperty(raw, locale as AppLocale);
    const room = property.rooms.find((r) => r.slug === roomSlug);
    if (!room) return {};

    return {
        title: `${room.name} — ${property.name} | Raksha & Ridge`,
        description: room.description,
    };
}

export default async function RoomDetailPage({ params, searchParams }: Props) {
    const { slug, room: roomSlug, locale } = await params;
    const { offer: offerSlug } = await searchParams;
    const raw = await getSanityPropertyBySlug(slug);

    if (!raw) notFound();

    const property = adaptProperty(raw, locale as AppLocale);
    const room = property.rooms.find((r) => r.slug === roomSlug);

    if (!room) notFound();

    const t = await getTranslations("properties");

    const { currency, rate } = await getCurrencyContext();

    const sizeLabel = t("detail.roomSize", { size: room.sizeSqm });
    const priceLabel = t("detail.fromPerNight", {
        price: formatPrice(room.priceFrom, currency, rate),
    });

    const roomIndex = property.rooms.findIndex((r) => r.slug === room.slug);
    const fallbackRoomImage = (offset: number) =>
        property.gallery[(roomIndex + offset) % property.gallery.length] ??
        property.image;

    const roomImage = room.gallery[0] ?? fallbackRoomImage(0);
    const roomSecondaryImage = room.gallery[1] ?? fallbackRoomImage(1);

    const amenities = property.amenityKeys.map((key) => ({
        key,
        name: t(`amenities.${key}.name`),
        description: t(`amenities.${key}.description`),
    }));



    const [experienceOne, experienceTwo] = property.experiences;
    const fallbackExperienceImage = (offset: number) =>
        property.gallery[(roomIndex + offset) % property.gallery.length] ??
        property.image;

    const similarRooms = property.rooms
        .filter((r) => r.slug !== room.slug)
        .map((r) => {
            const rIndex = property.rooms.findIndex((x) => x.slug === r.slug);
            return {
                key: r.slug,
                slug: r.slug,
                name: r.name,
                image:
                    r.gallery[0] ??
                    property.gallery[rIndex % property.gallery.length] ??
                    property.image,
                priceLabel: t("detail.fromPerNight", {
                    price: formatPrice(r.priceFrom, currency, rate),
                }),
            };
        });

    return (
        <main className="flex flex-1 flex-col">
            <RoomDetailHero
                roomName={room.name}
                propertyName={property.name}
                propertyLocation={property.location}
                propertySlug={property.slug}
                image={roomImage}
            />
            <RoomOverview
                eyebrow={t("detail.roomOverviewEyebrow")}
                heading={room.name}
                description={room.longDescription}
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
                roomKey={room.slug}
                propertySlug={property.slug}
                offerSlug={offerSlug}
                image={roomImage}
                secondaryImage={roomSecondaryImage}
                roomName={room.name}
            />
            <RoomExperiences
                heading={t("detail.curatedHeading")}
                intro={t("detail.curatedIntro")}
                amenities={amenities}
                imageOne={experienceOne?.image ?? fallbackExperienceImage(2)}
                imageTwo={experienceTwo?.image ?? fallbackExperienceImage(3)}
                captionOne={{
                    title: experienceOne?.title ?? "",
                    description: experienceOne?.description ?? "",
                }}
                captionTwo={{
                    title: experienceTwo?.title ?? "",
                    description: experienceTwo?.description ?? "",
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