import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { experiences, getExperienceBySlug } from "@/lib/experiences";
import ExperienceDetailHero from "@/components/experiences/experience-detail/ExperienceDetailHero";
import ExperienceStory from "@/components/experiences/experience-detail/ExperienceStory";
import ExperienceHighlights from "@/components/experiences/experience-detail/ExperienceHighlights";
import SimilarExperiences from "@/components/experiences/experience-detail/SimilarExperiences";
import MainCta from "@/components/ui/MainCta";

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
    return experiences.map((exp) => ({ slug: exp.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const experience = getExperienceBySlug(slug);
    if (!experience) return {};

    const t = await getTranslations("experiences");

    return {
        title: `${t(`items.${experience.key}.title`)} | Raksha & Ridge`,
        description: t(`items.${experience.key}.description`),
    };
}

export default async function ExperienceDetailPage({ params }: Props) {
    const { slug } = await params;
    const experience = getExperienceBySlug(slug);

    if (!experience) notFound();

    const t = await getTranslations("experiences");
    const title = t(`items.${experience.key}.title`);
    const description = t(`items.${experience.key}.description`);
    const highlights = t.raw(`items.${experience.key}.highlights`) as string[];
    const storyOpening = t(`items.${experience.key}.storyOpening`);

    const similar = experiences
        .filter((exp) => exp.slug !== experience.slug)
        .slice(0, 2)
        .map((exp) => ({
            key: exp.key,
            slug: exp.slug,
            title: t(`items.${exp.key}.title`),
            location: t(`items.${exp.key}.location`),
            image: exp.image,
        }));

    return (
        <main className="flex flex-1 flex-col">
            <ExperienceDetailHero
                title={title}
                eyebrow={t("eyebrow")}
                image={experience.detailImage}
            />
            <ExperienceStory
                openingFirstLetter={storyOpening.charAt(0).toUpperCase()}
                openingRest={storyOpening.slice(1)}
                quote={t(`items.${experience.key}.storyQuote`)}
                closing={t(`items.${experience.key}.storyClosing`)}
                image={experience.detailImage}
                title={title}
            />

            <ExperienceHighlights
                heading={t("highlightsHeading")}
                highlights={highlights}
                image={experience.image}
                title={title}
            />
            <SimilarExperiences
                eyebrow={t("eyebrow")}
                heading={t("similarHeading")}
                exploreLabel={t("viewDetails")}
                experiences={similar}
            />
            <MainCta />
        </main>
    );
}