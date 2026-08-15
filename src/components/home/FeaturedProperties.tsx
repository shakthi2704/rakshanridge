import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { getPropertiesForListing } from "@/sanity/lib/queries";
import { adaptProperty } from "@/sanity/lib/adapters";
import type { AppLocale } from "@/sanity/lib/locale";

export default async function FeaturedProperties() {
    const t = await getTranslations("featuredProperties");
    const locale = (await getLocale()) as AppLocale;


    const sanityProperties = await getPropertiesForListing();
    const featured = sanityProperties
        .filter((p) => p.featured)
        .slice(0, 3)
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
                    <div className="mt-10 flex justify-end">
                        <Link
                            href="/properties/all"
                            className={cn(
                                buttonVariants({
                                    variant: "underline-ink",
                                    size: "sm",
                                })
                            )}
                        >
                            {t("viewProperty")}
                        </Link>
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
                                        <h3 className="font-display text-3xl font-medium">
                                            {property.name}
                                        </h3>

                                        <p className="mt-2 line-clamp-2 font-serif text-xl italic leading-relaxed text-white/85">
                                            {property.tagline}
                                        </p>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="mt-4 gap-2 px-0 py-0 hover:-translate-y-0"
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
                </div>



            </Container>
        </section>
    );
}