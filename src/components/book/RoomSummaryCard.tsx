import Image from "next/image";
import { useTranslations } from "next-intl";
import { Users, Maximize, BedDouble, Bath } from "lucide-react";
import { formatPrice, type Currency } from "@/lib/properties";
import type { adaptProperty } from "@/sanity/lib/adapters";

type AdaptedProperty = ReturnType<typeof adaptProperty>;
type AdaptedRoom = AdaptedProperty["rooms"][number];

type RoomSummaryCardProps = {
    property: AdaptedProperty;
    room: AdaptedRoom;
    image: string;
    currency: Currency;
    rate?: number;
};

export default function RoomSummaryCard({
    property,
    room,
    image,
    currency,
    rate,
}: RoomSummaryCardProps) {
    const t = useTranslations("properties.detail");
    const tBook = useTranslations("bookPage");

    return (
        <div className="border border-ink/10 bg-paper">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image src={image} alt={room.name} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
            </div>

            <div className="p-6">
                <span className="font-sans text-xs tracking-[0.25em] text-slate uppercase">
                    {tBook("summaryEyebrow")}
                </span>

                <h3 className="mt-3 font-serif text-2xl font-medium text-ink">
                    {room.name}
                </h3>

                <p className="mt-1 font-sans text-sm text-charcoal">
                    {property.name} — {property.location}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-y-3 border-t border-ink/10 pt-5">
                    <div className="flex items-center gap-2 text-charcoal">
                        <Users size={15} strokeWidth={1.5} className="text-slate" />
                        <span className="font-sans text-sm">
                            {t("occupancy", { count: room.occupancy })}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-charcoal">
                        <Maximize size={15} strokeWidth={1.5} className="text-slate" />
                        <span className="font-sans text-sm">
                            {t("roomSize", { size: room.sizeSqm })}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-charcoal">
                        <BedDouble size={15} strokeWidth={1.5} className="text-slate" />
                        <span className="font-sans text-sm">
                            {t("beds", { count: room.beds })}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-charcoal">
                        <Bath size={15} strokeWidth={1.5} className="text-slate" />
                        <span className="font-sans text-sm">
                            {t("bathrooms", { count: room.bathrooms })}
                        </span>
                    </div>
                </div>

                <p className="mt-5 border-t border-ink/10 pt-5 font-sans text-sm text-ink">
                    {t("fromPerNight", {
                        price: formatPrice(room.priceFrom, currency, rate),
                    })}
                </p>
            </div>
        </div>
    );
}