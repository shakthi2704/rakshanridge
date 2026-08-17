"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import BookingForm from "@/components/book/BookingForm";
import RoomSummaryCard from "@/components/book/RoomSummaryCard";
import type { Currency } from "@/lib/properties";
import type { adaptProperty } from "@/sanity/lib/adapters";

type AdaptedProperty = ReturnType<typeof adaptProperty>;

const selectWrapperClass =
    "relative border border-ink/15 bg-white transition-colors focus-within:border-ink";

const selectClass =
    "w-full cursor-pointer appearance-none bg-transparent px-4 py-3.5 pr-10 font-sans text-sm text-ink focus:outline-none disabled:cursor-not-allowed disabled:text-charcoal/40";

type BookingExperienceProps = {
    properties: AdaptedProperty[];
    initialPropertySlug?: string;
    initialRoomSlug?: string;
    initialMessage?: string;
    currency: Currency;
    rate?: number;
};

export default function BookingExperience({
    properties,
    initialPropertySlug,
    initialRoomSlug,
    initialMessage,
    currency,
    rate,
}: BookingExperienceProps) {
    const t = useTranslations("bookPage");

    const [propertySlug, setPropertySlug] = useState(initialPropertySlug ?? "");
    const [roomSlug, setRoomSlug] = useState(initialRoomSlug ?? "");

    const selectedProperty = useMemo(
        () => properties.find((p) => p.slug === propertySlug) ?? null,
        [properties, propertySlug]
    );

    const selectedRoom = useMemo(
        () => selectedProperty?.rooms.find((r) => r.slug === roomSlug) ?? null,
        [selectedProperty, roomSlug]
    );

    function handlePropertyChange(value: string) {
        setPropertySlug(value);
        setRoomSlug(""); // rooms belong to a property — reset when it changes
    }

    // Same room-image fallback convention as the room detail page: prefer the
    // room's own gallery, then cycle the property gallery, then the property
    // hero image. Keeps this consistent even for the ~most rooms that don't
    // have real photography uploaded yet.
    const roomImage = useMemo(() => {
        if (!selectedProperty || !selectedRoom) return undefined;

        if (selectedRoom.gallery[0]) return selectedRoom.gallery[0];

        const roomIndex = selectedProperty.rooms.findIndex(
            (r) => r.slug === selectedRoom.slug
        );
        return (
            selectedProperty.gallery[roomIndex % (selectedProperty.gallery.length || 1)] ??
            selectedProperty.image
        );
    }, [selectedProperty, selectedRoom]);

    const showSummary = Boolean(selectedProperty && selectedRoom && roomImage);

    return (
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
                <div className="flex items-center gap-4 text-charcoal">
                    <span className="h-px w-10 bg-ink/30" />
                    <span className="font-sans text-xs tracking-[0.25em] uppercase">
                        {t("eyebrow")}
                    </span>
                </div>

                <h1 className="mt-6 font-serif text-4xl font-medium text-ink sm:text-5xl">
                    {t("heading")}
                </h1>

                <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-charcoal">
                    {t("subheading")}
                </p>

                <div className="mt-10 space-y-6">
                    <div>
                        <label
                            htmlFor="propertySelect"
                            className="font-sans text-[0.75rem] tracking-[0.15em] text-charcoal uppercase"
                        >
                            {t("selectPropertyLabel")}
                        </label>
                        <div className={`mt-2 ${selectWrapperClass}`}>
                            <select
                                id="propertySelect"
                                value={propertySlug}
                                onChange={(e) => handlePropertyChange(e.target.value)}
                                className={selectClass}
                            >
                                <option value="">{t("selectPropertyPlaceholder")}</option>
                                {properties.map((p) => (
                                    <option key={p.slug} value={p.slug}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-charcoal/60"
                                strokeWidth={1.75}
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="roomSelect"
                            className="font-sans text-[0.75rem] tracking-[0.15em] text-charcoal uppercase"
                        >
                            {t("selectRoomLabel")}
                        </label>
                        <div className={`mt-2 ${selectWrapperClass}`}>
                            <select
                                id="roomSelect"
                                value={roomSlug}
                                onChange={(e) => setRoomSlug(e.target.value)}
                                disabled={!selectedProperty}
                                className={selectClass}
                            >
                                <option value="">{t("selectRoomPlaceholder")}</option>
                                {selectedProperty?.rooms.map((r) => (
                                    <option key={r.slug} value={r.slug}>
                                        {r.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-charcoal/40"
                                strokeWidth={1.75}
                            />
                        </div>
                    </div>
                </div>

                {showSummary && selectedProperty && selectedRoom && roomImage && (
                    <div className="mt-10">
                        <RoomSummaryCard
                            property={selectedProperty}
                            room={selectedRoom}
                            image={roomImage}
                            currency={currency}
                            rate={rate}
                        />
                    </div>
                )}
            </div>

            <BookingForm
                propertySlug={selectedProperty?.slug}
                roomSlug={selectedRoom?.slug}
                initialMessage={initialMessage}
            />
        </div>
    );
}