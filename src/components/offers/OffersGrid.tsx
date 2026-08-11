import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { formatPrice, type Currency } from "@/lib/properties";
import type { adaptOffer } from "@/sanity/lib/adapters";

type AdaptedOffer = ReturnType<typeof adaptOffer>;

type OffersGridProps = {
    offers: AdaptedOffer[];
    currency: Currency;
    rate?: number;
};

export default async function OffersGrid({ offers, currency, rate }: OffersGridProps) {
    const t = await getTranslations("offersPage");

    if (offers.length === 0) {
        return (
            <section className="bg-paper py-20 lg:py-28">
                <Container>
                    <p className="text-center font-sans text-base text-charcoal">
                        {t("noResults")}
                    </p>
                </Container>
            </section>
        );
    }

    return (
        <section className="bg-paper py-20 lg:py-28">
            <Container>
                <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                    {offers.map((offer, i) => {
                        const href = offer.roomSlug
                            ? `/properties/${offer.propertySlug}/${offer.roomSlug}`
                            : `/properties/${offer.propertySlug}`;

                        return (
                            <Reveal key={offer.slug} delay={i * 100}>
                                <Link href={href} className="group block">
                                    <div className="relative aspect-[4/5] w-full overflow-hidden shadow-md transition-shadow duration-500 group-hover:shadow-2xl">
                                        <Image
                                            src={offer.image}
                                            alt={offer.title}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />

                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />

                                        {/* Discount badge - Top */}
                                        <span className="absolute top-4 right-4 bg-ink/80 p-1.5 font-sans text-xs tracking-[0.1em] text-white uppercase">
                                            {t("discountBadge", { percent: offer.discountPercentage })}
                                        </span>

                                        {/* Offer info - Bottom */}
                                        <div className="absolute right-5 bottom-5 left-5 text-white">
                                            <span className="font-sans text-xs tracking-[0.2em] text-white/80 uppercase">
                                                {offer.propertyName}
                                            </span>

                                            <h3 className="mt-2 font-serif text-3xl font-medium">
                                                {offer.title}
                                            </h3>

                                            <p className="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-white/70">
                                                {offer.description}
                                            </p>

                                            <div className="mt-4 flex items-baseline gap-3">
                                                <span className="font-sans text-sm text-white/50 line-through">
                                                    {formatPrice(offer.basePrice, currency, rate)}
                                                </span>
                                                <span className="font-sans text-base font-medium text-white">
                                                    {formatPrice(offer.offerPrice, currency, rate)}
                                                </span>
                                            </div>

                                            <span className="mt-6 inline-flex items-center gap-3 border-b border-white/40 pb-1 font-sans text-xs tracking-[0.2em] uppercase transition-colors group-hover:border-white">
                                                {t("viewOffer")}
                                                <ArrowRight
                                                    size={15}
                                                    strokeWidth={1.5}
                                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </Reveal>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}