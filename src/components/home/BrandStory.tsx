import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default async function BrandStory() {
    const t = await getTranslations("brandStory");

    return (
        <section className="relative overflow-hidden bg-paper py-24 lg:py-36">
            <Image
                src="/images/brand-story-mask.png"
                alt=""
                aria-hidden="true"
                width={500}
                height={650}
                className="pointer-events-none absolute right-0 bottom-0 z-0 w-64 opacity-30 sm:w-80 lg:w-[28rem]"
            />
            <Container>
                <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
                    <Reveal direction="none">
                        <div className="relative aspect-[4/5] rounded-sm w-full overflow-hidden shadow-xl sm:aspect-[16/11] lg:aspect-[4/3]">
                            <Image
                                src="/images/about-01.webp"
                                alt="Highland tea country in the morning mist"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </Reveal>

                    <div className="relative max-w-md">
                        {/* <Image
                            src="/images/brand-story-mask.png"
                            alt=""
                            aria-hidden="true"
                            width={400}
                            height={500}
                            className="pointer-events-none absolute -right-10 bottom-0 z-0 w-56 opacity-50 sm:w-72"
                        /> */}

                        <Reveal>
                            <div className="flex items-center gap-4 text-slate">
                                <span className="h-px w-10 bg-navy/40" />
                                <span className="font-sans text-xs tracking-[0.35em] text-ink font-medium uppercase">
                                    {t("eyebrow")}
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={100}>
                            <h2 className="mt-6 font-serif text-3xl leading-[1.3] font-medium  text-ink sm:text-4xl">
                                {t("heading")}
                            </h2>
                        </Reveal>

                        <Reveal delay={200}>
                            <p className="mt-6 font-serif text-2xl  font-medium text-ink italic ">
                                &ldquo;{t("quote")}&rdquo;
                            </p>
                        </Reveal>

                        <Reveal delay={300}>
                            <p className="mt-6 font-sans text-base leading-relaxed text-charcoal">
                                {t("body")}
                            </p>
                        </Reveal>

                        <Reveal delay={400}>
                            <Link
                                href="/about"
                                className={buttonVariants({ variant: "ink", size: "sm", className: "mt-8" })}
                            >
                                {t("cta")}
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    );
}