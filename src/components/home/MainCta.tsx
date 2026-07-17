import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Container from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import Reveal from "../ui/Reveal";

export default async function MainCta() {
    const t = await getTranslations("finalCta");
    return (
        <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden py-24">
            <Image
                src="/images/hero.jpg"
                alt="Sri Lankan coastline at dusk"
                fill
                className="object-cover"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/55" />

            <Container size="narrow" className="relative z-10 flex flex-col items-center text-center">
                <Reveal>
                    <span className="font-sans text-xs tracking-[0.35em] text-white/70 uppercase">
                        {t("eyebrow")}
                    </span>
                </Reveal>
                <Reveal delay={100}>
                    <h2 className="mt-6 font-serif text-3xl leading-[1.2] font-normal text-white sm:text-4xl lg:text-[3.5rem]">
                        {t("heading")}
                    </h2>
                </Reveal>

                <Reveal delay={200}>
                    <p className="mt-6 max-w-lg font-serif text-xl leading-relaxed text-white/85 italic">
                        {t("body")}
                    </p>
                </Reveal>


                <div className="mt-9 flex flex-wrap justify-center gap-4">
                    {/* <Link href="/book" className={buttonVariants({ variant: "primary", size: "lg" })}>
                        Book Your Stay
                    </Link> */}
                    <Reveal delay={300}>
                        <Link
                            href="/properties"
                            className={buttonVariants({ variant: "outline-white", size: "sm" })}
                        >
                            {t("cta")}
                        </Link>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}