"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const t = useTranslations("errors.error");

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

                <div className="mt-10 flex items-center justify-center gap-4">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className={cn(buttonVariants({ variant: "ink", size: "md" }))}
                    >
                        {t("retryCta")}
                    </button>

                    <Link href="/" className={buttonVariants({ variant: "outline-ink", size: "md" })}>
                        {t("homeCta")}
                    </Link>
                </div>
            </Container>
        </main>
    );
}