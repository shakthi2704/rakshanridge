export type PropertyType = "hotel" | "resort" | "villa";

export type PropertyRoom = {
    key: string;
    occupancy: number;
    sizeSqm: number;
    beds: number;
    bathrooms: number;
    priceFrom: number;
};

export type Property = {
    slug: string;
    key: string;
    type: PropertyType;
    region: string;
    priceFrom: number;
    address: string;
    image: string;
    gallery: string[];
    amenityKeys: string[];
    rooms: PropertyRoom[];
    featured?: boolean;
};

export const properties: Property[] = [
    // PUT YOUR ACTUAL PROPERTY DATA HERE
];

export const PROPERTY_TYPES: PropertyType[] = [
    "hotel",
    "resort",
    "villa",
];

export type Currency = "USD" | "LKR";

export function formatPrice(
    priceFrom: number,
    currency: Currency,
    rate?: number
): string {
    if (currency === "LKR") {
        if (!rate) {
            throw new Error(
                "formatPrice: a conversion rate is required for non-USD currencies."
            );
        }

        const converted = Math.round((priceFrom * rate) / 100) * 100;

        return `LKR ${converted.toLocaleString()}`;
    }

    return `$${priceFrom.toLocaleString()}`;
}

export function slugifyRoomKey(key: string): string {
    return key
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .toLowerCase();
}

export type PropertyRegion =
    | "central-highlands"
    | "southern-coast"
    | "colombo"
    | "cultural-triangle";

export const PROPERTY_REGIONS: PropertyRegion[] = [
    "central-highlands",
    "southern-coast",
    "colombo",
    "cultural-triangle",
];

export type PriceBracketId = "under300" | "300to450" | "450plus";

export type PriceBracket = {
    id: PriceBracketId;
    // min is inclusive, max is exclusive. max: null means no upper bound.
    min: number;
    max: number | null;
    // Key into messages/*.json properties.filters
    labelKey: "priceUnder300" | "price300to450" | "price450plus";
};

// Brackets are fixed USD boundaries — filtering always runs against the
// underlying USD priceFrom value, regardless of the visitor's selected
// display currency (USD/LKR toggle is presentation-only).
export const PRICE_BRACKETS: PriceBracket[] = [
    { id: "under300", min: 0, max: 300, labelKey: "priceUnder300" },
    { id: "300to450", min: 300, max: 450, labelKey: "price300to450" },
    { id: "450plus", min: 450, max: null, labelKey: "price450plus" },
];

export type PropertyFilters = {
    type: PropertyType | "all";
    region: PropertyRegion | "all";
    price: PriceBracketId | "all";
};

export const DEFAULT_PROPERTY_FILTERS: PropertyFilters = {
    type: "all",
    region: "all",
    price: "all",
};

// Generic over anything shaped like a property (AdaptedProperty satisfies
// this) — kept generic here to avoid a circular import with
// sanity/lib/adapters.ts, which already imports types from this file.
type FilterableProperty = {
    type: PropertyType;
    region: string;
    priceFrom: number;
};

export function filterProperties<T extends FilterableProperty>(
    items: T[],
    filters: PropertyFilters
): T[] {
    const bracket =
        filters.price === "all"
            ? null
            : PRICE_BRACKETS.find((b) => b.id === filters.price) ?? null;

    return items.filter((item) => {
        if (filters.type !== "all" && item.type !== filters.type) return false;
        if (filters.region !== "all" && item.region !== filters.region) return false;

        if (bracket) {
            const belowMin = item.priceFrom < bracket.min;
            const aboveMax = bracket.max !== null && item.priceFrom >= bracket.max;
            if (belowMin || aboveMax) return false;
        }

        return true;
    });
}