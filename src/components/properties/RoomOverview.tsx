import Image from "next/image";
import { Users, Maximize, BedDouble, Bath } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";

export default function RoomOverview({
    eyebrow,
    heading,
    description,
    occupancyLabel,
    sizeLabel,
    bedsLabel,
    bathroomsLabel,
    priceLabel,
    bookLabel,
    roomKey,
    image,
    roomName,
}: {
    eyebrow: string;
    heading: string;
    description: string;
    occupancyLabel: string;
    sizeLabel: string;
    bedsLabel: string;
    bathroomsLabel: string;
    priceLabel: string;
    bookLabel: string;
    roomKey: string;
    image: string;
    roomName: string;
}) {
    return (
        <section className="bg-paper py-20 lg:py-28">
            <Container>
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left — image */}
                    <Reveal>
                        <div className="relative h-80 w-full overflow-hidden lg:h-full lg:min-h-[460px]">
                            <Image
                                src={image}
                                alt={roomName}
                                fill
                                className="object-cover"
                                sizes="(min-width: 1024px) 50vw, 100vw"
                            />
                        </div>
                    </Reveal>

                    {/* Right — text */}
                    <div className="flex flex-col justify-center">
                        <Reveal delay={100}>
                            <div className="flex items-center gap-4">
                                <span className="h-px w-8 bg-navy" />
                                <span className="font-sans text-xs tracking-[0.2em] text-navy uppercase">
                                    {eyebrow}
                                </span>
                            </div>
                            <h2 className="mt-4 font-serif text-3xl font-medium text-ink sm:text-4xl">
                                {heading}
                            </h2>
                        </Reveal>

                        <Reveal delay={150}>
                            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                                <span className="flex items-center gap-2 font-sans text-xs tracking-[0.1em] text-slate uppercase">
                                    <Users className="h-4 w-4" />
                                    {occupancyLabel}
                                </span>
                                <span className="flex items-center gap-2 font-sans text-xs tracking-[0.1em] text-slate uppercase">
                                    <Maximize className="h-4 w-4" />
                                    {sizeLabel}
                                </span>
                                <span className="flex items-center gap-2 font-sans text-xs tracking-[0.1em] text-slate uppercase">
                                    <BedDouble className="h-4 w-4" />
                                    {bedsLabel}
                                </span>
                                <span className="flex items-center gap-2 font-sans text-xs tracking-[0.1em] text-slate uppercase">
                                    <Bath className="h-4 w-4" />
                                    {bathroomsLabel}
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={200}>
                            <p className="mt-8 font-serif text-lg leading-relaxed text-charcoal">
                                {description}
                            </p>
                        </Reveal>

                        <Reveal delay={250}>
                            <div className="mt-9 flex items-center gap-6 border-t border-navy/10 pt-7">
                                <span className="font-sans text-sm tracking-[0.1em] text-navy uppercase">
                                    {priceLabel}
                                </span>
                                <Link
                                    href={`/book?room=${roomKey}`}
                                    className={buttonVariants({ variant: "ink", size: "md" })}
                                >
                                    {bookLabel}
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    );
}