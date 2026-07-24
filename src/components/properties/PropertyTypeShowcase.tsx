"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { properties, PROPERTY_TYPES, type PropertyType } from "@/lib/properties";

export default function PropertyTypeShowcase() {
    const t = useTranslations("properties");
    const tTypes = useTranslations("properties.types");
    const [activeType, setActiveType] = useState<PropertyType>(PROPERTY_TYPES[0]);

    const highlight = properties.find((p) => p.type === activeType);
    if (!highlight) return null;

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
                        <div className="mt-8">
                            <Link
                                href={`/properties/${highlight.slug}`}
                                className={buttonVariants({ variant: "primary", size: "md" })}
                            >
                                {t("detail.bookNow")}
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}