import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import { experiences } from "@/lib/experiences";

export default async function ExperiencesHero() {
    const t = await getTranslations("experiences");
    const heroImage =
        experiences.find((exp) => exp.featured)?.image ?? experiences[0].image;

    return (
        <section className="relative flex h-[70vh] min-h-[480px] items-center justify-center overflow-hidden bg-ink">
            <Image
                src={heroImage}
                alt={t("heading")}
                fill
                priority
                className="object-cover opacity-60"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/30" />

            <Container className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-4 text-white/70">
                    <span className="h-px w-10 bg-white/40" />
                    <span className="font-sans text-xs tracking-[0.35em] uppercase">
                        {t("eyebrow")}
                    </span>
                    <span className="h-px w-10 bg-white/40" />
                </div>

                <h1 className="mt-6 font-serif text-4xl font-medium text-white sm:text-5xl lg:text-6xl">
                    {t("heading")}
                </h1>

                <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-white/80">
                    {t("subheading")}
                </p>
            </Container>
        </section>
    );
}