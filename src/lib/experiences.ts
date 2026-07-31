export type Experience = {
    key: string;
    slug: string;
    image: string;
    detailImage: string;
    featured?: boolean;
};

// Resolves via the shared `experiences.items.<key>` translation namespace
// for title/description. Add new items here + a matching entry in
// messages/en.json and messages/ru.json under experiences.items.
export const experiences: Experience[] = [
    {
        key: "ceylonTeaTrails",
        slug: "ceylon-tea-trails",
        image:
            "https://images.unsplash.com/photo-1544015759-237f87d55ef3?fm=jpg&q=80&w=1200&auto=format&fit=crop",
        detailImage:
            "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?fm=jpg&q=80&w=1200&auto=format&fit=crop",
        featured: true,
    },
    {
        key: "coastalExcursions",
        slug: "coastal-excursions",
        image:
            "https://images.unsplash.com/photo-1646894232861-a0ad84f1ad5d?fm=jpg&q=80&w=800&auto=format&fit=crop",
        detailImage:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    },
    {
        key: "culinaryJourneys",
        slug: "culinary-journeys",
        image:
            "https://images.unsplash.com/photo-1622061662418-fc6887d7915d?fm=jpg&q=80&w=800&auto=format&fit=crop",
        detailImage:
            "https://images.unsplash.com/photo-1600891964092-4316c288032e?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    },
    {
        key: "ayurvedicRituals",
        slug: "ayurvedic-rituals",
        image:
            "https://images.unsplash.com/photo-1600334129128-685c5582fd35?fm=jpg&q=80&w=800&auto=format&fit=crop",
        detailImage:
            "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    },
    {
        key: "templePilgrimage",
        slug: "temple-pilgrimage",
        image:
            "https://images.unsplash.com/photo-1546708973-b339540b5162?fm=jpg&q=80&w=800&auto=format&fit=crop",
        detailImage:
            "https://images.unsplash.com/photo-1580889240911-e9756a63e1f0?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    },
    {
        key: "wildlifeEncounters",
        slug: "wildlife-encounters",
        image:
            "https://images.unsplash.com/photo-1547970810-dc1eac37d174?fm=jpg&q=80&w=800&auto=format&fit=crop",
        detailImage:
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    },
];

export function getExperienceBySlug(slug: string) {
    return experiences.find((exp) => exp.slug === slug);
}