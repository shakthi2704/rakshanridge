import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getTranslations } from "next-intl/server";

export default async function PropertiesHeader() {
    const t = await getTranslations("properties");

    return (
        <section className="bg-mist pt-40 pb-16 lg:pt-48 lg:pb-20">
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <Reveal>
                        <div className="flex items-center justify-center gap-4 text-slate">
                            <span className="h-px w-10 bg-navy/40" />
                            <span className="font-sans text-xs tracking-[0.35em] text-navy uppercase">
                                {t("eyebrow")}
                            </span>
                            <span className="h-px w-10 bg-navy/40" />
                        </div>
                    </Reveal>

                    <Reveal delay={100}>
                        <h1 className="mt-6 font-serif text-4xl leading-[1.25] font-medium text-ink sm:text-5xl">
                            {t("heading")}
                        </h1>
                    </Reveal>

                    <Reveal delay={200}>
                        <p className="mt-5 font-sans text-base leading-relaxed text-charcoal">
                            {t("subheading")}
                        </p>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
} 