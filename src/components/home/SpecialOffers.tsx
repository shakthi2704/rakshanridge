import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";

const offers = [
    {
        slug: "early-season-escape",
        title: "Early Season Escape",
        property: "Kandy Retreat",
        description:
            "Three nights among the hills, with a private tea-trail excursion included for every stay.",
        validity: "Valid through 30 September",
        image: "/images/hero.jpg",
    },
    {
        slug: "extended-coastal-stay",
        title: "Extended Coastal Stay",
        property: "Galle Escape",
        description:
            "Stay five nights or more and receive a complimentary sunrise sailing excursion for two.",
        validity: "Valid through 15 November",
        image: "/images/hero.jpg",
    },
];

export default function SpecialOffers() {
    return (
        <section className="bg-paper py-24 lg:py-32">
            <Container>
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-4 text-slate">
                        <span className="h-px w-10 bg-navy/40" />
                        <span className="font-sans text-xs tracking-[0.35em] text-navy uppercase">
                            Special Offers
                        </span>
                        <span className="h-px w-10 bg-navy/40" />
                    </div>
                    <h2 className="mt-6 max-w-2xl font-serif text-3xl leading-[1.25] font-light text-ink sm:text-4xl lg:text-[2.75rem]">
                        Curated Stays, Thoughtfully Priced
                    </h2>
                </div>

                <div className="mt-16 flex flex-col gap-8">
                    {offers.map((offer, index) => (
                        <div
                            key={offer.slug}
                            className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                                }`}
                        >
                            <div className="relative aspect-[16/10] w-full overflow-hidden">
                                <Image
                                    src={offer.image}
                                    alt={offer.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div>
                                <span className="font-sans text-xs tracking-[0.2em] text-slate uppercase">
                                    {offer.property}
                                </span>
                                <h3 className="mt-3 font-serif text-2xl font-light text-ink sm:text-3xl">
                                    {offer.title}
                                </h3>
                                <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-charcoal">
                                    {offer.description}
                                </p>
                                <p className="mt-4 font-sans text-xs tracking-[0.1em] text-slate uppercase">
                                    {offer.validity}
                                </p>

                                <Link
                                    href={`/offers/${offer.slug}`}
                                    className={buttonVariants({
                                        variant: "outline-navy",
                                        size: "md",
                                        className: "mt-8",
                                    })}
                                >
                                    View Offer
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}