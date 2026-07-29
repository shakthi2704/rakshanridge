import Image from "next/image";
import Container from "@/components/ui/Container";

export default function PropertyDetailHero({
    name,
    location,
    tagline,
    gallery,
}: {
    name: string;
    location: string;
    tagline: string;
    gallery: string[];
}) {
    return (
        <section className="relative flex h-[70vh] min-h-[480px] items-center justify-center overflow-hidden bg-ink">
            <Image
                src={gallery[0]}
                alt={`${name} — ${location}`}
                fill
                priority
                className="object-cover opacity-60"
            />


            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/30" />

            <Container className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-4 text-white/70">
                    <span className="h-px w-10 bg-white/40" />

                    <span className="font-sans text-xs tracking-[0.35em] uppercase">
                        {location}
                    </span>

                    <span className="h-px w-10 bg-white/40" />
                </div>

                <h1 className="mt-6 font-serif text-4xl font-medium text-white sm:text-5xl lg:text-6xl">
                    {name}
                </h1>

                <p className="mx-auto mt-6 max-w-xl font-serif text-lg font-light italic leading-relaxed text-white/80">
                    {tagline}
                </p>
            </Container>
        </section>
    );
}