import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import type { Property, Currency } from "@/lib/properties";
import { formatPrice } from "@/lib/properties";

export default async function PropertyCard({
    property,
    currency = "USD",
}: {
    property: Property;
    currency?: Currency;
}) {
    const t = await getTranslations("properties");

    return (
        <Link href={`/properties/${property.slug}`} className="group block">
            <div className="relative aspect-[4/3] w-full overflow-hidden shadow-md transition-shadow duration-500 group-hover:shadow-2xl">
                <Image
                    src={property.image}
                    alt={t(`items.${property.key}.name`)}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />

                <span className="absolute right-4 bottom-4 font-sans text-xs tracking-[0.1em] text-white uppercase">
                    From {formatPrice(property.priceFrom, currency)}/night
                </span>
            </div>

            <div className="mt-5">
                <span className="font-sans text-xs tracking-[0.2em] text-slate uppercase">
                    {t(`items.${property.key}.location`)}
                </span>
                <h3 className="mt-2 font-serif text-xl font-light text-ink">
                    {t(`items.${property.key}.name`)}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal">
                    {t(`items.${property.key}.tagline`)}
                </p>
            </div>
        </Link>
    );
}