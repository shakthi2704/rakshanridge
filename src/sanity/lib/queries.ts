import { defineQuery } from "next-sanity";
import { sanityFetch } from "./live";
import type { SanityImageSource } from "@sanity/image-url";
import type { LocaleString } from "./locale";

export type ExchangeRate = {
    currencyCode: string;
    currencyLabel: string;
    rate: number;
};

export type SiteSettings = {
    baseCurrency: string;
    exchangeRates: ExchangeRate[];
    bankDetails?: BankDetails;
}

export type SanityTestimonial = {
    _id: string;
    quote: LocaleString;
    name: string;
    origin: LocaleString;
    order: number;
};

const SITE_SETTINGS_QUERY = defineQuery(`
    *[_type == "siteSettings" && _id == "siteSettings"][0]{
        baseCurrency,
        exchangeRates[]{
            currencyCode,
            currencyLabel,
            rate
        },
        bankDetails
    }
`);
export async function getSiteSettings(): Promise<SiteSettings | null> {
    const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
    return (data as SiteSettings) ?? null;
}

export type SanityRoom = {
    name: LocaleString;
    slug: { current: string };
    description: LocaleString;
    longDescription: LocaleString;
    occupancy: number;
    sizeSqm: number;
    beds: number;
    bathrooms: number;
    priceFrom: number;
    gallery?: SanityImageSource[];
};

export type SanityProperty = {
    _id: string;
    name: LocaleString;
    slug: { current: string };
    tagline: LocaleString;
    location: LocaleString;
    description: LocaleString;
    type: "hotel" | "resort" | "villa";
    region: string;
    priceFrom: number;
    address?: string;
    amenityKeys?: string[];
    featured: boolean;
    heroImage: SanityImageSource;
    gallery?: SanityImageSource[];
    rooms?: SanityRoom[];
    experiences?: SanityExperience[];
};
export type SanityExperience = {
    _id: string;
    title: LocaleString;
    slug: { current: string };
    description: LocaleString;
    duration: LocaleString;
    location: LocaleString;
    highlights: LocaleString[];
    featured: boolean;
    storyOpening: LocaleString;
    storyQuote: LocaleString;
    storyClosing: LocaleString;
    image: SanityImageSource;
    detailImage: SanityImageSource;
};


export type BankDetails = {
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    branch?: string;
    swiftCode?: string;
};

const PROPERTY_FIELDS = `
    _id,
    name,
    slug,
    tagline,
    location,
    description,
    type,
    region,
    priceFrom,
    address,
    amenityKeys,
    featured,
    heroImage,
    gallery,
    rooms[]{
       name,
        slug,
        description,
        longDescription,
        occupancy,
        sizeSqm,
        beds,
        bathrooms,
        priceFrom,
        gallery
    },
      experiences[]->{
        title,
        slug,
        description,
        image
    }
`;

const PROPERTIES_QUERY = defineQuery(`
    *[_type == "property"] | order(featured desc, name.en asc){
        ${PROPERTY_FIELDS}
    }
`);

const PROPERTY_BY_SLUG_QUERY = defineQuery(`
    *[_type == "property" && slug.current == $slug][0]{
        ${PROPERTY_FIELDS}
    }
`);

// Lean projection for list/card/nav contexts (Footer, FeaturedProperties, listing
// pages) that only ever render card-level fields — never rooms, dereferenced
// experiences, gallery, amenities, or address. Keep in sync with what
// PropertyResultsGrid / PropertyCategoryBrowser / FeaturedProperties actually read.
const PROPERTY_CARD_FIELDS = `
    _id,
    name,
    slug,
    tagline,
    description,
    location,
    type,
    region,
    priceFrom,
    featured,
    heroImage
`;

const PROPERTIES_LIST_QUERY = defineQuery(`
    *[_type == "property"] | order(featured desc, name.en asc){
        ${PROPERTY_CARD_FIELDS}
    }
`);

export async function getPropertiesForListing(): Promise<SanityProperty[]> {
    const { data } = await sanityFetch({ query: PROPERTIES_LIST_QUERY });
    return (data as SanityProperty[]) ?? [];
}


