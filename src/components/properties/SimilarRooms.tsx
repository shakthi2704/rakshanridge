import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

type SimilarRoomDisplay = {
    key: string;
    slug: string;
    name: string;
    image: string;
    priceLabel: string;
};

export default function SimilarRooms({
    eyebrow,
    heading,
    propertySlug,
    rooms,
}: {
    eyebrow: string;
    heading: string;
    propertySlug: string;
    rooms: SimilarRoomDisplay[];
}) {
    if (rooms.length === 0) return null;

    return (
        <section className="bg-mist py-20 lg:py-28">
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

                <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {rooms.map((room, index) => (
                        <Reveal key={room.key} delay={index * 100}>
                            <Link
                                href={`/properties/${propertySlug}/${room.slug}`}
                                className="group block bg-paper"
                            >
                                <div className="relative h-56 w-full overflow-hidden">
                                    <Image
                                        src={room.image}
                                        alt={room.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-serif text-lg font-medium text-ink group-hover:text-navy">
                                        {room.name}
                                    </h3>
                                    <span className="mt-2 block font-sans text-xs tracking-[0.1em] text-navy uppercase">
                                        {room.priceLabel}
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