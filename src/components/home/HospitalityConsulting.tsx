import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import Reveal from "../ui/Reveal";

export default async function HospitalityConsulting() {
    const t = await getTranslations("consulting");
    return (
        <section className=" border-y border-ink/10 bg-mist py-16 lg:py-20">
            <Container size="narrow">
                <div className="flex flex-col items-center gap-6 text-center">
                    <Reveal>
                        <span className="font-sans text-xs tracking-[0.25em] text-slate uppercase">
                            {t("eyebrow")}
                        </span>

                    </Reveal>
                    <Reveal delay={100}>
                        <h2 className="max-w-lg font-serif text-3xl leading-snug font-medium text-ink sm:text-4xl">
                            {t("heading")}
                        </h2>
                    </Reveal>

                    <Reveal delay={200}>
                        <p className="max-w-md font-sans text-sm leading-relaxed text-charcoal">
                            {t("body")}
                        </p>
                    </Reveal>

                    <Reveal delay={300}>
                        <Link
                            href="/consulting"
                            className={buttonVariants({ variant: "ink", size: "sm" })}
                        >
                            {t("cta")}
                        </Link>
                    </Reveal>

                </div>
            </Container>
        </section>
    );
}