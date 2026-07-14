import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";

const properties = [
    {
        slug: "kandy-retreat",
        name: "Raksha & Ridge — Kandy Retreat",
        location: "Kandy, Central Highlands",
        tagline: "A hillside sanctuary above the sacred city",
        image: "/images/image1.jpg",
    },
    {
        slug: "galle-escape",
        name: "Raksha & Ridge — Galle Escape",
        location: "Galle, Southern Coast",
        tagline: "Colonial elegance where the coastline meets the fort",
        image: "/images/image1.jpg",
    },
];

export default function FeaturedProperties() {
    return (
        <section className="bg-mist py-24 lg:py-32">
            <Container>
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-4 text-slate">
                        <span className="h-px w-10 bg-navy/40" />
                        <span className="font-sans text-xs tracking-[0.35em] text-navy uppercase">
                            Our Collection
                        </span>
                        <span className="h-px w-10 bg-navy/40" />
                    </div>
                    <h2 className="mt-6 max-w-2xl font-serif text-3xl leading-[1.25] font-light text-ink sm:text-4xl lg:text-[2.75rem]">
                        Two Distinct Destinations, One Standard of Hospitality
                    </h2>
                </div>

                <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-8">
                    {properties.map((property) => (
                        <Link
                            key={property.slug}
                            href={`/properties/${property.slug}`}
                            className="group block"
                        >
                            <div className="relative aspect-[4/3] w-full overflow-hidden">
                                <Image
                                    src={property.image}
                                    alt={property.name}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            </div>

                            <div className="mt-6">
                                <span className="font-sans text-xs tracking-[0.2em] text-slate uppercase">
                                    {property.location}
                                </span>
                                <h3 className="mt-2 font-serif text-2xl font-light text-ink">
                                    {property.name.replace("Raksha & Ridge — ", "")}
                                </h3>
                                <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal">
                                    {property.tagline}
                                </p>

                                <span className="mt-4 inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] text-navy uppercase transition-colors group-hover:text-navy/70">
                                    View Property
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}