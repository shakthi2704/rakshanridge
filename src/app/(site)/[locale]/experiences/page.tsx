import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ExperiencesHero from "@/components/experiences/ExperiencesHero";
import ExperiencesGrid from "@/components/experiences/ExperiencesGrid";
import MainCta from "@/components/ui/MainCta";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("experiences");

    return {
        title: `${t("heading")} | Raksha & Ridge`,
        description: t("subheading"),
    };
}

export default function ExperiencesPage() {
    return (
        <main className="flex flex-1 flex-col">
            <ExperiencesHero />
            <ExperiencesGrid />
            <MainCta />
        </main>
    );
}