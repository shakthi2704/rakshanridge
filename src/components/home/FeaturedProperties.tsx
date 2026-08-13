import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getProperties } from "@/sanity/lib/queries";
import { adaptProperty } from "@/sanity/lib/adapters";
import type { AppLocale } from "@/sanity/lib/locale";

export default async function FeaturedProperties() {
    const t = await getTranslations("featuredProperties");
    const locale = (await getLocale()) as AppLocale;

    const sanityProperties = await getProperties();
    const featured = sanityProperties
        .filter((p) => p.featured)
        .slice(0, 2)
        .map((p) => adaptProperty(p, locale));

    return (
        <section className="bg-mist py-24 lg:py-32">
            <Container>
                <Reveal>
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center gap-4 text-slate">
                            <span className="h-px w-10 bg-ink/40" />
                            <span className="font-sans text-xs tracking-[0.25em] text-ink uppercase">
                                {t("eyebrow")}
                            </span>
                            <span className="h-px w-10 bg-ink/40" />
                        </div>
                        <h2 className="mt-6 max-w-2xl font-serif text-3xl leading-[1.25] font-semibold text-ink sm:text-4xl lg:text-[2.75rem]">
                            {t("heading")}
                        </h2>
                        <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-charcoal">
                            {t("subheading")}
                        </p>
                    </div>
                </Reveal>

                <div className="mt-16 grid gap-8 lg:grid-cols-3">
                    {featured.map((property, index) => (
                        <Reveal key={property.slug} delay={index * 150}>
                            <Link href={`/properties/${property.slug}`} className="group block">
                                <div className="relative aspect-[4/3] w-full overflow-hidden shadow-md transition-all duration-500 group-hover:shadow-2xl">
                                    <Image
                                        src={property.image}
                                        alt={property.name}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 via-50% to-transparent" />

                                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                                        <h3 className="mt font-display text-3xl font-medium">
                                            {property.name}
                                        </h3>

                                        <p className="mt-2 line-clamp-2 font-serif text-xl italic leading-relaxed text-white/85">
                                            {property.tagline}
                                        </p>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="gap-2 px-0 py-0 hover:-translate-y-0 mt-4"
                                        >
                                            {t("viewProperty")}
                                            <ArrowRight
                                                size={16}
                                                strokeWidth={1.5}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                        </Button>
                                    </div>
                                </div>
                            </Link>
                        </Reveal>
                    ))}

                    {/* Permanent third tile — this is the piece that makes the section scale.
              It never becomes a property card, no matter how large the collection grows. */}
                    <Reveal delay={featured.length * 150}>
                        <Link
                            href="/properties"
                            className="group flex aspect-[4/3] w-full flex-col justify-between border border-ink/15 bg-paper p-6 shadow-md transition-all duration-500 hover:-translate-y-1 hover:border-ink/30 hover:shadow-xl"
                        >
                            <div className="space-y-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-2xl text-ink/60 transition-colors group-hover:border-ink/30 group-hover:text-ink">
                                    +
                                </div>

                                <div>
                                    <h3 className="font-serif text-xl text-charcoal">
                                        {t("viewAllProperties")}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-charcoal/70">
                                        {t("viewAllCard")}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-ink">
                                Explore
                                <ArrowRight
                                    size={16}
                                    strokeWidth={1.5}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </div>
                        </Link>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}