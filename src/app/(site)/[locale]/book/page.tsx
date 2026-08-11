import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import BookingForm from "@/components/book/BookingForm";
import { getSanityPropertyBySlug } from "@/sanity/lib/queries";
import { adaptProperty } from "@/sanity/lib/adapters";
import type { AppLocale } from "@/sanity/lib/locale";

type Props = {
    searchParams: Promise<{ property?: string; room?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("bookPage");

    return {
        title: `${t("heading")} | Raksha & Ridge`,
        description: t("subheading"),
    };
}

export default async function BookPage({ searchParams }: Props) {
    const { property: propertySlug, room: roomSlug } = await searchParams;
    const locale = (await getLocale()) as AppLocale;
    const t = await getTranslations("bookPage");

    let propertyName: string | null = null;
    let roomName: string | null = null;

    if (propertySlug) {
        const raw = await getSanityPropertyBySlug(propertySlug);
        if (raw) {
            const property = adaptProperty(raw, locale);
            propertyName = property.name;
            if (roomSlug) {
                const room = property.rooms.find((r) => r.slug === roomSlug);
                roomName = room?.name ?? null;
            }
        }
    }

    return (
        <main className="flex flex-1 flex-col bg-navy">
            <section className="py-24 lg:py-32">
                <Container>
                    <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
                        <Reveal>
                            <div>
                                <div className="flex items-center gap-4 text-white/70">
                                    <span className="h-px w-10 bg-white/40" />
                                    <span className="font-sans text-xs tracking-[0.25em] uppercase">
                                        {t("eyebrow")}
                                    </span>
                                </div>

                                <h1 className="mt-6 font-serif text-4xl font-medium text-white sm:text-5xl">
                                    {t("heading")}
                                </h1>

                                <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-white/70">
                                    {t("subheading")}
                                </p>

                                {propertyName && (
                                    <div className="mt-10 border-l border-white/20 pl-5">
                                        <span className="font-sans text-xs tracking-[0.2em] text-white/50 uppercase">
                                            {t("inquiringAbout")}
                                        </span>
                                        <p className="mt-2 font-serif text-xl text-white">
                                            {propertyName}
                                            {roomName ? ` — ${roomName}` : ""}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Reveal>

                        <Reveal delay={100}>
                            <BookingForm propertySlug={propertySlug} roomSlug={roomSlug} />
                        </Reveal>
                    </div>
                </Container>
            </section>
        </main>
    );
}