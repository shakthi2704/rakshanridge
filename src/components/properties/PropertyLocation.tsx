import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function PropertyLocation({
    heading,
    location,
    region,
    backLabel,
}: {
    heading: string;
    location: string;
    region: string;
    backLabel: string;
}) {
    return (
        <section className="bg-paper py-20 lg:py-28">
            <Container>
                <Reveal>
                    <div className="flex flex-col items-start justify-between gap-6 border-t border-navy/10 pt-10 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="font-serif text-2xl font-medium text-ink sm:text-3xl">
                                {heading}
                            </h2>
                            <p className="mt-3 font-sans text-base text-charcoal">
                                {location}
                            </p>
                            <p className="mt-1 font-sans text-xs tracking-[0.15em] text-slate uppercase">
                                {region}
                            </p>
                        </div>

                        <Link
                            href="/properties"
                            className="font-sans text-xs tracking-[0.15em] text-navy uppercase underline underline-offset-4 hover:text-navy/70"
                        >
                            ← {backLabel}
                        </Link>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}