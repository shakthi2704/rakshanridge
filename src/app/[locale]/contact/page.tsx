import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ContactHero from "@/components/contact/ContactHero";
import ContactDetails from "@/components/contact/ContactDetails";
import ContactForm from "@/components/contact/ContactForm";
import ContactLocation from "@/components/contact/ContactLocation";

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

            <section className="bg-paper py-20 lg:py-28">
                <Container>
                    <Reveal>
                        <div className="mb-14 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-4">
                            <span className="font-sans text-sm text-charcoal">
                                {t("bookingRedirect.text")}
                            </span>
                            <Link
                                href="/book"
                                className="font-sans text-sm tracking-[0.1em] text-navy uppercase underline underline-offset-4 decoration-navy/40 transition-colors hover:decoration-navy"
                            >
                                {t("bookingRedirect.cta")} →
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