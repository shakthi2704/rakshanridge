import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PropertiesHeader from "@/components/properties/PropertiesHeader";
import PropertyFilters from "@/components/properties/PropertyFilters";
import PropertiesGrid from "@/components/properties/PropertiesGrid";
import Container from "@/components/ui/Container";

type Props = {
    searchParams: Promise<{ type?: string; region?: string; price?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("properties");

    return {
        title: `${t("heading")} | Raksha & Ridge`,
        description: t("subheading"),
    };
}

export default async function Properties({ searchParams }: Props) {
    const params = await searchParams;

    return (
        <main className="flex flex-1 flex-col">
            <PropertiesHeader />

            <div className="bg-paper pt-4">
                <Container>
                    <PropertyFilters />
                </Container>
            </div>

            <PropertiesGrid searchParams={params} />
        </main>
    );
}