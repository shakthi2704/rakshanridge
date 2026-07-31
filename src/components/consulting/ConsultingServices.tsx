import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getTranslations } from "next-intl/server";

const services = [
    {
        key: "brandPositioning",
        image:
            "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    },
    {
        key: "guestExperience",
        image:
            "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    },
    {
        key: "operationalStandards",
        image:
            "https://images.unsplash.com/photo-1551632811-561732d1e306?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    },
    {
        key: "revenueStrategy",
        image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    },
    {
        key: "propertyLaunch",
        image:
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    },
] as const;

export default async function ConsultingServices() {
    const t = await getTranslations("consultingPage.services");

    return (
        <section className="bg-mist py-4 lg:py-8">
            <Container>
                <div className="divide-y divide-navy/10">
                    {services.map((service, index) => {
                        const reversed = index % 2 === 1;
                        const number = String(index + 1).padStart(2, "0");

                        return (
                            <div
                                key={service.key}
                                className="grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-24"
                            >
                                <Reveal
                                    className={
                                        reversed ? "lg:order-2" : "lg:order-1"
                                    }
                                >
                                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                                        <Image
                                            src={service.image}
                                            alt={t(`${service.key}.title`)}
                                            fill
                                            className="object-cover"
                                            sizes="(min-width: 1024px) 45vw, 90vw"
                                        />
                                    </div>
                                </Reveal>

                                <Reveal
                                    delay={100}
                                    className={
                                        reversed ? "lg:order-1" : "lg:order-2"
                                    }
                                >
                                    <span className="font-serif text-4xl font-light text-slate">
                                        {number}
                                    </span>
                                    <h3 className="mt-3 font-serif text-2xl font-medium text-ink sm:text-3xl">
                                        {t(`${service.key}.title`)}
                                    </h3>
                                    <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-charcoal">
                                        {t(`${service.key}.description`)}
                                    </p>
                                </Reveal>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}