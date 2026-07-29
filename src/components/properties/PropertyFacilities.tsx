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

export default function PropertyFacilities({
    eyebrow,
    heading,
    amenities,
}: {
    eyebrow: string;
    heading: string;
    amenities: AmenityDisplay[];
}) {
    return (
        <section className="bg-ink py-20 lg:py-28">
            <Container>
                <Reveal>
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center gap-4">
                            <span className="h-px w-8 bg-white/40" />
                            <span className="font-sans text-xs tracking-[0.2em] text-white/70 uppercase">
                                {eyebrow}
                            </span>
                            <span className="h-px w-8 bg-white/40" />
                        </div>
                        <h2 className="mt-4 font-serif text-3xl font-medium text-white sm:text-4xl">
                            {heading}
                        </h2>
                    </div>
                </Reveal>

                <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {amenities.map((amenity, index) => {
                        const Icon = ICONS[amenity.key] ?? Sparkles;
                        return (
                            <Reveal key={amenity.key} delay={index * 80}>
                                <div className="flex items-start gap-4">
                                    <Icon className="h-6 w-6 shrink-0 text-white/70" strokeWidth={1.5} />
                                    <div>
                                        <h3 className="font-sans text-sm font-medium text-white">
                                            {amenity.name}
                                        </h3>
                                        <p className="mt-1 font-sans text-sm leading-relaxed text-white/60">
                                            {amenity.description}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}