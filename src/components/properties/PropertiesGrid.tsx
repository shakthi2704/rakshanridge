import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import PropertyCard from "@/components/properties/PropertyCard";
import { getTranslations } from "next-intl/server";
import { properties, PROPERTY_TYPES, type PropertyType } from "@/lib/properties";

type Props = {
    searchParams: { type?: string; region?: string; price?: string; currency?: string };
};
function matchesPrice(priceFrom: number, bucket?: string) {
    if (!bucket) return true;
    if (bucket === "under-300") return priceFrom < 300;
    if (bucket === "300-450") return priceFrom >= 300 && priceFrom <= 450;
    if (bucket === "450-plus") return priceFrom > 450;
    return true;
}

export default async function PropertiesGrid({ searchParams }: Props) {
    const t = await getTranslations("properties");

    const filtered = properties.filter((p) => {
        if (searchParams.type && p.type !== searchParams.type) return false;
        if (searchParams.region && p.region !== searchParams.region) return false;
        if (!matchesPrice(p.priceFrom, searchParams.price)) return false;
        return true;
    });

    const groups = PROPERTY_TYPES.map((type) => ({
        type,
        items: filtered.filter((p) => p.type === type),
    })).filter((group) => group.items.length > 0);

    return (
        <section className="bg-paper py-16 lg:py-20">
            <Container>
                <p className="mb-10 font-sans text-xs tracking-[0.15em] text-slate uppercase">
                    {t("filters.resultsCount", { count: filtered.length })}
                </p>

                {groups.length === 0 && (
                    <p className="py-20 text-center font-sans text-base text-charcoal">
                        {t("noResults")}
                    </p>
                )}

                <div className="space-y-20">
                    {groups.map((group) => (
                        <div key={group.type}>
                            <h2 className="border-b border-navy/10 pb-4 font-serif text-4xl font-medium text-ink">
                                {t(`groups.${group.type}` as `groups.${PropertyType}`)}
                            </h2>
                            <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                                {group.items.map((property, i) => (
                                    <Reveal key={property.slug} delay={i * 100}>
                                        <PropertyCard property={property} />
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}