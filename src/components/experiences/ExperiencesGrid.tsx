import { getTranslations } from "next-intl/server";
import { experiences } from "@/lib/experiences";
import ExperiencesGridClient from "./ExperiencesGridClient";

export default async function ExperiencesGrid() {
    const t = await getTranslations("experiences");

    const items = experiences.map((exp) => ({
        key: exp.key,
        slug: exp.slug,
        image: exp.image,
        featured: exp.featured ?? false,
        title: t(`items.${exp.key}.title`),
        description: t(`items.${exp.key}.description`),
    }));

    return (
        <ExperiencesGridClient
            items={items}
            viewDetailsLabel={t("viewDetails")}
            loadMoreLabel={t("loadMore")}
        />
    );
}