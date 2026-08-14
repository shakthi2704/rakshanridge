import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";

export default function ExperienceDetailHero({
    title,
    eyebrow,
    image,
}: {
    title: string;
    eyebrow: string;
    image: string;
}) {
    return (
        <section className="relative flex h-[65vh] min-h-[320px] items-center justify-center overflow-hidden bg-ink sm:h-[60vh] md:h-[65vh] lg:h-[70vh] xl:h-[75vh] 2xl:h-[65vh]">
            <Image
                src={image}
                alt={title}
                fill
                priority
                className="object-cover opacity-80"
            />


            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/10" />

            <Container className="relative z-10 text-center">
                <Link
                    href="/experiences"
                    className="inline-flex items-center justify-center gap-4 text-white/70 transition-colors hover:text-white"
                >
                    <span className="h-px w-10 bg-white/40" />
                    <span className="font-sans text-xs tracking-[0.35em] uppercase">
                        {eyebrow}
                    </span>
                    <span className="h-px w-10 bg-white/40" />
                </Link>

                <h1 className="mt-6 font-serif text-4xl font-medium text-white sm:text-5xl lg:text-6xl">
                    {title}
                </h1>
            </Container>

            <ChevronDown
                className="absolute bottom-8 left-1/2 z-10 h-6 w-6 -translate-x-1/2 animate-bounce text-white/70"
                strokeWidth={1.5}
            />
        </section>
    );
}