import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { experiences, getExperienceBySlug } from "@/lib/experiences";
import ExperienceDetailHero from "@/components/experiences/ExperienceDetailHero";
import ExperienceDetailContent from "@/components/experiences/ExperienceDetailContent";
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

    return (
        <main className="flex flex-1 flex-col">
            <ExperienceDetailHero
                title={title}
                eyebrow={t("eyebrow")}
                image={experience.detailImage}
            />

            <ExperienceDetailContent
                description={description}
                exploreLabel={t("viewAll")}
            />

            <MainCta />
        </main>
    );
}