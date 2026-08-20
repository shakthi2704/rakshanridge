import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ContactHero from "@/components/contact/ContactHero";
import ContactDetails from "@/components/contact/ContactDetails";
import ContactForm from "@/components/contact/ContactForm";
import ContactLocation from "@/components/contact/ContactLocation";
import Image from "next/image";
export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("contactPage.hero");

    return {
        title: `${t("heading")} | Raksha & Ridge`,
        description: t("subheading"),
    };
}

export default async function ContactPage() {
    const t = await getTranslations("contactPage");

    return (
        <main className="flex flex-1 flex-col">
            <ContactHero />

            <section className="relative overflow-hidden bg-paper pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-28 xl:pt-32 2xl:pt-36">
                <Image
                    src="/images/brand-story-mask.png"
                    alt=""
                    aria-hidden="true"
                    width={500}
                    height={650}
                    className="pointer-events-none absolute top-0 left-0 z-0 w-64 -scale-x-100 opacity-30 sm:w-80 lg:w-[28rem]"
                />

                <Container>
                    <Reveal>

                        <div className="mb-14 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-4">
                            <span className="font-sans text-sm text-charcoal">
                                {t("bookingRedirect.text")}
                            </span>

                            <Link
                                href="/book"
                                className="group font-sans text-sm tracking-[0.1em] text-ink uppercase"
                            >
                                <span className="underline underline-offset-4 decoration-ink/40 transition-colors group-hover:decoration-ink">
                                    {t("bookingRedirect.cta")}
                                </span>
                                <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>
                        </div>
                    </Reveal>

                    <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
                        <ContactDetails />

                        <Reveal delay={100}>
                            <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                                {t("form.heading")}
                            </h2>
                            <div className="mt-8">
                                <ContactForm />
                            </div>
                        </Reveal>
                    </div>
                </Container>
            </section>

            <ContactLocation />
        </main>
    );
}