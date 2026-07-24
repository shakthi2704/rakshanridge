"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { properties, PROPERTY_TYPES, formatPrice, type PropertyType } from "@/lib/properties";

export default function PropertyCategoryBrowser() {
    const t = useTranslations("properties");
    const tTypes = useTranslations("properties.types");

    const [activeType, setActiveType] = useState<PropertyType>(PROPERTY_TYPES[0]);

    const matches = properties.filter((p) => p.type === activeType);
    const [highlight, ...rest] = matches;

    return (
        <section className="bg-paper py-20 lg:py-28">
            <Container>
                {/* Category tabs */}
                <div className="flex items-center justify-center gap-8 border-b border-navy/10 sm:gap-14">
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
                                <span className="absolute inset-x-0 -bottom-px h-px bg-navy" />
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
                                <span className="font-sans text-xs tracking-[0.35em] text-navy uppercase">
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
                                        {t("detail.bookNow")}
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
                                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                                                <span className="absolute right-4 bottom-4 font-sans text-xs tracking-[0.1em] text-white uppercase">
                                                    {t("detail.fromPerNight", {
                                                        price: formatPrice(property.priceFrom, "USD"),
                                                    })}
                                                </span>
                                            </div>
                                            <div className="mt-5">
                                                <span className="font-sans text-xs tracking-[0.2em] text-slate uppercase">
                                                    {t(`items.${property.key}.location`)}
                                                </span>
                                                <h3 className="mt-2 font-serif text-3xl font-medium text-ink">
                                                    {t(`items.${property.key}.name`)}
                                                </h3>
                                                {/* <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal">
                                                    {t(`items.${property.key}.tagline`)}
                                                </p> */}
                                                <p className="mt-2 font-serif text-lg leading-relaxed text-ink line-clamp-3">
                                                    {t(`items.${property.key}.description`)}
                                                </p>
                                                <span
                                                    className={cn(
                                                        buttonVariants({ variant: "outline-ink", size: "sm" }),
                                                        "mt-6 inline-flex"
                                                    )}
                                                >
                                                    {t("detail.bookNow")}
                                                </span>
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