export async function getProperties(): Promise<SanityProperty[]> {
    const { data } = await sanityFetch({ query: PROPERTIES_QUERY });
    return (data as SanityProperty[]) ?? [];
}

export async function getSanityPropertyBySlug(slug: string): Promise<SanityProperty | null> {
    const { data } = await sanityFetch({ query: PROPERTY_BY_SLUG_QUERY, params: { slug } });
    return (data as SanityProperty) ?? null;
}

export type SanityOffer = {
    _id: string;
    title: LocaleString;
    slug: { current: string };
    description: LocaleString;
    property: {
        name: LocaleString;
        slug: { current: string };
        priceFrom: number;
        heroImage: SanityImageSource;
        rooms: { slug: { current: string }; priceFrom: number }[];
    };
    roomSlug: string | null;
    discountType: "percentage" | "fixed";
    discountValue: number;
    validFrom: string | null;
    validUntil: string | null;
    featured: boolean;
    image: SanityImageSource | null;
};
const OFFER_FIELDS = `
    _id,
    title,
    slug,
    description,
    property->{
        name,
        slug,
        priceFrom,
        rooms[]{ slug, priceFrom },
        heroImage
    },
    roomSlug,
    discountType,
    discountValue,
    validFrom,
    validUntil,
    featured,
    image
`;

const OFFERS_QUERY = defineQuery(`
    *[_type == "offer"] | order(featured desc, validFrom desc){
        ${OFFER_FIELDS}
    }
`);

const OFFER_BY_SLUG_QUERY = defineQuery(`
    *[_type == "offer" && slug.current == $slug][0]{
        ${OFFER_FIELDS}
    }
`);

const TESTIMONIALS_QUERY = defineQuery(`
    *[_type == "testimonial" && featured == true] | order(order asc){
        _id,
        quote,
        name,
        origin,
        order
    }
`);


export async function getOffers(): Promise<SanityOffer[]> {
    const { data } = await sanityFetch({ query: OFFERS_QUERY });
    return (data as SanityOffer[]) ?? [];
}

export async function getSanityOfferBySlug(slug: string): Promise<SanityOffer | null> {
    const { data } = await sanityFetch({ query: OFFER_BY_SLUG_QUERY, params: { slug } });
    return (data as SanityOffer) ?? null;
}
export async function getTestimonials(): Promise<SanityTestimonial[]> {
    const { data } = await sanityFetch({ query: TESTIMONIALS_QUERY });
    return (data as SanityTestimonial[]) ?? [];
}


const EXPERIENCE_FIELDS = `
    _id,
    title,
    slug,
    description,
    duration,
    location,
    highlights,
    featured,
    storyOpening,
    storyQuote,
    storyClosing,
    image,
    detailImage
`;

const EXPERIENCES_QUERY = defineQuery(`
    *[_type == "experience"] | order(featured desc, title.en asc){
        ${EXPERIENCE_FIELDS}
    }
`);

const EXPERIENCE_BY_SLUG_QUERY = defineQuery(`
    *[_type == "experience" && slug.current == $slug][0]{
        ${EXPERIENCE_FIELDS}
    }
`);

export type SanityExperienceLink = {
    _id: string;
    title: LocaleString;
    slug: { current: string };
};

const EXPERIENCE_LINK_FIELDS = `_id, title, slug`;

const EXPERIENCES_LIST_QUERY = defineQuery(`
    *[_type == "experience"] | order(featured desc, title.en asc){
        ${EXPERIENCE_LINK_FIELDS}
    }
`);

export async function getExperiencesForListing(): Promise<SanityExperienceLink[]> {
    const { data } = await sanityFetch({ query: EXPERIENCES_LIST_QUERY });
    return (data as SanityExperienceLink[]) ?? [];
}


export async function getExperiences(): Promise<SanityExperience[]> {
    const { data } = await sanityFetch({ query: EXPERIENCES_QUERY });
    return (data as SanityExperience[]) ?? [];
}

export async function getSanityExperienceBySlug(slug: string): Promise<SanityExperience | null> {
    const { data } = await sanityFetch({ query: EXPERIENCE_BY_SLUG_QUERY, params: { slug } });
    return (data as SanityExperience) ?? null;
}
