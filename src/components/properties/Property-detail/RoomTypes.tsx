import Image from "next/image";
import { Users, Maximize } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";
import { slugifyRoomKey } from "@/lib/properties";

type RoomDisplay = {
    key: string;
    name: string;
    description: string;
    image: string;
    occupancyLabel: string;
    sizeLabel: string;
    priceLabel: string;
};

export default function RoomTypes({
    eyebrow,
    heading,
    rooms,
    bookLabel,
    propertySlug,
}: {
    eyebrow: string;
    heading: string;
    rooms: RoomDisplay[];
    bookLabel: string;
    propertySlug: string;
}) {
    return (
        <section className="bg-slate/30 py-20 lg:py-28">
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

                <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {rooms.map((room, index) => (
                        <Reveal key={room.key} delay={index * 100}>
                            <div className="flex h-full flex-col bg-paper">
                                <Link href={`/properties/${propertySlug}/${slugifyRoomKey(room.key)}`}>
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <Image
                                            src={room.image}
                                            alt={room.name}
                                            fill
                                            className="object-cover transition-transform duration-500 hover:scale-105"
                                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                        />
                                    </div>
                                </Link>

                                <div className="flex flex-1 flex-col p-6">
                                    <Link href={`/properties/${propertySlug}/${slugifyRoomKey(room.key)}`}>
                                        <h3 className="font-serif text-3xl font-medium text-ink hover:text-navy">
                                            {room.name}
                                        </h3>
                                    </Link>

                                    <div className="mt-3 flex items-center gap-5">
                                        <span className="flex items-center gap-2 font-sans text-xs tracking-[0.05em] text-ink uppercase">
                                            <Users className="h-4 w-4" />
                                            {room.occupancyLabel}
                                        </span>
                                        <span className="flex items-center gap-2 font-sans text-xs tracking-[0.05em] text-ink uppercase">
                                            <Maximize className="h-4 w-4" />
                                            {room.sizeLabel}
                                        </span>
                                    </div>

                                    <p className="mt-4 flex-1 font-sans text-sm leading-relaxed text-charcoal">
                                        {room.description}
                                    </p>

                                    <div className="mt-6 flex items-center justify-between border-t border-navy/10 pt-5">
                                        <span className="font-sans text-xs tracking-[0.1em] text-ink uppercase">
                                            {room.priceLabel}
                                        </span>
                                        <a
                                            href={`/book?room=${room.key}`}
                                            className={buttonVariants({ variant: "outline-ink", size: "sm" })}
                                        >
                                            {bookLabel}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}