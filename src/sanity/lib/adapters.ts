import { urlFor } from "./image";
import { pickLocale, type AppLocale } from "./locale";
import type { SanityProperty, SanityRoom } from "./queries";
import type { Property, PropertyType } from "@/lib/properties";

export type AdaptedRoom = {
    key: string;
    slug: string;
    name: string;
    description: string;
    longDescription: string;
    occupancy: number;
    sizeSqm: number;
    beds: number;
    bathrooms: number;
    priceFrom: number;
};

export type AdaptedProperty = Omit<Property, "rooms"> & {
    name: string;
    tagline: string;
    location: string;
    description: string;
    rooms: AdaptedRoom[];
};

function adaptRoom(room: SanityRoom, locale: AppLocale): AdaptedRoom {
    return {
        key: room.slug.current,
        slug: room.slug.current,
        name: pickLocale(room.name, locale),
        description: pickLocale(room.description, locale),
        longDescription: pickLocale(room.longDescription, locale),
        occupancy: room.occupancy,
        sizeSqm: room.sizeSqm,
        beds: room.beds,
        bathrooms: room.bathrooms,
        priceFrom: room.priceFrom,
    };
}

export function adaptProperty(sanityProperty: SanityProperty, locale: AppLocale): AdaptedProperty {
    return {
        slug: sanityProperty.slug.current,
        key: sanityProperty.slug.current,
        type: sanityProperty.type as PropertyType,
        region: sanityProperty.region,
        priceFrom: sanityProperty.priceFrom,
        address: sanityProperty.address,
        image: urlFor(sanityProperty.heroImage).width(1600).url(),
        gallery: (sanityProperty.gallery ?? []).map((img) => urlFor(img).width(1600).url()),
        amenityKeys: sanityProperty.amenityKeys ?? [],
        featured: sanityProperty.featured,
        name: pickLocale(sanityProperty.name, locale),
        tagline: pickLocale(sanityProperty.tagline, locale),
        location: pickLocale(sanityProperty.location, locale),
        description: pickLocale(sanityProperty.description, locale),
        rooms: (sanityProperty.rooms ?? []).map((room) => adaptRoom(room, locale)),
    };
}