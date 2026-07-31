import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function ExperienceOverview({
    eyebrow,
    heading,
    description,
    duration,
    location,
    durationLabel,
    locationLabel,
    image,
    secondaryImage,
    title,
}: {
    eyebrow: string;
    heading: string;
    description: string;
    duration: string;
    location: string;
    durationLabel: string;
    locationLabel: string;
    image: string;
    secondaryImage: string;
    title: string;
}) {
    const stats = [
        { value: duration, caption: durationLabel },
        { value: location, caption: locationLabel },
    ];

    return (
        <section className="bg-paper py-20 lg:py-28">
            <Container>
                <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
                    {/* Left — text */}
                    <div>
                        <Reveal>
                            <div className="flex items-center gap-4">
                                <span className="h-px w-8 bg-navy" />
                                <span className="font-sans text-xs tracking-[0.2em] text-navy uppercase">
                                    {eyebrow}
                                </span>
                            </div>
                            <h2 className="mt-4 font-serif text-3xl font-medium text-ink sm:text-4xl lg:text-[2.75rem]">
                                {heading}
                            </h2>
                        </Reveal>

                        <Reveal delay={100}>
                            <p className="mt-6 font-serif text-lg leading-relaxed text-charcoal">
                                {description}
                            </p>
                        </Reveal>

                        <Reveal delay={150}>
                            <div className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-navy/10 pt-8">
                                {stats.map((stat) => (
                                    <div key={stat.caption}>
                                        <span className="block font-serif text-2xl text-ink sm:text-3xl">
                                            {stat.value}
                                        </span>
                                        <span className="mt-1 block font-sans text-xs tracking-[0.15em] text-slate uppercase">
                                            {stat.caption}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    {/* Right — image collage */}
                    <Reveal delay={100}>
                        <div className="relative pb-12 lg:pb-16">
                            <div className="relative ml-auto aspect-[4/5] w-[82%] overflow-hidden">
                                <Image
                                    src={image}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 1024px) 45vw, 80vw"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 aspect-square w-[52%] overflow-hidden border-8 border-paper shadow-xl">
                                <Image
                                    src={secondaryImage}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 1024px) 25vw, 45vw"
                                />
                            </div>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}