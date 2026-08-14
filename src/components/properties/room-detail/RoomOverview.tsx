import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";

export default function RoomOverview({
    eyebrow,
    heading,
    description,
    occupancy,
    sizeLabel,
    beds,
    bathrooms,
    guestsCaption,
    sizeCaption,
    bedsCaption,
    bathsCaption,
    priceLabel,
    bookLabel,
    checkAvailabilityLabel,
    roomKey,
    propertySlug,
    image,
    secondaryImage,
    roomName,
}: {
    eyebrow: string;
    heading: string;
    description: string;
    occupancy: number;
    sizeLabel: string;
    beds: number;
    bathrooms: number;
    guestsCaption: string;
    sizeCaption: string;
    bedsCaption: string;
    bathsCaption: string;
    priceLabel: string;
    bookLabel: string;
    checkAvailabilityLabel: string;
    roomKey: string;
    propertySlug: string;
    image: string;
    secondaryImage: string;
    roomName: string;
}) {
    const stats = [
        { value: String(occupancy), caption: guestsCaption },
        { value: sizeLabel, caption: sizeCaption },
        { value: String(beds), caption: bedsCaption },
        { value: String(bathrooms), caption: bathsCaption },
    ];

    return (
        <section className="bg-paper py-20 lg:py-28">
            <Container>
                <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
                    {/* Left — text */}
                    <div>
                        <Reveal>
                            <div className="flex items-center gap-4">

                                <span className="font-sans text-xs tracking-[0.2em] text-ink uppercase">
                                    {eyebrow}
                                </span>
                            </div>
                            <h2 className="mt-4 font-serif text-3xl font-medium text-ink sm:text-4xl lg:text-[2.75rem]">
                                {heading}
                            </h2>
                        </Reveal>

                        <Reveal delay={100}>
                            <p className="mt-6 font-sans text-lg leading-relaxed text-charcoal">
                                {description}
                            </p>
                        </Reveal>

                        <Reveal delay={150}>
                            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-navy/10 pt-8">
                                {stats.map((stat) => (
                                    <div key={stat.caption}>
                                        <span className="block font-serif text-3xl text-ink">
                                            {stat.value}
                                        </span>
                                        <span className="mt-1 block font-sans text-xs tracking-[0.15em] text-slate uppercase">
                                            {stat.caption}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Reveal>

                        <Reveal delay={200}>
                            <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-navy/10 pt-8">
                                {/* <span className="mr-2 font-sans text-sm tracking-[0.1em] text-navy uppercase">
                                    {priceLabel}
                                </span> */}
                                <Link
                                    href={`/book?property=${propertySlug}&room=${roomKey}`}
                                    className={buttonVariants({ variant: "ink", size: "sm" })}
                                >
                                    {bookLabel}
                                </Link>
                                {/* <Link
                                    href={`/book?property=${propertySlug}&room=${roomKey}`}
                                    className={buttonVariants({ variant: "outline-ink", size: "sm" })}
                                >
                                    {checkAvailabilityLabel}
                                </Link> */}
                            </div>
                        </Reveal>
                    </div>

                    {/* Right — image collage */}
                    <Reveal delay={100}>
                        <div className="relative pb-12 lg:pb-16">
                            <div className="relative ml-auto aspect-[4/5] w-[82%] overflow-hidden">
                                <Image
                                    src={image}
                                    alt={roomName}
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 1024px) 45vw, 80vw"
                                />

                                <div className="absolute top-5 right-5 bg-ink/90 px-5 py-3 backdrop-blur-sm">
                                    <span className="font-sans text-xs tracking-[0.15em] uppercase text-white/70">
                                        From
                                    </span>

                                    <p className="mt-1 font-serif text-2xl text-white">
                                        {priceLabel}
                                    </p>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 aspect-square w-[52%] overflow-hidden border-2 border-paper shadow-xl">
                                <Image
                                    src={secondaryImage}
                                    alt={roomName}
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