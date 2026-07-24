import Image from "next/image";
import Container from "@/components/ui/Container";
import { getTranslations } from "next-intl/server";

export default async function PropertiesHero() {
    const t = await getTranslations("properties");

    return (
        <section className="relative flex h-[60vh] min-h-[420px] items-center justify-center overflow-hidden bg-ink">
            <Image
                src="/images/property2.webp"
                alt=""
                aria-hidden="true"
                fill
                priority
                className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/50" />

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