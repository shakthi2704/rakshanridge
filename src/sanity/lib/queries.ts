import { defineQuery } from "next-sanity";
import { sanityFetch } from "./live";

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