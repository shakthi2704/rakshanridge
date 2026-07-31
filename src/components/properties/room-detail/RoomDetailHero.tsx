import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";

export default function RoomDetailHero({
    roomName,
    propertyName,
    propertyLocation,
    propertySlug,
    image,
}: {
    roomName: string;
    propertyName: string;
    propertyLocation: string;
    propertySlug: string;
    image: string;
}) {
    return (
        <section className="relative flex h-[70vh] min-h-[480px] items-center justify-center overflow-hidden bg-ink">
            <Image
                src={image}
                alt={roomName}
                fill
                priority
                className="object-cover opacity-80"
            />


            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/20 to-ink/10" />

            <Container className="relative z-10 text-center">
                <Link
                    href={`/properties/${propertySlug}`}
                    className="inline-flex items-center justify-center gap-4 text-white/70 transition-colors hover:text-white"
                >
                    <span className="h-px w-10 bg-white/40" />
                    <span className="font-sans text-xs tracking-[0.35em] uppercase">
                        {propertyName} — {propertyLocation}
                    </span>
                    <span className="h-px w-10 bg-white/40" />
                </Link>

                <h1 className="mt-6 font-serif text-4xl font-medium text-white sm:text-5xl lg:text-6xl">
                    {roomName}
                </h1>
            </Container>

            <ChevronDown
                className="absolute bottom-8 left-1/2 z-10 h-6 w-6 -translate-x-1/2 animate-bounce text-white/70"
                strokeWidth={1.5}
            />
        </section>
    );
}