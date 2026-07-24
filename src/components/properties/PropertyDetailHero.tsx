"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export default function PropertyDetailHero({
    name,
    location,
    tagline,
    gallery,
    priceLabel,
}: {
    name: string;
    location: string;
    tagline: string;
    gallery: string[];
    priceLabel: string;
}) {
    const [active, setActive] = useState(0);

    return (
        <section className="relative w-full">
            <div className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-ink">
                <Image
                    key={gallery[active]}
                    src={gallery[active]}
                    alt={`${name} — ${location}`}
                    fill
                    priority
                    className="object-cover animate-[fadeIn_0.5s_ease-out]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

                <div className="absolute inset-x-0 bottom-0 z-10 pb-10">
                    <Container>
                        <span className="font-sans text-xs tracking-[0.2em] text-white/80 uppercase">
                            {location}
                        </span>
                        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <h1 className="font-serif text-3xl font-medium text-white sm:text-4xl lg:text-5xl">
                                    {name}
                                </h1>
                                <p className="mt-2 max-w-md font-serif text-lg font-light italic text-white/85">
                                    {tagline}
                                </p>
                            </div>
                            <span className="font-sans text-sm tracking-[0.1em] text-white uppercase">
                                {priceLabel}
                            </span>
                        </div>
                    </Container>
                </div>
            </div>

            {/* thumbnail strip */}
            {gallery.length > 1 && (
                <div className="bg-ink pb-4">
                    <Container>
                        <div className="flex gap-3 overflow-x-auto">
                            {gallery.map((src, index) => (
                                <button
                                    key={src + index}
                                    type="button"
                                    aria-label={`View image ${index + 1}`}
                                    onClick={() => setActive(index)}
                                    className={cn(
                                        "relative h-16 w-24 shrink-0 overflow-hidden rounded-sm transition-opacity duration-300 sm:h-20 sm:w-28",
                                        active === index ? "opacity-100 ring-1 ring-white/70" : "opacity-50 hover:opacity-80"
                                    )}
                                >
                                    <Image src={src} alt="" fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </Container>
                </div>
            )}
        </section>
    );
}