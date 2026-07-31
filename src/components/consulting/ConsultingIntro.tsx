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
                        <span className="h-px w-8 bg-navy" />
                        <span className="font-sans text-xs tracking-[0.2em] text-navy uppercase">
                            {t("eyebrow")}
                        </span>
                        <span className="h-px w-8 bg-navy" />
                    </div>
                    <h2 className="mt-4 font-serif text-3xl font-medium text-ink sm:text-4xl">
                        {t("heading")}
                    </h2>
                </Reveal>

                <Reveal delay={100}>
                    <p className="mt-6 font-sans text-base leading-relaxed text-charcoal">
                        {t("body")}
                    </p>
                </Reveal>
            </Container>
        </section>
    );
}