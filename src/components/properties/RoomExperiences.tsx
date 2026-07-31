import Image from "next/image";
import {
    Droplet,
    Wifi,
    Coffee,
    Sparkles,
    Plane,
    Mountain,
    Waves,
    Bell,
    Leaf,
    type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

const ICONS: Record<string, LucideIcon> = {
    pool: Droplet,
    wifi: Wifi,
    breakfast: Coffee,
    spa: Sparkles,
    airportTransfer: Plane,
    mountainView: Mountain,
    oceanView: Waves,
    privateButler: Bell,
    ecoCertified: Leaf,
};

type AmenityDisplay = {
    key: string;
    name: string;
    description: string;
};

type ExperienceCaption = {
    title: string;
    description: string;
};

export default function RoomExperiences({
    heading,
    intro,
    amenities,
    imageOne,
    imageTwo,
    captionOne,
    captionTwo,
}: {
    heading: string;
    intro: string;
    amenities: AmenityDisplay[];
    imageOne: string;
    imageTwo: string;
    captionOne: ExperienceCaption;
    captionTwo: ExperienceCaption;
}) {
    const cards = [
        { image: imageOne, ...captionOne },
        { image: imageTwo, ...captionTwo },
    ];

    return (
        <section className="bg-paper py-20 lg:py-28">
            <Container>
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
                    {/* Left — heading, intro, amenity list */}
                    <div>
                        <Reveal>
                            <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                                {heading}
                            </h2>
                            <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-charcoal">
                                {intro}
                            </p>
                        </Reveal>

                        <div className="mt-10 divide-y divide-navy/10 border-t border-navy/10">
                            {amenities.map((amenity, index) => {
                                const Icon = ICONS[amenity.key] ?? Sparkles;
                                return (
                                    <Reveal key={amenity.key} delay={index * 80}>
                                        <div className="flex items-start gap-4 py-5">
                                            <Icon
                                                className="mt-0.5 h-5 w-5 shrink-0 text-navy"
                                                strokeWidth={1.5}
                                            />
                                            <div>
                                                <h3 className="font-sans text-sm font-medium tracking-[0.05em] text-ink uppercase">
                                                    {amenity.name}
                                                </h3>
                                                <p className="mt-1 font-sans text-sm leading-relaxed text-slate">
                                                    {amenity.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right — two photos, each with its own title + caption */}
                    <div className="grid grid-cols-2 gap-6">
                        {cards.map((card, index) => (
                            <Reveal key={card.title} delay={100 + index * 80}>
                                <div className="relative aspect-[4/5] w-full overflow-hidden">
                                    <Image
                                        src={card.image}
                                        alt={card.title}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 1024px) 22vw, 45vw"
                                    />
                                </div>
                                <h3 className="mt-4 font-serif text-lg font-medium text-ink">
                                    {card.title}
                                </h3>
                                <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal">
                                    {card.description}
                                </p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}