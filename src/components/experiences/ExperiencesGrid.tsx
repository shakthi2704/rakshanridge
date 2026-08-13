import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getExperiences } from "@/sanity/lib/queries";
import { adaptExperience } from "@/sanity/lib/adapters";
import type { AppLocale } from "@/sanity/lib/locale";
import ExperiencesGridClient from "./ExperiencesGridClient";

export default async function ExperiencesGrid() {
    const t = await getTranslations("experiences");
    const locale = await getLocale();

    const sanityExperiences = await getExperiences();
    const items = sanityExperiences.map((exp) => {
        const adapted = adaptExperience(exp, locale as AppLocale);
        return {
            key: adapted.key,
            slug: adapted.slug,
            image: adapted.image,
            featured: adapted.featured,
            title: adapted.title,
            description: adapted.description,
        };
    });

    return (
        <ExperiencesGridClient
            items={items}
            viewDetailsLabel={t("viewDetails")}
            loadMoreLabel={t("loadMore")}
        />
    );
}