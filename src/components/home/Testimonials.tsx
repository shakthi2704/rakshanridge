"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

// const testimonials = [
//     {
//         quote:
//             "From the moment we arrived, it felt less like a hotel stay and more like being welcomed into someone's home — every detail considered, nothing overdone.",
//         name: "Amara & Josef Lindqvist",
//         origin: "Stockholm, Sweden",
//     },
//     {
//         quote:
//             "We've stayed at properties across Southeast Asia, but the warmth here was different. Genuinely personal, never performative.",
//         name: "Priya Nair",
//         origin: "Singapore",
//     },
//     {
//         quote:
//             "The staff remembered things we hadn't even mentioned twice. That kind of attentiveness is rare, and it made the entire trip feel effortless.",
//         name: "Thomas Reid",
//         origin: "London, United Kingdom",
//     },
// ];
const testimonials = [
    { key: "lindqvist" },
    { key: "nair" },
    { key: "reid" },
];
export default function Testimonials() {
    const t = useTranslations("testimonials");
    const [active, setActive] = useState(0);

    return (
        <section className="bg-ink py-24 lg:py-32">
            <Container size="narrow">
                <div className="flex flex-col items-center text-center">
                    <span className="font-serif text-6xl leading-none text-white/20">
                        &ldquo;
                    </span>

                    <p className="mt-2 min-h-[9rem] font-serif text-2xl leading-relaxed font-light text-white sm:text-3xl">
                        {t(`items.${testimonials[active].key}.quote`)}
                    </p>

                    <div className="mt-8">
                        <p className="font-sans text-sm tracking-[0.1em] text-white uppercase">
                            {t(`items.${testimonials[active].key}.name`)}
                        </p>
                        <p className="mt-1 font-sans text-xs text-white/60">
                            {t(`items.${testimonials[active].key}.origin`)}
                        </p>
                    </div>

                    <div className="mt-10 flex items-center gap-3">
                        {testimonials.map((testimonial, index) => (
                            <button
                                key={testimonial.key}
                                type="button"
                                aria-label={t(`items.${testimonial.key}.name`)}
                                onClick={() => setActive(index)}
                                className={cn(
                                    "h-1.5 rounded-full transition-all duration-300",
                                    active === index ? "w-8 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}