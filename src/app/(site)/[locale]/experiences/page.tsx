import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ExperiencesHero from "@/components/experiences/ExperiencesHero";
import ExperiencesGrid from "@/components/experiences/ExperiencesGrid";
import MainCta from "@/components/ui/MainCta";
import ExperienceIntro from "@/components/experiences/ExperienceIntro";

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

            <section className="bg-paper pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-28 xl:pt-32 2xl:pt-36">
                <ExperienceIntro />
                <ExperiencesGrid />
                <MainCta />
            </section>
            {/* <ExperiencesHero /> */}

        </main>
    );
}