import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getTranslations } from "next-intl/server";

const items = ["founding", "expansion", "consulting", "today"];

export default async function Milestones() {
    const t = await getTranslations("about.milestones");

    return (
        <section className="bg-mist py-24 lg:py-32">
            <Container size="narrow">
                <div className="text-center">
                    <Reveal>
                        <div className="flex items-center justify-center gap-4 text-slate">
                            <span className="h-px w-10 bg-ink/40" />
                            <span className="font-sans text-xs tracking-[0.35em] text-ink uppercase">
                                {t("eyebrow")}
                            </span>
                            <span className="h-px w-10 bg-ink/40" />
                        </div>
                    </Reveal>

                    <Reveal delay={100}>
                        <h2 className="mt-6 font-serif text-3xl leading-[1.3] font-bold text-ink sm:text-4xl">
                            {t("heading")}
                        </h2>
                    </Reveal>

                    <Reveal delay={200}>
                        <p className="mt-5 font-sans text-base leading-relaxed text-charcoal">
                            {t("subheading")}
                        </p>
                    </Reveal>
                </div>

                <div className="mt-16 space-y-0 border-l border-ink/15 pl-8 sm:pl-12">
                    {items.map((key, i) => (
                        <Reveal key={key} delay={300 + i * 100}>
                            <div className="relative pb-12 last:pb-0">
                                <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-ink sm:-left-[calc(3rem+5px)]" />
                                <span className="font-serif text-lg font-medium text-ink">
                                    {t(`items.${key}.year`)}
                                </span>
                                <h3 className="mt-1 font-serif text-2xl font-medium text-ink">
                                    {t(`items.${key}.title`)}
                                </h3>
                                <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal">
                                    {t(`items.${key}.description`)}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}