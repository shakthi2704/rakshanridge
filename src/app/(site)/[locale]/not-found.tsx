import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default async function NotFound() {
    const t = await getTranslations("errors.notFound");

    return (
        <main className="flex min-h-[70vh] flex-1 items-center bg-paper">
            <Container size="narrow" className="text-center">
                <span className="font-sans text-xs tracking-[0.3em] text-slate uppercase">
                    {t("eyebrow")}
                </span>

                <h1 className="mt-6 font-serif text-4xl font-medium text-ink sm:text-5xl">
                    {t("heading")}
                </h1>

                <p className="mx-auto mt-5 max-w-md font-sans text-base leading-relaxed text-charcoal">
                    {t("body")}
                </p>

                <Link href="/" className={buttonVariants({ variant: "ink", size: "md" }) + " mt-10 inline-flex"}>
                    {t("cta")}
                </Link>
            </Container>
        </main>
    );
}