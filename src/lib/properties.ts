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