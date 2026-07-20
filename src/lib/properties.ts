export type PropertyType = "hotel" | "resort" | "villa";

export type Property = {
    slug: string;
    key: string;
    type: PropertyType;
    region: string; // region slug — matches keys in messages "properties.regions"
    priceFrom: number; // USD per night, used for price filtering
    image: string;
    featured?: boolean;
};

// Placeholder data — swap for real inventory later. Structure (slug, type,
// region, priceFrom) stays the same regardless of how many properties get added.
export const properties: Property[] = [
    { slug: "kandy-retreat", key: "kandyRetreat", type: "hotel", region: "central-highlands", priceFrom: 320, image: "/images/property2.webp", featured: true },
    { slug: "galle-escape", key: "galleEscape", type: "hotel", region: "southern-coast", priceFrom: 280, image: "/images/property1.webp", featured: true },
    { slug: "colombo-residence", key: "colomboResidence", type: "hotel", region: "colombo", priceFrom: 240, image: "/images/hero.jpg" },
    { slug: "tea-country-resort", key: "teaCountryResort", type: "resort", region: "central-highlands", priceFrom: 410, image: "/images/about-01.webp" },
    { slug: "mirissa-bay-resort", key: "mirissaBayResort", type: "resort", region: "southern-coast", priceFrom: 390, image: "/images/property1.webp" },
    { slug: "sigiriya-wilderness-resort", key: "sigiriyaWildernessResort", type: "resort", region: "cultural-triangle", priceFrom: 450, image: "/images/property2.webp" },
    { slug: "ella-hillside-villa", key: "ellaHillsideVilla", type: "villa", region: "central-highlands", priceFrom: 560, image: "/images/hero.jpg" },
    { slug: "tangalle-private-villa", key: "tangallePrivateVilla", type: "villa", region: "southern-coast", priceFrom: 620, image: "/images/about-01.webp" },
];

export const PROPERTY_TYPES: PropertyType[] = ["hotel", "resort", "villa"];

export const REGIONS = [
    "central-highlands",
    "southern-coast",
    "colombo",
    "cultural-triangle",
] as const;

export type Region = (typeof REGIONS)[number];


// Fixed conversion rate — update manually as needed.
export const USD_TO_LKR_RATE = 300;

export type Currency = "USD" | "LKR";

export function formatPrice(priceFrom: number, currency: Currency): string {
    if (currency === "LKR") {
        const converted = Math.round((priceFrom * USD_TO_LKR_RATE) / 100) * 100;
        return `LKR ${converted.toLocaleString()}`;
    }
    return `$${priceFrom.toLocaleString()}`;
}