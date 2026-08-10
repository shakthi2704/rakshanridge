export type PropertyType = "hotel" | "resort" | "villa";

export type PropertyRoom = {
    key: string;
    occupancy: number;
    sizeSqm: number;
    beds: number;
    bathrooms: number;
    priceFrom: number; // USD per night
};

export type Property = {
    slug: string;
    key: string;
    type: PropertyType;
    region: string; // region slug — matches keys in messages "properties.regions"
    priceFrom: number; // USD per night, used for price filtering
    address: string;
    image: string;
    gallery: string[];
    amenityKeys: string[]; // resolves via shared `properties.amenities.<key>` namespace
    rooms: PropertyRoom[];
    featured?: boolean;
};

export const PROPERTY_TYPES: PropertyType[] = ["hotel", "resort", "villa"];

export type Currency = "USD" | "LKR";

// `rate` is the conversion rate FROM USD TO the target currency (e.g. 330 for LKR).
// Sourced from Sanity's siteSettings document — see src/sanity/lib/queries.ts.
// Only required when currency !== "USD".
export function formatPrice(priceFrom: number, currency: Currency, rate?: number): string {
    if (currency === "LKR") {
        if (!rate) {
            throw new Error("formatPrice: a conversion rate is required for non-USD currencies.");
        }
        const converted = Math.round((priceFrom * rate) / 100) * 100;
        return `LKR ${converted.toLocaleString()}`;
    }
    return `$${priceFrom.toLocaleString()}`;
}

// Converts a camelCase room key (e.g. "gardenSuite") into a URL slug ("garden-suite").
// Still used by RoomTypes.tsx.
export function slugifyRoomKey(key: string): string {
    return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}