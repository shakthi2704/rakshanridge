import Image from "next/image";
import Container from "@/components/ui/Container";

const experiences = [
    {
        title: "Ceylon Tea Trails",
        description:
            "Wander through mist-covered hillside estates and learn the centuries-old craft behind the world's finest tea.",
        image: "/images/hero.jpg",
    },
    {
        title: "Coastal Excursions",
        description:
            "Sail the southern coastline at sunrise, from hidden coves to centuries-old fishing villages.",
        image: "/images/hero.jpg",
    },
    {
        title: "Culinary Journeys",
        description:
            "Sri Lankan cuisine reimagined through private chef tables and spice garden foraging walks.",
        image: "/images/hero.jpg",
    },
];

export default function Experiences() {
    return (
        <section className="bg-paper py-24 lg:py-32">
            <Container>
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-4 text-slate">
                        <span className="h-px w-10 bg-navy/40" />
                        <span className="font-sans text-xs tracking-[0.35em] text-navy uppercase">
                            Experiences
                        </span>
                        <span className="h-px w-10 bg-navy/40" />
                    </div>
                    <h2 className="mt-6 max-w-2xl font-serif text-3xl leading-[1.25] font-light text-ink sm:text-4xl lg:text-[2.75rem]">
                        Moments Beyond the Stay
                    </h2>
                    <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-charcoal">
                        Curated ways to experience the island — woven into every stay
                        across the Raksha &amp; Ridge collection.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {experiences.map((exp) => (
                        <div key={exp.title} className="group">
                            <div className="relative aspect-[4/5] w-full overflow-hidden">
                                <Image
                                    src={exp.image}
                                    alt={exp.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            </div>

                            <h3 className="mt-6 font-serif text-xl font-light text-ink">
                                {exp.title}
                            </h3>
                            <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal">
                                {exp.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}