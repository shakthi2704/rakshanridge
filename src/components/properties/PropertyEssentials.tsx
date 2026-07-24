import { getTranslations } from "next-intl/server";
import {
    Waves,
    Wifi,
    Coffee,
    Sparkles,
    Car,
    Mountain,
    Ship,
    BellRing,
    Leaf,
    type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

const AMENITY_ICONS: Record<string, LucideIcon> = {
    pool: Waves,
    wifi: Wifi,
    breakfast: Coffee,
    spa: Sparkles,
    airportTransfer: Car,
    mountainView: Mountain,
    oceanView: Ship,
    privateButler: BellRing,
    ecoCertified: Leaf,
};

export default async function PropertyEssentials() {
    const t = await getTranslations("properties");
    const amenityKeys = Object.keys(AMENITY_ICONS);

    return (
        <section className="bg-ink py-24 lg:py-32">
            <Container>
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <Reveal>
                            <span className="font-sans text-xs tracking-[0.35em] text-white/60 uppercase">
                                {t("essentials.eyebrow")}
                            </span>
                        </Reveal>
                        <Reveal delay={100}>
                            <h2 className="mt-6 max-w-md font-serif text-3xl leading-[1.25] font-medium text-white sm:text-4xl">
                                {t("essentials.heading")}
                            </h2>
                        </Reveal>
                    </div>
                    <Reveal delay={150}>
                        <p className="font-serif text-xl leading-relaxed text-white/60 lg:pt-2">
                            {t("essentials.subheading")}
                        </p>
                    </Reveal>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                    {amenityKeys.map((key, index) => {
                        const Icon = AMENITY_ICONS[key];
                        return (
                            <Reveal key={key} delay={index * 60}>
                                <div>
                                    <Icon className="h-8 w-12 text-white" strokeWidth={1.5} />
                                    <h3 className="mt-4 font-sans text-sm tracking-[0.05em] text-white uppercase">
                                        {t(`amenities.${key}.name`)}
                                    </h3>
                                    <p className="mt-2 font-sans text-sm leading-relaxed text-white/50">
                                        {t(`amenities.${key}.description`)}
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