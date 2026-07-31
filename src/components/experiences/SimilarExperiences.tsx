import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

type SimilarExperienceDisplay = {
    key: string;
    slug: string;
    title: string;
    location: string;
    image: string;
};

export default function SimilarExperiences({
    eyebrow,
    heading,
    exploreLabel,
    experiences,
}: {
    eyebrow: string;
    heading: string;
    exploreLabel: string;
    experiences: SimilarExperienceDisplay[];
}) {
    if (experiences.length === 0) return null;

    return (
        <section className="bg-paper py-20 lg:py-28">
            <Container>
                <Reveal>
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center gap-4">
                            <span className="h-px w-8 bg-navy" />
                            <span className="font-sans text-xs tracking-[0.2em] text-navy uppercase">
                                {eyebrow}
                            </span>
                            <span className="h-px w-8 bg-navy" />
                        </div>
                        <h2 className="mt-4 font-serif text-3xl font-medium text-ink sm:text-4xl">
                            {heading}
                        </h2>
                    </div>
                </Reveal>

                <div className="mt-14 flex flex-wrap justify-center gap-8">
                    {experiences.map((exp, index) => (
                        <Reveal
                            key={exp.key}
                            delay={index * 100}
                            className="w-full sm:w-[calc(50%-1rem)] lg:w-[440px]"
                        >
                            <Link
                                href={`/experiences/${exp.slug}`}
                                className="group relative block h-[420px] w-full overflow-hidden"
                            >
                                <Image
                                    src={exp.image}
                                    alt={exp.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(min-width: 1024px) 440px, (min-width: 640px) 50vw, 100vw"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />

                                <div className="absolute inset-x-0 bottom-0 p-7">
                                    <span className="font-sans text-xs tracking-[0.2em] text-white/70 uppercase">
                                        {exp.location}
                                    </span>
                                    <h3 className="mt-2 font-serif text-2xl font-medium text-white">
                                        {exp.title}
                                    </h3>
                                    <span className="mt-4 inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] text-white uppercase underline underline-offset-4 decoration-white/40 transition-colors group-hover:decoration-white">
                                        {exploreLabel}
                                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}