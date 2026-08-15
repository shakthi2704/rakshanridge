"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { PROPERTY_TYPES, formatPrice, type PropertyType, type Currency } from "@/lib/properties";
import type { adaptProperty } from "@/sanity/lib/adapters";

type AdaptedProperty = ReturnType<typeof adaptProperty>;

type PropertyCategoryBrowserProps = {
    currency: Currency;
    rate?: number;
    properties: AdaptedProperty[];
};
export default function PropertyCategoryBrowser({ currency, rate, properties }: PropertyCategoryBrowserProps) {
    const t = useTranslations("properties");
    const tTypes = useTranslations("properties.types");

    const [activeType, setActiveType] = useState<PropertyType>(PROPERTY_TYPES[0]);
    const [visibleCount, setVisibleCount] = useState(6);

    const matches = properties.filter((p) => p.type === activeType);
    const [highlight, ...rest] = matches;

    const visibleProperties = rest.slice(0, visibleCount);
    const hasMore = rest.length > visibleCount;


    return (
        <section className="bg-paper py-20 lg:py-28">
            <Container>
                {/* Category tabs */}

                <div className="flex items-center justify-between gap-6 border-b border-ink/10">
                    <div className="flex items-center gap-8 sm:gap-14">
                        {PROPERTY_TYPES.map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => {
                                    setActiveType(type);
                                    setVisibleCount(6);
                                }}
                                className={cn(
                                    "relative  font-sans text-xs tracking-[0.2em] uppercase transition-colors",
                                    activeType === type
                                        ? buttonVariants({ variant: "underline-ink", size: "sm" })
                                        : "text-slate hover:text-charcoal"
                                )}
                            >
                                {tTypes(type)}
                            </button>
                        ))}
                    </div>



                    <Link
                        href="/properties/all"
                        className={cn(buttonVariants({ variant: "underline-ink", size: "sm" }))}
                    >
                        {t("viewAll")}
                    </Link>
                </div>
                {!highlight && (
                    <p className="mt-16 text-center font-sans text-base text-charcoal">
                        {t("noResults")}
                    </p>
                )}

                {highlight && (
                    <>
                        {/* Highlighted property for the active category */}
                        <div
                            key={highlight.slug}
                            className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16 animate-[fadeIn_0.5s_ease-out]"
                        >
                            <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto">
                                <Image
                                    src={highlight.image}
                                    alt={highlight.name}
                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                    className="object-cover"
                                />
                                <span className="absolute top-4 right-4 bg-ink/70 p-1.5 font-sans text-xs tracking-[0.1em] text-white uppercase">
                                    {t("detail.fromPerNight", {
                                        price: formatPrice(highlight.priceFrom, currency, rate),
                                    })}
                                </span>
                            </div>

                            <div className="flex flex-col justify-center">
                                <span className="font-sans text-xs tracking-[0.35em] text-ink uppercase">
                                    {t("showcase.eyebrow")}
                                </span>
                                <h3 className="mt-4 font-serif text-3xl font-medium text-ink sm:text-4xl">
                                    {highlight.name}
                                </h3>
                                <p className="mt-4 max-w-md font-serif text-lg font-light italic leading-relaxed text-charcoal">
                                    {highlight.tagline}
                                </p>
                                <p className="mt-4 max-w-md font-serif text-lg  leading-relaxed text-ink">
                                    {highlight.description}
                                </p>
                                <div className="mt-8">
                                    <Link
                                        href={`/properties/${highlight.slug}`}
                                        className={buttonVariants({ variant: "underline-ink", size: "sm" })}
                                    >
                                        {t("detail.exploreProperty")}

                                    </Link>
                                </div>
                            </div>
                        </div>


                        {/* Remaining properties in this category */}
                        {rest.length > 0 && (
                            <>
                                <div className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                                    {visibleProperties.map((property, i) => (
                                        <Reveal key={property.slug} delay={i * 100}>
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

                                                    <span className="absolute top-4 right-4 bg-ink/70 p-1.5 font-sans text-xs tracking-[0.1em] text-white uppercase">
                                                        {t("detail.fromPerNight", {
                                                            price: formatPrice(property.priceFrom, currency, rate),
                                                        })}
                                                    </span>

                                                    <div className="absolute right-5 bottom-5 left-5 text-white">
                                                        <span className="font-sans text-xs tracking-[0.2em] text-white/80 uppercase">
                                                            {property.location}
                                                        </span>

                                                        <h3 className="mt-2 font-serif text-3xl font-medium">
                                                            {property.name}
                                                        </h3>

                                                        <span className="mt-8 inline-flex items-center gap-3 border-b border-white/40 pb-1 font-sans text-xs tracking-[0.2em] uppercase transition-colors hover:border-white">
                                                            {t("detail.exploreProperty")}

                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Reveal>
                                    ))}
                                </div>

                                {hasMore && (
                                    <div className="mt-14 flex justify-center">
                                        <button
                                            type="button"
                                            onClick={() => setVisibleCount((count) => count + 6)}
                                            className={buttonVariants({ variant: "ink", size: "sm" })}
                                        >
                                            Load More
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )
                }
            </Container >
        </section >
    );
}