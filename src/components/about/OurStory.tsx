import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getTranslations } from "next-intl/server";

export default async function OurStory() {
    const t = await getTranslations("about.ourStory");
    const paragraphs = t.raw("paragraphs") as string[];

    return (
        <section className="bg-paper py-24 lg:py-32">
            <Container>
                <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-24">
                    <Reveal direction="none">
                        <div className="relative">
                            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-xl sm:aspect-[16/11] lg:aspect-[4/5]">
                                <Image
                                    src="/images/about-01.webp"
                                    alt="A restored planter's bungalow in the Sri Lankan hill country"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Floating stat badge */}
                            <div className="absolute -bottom-6 -right-6 flex h-28 w-28 flex-col items-center justify-center rounded-sm bg-ink text-center shadow-lg sm:h-32 sm:w-32">
                                <span className="font-serif text-3xl font-medium text-white sm:text-4xl">
                                    {t("stat.number")}
                                </span>
                                <span className="mt-1 px-3 font-sans text-[0.65rem] leading-tight tracking-[0.1em] text-white/75 uppercase">
                                    {t("stat.label")}
                                </span>
                            </div>
                        </div>
                    </Reveal>

                    <div>
                        <Reveal>
                            <div className="flex items-center gap-4 text-slate">
                                <span className="h-px w-10 bg-navy/40" />
                                <span className="font-sans text-xs tracking-[0.35em] text-ink font-medium uppercase">
                                    {t("eyebrow")}
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={100}>
                            <h2 className="mt-6 font-serif text-3xl leading-[1.3] font-bold text-ink sm:text-4xl">
                                {t("heading")}
                            </h2>
                        </Reveal>

                        <div className="mt-8 space-y-5">
                            {paragraphs.map((paragraph, i) => (
                                <Reveal key={i} delay={200 + i * 100}>
                                    <p className="font-sans text-base leading-relaxed text-charcoal">
                                        {paragraph}
                                    </p>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal delay={500}>
                            <p className="mt-8 border-t border-navy/15 pt-6 font-serif text-xl leading-relaxed text-slate italic">
                                &ldquo;{t("quote")}&rdquo;
                            </p>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    );
}