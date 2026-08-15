import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/Button";
import { getExperiences } from "@/sanity/lib/queries";
import { adaptExperience } from "@/sanity/lib/adapters";
import type { AppLocale } from "@/sanity/lib/locale";

export default async function Experiences() {
    const t = await getTranslations("experiences");
    const locale = await getLocale();

    const sanityExperiences = await getExperiences();
    const adapted = sanityExperiences.map((exp) => adaptExperience(exp, locale as AppLocale));

    if (adapted.length === 0) return null;

    const featuredIndex = adapted.findIndex((exp) => exp.featured);
    const featured = featuredIndex >= 0 ? adapted[featuredIndex] : adapted[0];
    const rest = adapted.filter((exp) => exp.key !== featured.key).slice(0, 2);

    return (
        <section className="bg-paper py-24 lg:py-32">
            <Container>
                <Reveal>
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center gap-4 text-slate">

                            <span className="font-sans text-xs tracking-[0.25em] text-ink uppercase">
                                {t("eyebrow")}
                            </span>

                        </div>
                        <h2 className="mt-6 max-w-2xl font-serif text-3xl leading-[1.25] font-medium text-ink sm:text-4xl lg:text-[2.75rem]">
                            {t("heading")}
                        </h2>
                        <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-charcoal">
                            {t("subheading")}
                        </p>
                    </div>
                </Reveal>
                <Reveal delay={100}>
                    <div className="mt-10 flex justify-end">
                        <Link
                            href="/experiences"
                            className={buttonVariants({ variant: "underline-ink", size: "sm" })}
                        >
                            {t("viewAll")}
                        </Link>
                    </div>
                </Reveal>

                <div className="mt-16 grid gap-6 lg:grid-cols-12">
                    {/* Featured experience — spans full height, wider column */}
                    <Reveal className="lg:col-span-7" direction="none">
                        <div className="group relative aspect-[4/5] w-full overflow-hidden shadow-md transition-shadow duration-500 hover:shadow-2xl lg:aspect-auto lg:h-full lg:min-h-[32rem]">
                            <Image
                                src={featured.image}
                                alt={featured.title}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
                                <h3 className="font-serif text-2xl font-light text-white sm:text-3xl">
                                    {featured.title}
                                </h3>
                                <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-white/85">
                                    {featured.description}
                                </p>
                            </div>
                        </div>
                    </Reveal>

                    {/* Two supporting experiences, stacked */}
                    <div className="flex flex-col gap-6 lg:col-span-5">
                        {rest.map((exp, index) => (
                            <Reveal key={exp.key} delay={(index + 1) * 150} className="flex-1">
                                <div className="group relative  rounded-sm flex h-full min-h-[15rem] w-full overflow-hidden shadow-md transition-shadow duration-500 hover:shadow-2xl">
                                    <Image
                                        src={exp.image}
                                        alt={exp.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
                                    <div className="relative mt-auto p-6 sm:p-7">
                                        <h3 className="font-serif text-xl font-light text-white">
                                            {exp.title}
                                        </h3>
                                        <p className="mt-2 max-w-xs font-sans text-sm leading-relaxed text-white/85">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

            </Container>
        </section>
    );
}