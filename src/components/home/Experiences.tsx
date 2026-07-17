import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/Button";

// const experiences = [
//     {
//         title: "Ceylon Tea Trails",
//         description:
//             "Wander through mist-covered hillside estates and learn the centuries-old craft behind the world's finest tea.",
//         image:
//             "https://images.unsplash.com/photo-1544015759-237f87d55ef3?fm=jpg&q=80&w=1200&auto=format&fit=crop",
//         featured: true,
//     },
//     {
//         title: "Coastal Excursions",
//         description:
//             "Sail the southern coastline at sunrise, from hidden coves to centuries-old fishing villages.",
//         image:
//             "https://images.unsplash.com/photo-1646894232861-a0ad84f1ad5d?fm=jpg&q=80&w=800&auto=format&fit=crop",
//     },
//     {
//         title: "Culinary Journeys",
//         description:
//             "Sri Lankan cuisine reimagined through private chef tables and spice garden foraging walks.",
//         image:
//             "https://images.unsplash.com/photo-1622061662418-fc6887d7915d?fm=jpg&q=80&w=800&auto=format&fit=crop",
//     },
// ];

const experiences = [
    {
        key: "ceylonTeaTrails",
        image:
            "https://images.unsplash.com/photo-1544015759-237f87d55ef3?fm=jpg&q=80&w=1200&auto=format&fit=crop",
        featured: true,
    },
    {
        key: "coastalExcursions",
        image:
            "https://images.unsplash.com/photo-1646894232861-a0ad84f1ad5d?fm=jpg&q=80&w=800&auto=format&fit=crop",
    },
    {
        key: "culinaryJourneys",
        image:
            "https://images.unsplash.com/photo-1622061662418-fc6887d7915d?fm=jpg&q=80&w=800&auto=format&fit=crop",
    },
];

export default async function Experiences() {
    const t = await getTranslations("experiences");
    const [featured, ...rest] = experiences;

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
                        <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-charcoal">
                            {t("subheading")}
                        </p>
                    </div>
                </Reveal>

                <div className="mt-16 grid gap-6 lg:grid-cols-12">
                    {/* Featured experience — spans full height, wider column */}
                    <Reveal className="lg:col-span-7" direction="none">
                        <div className="group relative aspect-[4/5] w-full overflow-hidden shadow-md transition-shadow duration-500 hover:shadow-2xl lg:aspect-auto lg:h-full lg:min-h-[32rem]">
                            <Image
                                src={featured.image}
                                alt={t(`items.${featured.key}.title`)}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
                                <h3 className="font-serif text-2xl font-light text-white sm:text-3xl">
                                    {t(`items.${featured.key}.title`)}
                                </h3>
                                <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-white/85">
                                    {t(`items.${featured.key}.description`)}
                                </p>
                            </div>
                        </div>
                    </Reveal>

                    {/* Two supporting experiences, stacked */}
                    <div className="flex flex-col gap-6 lg:col-span-5">
                        {rest.map((exp, index) => (
                            <Reveal key={exp.key} delay={(index + 1) * 150} className="flex-1">
                                <div className="group relative  rounded-sm flex h-full min-h-[15rem] w-full overflow-hidden shadow-md transition-shadow duration-500 hover:shadow-2xl">
                                    <Image
                                        src={exp.image}
                                        alt={t(`items.${exp.key}.title`)}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
                                    <div className="relative mt-auto p-6 sm:p-7">
                                        <h3 className="font-serif text-xl font-light text-white">
                                            {t(`items.${exp.key}.title`)}
                                        </h3>
                                        <p className="mt-2 max-w-xs font-sans text-sm leading-relaxed text-white/85">
                                            {t(`items.${exp.key}.description`)}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
                <Reveal delay={rest.length * 150 + 150}>
                    <div className="mt-14 flex justify-center">
                        <Link
                            href="/experiences"
                            className={buttonVariants({ variant: "ink", size: "sm" })}
                        >
                            {t("viewAll")}
                        </Link>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}