import { Sparkles, Utensils, Trees } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getTranslations } from "next-intl/server";

const experiences = [
    {
        icon: Sparkles,
        key: "wellness",
    },
    {
        icon: Utensils,
        key: "spicePath",
    },
    {
        icon: Trees,
        key: "conservation",
    },
];

export default async function MeaningfulEncounters() {
    const t = await getTranslations("meaningfulEncounters");

    return (
        <section className="bg-ink py-24 lg:py-32">
            <Container>

                {/* Section heading */}
                <Reveal>
                    <div className="flex flex-col items-center text-center">

                        {/* Eyebrow */}
                        <div className="flex items-center gap-4 text-white/60">


                            <span className="font-sans text-xs uppercase tracking-[0.25em]">
                                {t("eyebrow")}
                            </span>


                        </div>


                        {/* Heading */}
                        <h2 className="mt-6 max-w-2xl font-serif text-3xl font-semibold leading-[1.25] text-white sm:text-4xl lg:text-[2.75rem]">
                            {t("heading")}
                        </h2>


                        {/* Description */}
                        <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-white/70">
                            {t("subheading")}
                        </p>

                    </div>
                </Reveal>


                {/* Experience cards */}
                <div className="mt-16 grid gap-8 lg:grid-cols-3">
                    {experiences.map((experience, index) => {
                        const Icon = experience.icon;

                        return (
                            <Reveal key={experience.key} delay={index * 150}>
                                <div className="group h-full border border-white/15 bg-white/5 p-10 backdrop-blur-lg transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10">

                                    {/* Icon */}
                                    <Icon
                                        size={40}
                                        strokeWidth={1.2}
                                        className="mb-6 text-white/80 transition-transform duration-500 group-hover:-translate-y-1"
                                    />


                                    {/* Title */}
                                    <h3 className="font-serif text-2xl text-white">
                                        {t(`items.${experience.key}.title`)}
                                    </h3>


                                    {/* Description */}
                                    <p className="mt-4 font-sans text-sm leading-relaxed text-white/65">
                                        {t(`items.${experience.key}.description`)}
                                    </p>

                                </div>
                            </Reveal>
                        );
                    })}
                </div>

            </Container>
        </section>
    );
}