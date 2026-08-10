import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getTranslations } from "next-intl/server";

export default async function OurStory() {
    const t = await getTranslations("about.ourStory");
    const paragraphs = t.raw("paragraphs") as string[];

    return (
        <section className="relative overflow-hidden bg-paper py-24 lg:py-32">
            <Image
                src="/images/brand-story-mask.png"
                alt=""
                aria-hidden="true"
                width={500}
                height={650}
                className="pointer-events-none absolute top-0 left-0 z-0 w-64 -scale-x-100 opacity-20 sm:w-80 lg:w-[28rem]"
            />

            <Container>
                <div className="relative z-10 grid items-center gap-14 lg:grid-cols-2 lg:gap-24">

                    {/* Left — Text */}
                    <div className="max-w-md">
                        <Reveal>
                            <div className="flex items-center gap-4">
                                <span className="font-sans text-xs font-medium tracking-[0.25em] uppercase text-ink">
                                    {t("eyebrow")}
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={100}>
                            <h2 className="mt-6 font-serif text-3xl font-semibold leading-[1.3] text-ink sm:text-4xl">
                                {t("heading")}
                            </h2>
                        </Reveal>

                        <div className="mt-8 space-y-5">
                            {paragraphs.map((paragraph, i) => (
                                <Reveal key={i} delay={200 + i * 100}>
                                    <p className="font-sans text-base leading-relaxed text-charcoal ">
                                        {paragraph}
                                    </p>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal delay={500}>
                            <p className="mt-8 border-t border-ink/15 pt-6 font-serif text-xl italic leading-relaxed text-ink">
                                &ldquo;{t("quote")}&rdquo;
                            </p>
                        </Reveal>
                    </div>

                    {/* Right — Image */}
                    <Reveal direction="none">
                        <div className="relative">
                            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-xl sm:aspect-[16/11] lg:aspect-[4/3]">
                                <Image
                                    src="/images/about-01.webp"
                                    alt="A restored planter's bungalow in the Sri Lankan hill country"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="absolute -bottom-6 -left-6 flex h-28 w-28 flex-col items-center justify-center rounded-sm bg-ink text-center shadow-lg sm:h-32 sm:w-32">
                                <span className="font-serif text-3xl font-medium text-white sm:text-4xl">
                                    {t("stat.number")}
                                </span>
                                <span className="mt-1 px-3 font-sans text-[0.65rem] leading-tight tracking-[0.1em] uppercase text-white/75">
                                    {t("stat.label")}
                                </span>
                            </div>
                        </div>
                    </Reveal>

                </div>
            </Container>
        </section>
    );
}