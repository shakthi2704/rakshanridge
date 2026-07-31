import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getTranslations } from "next-intl/server";

export default async function ConsultingIntro() {
    const t = await getTranslations("consultingPage.intro");

    return (
        <section className="bg-paper py-20 lg:py-28">
            <Container size="narrow" className="text-center">
                <Reveal>
                    <div className="flex items-center justify-center gap-4">

                        <span className="font-sans text-xs tracking-[0.2em] text-ink uppercase">
                            {t("eyebrow")}
                        </span>

                    </div>
                    <h2 className="mt-4 font-serif text-3xl font-medium text-ink sm:text-5xl">
                        {t("heading")}
                    </h2>
                </Reveal>

                <Reveal delay={100}>
                    <p className="mt-6 font-sans text-md leading-relaxed text-ink">
                        {t("body")}
                    </p>
                </Reveal>
            </Container>
        </section>
    );
}