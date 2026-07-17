import Image from "next/image";
import Container from "@/components/ui/Container";
import { getTranslations } from "next-intl/server";

// const reasons = [
//     {
//         number: "01",
//         title: "Personalized Service",
//         description:
//             "Every stay is shaped around you — from arrival preferences to quiet requests only a dedicated host would notice.",
//     },
//     {
//         number: "02",
//         title: "Authentic Experiences",
//         description:
//             "No generic itineraries. Every excursion is rooted in real Sri Lankan culture, craft, and place.",
//     },
//     {
//         number: "03",
//         title: "Best Rate, Direct",
//         description:
//             "Booking with us directly always guarantees our best available rate — no third-party markup, ever.",
//     },
//     {
//         number: "04",
//         title: "A Considered Collection",
//         description:
//             "Every property is chosen for character, not scale — each one distinct, each one unmistakably ours.",
//     },
// ];

const reasons = [
    { number: "01", key: "personalizedService" },
    { number: "02", key: "authenticExperiences" },
    { number: "03", key: "bestRateDirect" },
    { number: "04", key: "consideredCollection" },
];
export default async function WhyChooseUs() {
    const t = await getTranslations("whyChooseUs");
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
                                {t("eyebrow")}
                            </span>
                        </div>

                        <h2 className="mt-6 max-w-md font-serif text-3xl leading-[1.25] font-medium text-ink sm:text-4xl">
                            {t("heading")}
                        </h2>

                        <div className="mt-12 divide-y divide-navy/10 border-t border-navy/10">
                            {reasons.map((reason) => (
                                <div key={reason.key} className="flex gap-6 py-7">
                                    <dt className="font-serif text-4xl font-light text-charcoal">
                                        {reason.number}
                                    </dt>
                                    <div>
                                        <dt className="font-serif text-3xl font-normal text-ink ">
                                            {t(`reasons.${reason.key}.title`)}
                                        </dt>
                                        <dd className="mt-2 font-sans text-sm leading-relaxed text-charcoal">
                                            {t(`reasons.${reason.key}.description`)}
                                        </dd>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}