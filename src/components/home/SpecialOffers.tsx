import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getOffers } from "@/sanity/lib/queries";
import { adaptOffer } from "@/sanity/lib/adapters";
import type { AppLocale } from "@/sanity/lib/locale";

export default async function SpecialOffers() {
    const t = await getTranslations("specialOffers");
    const locale = await getLocale();

    const sanityOffers = await getOffers();
    const adaptedOffers = sanityOffers.map((o) =>
        adaptOffer(o, locale as AppLocale)
    );

    if (adaptedOffers.length === 0) return null;

    const offer =
        adaptedOffers.find((o) => o.featured) ?? adaptedOffers[0];

    const offerHref = "/offers";

    return (
        <section className="overflow-hidden bg-paper py-24 lg:py-32">
            <Container>
                {/* Section Header */}
                <Reveal>
                    <div className="mb-16 flex flex-col items-center text-center">
                        <div className="flex items-center gap-4 text-slate">
                            <span className="font-sans text-xs tracking-[0.25em] text-ink uppercase">
                                {t("eyebrow")}
                            </span>
                        </div>

                        <h2 className="mt-6 max-w-2xl font-serif text-3xl leading-[1.25] font-medium text-ink sm:text-4xl lg:text-[2.75rem]">
                            {t("heading")}
                        </h2>
                    </div>
                </Reveal>

                {/* Full-width Offer Card */}
                <Reveal>
                    <div className="group relative w-full overflow-hidden bg-ink p-12 text-white">
                        {/* Decorative circle */}
                        <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/3 overflow-hidden rounded-full">
                            <Image
                                src="/images/brand-story-mask-dark.png"
                                alt="Experience"
                                fill
                                sizes="256px"
                                className="object-cover opacity-30"
                            />

                            <div className="absolute inset-0 bg-black/20" />
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <p className="font-sans text-xs tracking-[0.25em] text-white/60 uppercase">
                                {t("offer.eyebrow")}
                            </p>

                            <h3 className="mt-4 font-serif text-4xl text-white">
                                {offer.title}
                            </h3>
                            <p className="mt-6 max-w-xl font-sans text-sm leading-relaxed text-white/70">
                                {offer.description}
                            </p>

                            <Link
                                href={offerHref}
                                className="mt-8 inline-flex items-center gap-3 border-b border-white/40 pb-1 font-sans text-xs uppercase tracking-[0.2em] transition-colors hover:border-white
                                "
                            >
                                {t("offer.cta")}

                                <ArrowRight
                                    size={15}
                                    strokeWidth={1.5}
                                />
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}