import Image from "next/image";
import { Leaf, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";

export default async function Philosophy() {
    const t = await getTranslations("about.philosophy");

    return (
        <section className="bg-paper py-24 lg:py-32">
            <Container>
                <div className="mx-auto max-w-xl text-center">
                    <Reveal>
                        <div className="flex items-center justify-center gap-4 text-slate">

                            <span className="font-sans text-xs tracking-[0.25em] text-ink uppercase">
                                {t("eyebrow")}
                            </span>

                        </div>
                    </Reveal>

                    <Reveal delay={100}>
                        <h2 className="mt-6 font-serif text-3xl leading-[1.3] font-bold text-ink sm:text-4xl">
                            {t("heading")}
                        </h2>
                    </Reveal>
                </div>

                <div className="mt-16 grid gap-6 lg:grid-cols-3">
                    {/* Bespoke Precision — image card, spans 2 cols */}
                    <Reveal direction="none" className="lg:col-span-2">
                        <div className="relative flex h-80 items-end overflow-hidden rounded-sm shadow-md">
                            <Image
                                src="/images/about-01.webp"
                                alt=""
                                aria-hidden="true"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                            <div className="relative z-10 p-8">
                                <h3 className="font-serif text-2xl font-medium text-white">
                                    {t("cards.precision.title")}
                                </h3>
                                <p className="mt-2 max-w-sm font-sans text-sm leading-relaxed text-white/85">
                                    {t("cards.precision.description")}
                                </p>
                            </div>
                        </div>
                    </Reveal>

                    {/* Deep Sustainability — solid ink card */}
                    <Reveal delay={100}>
                        <div className="flex h-80 flex-col items-center justify-center rounded-sm bg-ink p-8 text-center">
                            <Leaf className="h-8 w-8 text-white/70" strokeWidth={1.25} />
                            <h3 className="mt-5 font-serif text-2xl font-medium text-white">
                                {t("cards.sustainability.title")}
                            </h3>
                            <p className="mt-3 font-sans text-sm leading-relaxed text-white/75">
                                {t("cards.sustainability.description")}
                            </p>
                        </div>
                    </Reveal>

                    {/* Truly Immersive — full-width image card */}
                    <Reveal delay={200} className="lg:col-span-3">
                        <div className="relative flex h-96 items-center overflow-hidden rounded-sm shadow-md">
                            <Image
                                src="/images/hero.jpg"
                                alt=""
                                aria-hidden="true"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
                            <div className="relative z-10 max-w-md p-10 sm:p-14">
                                <h3 className="font-serif text-3xl font-medium text-white">
                                    {t("cards.immersive.title")}
                                </h3>
                                <p className="mt-4 font-sans text-sm leading-relaxed text-white/85">
                                    {t("cards.immersive.description")}
                                </p>
                                <Link href="/experiences">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="group mt-6 gap-2 px-0 py-0 text-white hover:-translate-y-0 hover:bg-transparent hover:text-white/70"
                                    >
                                        {t("cards.immersive.cta")}
                                        <ArrowRight
                                            size={16}
                                            strokeWidth={1.5}
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                        />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}