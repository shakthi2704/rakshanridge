import { Landmark, Bed, Users, BriefcaseBusiness } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getTranslations } from "next-intl/server";

const features = [
    {
        icon: Landmark,
        key: "hospitality",
    },
    {
        icon: Bed,
        key: "stays",
    },
    {
        icon: Users,
        key: "experiences",
    },
    {
        icon: BriefcaseBusiness,
        key: "management",
    },
];

export default async function BrandFeatures() {
    const t = await getTranslations("brandFeatures");

    return (
        <section className="bg-ink py-24 lg:py-32">
            <Container>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <Reveal key={feature.key} delay={index * 150}>
                                <div className="group h-full border-l border-white/15 px-8 py-10 transition-all duration-500 hover:bg-white/5">

                                    <Icon
                                        size={40}
                                        strokeWidth={1.3}
                                        className="mb-6 text-white/80 transition-transform duration-500 group-hover:-translate-y-1"
                                    />

                                    <h3 className="font-serif text-2xl text-white">
                                        {t(`items.${feature.key}.title`)}
                                    </h3>

                                    <p className="mt-4 font-sans text-sm leading-relaxed text-white/65">
                                        {t(`items.${feature.key}.description`)}
                                    </p>

                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}