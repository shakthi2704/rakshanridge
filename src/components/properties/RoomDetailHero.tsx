import Image from "next/image";
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
        <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-ink">
            <Image
                src={image}
                alt={roomName}
                fill
                priority
                className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/50" />

            <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
                <div>
                    <Link
                        href={`/properties/${propertySlug}`}
                        className="font-sans text-xs tracking-[0.2em] text-white/70 uppercase underline underline-offset-4 hover:text-white"
                    >
                        {propertyName} — {propertyLocation}
                    </Link>
                    <h1 className="mt-4 font-serif text-4xl font-medium text-white sm:text-5xl lg:text-6xl">
                        {roomName}
                    </h1>
                </div>
            </div>
        </section>
    );
}