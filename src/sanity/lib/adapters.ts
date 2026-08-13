import { urlFor } from "./image";
import { pickLocale, type AppLocale } from "./locale";
import type { SanityProperty, SanityRoom, SanityOffer, SanityTestimonial, SanityExperience } from "./queries";
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
    gallery: string[];
};

export type AdaptedProperty = Omit<Property, "rooms"> & {
    name: string;
    tagline: string;
    location: string;
    description: string;
    rooms: AdaptedRoom[];
    experiences: AdaptedExperienceCard[];
};
export type AdaptedExperienceCard = {
    key: string;
    slug: string;
    title: string;
    description: string;
    image: string;
};

export type AdaptedExperience = AdaptedExperienceCard & {
    duration: string;
    location: string;
    highlights: string[];
    featured: boolean;
    storyOpening: string;
    storyQuote: string;
    storyClosing: string;
    detailImage: string;
};
export type AdaptedOffer = {
    slug: string;
    title: string;
    description: string;
    propertyName: string;
    propertySlug: string;
    roomSlug: string | null;
    image: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    basePrice: number;
    offerPrice: number;
    discountPercentage: number;
    validFrom: string | null;
    validUntil: string | null;
    featured: boolean;
};

export type AdaptedTestimonial = {
    id: string;
    quote: string;
    name: string;
    origin: string;
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
        gallery: (room.gallery ?? []).map((img) => urlFor(img).width(1600).url()),

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
        experiences: (sanityProperty.experiences ?? []).map((exp) => adaptExperienceCard(exp, locale)),
    };
}



function resolveOfferBasePrice(offer: SanityOffer): number {
    if (offer.roomSlug) {
        const room = offer.property.rooms.find((r) => r.slug.current === offer.roomSlug);
        if (room) return room.priceFrom;
    }
    return offer.property.priceFrom;
}

export function adaptOffer(offer: SanityOffer, locale: AppLocale): AdaptedOffer {
    const basePrice = resolveOfferBasePrice(offer);

    const offerPrice =
        offer.discountType === "percentage"
            ? basePrice * (1 - offer.discountValue / 100)
            : Math.max(0, basePrice - offer.discountValue);

    const discountPercentage =
        offer.discountType === "percentage"
            ? offer.discountValue
            : Math.round((offer.discountValue / basePrice) * 100);

    return {
        slug: offer.slug.current,
        title: pickLocale(offer.title, locale),
        description: pickLocale(offer.description, locale),
        propertyName: pickLocale(offer.property.name, locale),
        propertySlug: offer.property.slug.current,
        roomSlug: offer.roomSlug,
        image: urlFor(offer.image ?? offer.property.heroImage).width(1600).url(),
        discountType: offer.discountType,
        discountValue: offer.discountValue,
        basePrice,
        offerPrice: Math.round(offerPrice),
        discountPercentage,
        validFrom: offer.validFrom,
        validUntil: offer.validUntil,
        featured: offer.featured,
    };
}

export function adaptTestimonial(testimonial: SanityTestimonial, locale: AppLocale): AdaptedTestimonial {
    return {
        id: testimonial._id,
        quote: pickLocale(testimonial.quote, locale),
        name: testimonial.name,
        origin: pickLocale(testimonial.origin, locale),
    };
}

function adaptExperienceCard(exp: SanityExperience, locale: AppLocale): AdaptedExperienceCard {
    return {
        key: exp.slug.current,
        slug: exp.slug.current,
        title: pickLocale(exp.title, locale),
        description: pickLocale(exp.description, locale),
        image: urlFor(exp.image).width(1200).url(),
    };
}

export function adaptExperience(exp: SanityExperience, locale: AppLocale): AdaptedExperience {
    return {
        ...adaptExperienceCard(exp, locale),
        duration: pickLocale(exp.duration, locale),
        location: pickLocale(exp.location, locale),
        highlights: (exp.highlights ?? []).map((h) => pickLocale(h, locale)),
        featured: exp.featured,
        storyOpening: pickLocale(exp.storyOpening, locale),
        storyQuote: pickLocale(exp.storyQuote, locale),
        storyClosing: pickLocale(exp.storyClosing, locale),
        detailImage: urlFor(exp.detailImage).width(1600).url(),
    };
}