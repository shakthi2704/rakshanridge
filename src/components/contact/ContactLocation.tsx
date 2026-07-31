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
        <section className="bg-mist py-20 lg:py-28">
            <Container>
                <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
                    <Reveal>
                        <span className="font-sans text-xs tracking-[0.15em] text-slate uppercase">
                            {t("addressLabel")}
                        </span>

                        <p className="mt-3 max-w-xs font-serif text-2xl leading-snug text-ink">
                            {ADDRESS}
                        </p>

                        <a
                            href={directionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] text-navy uppercase underline underline-offset-4 decoration-navy/40 transition-colors hover:decoration-navy"
                        >
                            {tProperties("getDirections")}
                        </a>
                    </Reveal>

                    <Reveal delay={100}>
                        <div className="aspect-[4/3] w-full overflow-hidden border border-navy/10 lg:aspect-[16/10]">
                            <iframe
                                src={embedUrl}
                                title="Raksha & Ridge location"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="h-full w-full grayscale-[20%]"
                            />
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}