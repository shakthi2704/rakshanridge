import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import { formatPrice, type Currency } from "@/lib/properties";
import type { adaptProperty } from "@/sanity/lib/adapters";

type AdaptedProperty = ReturnType<typeof adaptProperty>;

type PropertyResultsGridProps = {
    properties: AdaptedProperty[];
    currency: Currency;
    rate?: number;
};

export default function PropertyResultsGrid({
    properties,
    currency,
    rate,
}: PropertyResultsGridProps) {
    const t = useTranslations("properties");

    if (properties.length === 0) {
        return (
            <p className="mt-16 text-center font-sans text-base text-charcoal">
                {t("noResults")}
            </p>
        );
    }

    return (
        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property, i) => (
                <Reveal key={property.slug} delay={(i % 6) * 100}>
                    <Link href={`/properties/${property.slug}`} className="group block">
                        <div className="relative aspect-[4/3] w-full overflow-hidden shadow-md transition-shadow duration-500 group-hover:shadow-2xl">
                            <Image
                                src={property.image}
                                alt={property.name}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />

                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                            {/* Price - Top */}
                            <span className="absolute top-4 right-4 font-sans text-xs tracking-[0.1em] text-white uppercase bg-ink/80 p-1.5">
                                {t("detail.fromPerNight", {
                                    price: formatPrice(property.priceFrom, currency, rate),
                                })}
                            </span>

                            {/* Property info - Bottom */}
                            <div className="absolute right-5 bottom-5 left-5 text-white">
                                <span className="font-sans text-xs tracking-[0.2em] uppercase text-white/80">
                                    {property.location}
                                </span>

                                <h3 className="mt-2 font-serif text-3xl font-medium">
                                    {property.name}
                                </h3>

                                <span className="mt-8 inline-flex items-center gap-3 border-b border-white/40 pb-1 font-sans text-xs uppercase tracking-[0.2em] transition-colors hover:border-white">
                                    {t("detail.exploreProperty")}
                                    <ArrowRight size={15} strokeWidth={1.5} />
                                </span>
                            </div>
                        </div>
                    </Link>
                </Reveal>
            ))}
        </div>
    );
}