import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";

type AmenityDisplay = {
    name: string;
    description: string;
};

export default function PropertyOverview({
    description,
    amenities,
    amenitiesHeading,
    priceLabel,
    bookLabel,
}: {
    description: string;
    amenities: AmenityDisplay[];
    amenitiesHeading: string;
    priceLabel: string;
    bookLabel: string;
}) {
    return (
        <section className="bg-paper py-20 lg:py-28">
            <Container>
                <div className="grid gap-14 lg:grid-cols-3 lg:gap-20">
                    <div className="lg:col-span-2">
                        <Reveal>
                            <p className="max-w-2xl font-sans text-base leading-relaxed text-charcoal">
                                {description}
                            </p>
                        </Reveal>

                        <Reveal delay={100}>
                            <div className="mt-12">
                                <h2 className="font-serif text-xl font-medium text-ink">
                                    {amenitiesHeading}
                                </h2>
                                <ul className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                                    {amenities.map((amenity) => (
                                        <li key={amenity.name} className="flex items-start gap-3">
                                            <span className="mt-3 h-px w-4 shrink-0 bg-navy" />
                                            <div>
                                                <span className="font-sans text-sm font-medium text-ink">
                                                    {amenity.name}
                                                </span>
                                                <p className="mt-1 font-sans text-sm leading-relaxed text-charcoal">
                                                    {amenity.description}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    </div>

                    {/* Sticky booking card */}
                    <div className="lg:col-span-1">
                        <Reveal delay={200}>
                            <div className="sticky top-28 border border-navy/15 bg-mist p-8">
                                <span className="font-sans text-xs tracking-[0.2em] text-slate uppercase">
                                    {priceLabel}
                                </span>
                                <Link
                                    href="/book"
                                    className={buttonVariants({ variant: "ink", size: "md", className: "mt-6 w-full" })}
                                >
                                    {bookLabel}
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    );
}