import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getTranslations } from "next-intl/server";

export default async function OffersIntro() {
    const t = await getTranslations("offersPage");

    return (
        <section className="bg-paper pt-20 pb-4 lg:pt-28">
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <Reveal>
                        <div className="flex items-center justify-center gap-4 text-slate">
                            <span className="h-px w-10 bg-ink/40" />
                            <span className="font-sans text-xs tracking-[0.25em] text-ink uppercase">
                                {t("eyebrow")}
                            </span>
                            <span className="h-px w-10 bg-ink/40" />
                        </div>
                    </Reveal>

                    <Reveal delay={100}>
                        <h2 className="mt-6 font-serif text-3xl leading-[1.2] font-semibold text-ink sm:text-5xl">
                            {t("heading")}
                        </h2>
                    </Reveal>

                    <Reveal delay={200}>
                        <p className="mt-5 font-sans text-base leading-relaxed text-charcoal">
                            {t("introText")}
                        </p>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}