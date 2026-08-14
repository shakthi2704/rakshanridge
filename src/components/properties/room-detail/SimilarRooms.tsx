import Image from "next/image";
import { ArrowRight } from "lucide-react";
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
    exploreLabel,
    propertySlug,
    rooms,
}: {
    eyebrow: string;
    heading: string;
    exploreLabel: string;
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

                            <span className="font-sans text-xs tracking-[0.25em] text-navy uppercase">
                                {eyebrow}
                            </span>

                        </div>
                        <h2 className="mt-4 font-serif text-3xl font-medium text-ink sm:text-4xl">
                            {heading}
                        </h2>
                    </div>
                </Reveal>

                <div className="mt-14 flex flex-wrap justify-start gap-8">
                    {rooms.map((room, index) => (
                        <Reveal
                            key={room.key}
                            delay={index * 100}
                            className="w-full sm:w-[calc(50%-1rem)] lg:w-[440px]"
                        >
                            <Link
                                href={`/properties/${propertySlug}/${room.slug}`}
                                className="group relative block h-[420px] w-full overflow-hidden"
                            >
                                <Image
                                    src={room.image}
                                    alt={room.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(min-width: 1024px) 440px, (min-width: 640px) 50vw, 100vw"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />

                                <div className="absolute inset-x-0 bottom-0 p-7">
                                    <span className="font-sans text-xs tracking-[0.2em] text-white/70 uppercase">
                                        {room.priceLabel}
                                    </span>
                                    <h3 className="mt-2 font-serif text-2xl font-medium text-white">
                                        {room.name}
                                    </h3>
                                    <span className="mt-4 inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] text-white uppercase underline underline-offset-4 decoration-white/40 transition-colors group-hover:decoration-white">
                                        {exploreLabel}
                                        {/* <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /> */}
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