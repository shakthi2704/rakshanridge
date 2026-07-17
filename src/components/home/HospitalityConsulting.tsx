import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";

export default async function HospitalityConsulting() {
    const t = await getTranslations("consulting");
    return (
        <section className=" border-y border-navy/10 bg-mist py-16 lg:py-20">
            <Container size="narrow">
                <div className="flex flex-col items-center gap-6 text-center">
                    <span className="font-sans text-xs tracking-[0.3em] text-slate uppercase">
                        {t("eyebrow")}
                    </span>
                    <div className="flex justify-center mb-6">
                        <svg
                            width="30"
                            height="10"
                            viewBox="0 0 60 20"
                            fill="currentColor"
                            className="text-gold-accent text-slate"
                        >
                            <path d="M10 2L11.5 8L18 10L11.5 12L10 18L8.5 12L2 10L8.5 8Z" />
                            <path d="M30 0L32 8L40 10L32 12L30 20L28 12L20 10L28 8Z" />
                            <path d="M50 2L51.5 8L58 10L51.5 12L50 18L48.5 12L42 10L48.5 8Z" />
                        </svg>
                    </div>
                    <h2 className="max-w-lg font-serif text-3xl leading-snug font-medium text-ink sm:text-4xl">
                        {t("heading")}
                    </h2>

                    <p className="max-w-md font-sans text-sm leading-relaxed text-charcoal">
                        {t("body")}
                    </p>

                    <Link
                        href="/consulting"
                        className={buttonVariants({ variant: "ink", size: "sm" })}
                    >
                        {t("cta")}
                    </Link>
                </div>
            </Container>
        </section>
    );
}