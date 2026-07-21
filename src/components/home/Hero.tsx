import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

export default async function Hero() {

    const t = await getTranslations("hero");
    return (
        <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
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

            <Container className="relative z-10 flex flex-col items-center text-center">
                {/* <div className="flex items-center gap-4 text-white/80">
                    <span className="h-px w-10 bg-white/50" />
                    <span className={cn("font-sans text-xs tracking-[0.35em] uppercase")}>
                        {t("eyebrow")}
                    </span>
                    <span className="h-px w-10 bg-white/50" />
                </div> */}
                <div className="flex items-center gap-4 text-white/80">
                    <span className="h-px w-10 bg-white/50" />

                    <Image
                        src="/logo/logo-3.png"
                        alt="Logo"
                        width={96}
                        height={96}
                        priority
                        className="h-auto w-20 sm:w-24 md:w-28"
                    />

                    <span className="h-px w-10 bg-white/50" />
                </div>
                {/* 
                <h1 className="mt-6 font-display text-4xl leading-[1.15] tracking-wide text-white sm:text-5xl md:text-6xl lg:text-6xl  xl:text-7xl 2xl:text-8xl"> */}
                <h1 className="   mt-6 font-display text-[clamp(2.5rem,5vw,5.8rem)] leading-[1.1] tracking-wide text-white">
                    {t("headlineLine1")}
                    <br />
                    {t("headlineLine2")}
                </h1>

                <p className="mt-6 max-w-2xl font-serif text-[clamp(1.5rem,2.6vw,1.65rem)] font-light italic leading-relaxed text-white/85">
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
            <div className="bg-ink border-y overflow-hidden py-1 group" />
        </section >
    );
}