"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { properties, PROPERTY_TYPES, formatPrice, type PropertyType, type Currency } from "@/lib/properties";


type PropertyCategoryBrowserProps = {
    currency: Currency;
    rate?: number;
};
export default function PropertyCategoryBrowser({ currency, rate }: PropertyCategoryBrowserProps) {
    const t = useTranslations("properties");
    const tTypes = useTranslations("properties.types");

    const [activeType, setActiveType] = useState<PropertyType>(PROPERTY_TYPES[0]);

    const matches = properties.filter((p) => p.type === activeType);
    const [highlight, ...rest] = matches;

    return (
        <section className="bg-paper py-20 lg:py-28">
            <Container>
                {/* Category tabs */}
                <div className="flex items-center justify-center gap-8 border-b border-ink/10 sm:gap-14">
                    {PROPERTY_TYPES.map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setActiveType(type)}
                            className={cn(
                                "relative pb-4 font-sans text-xs tracking-[0.2em] uppercase transition-colors",
                                activeType === type ? "text-ink" : "text-slate hover:text-charcoal"
                            )}
                        >
                            {tTypes(type)}
                            {activeType === type && (
                                <span className="absolute inset-x-0 -bottom-px h-px bg-ink" />
                            )}
                        </button>
                    ))}
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
                                    alt={t(`items.${highlight.key}.name`)}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex flex-col justify-center">
                                <span className="font-sans text-xs tracking-[0.35em] text-ink uppercase">
                                    {t("showcase.eyebrow")}
                                </span>
                                <h3 className="mt-4 font-serif text-3xl font-medium text-ink sm:text-4xl">
                                    {t(`items.${highlight.key}.name`)}
                                </h3>
                                <p className="mt-4 max-w-md font-serif text-lg font-light italic leading-relaxed text-charcoal">
                                    {t(`items.${highlight.key}.tagline`)}
                                </p>
                                <p className="mt-4 max-w-md font-serif text-lg  leading-relaxed text-ink">
                                    {t(`items.${highlight.key}.description`)}
                                </p>
                                <div className="mt-8">
                                    <Link
                                        href={`/properties/${highlight.slug}`}
                                        className={buttonVariants({ variant: "ink", size: "sm" })}
                                    >
                                        {t("detail.exploreProperty")}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Remaining properties in this category */}
                        {rest.length > 0 && (
                            <div className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                                {rest.map((property, i) => (
                                    <Reveal key={property.slug} delay={i * 100}>
                                        <Link href={`/properties/${property.slug}`} className="group block">
                                            <div className="relative aspect-[4/3] w-full overflow-hidden shadow-md transition-shadow duration-500 group-hover:shadow-2xl">
                                                <Image
                                                    src={property.image}
                                                    alt={t(`items.${property.key}.name`)}
                                                    fill
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
                                                        {t(`items.${property.key}.location`)}
                                                    </span>

                                                    <h3 className="mt-2 font-serif text-3xl font-medium">
                                                        {t(`items.${property.key}.name`)}
                                                    </h3>

                                                    <span
                                                        className="mt-8 inline-flex items-center gap-3 border-b border-white/40 pb-1 font-sans text-xs uppercase tracking-[0.2em] transition-colors hover:border-white"

                                                    >
                                                        {t("detail.exploreProperty")}
                                                        <ArrowRight
                                                            size={15}
                                                            strokeWidth={1.5}
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </Reveal>
                                ))}
                            </div>
                        )}
                    </>
                )
                }
            </Container >
        </section >
    );
}