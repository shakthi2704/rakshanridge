import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function ExperienceStory({
    openingFirstLetter,
    openingRest,
    quote,
    closing,
    image,
    title,
}: {
    openingFirstLetter: string;
    openingRest: string;
    quote: string;
    closing: string;
    image: string;
    title: string;
}) {
    return (
        <section className="bg-paper py-20 lg:py-28">
            <Container>
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
                    {/* Left — narrative text */}
                    <div>
                        <Reveal>
                            <p className="font-sans text-base leading-[1.75] text-ink">
                                <span className="float-left mr-3 mt-1 font-serif text-6xl leading-[0.85] text-ink sm:text-7xl">
                                    {openingFirstLetter}
                                </span>
                                {openingRest}
                            </p>
                        </Reveal>

                        <Reveal delay={100}>
                            <div className="relative my-10 pl-8">
                                <span className="absolute top-0 left-0 font-serif text-4xl leading-none text-ink/40 font-medium">
                                    &ldquo;
                                </span>
                                <p className="font-serif text-3xl leading-relaxed text-ink italic font-medium">
                                    {quote}
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={150}>
                            <p className="font-sans text-base leading-[1.75] text-ink">
                                {closing}
                            </p>
                        </Reveal>
                    </div>

                    {/* Right — single tall photo */}
                    <Reveal delay={100}>
                        <div className="relative aspect-[3/4] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[520px]">
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