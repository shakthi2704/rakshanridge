import Image from "next/image";
import Container from "@/components/ui/Container";

const reasons = [
    {
        number: "01",
        title: "Personalized Service",
        description:
            "Every stay is shaped around you — from arrival preferences to quiet requests only a dedicated host would notice.",
    },
    {
        number: "02",
        title: "Authentic Experiences",
        description:
            "No generic itineraries. Every excursion is rooted in real Sri Lankan culture, craft, and place.",
    },
    {
        number: "03",
        title: "Best Rate, Direct",
        description:
            "Booking with us directly always guarantees our best available rate — no third-party markup, ever.",
    },
    {
        number: "04",
        title: "A Considered Collection",
        description:
            "Every property is chosen for character, not scale — each one distinct, each one unmistakably ours.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="bg-mist py-24 lg:py-32">
            <Container>
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
                    {/* Image */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-auto">
                        <Image
                            src="/images/hero.jpg"
                            alt="A member of the Raksha & Ridge team welcoming a guest"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <div className="flex items-center gap-4 text-slate">
                            <span className="h-px w-10 bg-navy/40" />
                            <span className="font-sans text-xs tracking-[0.35em] text-navy uppercase">
                                Why Raksha &amp; Ridge
                            </span>
                        </div>

                        <h2 className="mt-6 max-w-md font-serif text-3xl leading-[1.25] font-light text-ink sm:text-4xl">
                            Hospitality, Considered Down to the Detail
                        </h2>

                        <dl className="mt-12 divide-y divide-navy/10 border-t border-navy/10">
                            {reasons.map((reason) => (
                                <div key={reason.number} className="flex gap-6 py-7">
                                    <dt className="font-serif text-2xl font-light text-navy/40">
                                        {reason.number}
                                    </dt>
                                    <div>
                                        <dt className="font-serif text-lg font-normal text-ink">
                                            {reason.title}
                                        </dt>
                                        <dd className="mt-2 font-sans text-sm leading-relaxed text-charcoal">
                                            {reason.description}
                                        </dd>
                                    </div>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </Container>
        </section>
    );
}