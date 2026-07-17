import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Image from "next/image";

// const offers = [
//     {
//         slug: "early-season-escape",
//         title: "Early Season Escape",
//         property: "Kandy Retreat",
//         description:
//             "Three nights among the hills, with every detail arranged so all that's left to do is arrive.",
//         includes: [
//             "Private tea-trail excursion for two",
//             "Daily breakfast on the terrace",
//             "Late checkout, subject to availability",
//         ],
//         validity: "Valid through 30 September",
//         image: "/images/image2.jpg",
//         featured: true,
//     },
//     {
//         slug: "extended-coastal-stay",
//         title: "Extended Coastal Stay",
//         property: "Galle Escape",
//         description:
//             "Five nights or more by the coast, with a morning at sea included for every stay.",
//         includes: [
//             "Sunrise sailing excursion for two",
//             "Daily breakfast on the terrace",
//             "One complimentary spa treatment",
//         ],
//         validity: "Valid through 15 November",
//         image: "/images/image1.jpg",
//         featured: true,
//     },
// ]
const offers = [
    {
        slug: "early-season-escape",
        key: "earlySeasonEscape",
        image: "/images/image2.jpg",
        featured: true,
    },
    {
        slug: "extended-coastal-stay",
        key: "extendedCoastalStay",
        image: "/images/image1.jpg",
        featured: true,
    },
]

export default async function SpecialOffers() {
    const t = await getTranslations("specialOffers");
    const featured = offers.filter((o) => o.featured).slice(0, 2);

    return (
        <section className="bg-paper py-24 lg:py-32">
            <Container>
                <Reveal>
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center gap-4 text-slate">
                            <span className="h-px w-10 bg-navy/40" />
                            <span className="font-sans text-xs tracking-[0.35em] text-navy uppercase">
                                {t("eyebrow")}
                            </span>
                            <span className="h-px w-10 bg-navy/40" />
                        </div>
                        <h2 className="mt-6 max-w-2xl font-serif text-3xl leading-[1.25] font-light text-ink sm:text-4xl lg:text-[2.75rem]">
                            {t("heading")}
                        </h2>
                    </div>
                </Reveal>

                <div className="mt-16 flex flex-col gap-8">
                    {offers.map((offer, index) => (
                        <Reveal key={offer.slug} delay={index * 150}>
                            <div
                                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                                    }`}
                            >
                                <div className="relative aspect-[16/10] w-full overflow-hidden shadow-md transition-shadow duration-500 hover:shadow-2xl">
                                    <Image
                                        src={offer.image}
                                        alt={t(`items.${offer.key}.title`)}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div>
                                    <span className="font-sans text-xs tracking-[0.2em] text-slate uppercase">
                                        {t(`items.${offer.key}.property`)}
                                    </span>
                                    <h3 className="mt-3 font-serif text-2xl font-light text-ink sm:text-3xl">
                                        {t(`items.${offer.key}.title`)}
                                    </h3>
                                    <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-charcoal">
                                        {t(`items.${offer.key}.description`)}
                                    </p>

                                    <ul className="mt-6 flex flex-col gap-2.5">
                                        {(t.raw(`items.${offer.key}.includes`) as string[]).map((item) => (
                                            <li key={item} className="flex items-start gap-3">
                                                <Check
                                                    className="mt-0.5 h-4 w-4 shrink-0 text-navy"
                                                    strokeWidth={1.5}
                                                />
                                                <span className="font-sans text-sm text-charcoal">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <p className="mt-6 font-sans text-xs tracking-[0.1em] text-slate uppercase">
                                        {t(`items.${offer.key}.validity`)}
                                    </p>

                                    <Link
                                        href={`/offers/${offer.slug}`}
                                        className={buttonVariants({
                                            variant: "outline-ink",
                                            size: "sm",
                                            className: "mt-6",
                                        })}
                                    >
                                        {t("viewOffer")}
                                    </Link>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
                <Reveal delay={featured.length * 150 + 150}>
                    <div className="mt-16 flex justify-center">
                        <Link
                            href="/offers"
                            className={buttonVariants({ variant: "ink", size: "sm" })}
                        >
                            {t("viewAllOffers")}
                        </Link>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}