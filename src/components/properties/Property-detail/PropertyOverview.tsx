import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Image from "next/image";

export default function PropertyOverview({
    eyebrow,
    heading,
    description,
    highlights,
}: {
    eyebrow: string;
    heading: string;
    description: string;
    highlights: {
        heading: string;
        items: {
            label: string;
            value: string;
        }[];
    };
}) {
    return (
        <section className="bg-paper py-20 lg:py-28">
            <Container>
                <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
                    {/* Left — text */}
                    <div className="lg:col-span-3">
                        <Reveal>
                            <div className="flex items-center gap-4">
                                <span className="font-sans text-xs tracking-[0.2em] text-ink uppercase">
                                    {eyebrow}
                                </span>
                            </div>

                            <h2 className="mt-4 font-serif text-3xl font-medium text-ink sm:text-4xl">
                                {heading}
                            </h2>
                        </Reveal>

                        <Reveal delay={100}>
                            <p className="mt-8 font-sans text-lg leading-relaxed text-ink first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:font-medium first-letter:leading-[0.85] first-letter:text-slate">
                                {description}
                            </p>
                        </Reveal>
                    </div>

                    {/* Right — Property Highlights */}
                    <div className="lg:col-span-2">
                        <Reveal delay={150}>
                            <div className="relative overflow-hidden bg-ink p-8 lg:p-10">
                                <Image
                                    src="/images/brand-story-mask-dark.png"
                                    alt=""
                                    aria-hidden="true"
                                    width={380}
                                    height={500}
                                    className="pointer-events-none absolute top-1/2 -right-42 -translate-y-1/2 object-contain opacity-25"
                                />

                                <div className="relative z-10 flex flex-col gap-6">
                                    <h3 className="font-serif text-2xl text-white">
                                        {highlights.heading}
                                    </h3>

                                    {highlights.items.map((item, index) => (
                                        <div key={index}>
                                            <span className="font-sans text-xs tracking-[0.15em] text-white/50 uppercase">
                                                {item.label}
                                            </span>

                                            <p className="mt-2 font-serif text-xl text-white">
                                                {item.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    );
}