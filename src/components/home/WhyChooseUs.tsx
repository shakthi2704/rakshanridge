import Image from "next/image";
import Container from "@/components/ui/Container";
import { getTranslations } from "next-intl/server";



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
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <div className="flex items-center gap-4 text-slate">
                            <span className="h-px w-10 bg-ink/40" />
                            <span className="font-sans text-xs tracking-[0.35em] text-ink uppercase">
                                {t("eyebrow")}
                            </span>
                        </div>

                        <h2 className="mt-6 max-w-md font-serif text-3xl leading-[1.25] font-medium text-ink sm:text-4xl">
                            {t("heading")}
                        </h2>

                        <div className="mt-12 divide-y divide-ink/10 border-t border-ink/10">
                            {reasons.map((reason) => (
                                <div key={reason.key} className="flex gap-6 py-7">
                                    <div className="font-serif text-4xl font-light text-charcoal">
                                        {reason.number}
                                    </div>
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