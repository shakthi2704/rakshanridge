import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ConsultingHero from "@/components/consulting/ConsultingHero";
import ConsultingIntro from "@/components/consulting/ConsultingIntro";
import ConsultingServices from "@/components/consulting/ConsultingServices";
import MainCta from "@/components/ui/MainCta";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("consultingPage.hero");

    return {
        title: `${t("heading")} | Raksha & Ridge`,
        description: t("subheading"),
    };
}

export default function ConsultingPage() {
    return (
        <main className="flex flex-1 flex-col">
            <ConsultingHero />
            <ConsultingIntro />
            <ConsultingServices />
            {/* <MainCta /> */}
        </main>
    );
}