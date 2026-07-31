import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function ExperienceHighlights({
    heading,
    highlights,
    image,
    title,
}: {
    heading: string;
    highlights: string[];
    image: string;
    title: string;
}) {
    return (
        <section className="bg-mist py-20 lg:py-28">
            <Container>
                <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
                    {/* Left — heading + highlight list */}
                    <div>
                        <Reveal>
                            <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                                {heading}
                            </h2>
                        </Reveal>

                        <div className="mt-10 divide-y divide-navy/10 border-t border-navy/10">
                            {highlights.map((item, index) => (
                                <Reveal key={item} delay={index * 80}>
                                    <div className="flex items-start gap-4 py-5">
                                        <span className="mt-3 h-px w-5 shrink-0 bg-navy" />
                                        <p className="font-sans text-base leading-relaxed text-charcoal">
                                            {item}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    {/* Right — single full-bleed photo */}
                    <Reveal delay={100}>
                        <div className="relative aspect-[4/5] w-full overflow-hidden">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover"
                                sizes="(min-width: 1024px) 45vw, 90vw"
                            />
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}