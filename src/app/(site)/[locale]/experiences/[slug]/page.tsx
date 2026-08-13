import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getExperiences, getSanityExperienceBySlug } from "@/sanity/lib/queries";
import { adaptExperience } from "@/sanity/lib/adapters";
import type { AppLocale } from "@/sanity/lib/locale";
import ExperienceDetailHero from "@/components/experiences/experience-detail/ExperienceDetailHero";
import ExperienceStory from "@/components/experiences/experience-detail/ExperienceStory";
import ExperienceHighlights from "@/components/experiences/experience-detail/ExperienceHighlights";
import SimilarExperiences from "@/components/experiences/experience-detail/SimilarExperiences";
import MainCta from "@/components/ui/MainCta";

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
    const experiences = await getExperiences();
    return experiences.map((exp) => ({ slug: exp.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, locale } = await params;
    const raw = await getSanityExperienceBySlug(slug);
    if (!raw) return {};

    const experience = adaptExperience(raw, locale as AppLocale);

    return {
        title: `${experience.title} | Raksha & Ridge`,
        description: experience.description,
    };
}

export default async function ExperienceDetailPage({ params }: Props) {
    const { slug, locale } = await params;
    const raw = await getSanityExperienceBySlug(slug);

    if (!raw) notFound();

    const experience = adaptExperience(raw, locale as AppLocale);
    const t = await getTranslations("experiences");

    const allExperiences = await getExperiences();
    const similar = allExperiences
        .filter((exp) => exp.slug.current !== experience.slug)
        .slice(0, 2)
        .map((exp) => {
            const adapted = adaptExperience(exp, locale as AppLocale);
            return {
                key: adapted.key,
                slug: adapted.slug,
                title: adapted.title,
                location: adapted.location,
                image: adapted.image,
            };
        });

    return (
        <main className="flex flex-1 flex-col">
            <ExperienceDetailHero
                title={experience.title}
                eyebrow={t("eyebrow")}
                image={experience.detailImage}
            />
            <ExperienceStory
                openingFirstLetter={experience.storyOpening.charAt(0).toUpperCase()}
                openingRest={experience.storyOpening.slice(1)}
                quote={experience.storyQuote}
                closing={experience.storyClosing}
                image={experience.detailImage}
                title={experience.title}
            />

            <ExperienceHighlights
                heading={t("highlightsHeading")}
                highlights={experience.highlights}
                image={experience.image}
                title={experience.title}
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