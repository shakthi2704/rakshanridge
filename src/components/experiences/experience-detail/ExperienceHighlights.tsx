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
        <section className="bg-ink py-20 lg:py-28">
            <Container>
                <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">

                    {/* Left — Content */}
                    <div>
                        <Reveal>
                            <span className="font-sans text-xs tracking-[0.25em] text-white/60 uppercase">
                                Experience
                            </span>

                            <h2 className="mt-5 font-serif text-3xl font-medium leading-[1.25] text-white sm:text-4xl">
                                {heading}
                            </h2>
                        </Reveal>

                        <Reveal delay={100}>
                            <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-white/70">
                                Discover carefully designed moments that connect you with
                                Sri Lanka’s landscapes, traditions, flavours, and stories.
                                Every experience is created to feel personal, unhurried,
                                and deeply connected to place.
                            </p>
                        </Reveal>

                        <div className="mt-10 divide-y divide-white/10 border-t border-white/10">
                            {highlights.map((item, index) => (
                                <Reveal key={item} delay={index * 80}>
                                    <div className="flex items-start gap-4 py-5">
                                        <Image
                                            src="/logo/1.svg"
                                            alt=""
                                            width={16}
                                            height={16}
                                            className="mt-0.5 h-6 w-6 shrink-0 opacity-70"
                                        />

                                        <p className="font-sans text-base leading-relaxed text-white/80">
                                            {item}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>


                    {/* Right — Image */}
                    <Reveal delay={150}>
                        <div className="relative mx-auto w-full max-w-md">
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <Image
                                    src={image}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 1024px) 40vw, 90vw"
                                />
                            </div>

                            <div className="absolute -bottom-5 -left-5 h-full w-full border border-white/10 -z-0" />
                        </div>
                    </Reveal>

                </div>
            </Container>
        </section>
    );
}