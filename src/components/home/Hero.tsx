import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { getTranslations, getLocale } from "next-intl/server";
import { cn } from "@/lib/utils";

export default async function Hero() {


    const t = await getTranslations("hero");

    const locale = await getLocale();
    return (
        <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-24">
            <Image
                src="/images/hero.jpg"
                alt="Infinity pool overlooking the Sri Lankan coastline at sunset"
                fill
                priority
                className="object-cover"
            />

            {/* Even wash for center-anchored text, deeper toward the bottom */}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/35" />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"
            />


            <Container className="relative z-10 flex flex-col items-center text-center pt-24 lg:pt-0">
                <div className="flex items-center gap-4 text-white/80">
                    <span className="h-px w-10 bg-white/50" />

                    <Image
                        src="/logo/logo-1.svg"
                        alt="Logo"
                        width={96}
                        height={96}
                        priority
                        className="h-auto w-16 sm:w-20 md:w-24"
                    />

                    <span className="h-px w-10 bg-white/50" />
                </div>
                {/* 
                <h1 className="mt-6 font-display text-4xl leading-[1.15] tracking-wide text-white sm:text-5xl md:text-6xl lg:text-6xl  xl:text-7xl 2xl:text-8xl"> */}
                <h1
                    className={cn(
                        "mt-6 w-full px-4 font-display text-[clamp(2.2rem,4vw,5.25rem)] leading-[1.08] tracking-wide text-white",
                        locale === "de" &&
                        "text-[clamp(2rem,3.7vw,4.8rem)]",
                        locale === "ru" &&
                        "text-[clamp(2.1rem,3.8vw,5rem)]"
                    )}
                >
                    <span className="block sm:whitespace-nowrap">
                        {t("headlineLine1")}
                    </span>

                    <span className="block sm:whitespace-nowrap">
                        {t("headlineLine2")}
                    </span>
                </h1>
                <p className="mt-6 max-w-3xl font-serif text-[clamp(1.1rem,1.8vw,1.5rem)] font-light italic leading-relaxed text-white/85">
                    {t("subheadline")}
                </p>

                <div className="mt-9 flex flex-wrap justify-center gap-4">
                    <Link href="/properties" className={buttonVariants({ variant: "ink", size: "md" })}>
                        {t("exploreProperties")}
                    </Link>
                    <Link href="/book" className={buttonVariants({ variant: "outline-white", size: "md" })}>
                        {t("bookYourStay")}
                    </Link>
                </div>
            </Container>

            {/* Scroll cue */}
            {/* <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70">
                <span className="font-sans text-[0.65rem] tracking-[0.3em] uppercase">Scroll</span>
                <span className="h-10 w-px animate-pulse bg-white/50" />
            </div> */}

        </section >
    );
}