export type PropertyType = "hotel" | "resort" | "villa";

export type PropertyRoom = {
    key: string; // resolves via `properties.items.<property.key>.rooms.<key>.name/description`
    occupancy: number;
    priceFrom: number; // USD per night
};

export type Property = {
    slug: string;
    key: string;
    type: PropertyType;
    region: string; // region slug — matches keys in messages "properties.regions"
    priceFrom: number; // USD per night, used for price filtering
    image: string;
    gallery: string[]; // detail-page gallery, image[0] doubles as the hero shot
    amenityKeys: string[]; // resolves via shared `properties.amenities.<key>` namespace
    rooms: PropertyRoom[];
    featured?: boolean;
};

// Placeholder data — swap for real inventory later. Structure (slug, type,
// region, priceFrom) stays the same regardless of how many properties get added.
export const properties: Property[] = [
    {
        slug: "kandy-retreat",
        key: "kandyRetreat",
        type: "hotel",
        region: "central-highlands",
        priceFrom: 320,
        image: "/images/property2.webp",
        gallery: ["/images/property2.webp", "/images/about-01.webp", "/images/hero.jpg", "/images/property1.webp"],
        amenityKeys: ["pool", "wifi", "breakfast", "spa", "airportTransfer", "mountainView"],
        rooms: [
            { key: "gardenSuite", occupancy: 2, priceFrom: 320 },
            { key: "hillsideResidence", occupancy: 4, priceFrom: 480 },
        ],
        featured: true,
    },
    {
        slug: "galle-escape",
        key: "galleEscape",
        type: "hotel",
        region: "southern-coast",
        priceFrom: 280,
        image: "/images/property1.webp",
        gallery: ["/images/property1.webp", "/images/image1.jpg", "/images/hero.jpg", "/images/about-01.webp"],
        amenityKeys: ["pool", "wifi", "breakfast", "oceanView", "airportTransfer", "privateButler"],
        rooms: [
            { key: "courtyardRoom", occupancy: 2, priceFrom: 280 },
            { key: "oceanSuite", occupancy: 3, priceFrom: 420 },
        ],
        featured: true,
    },
    {
        slug: "colombo-residence",
        key: "colomboResidence",
        type: "hotel",
        region: "colombo",
        priceFrom: 240,
        image: "/images/hero.jpg",
        gallery: ["/images/hero.jpg", "/images/property2.webp", "/images/about-01.webp"],
        amenityKeys: ["wifi", "breakfast", "spa", "airportTransfer", "ecoCertified"],
        rooms: [
            { key: "executiveRoom", occupancy: 2, priceFrom: 240 },
            { key: "cityViewSuite", occupancy: 2, priceFrom: 340 },
        ],
    },
    {
        slug: "tea-country-resort",
        key: "teaCountryResort",
        type: "resort",
        region: "central-highlands",
        priceFrom: 410,
        image: "/images/about-01.webp",
        gallery: ["/images/about-01.webp", "/images/property2.webp", "/images/image2.jpg"],
        amenityKeys: ["pool", "wifi", "breakfast", "spa", "mountainView", "ecoCertified"],
        rooms: [
            { key: "plantersCottage", occupancy: 2, priceFrom: 410 },
            { key: "hillsideVilla", occupancy: 5, priceFrom: 650 },
        ],
    },
    {
        slug: "mirissa-bay-resort",
        key: "mirissaBayResort",
        type: "resort",
        region: "southern-coast",
        priceFrom: 390,
        image: "/images/property1.webp",
        gallery: ["/images/property1.webp", "/images/image1.jpg", "/images/hero.jpg"],
        amenityKeys: ["pool", "wifi", "breakfast", "oceanView", "spa", "privateButler"],
        rooms: [
            { key: "bayViewRoom", occupancy: 2, priceFrom: 390 },
            { key: "beachfrontSuite", occupancy: 4, priceFrom: 590 },
        ],
    },
    {
        slug: "sigiriya-wilderness-resort",
        key: "sigiriyaWildernessResort",
        type: "resort",
        region: "cultural-triangle",
        priceFrom: 450,
        image: "/images/property2.webp",
        gallery: ["/images/property2.webp", "/images/about-01.webp", "/images/image2.jpg"],
        amenityKeys: ["pool", "wifi", "breakfast", "airportTransfer", "mountainView", "ecoCertified"],
        rooms: [
            { key: "jungleChalet", occupancy: 2, priceFrom: 450 },
            { key: "wildernessSuite", occupancy: 4, priceFrom: 690 },
        ],
    },
    {
        slug: "ella-hillside-villa",
        key: "ellaHillsideVilla",
        type: "villa",
        region: "central-highlands",
        priceFrom: 560,
        image: "/images/hero.jpg",
        gallery: ["/images/hero.jpg", "/images/about-01.webp", "/images/property2.webp"],
        amenityKeys: ["pool", "wifi", "breakfast", "privateButler", "mountainView", "ecoCertified"],
        rooms: [
            { key: "wholeVilla", occupancy: 6, priceFrom: 560 },
        ],
    },
    {
        slug: "tangalle-private-villa",
        key: "tangallePrivateVilla",
        type: "villa",
        region: "southern-coast",
        priceFrom: 620,
        image: "/images/about-01.webp",
        gallery: ["/images/about-01.webp", "/images/image1.jpg", "/images/property1.webp"],
        amenityKeys: ["pool", "wifi", "breakfast", "oceanView", "privateButler", "airportTransfer"],
        rooms: [
            { key: "wholeVilla", occupancy: 8, priceFrom: 620 },
        ],
    },
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

export function getPropertyBySlug(slug: string): Property | undefined {
    return properties.find((p) => p.slug === slug);
}