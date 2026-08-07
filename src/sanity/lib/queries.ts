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
};

const SITE_SETTINGS_QUERY = defineQuery(`
    *[_type == "siteSettings" && _id == "siteSettings"][0]{
        baseCurrency,
        exchangeRates[]{
            currencyCode,
            currencyLabel,
            rate
        }
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
    address: string;
    amenityKeys: string[];
    featured: boolean;
    heroImage: SanityImageSource;
    gallery: SanityImageSource[];
    rooms: SanityRoom[];
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
        priceFrom
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

export async function getProperties(): Promise<SanityProperty[]> {
    const { data } = await sanityFetch({ query: PROPERTIES_QUERY });
    return (data as SanityProperty[]) ?? [];
}

export async function getSanityPropertyBySlug(slug: string): Promise<SanityProperty | null> {
    const { data } = await sanityFetch({ query: PROPERTY_BY_SLUG_QUERY, params: { slug } });
    return (data as SanityProperty) ?? null;
}