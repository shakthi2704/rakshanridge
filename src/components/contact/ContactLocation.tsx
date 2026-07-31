import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getTranslations } from "next-intl/server";

const ADDRESS = "No 318/1 Dutugamunu Mw, Enderamulla Wattala, Sri Lanka";

export default async function ContactLocation() {
    const t = await getTranslations("contactPage.details");
    const tProperties = await getTranslations("properties.detail");

    const mapsQuery = encodeURIComponent(`Raksha & Ridge, ${ADDRESS}`);
    const embedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
    const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

    return (
        <section className="bg-ink py-20 lg:py-28">
            <Container>
                <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
                    <Reveal>
                        <span className="font-sans text-xs tracking-[0.25em] text-white/50 uppercase">
                            {t("locationEyebrow")}
                        </span>

                        <h2 className="mt-4 max-w-md font-serif text-3xl leading-[1.25] text-white sm:text-4xl">
                            {t("locationHeading")}
                        </h2>

                        <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-white/70">
                            {t("locationDescription")}
                        </p>

                        <p className="mt-8 max-w-xs font-serif text-2xl leading-snug text-white">
                            {ADDRESS}
                        </p>

                        <a
                            href={directionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] text-white uppercase underline underline-offset-4 decoration-white/40 transition-colors hover:decoration-white"
                        >
                            {tProperties("getDirections")}
                        </a>
                    </Reveal>

                    <Reveal delay={100}>
                        <div className="aspect-[4/3] w-full overflow-hidden border border-white/10 lg:aspect-[16/10]">
                            <iframe
                                src={embedUrl}
                                title="Raksha & Ridge location"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="h-full w-full grayscale"
                            />
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}