import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

// `featured: true` controls homepage visibility — this list will grow to
// ~50 properties over time, but only ones flagged featured ever show here.
// The homepage always shows the two most current featured picks, full stop.
const properties = [
    {
        slug: "kandy-retreat",
        key: "kandyRetreat",
        image: "/images/property2.webp",
        featured: true,
    },
    {
        slug: "galle-escape",
        key: "galleEscape",
        image: "/images/property1.webp",
        featured: true,
    },
];

export default async function FeaturedProperties() {
    const t = await getTranslations("featuredProperties");

    const featured = properties.filter((p) => p.featured).slice(0, 2);

    return (
        <section className="bg-mist py-24 lg:py-32">
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
                        <h2 className="mt-6 max-w-2xl font-serif text-3xl leading-[1.25] font-medium text-ink sm:text-4xl lg:text-[2.75rem]">
                            {t("heading")}
                        </h2>
                        <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-charcoal">
                            {t("subheading")}
                        </p>
                    </div>
                </Reveal>

                <div className="mt-16 grid gap-8 lg:grid-cols-3">
                    {featured.map((property, index) => (
                        <Reveal key={property.slug} delay={index * 150}>
                            <Link href={`/properties/${property.slug}`} className="group block">
                                <div className="relative aspect-[4/3] w-full overflow-hidden shadow-md transition-shadow duration-500 group-hover:shadow-2xl">
                                    <Image
                                        src={property.image}
                                        alt={t(`items.${property.key}.name`)}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                </div>

                                <div className="mt-6">
                                    <span className="font-sans text-xs tracking-[0.2em] text-slate uppercase">
                                        {t(`items.${property.key}.location`)}
                                    </span>
                                    <h3 className="mt-2 font-serif text-2xl font-light text-ink">
                                        {t(`items.${property.key}.name`)}
                                    </h3>
                                    <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal">
                                        {t(`items.${property.key}.tagline`)}
                                    </p>

                                    <span className="mt-4 inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] text-navy uppercase transition-colors group-hover:text-navy/70">
                                        {t("viewProperty")}
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                                            →
                                        </span>
                                    </span>
                                </div>
                            </Link>
                        </Reveal>
                    ))}

                    {/* Permanent third tile — this is the piece that makes the section scale.
              It never becomes a property card, no matter how large the collection grows. */}
                    <Reveal delay={featured.length * 150}>

                        <Link
                            href="/properties"
                            className="group flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 border border-navy/15 bg-paper text-center shadow-md transition-all duration-500 hover:border-navy/30 hover:shadow-2xl"
                        >
                            <span className="font-serif text-4xl font-light text-navy/30 transition-colors group-hover:text-navy/50">
                                +
                            </span>
                            <span className="max-w-[14rem] font-sans text-sm leading-relaxed text-charcoal">
                                {t("viewAllCard")}
                            </span>
                            <span className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] text-navy uppercase transition-colors group-hover:text-navy/70">
                                {t("viewAllProperties")}
                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </span>
                        </Link>


                    </Reveal>
                </div>
            </Container>
        </section>
    );
}