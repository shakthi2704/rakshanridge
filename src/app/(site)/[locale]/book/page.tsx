import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import Container from "@/components/ui/Container";
import BookingExperience from "@/components/book/BookingContextPanel";
import { getProperties } from "@/sanity/lib/queries";
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

    const rawProperties = await getProperties();
    const properties = rawProperties.map((p) => adaptProperty(p, locale));

    return (
        <main className="flex flex-1 flex-col bg-mist">
            <section className="flex min-h-[calc(100vh-var(--navbar-height,0px))] items-center py-20 lg:py-0">
                <Container>
                    <BookingExperience
                        properties={properties}
                        initialPropertySlug={propertySlug}
                        initialRoomSlug={roomSlug}
                    />
                </Container>
            </section>
        </main>
    );
}