export type PropertyType = "hotel" | "resort" | "villa";

export type PropertyRoom = {
    key: string; // resolves via `properties.items.<property.key>.rooms.<key>.name/description`
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
    address: string; // placeholder street address — swap for real data via CMS later
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
        address: "24 Hantana Road, Kandy 20000, Sri Lanka",
        image: "/images/property2.webp",
        gallery: ["/images/property2.webp", "/images/about-01.webp", "/images/hero.jpg", "/images/property1.webp"],
        amenityKeys: ["pool", "wifi", "breakfast", "spa", "airportTransfer", "mountainView"],
        rooms: [
            { key: "gardenSuite", occupancy: 2, sizeSqm: 34, beds: 1, bathrooms: 1, priceFrom: 320 },
            { key: "hillsideResidence", occupancy: 4, sizeSqm: 65, beds: 2, bathrooms: 2, priceFrom: 480 },
        ],
        featured: true,
    },
    {
        slug: "galle-escape",
        key: "galleEscape",
        type: "hotel",
        region: "southern-coast",
        priceFrom: 280,
        address: "12 Church Street, Galle Fort, Galle 80000, Sri Lanka",
        image: "/images/property1.webp",
        gallery: ["/images/property1.webp", "/images/image1.jpg", "/images/hero.jpg", "/images/about-01.webp"],
        amenityKeys: ["pool", "wifi", "breakfast", "oceanView", "airportTransfer", "privateButler"],
        rooms: [
            { key: "courtyardRoom", occupancy: 2, sizeSqm: 30, beds: 1, bathrooms: 1, priceFrom: 280 },
            { key: "oceanSuite", occupancy: 3, sizeSqm: 42, beds: 1, bathrooms: 1, priceFrom: 420 },
        ],
        featured: true,
    },
    {
        slug: "colombo-residence",
        key: "colomboResidence",
        type: "hotel",
        region: "colombo",
        priceFrom: 240,
        address: "45 Horton Place, Colombo 07, Sri Lanka",
        image: "/images/hero.jpg",
        gallery: ["/images/hero.jpg", "/images/property2.webp", "/images/about-01.webp"],
        amenityKeys: ["wifi", "breakfast", "spa", "airportTransfer", "ecoCertified"],
        rooms: [
            { key: "executiveRoom", occupancy: 2, sizeSqm: 28, beds: 1, bathrooms: 1, priceFrom: 240 },
            { key: "cityViewSuite", occupancy: 2, sizeSqm: 38, beds: 1, bathrooms: 1, priceFrom: 340 },
        ],
    },
    {
        slug: "tea-country-resort",
        key: "teaCountryResort",
        type: "resort",
        region: "central-highlands",
        priceFrom: 410,
        address: "8 Upper Lake Road, Nuwara Eliya 22200, Sri Lanka",
        image: "/images/about-01.webp",
        gallery: ["/images/about-01.webp", "/images/property2.webp", "/images/image2.jpg"],
        amenityKeys: ["pool", "wifi", "breakfast", "spa", "mountainView", "ecoCertified"],
        rooms: [
            { key: "plantersCottage", occupancy: 2, sizeSqm: 36, beds: 1, bathrooms: 1, priceFrom: 410 },
            { key: "hillsideVilla", occupancy: 5, sizeSqm: 90, beds: 3, bathrooms: 3, priceFrom: 650 },
        ],
    },
    {
        slug: "mirissa-bay-resort",
        key: "mirissaBayResort",
        type: "resort",
        region: "southern-coast",
        priceFrom: 390,
        address: "3 Coconut Tree Hill Road, Mirissa 81740, Sri Lanka",
        image: "/images/property1.webp",
        gallery: ["/images/property1.webp", "/images/image1.jpg", "/images/hero.jpg"],
        amenityKeys: ["pool", "wifi", "breakfast", "oceanView", "spa", "privateButler"],
        rooms: [
            { key: "bayViewRoom", occupancy: 2, sizeSqm: 32, beds: 1, bathrooms: 1, priceFrom: 390 },
            { key: "beachfrontSuite", occupancy: 4, sizeSqm: 40, beds: 2, bathrooms: 2, priceFrom: 590 },
        ],
    },
    {
        slug: "sigiriya-wilderness-resort",
        key: "sigiriyaWildernessResort",
        type: "resort",
        region: "cultural-triangle",
        priceFrom: 450,
        address: "17 Sigiriya Sanctuary Road, Sigiriya 21120, Sri Lanka",
        image: "/images/property2.webp",
        gallery: ["/images/property2.webp", "/images/about-01.webp", "/images/image2.jpg"],
        amenityKeys: ["pool", "wifi", "breakfast", "airportTransfer", "mountainView", "ecoCertified"],
        rooms: [
            { key: "jungleChalet", occupancy: 2, sizeSqm: 34, beds: 1, bathrooms: 1, priceFrom: 450 },
            { key: "wildernessSuite", occupancy: 4, sizeSqm: 50, beds: 2, bathrooms: 2, priceFrom: 690 },
        ],
    },
    {
        slug: "ella-hillside-villa",
        key: "ellaHillsideVilla",
        type: "villa",
        region: "central-highlands",
        priceFrom: 560,
        address: "6 Ravana Ella Road, Ella 90090, Sri Lanka",
        image: "/images/hero.jpg",
        gallery: ["/images/hero.jpg", "/images/about-01.webp", "/images/property2.webp"],
        amenityKeys: ["pool", "wifi", "breakfast", "privateButler", "mountainView", "ecoCertified"],
        rooms: [
            { key: "wholeVilla", occupancy: 6, sizeSqm: 220, beds: 3, bathrooms: 3, priceFrom: 560 },
        ],
    },
    {
        slug: "tangalle-private-villa",
        key: "tangallePrivateVilla",
        type: "villa",
        region: "southern-coast",
        priceFrom: 620,
        address: "29 Rekawa Road, Tangalle 82200, Sri Lanka",
        image: "/images/about-01.webp",
        gallery: ["/images/about-01.webp", "/images/image1.jpg", "/images/property1.webp"],
        amenityKeys: ["pool", "wifi", "breakfast", "oceanView", "privateButler", "airportTransfer"],
        rooms: [
            { key: "wholeVilla", occupancy: 8, sizeSqm: 260, beds: 4, bathrooms: 4, priceFrom: 620 },
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

// Converts a camelCase room key (e.g. "gardenSuite") into a URL slug ("garden-suite").
export function slugifyRoomKey(key: string): string {
    return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

export function getPropertyAndRoom(
    propertySlug: string,
    roomSlug: string
): { property: Property; room: PropertyRoom } | undefined {
    const property = getPropertyBySlug(propertySlug);
    if (!property) return undefined;

    const room = property.rooms.find((r) => slugifyRoomKey(r.key) === roomSlug);
    if (!room) return undefined;

    return { property, room };
}