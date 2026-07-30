import { ArrowRight, Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function SpecialOffers() {
    const t = await getTranslations("specialOffers");

    return (
        <section className="bg-paper overflow-hidden py-24 lg:py-32">
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


                <div className="grid items-center gap-12 md:grid-cols-12 md:gap-8">

                    {/* Testimonial */}
                    <Reveal className="md:col-span-5">
                        <div className="relative">
                            <span
                                aria-hidden
                                className="pointer-events-none absolute -top-20 left-0 font-serif text-[10rem] leading-none text-ink/25 select-none"
                            >
                                &ldquo;
                            </span>

                            <blockquote className="font-serif text-3xl font-medium italic leading-[1.4] text-ink">
                                "{t("quote")}"
                            </blockquote>
                        </div>
                    </Reveal>

                    {/* Offer Card */}
                    <Reveal className="md:col-span-6 md:col-start-7">
                        <div className="group relative overflow-hidden bg-ink p-12 text-white">

                            {/* Decorative square */}
                            <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 overflow-hidden rounded-full ">
                                <Image
                                    src="/images/brand-story-mask-dark.png"
                                    alt="Experience"
                                    fill
                                    className="object-cover opacity-30"
                                />

                                {/* Optional dark overlay */}
                                <div className="absolute inset-0 bg-black/20" />
                            </div>

                            <div className="relative z-10">

                                <p className="font-sans text-xs uppercase tracking-[0.25em] text-white/60">
                                    {t("offer.eyebrow")}
                                </p>

                                <h3 className="mt-4 font-serif text-4xl text-white">
                                    {t("offer.title")}
                                </h3>

                                <p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-white/70">
                                    {t("offer.description")}
                                </p>

                                <button
                                    className="
                                        mt-8 inline-flex items-center gap-3
                                        border-b border-white/40 pb-1
                                        font-sans text-xs uppercase
                                        tracking-[0.2em]
                                        transition-colors
                                        hover:border-white
                                    "
                                >
                                    {t("offer.cta")}

                                    <ArrowRight
                                        size={15}
                                        strokeWidth={1.5}
                                    />
                                </button>

                            </div>
                        </div>
                    </Reveal>

                </div>

            </Container>
        </section>
    );
}