import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

type RoomDisplay = {
    key: string;
    name: string;
    description: string;
    occupancyLabel: string;
    priceLabel: string;
};

export default function RoomTypes({
    heading,
    rooms,
}: {
    heading: string;
    rooms: RoomDisplay[];
}) {
    return (
        <section className="bg-mist py-20 lg:py-28">
            <Container>
                <Reveal>
                    <h2 className="font-serif text-2xl font-medium text-ink sm:text-3xl">
                        {heading}
                    </h2>
                </Reveal>

                <div className="mt-10 divide-y divide-navy/10 border-t border-navy/10">
                    {rooms.map((room, index) => (
                        <Reveal key={room.key} delay={index * 100}>
                            <div className="flex flex-col justify-between gap-4 py-8 sm:flex-row sm:items-center">
                                <div>
                                    <h3 className="font-serif text-xl font-medium text-ink">
                                        {room.name}
                                    </h3>
                                    <p className="mt-2 max-w-lg font-sans text-sm leading-relaxed text-charcoal">
                                        {room.description}
                                    </p>
                                    <span className="mt-3 inline-block font-sans text-xs tracking-[0.1em] text-slate uppercase">
                                        {room.occupancyLabel}
                                    </span>
                                </div>
                                <span className="shrink-0 font-sans text-sm tracking-[0.1em] text-navy uppercase">
                                    {room.priceLabel}
                                </span>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}