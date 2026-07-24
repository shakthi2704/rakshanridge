"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const testimonials = [
    { key: "lindqvist" },
    { key: "nair" },
    { key: "reid" },
];

export default function Testimonials() {
    const t = useTranslations("testimonials");
    const [active, setActive] = useState(0);

    const goTo = (index: number) => {
        setActive((index + testimonials.length) % testimonials.length);
    };

    return (
        <section className="relative overflow-hidden bg-ink py-24 lg:py-32">
            {/* ambient depth */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/25 blur-[160px]" />
            </div>

            <Container size="narrow" className="relative">
                <div className="mx-auto max-w-xl text-center">
                    <Reveal>
                        <div className="flex items-center justify-center gap-4 text-white/60">
                            <span className="h-px w-10 bg-white/25" />
                            <span className="font-sans text-xs tracking-[0.35em] text-white/70 uppercase">
                                {t("eyebrow")}
                            </span>
                            <span className="h-px w-10 bg-white/25" />
                        </div>
                    </Reveal>

                    <Reveal delay={100}>
                        <h2 className="mt-6 font-serif text-3xl leading-[1.3] font-bold text-white sm:text-4xl">
                            {t("heading")}
                        </h2>
                    </Reveal>

                    <Reveal delay={200}>
                        <p className="mt-5 font-sans text-base leading-relaxed text-white/60">
                            {t("subheading")}
                        </p>
                    </Reveal>
                </div>

                <Reveal delay={300}>
                    <div className="relative mx-auto mt-16 max-w-2xl">
                        {/* watermark quote mark, sits behind the card */}
                        <span
                            aria-hidden
                            className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 font-serif text-[10rem] leading-none text-white/[0.06] select-none"
                        >
                            &ldquo;
                        </span>

                        <div className="relative rounded-sm border border-white/10 bg-white/[0.03] px-8 py-12 backdrop-blur-sm sm:px-14 sm:py-14">
                            <div
                                key={active}
                                className="flex flex-col items-center text-center animate-[fadeIn_0.5s_ease-out]"
                            >
                                <p className="font-serif text-xl font-light italic leading-relaxed text-white sm:text-2xl">
                                    {t(`items.${testimonials[active].key}.quote`)}
                                </p>

                                <div className="mt-8 flex items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 font-serif text-sm text-white/80">
                                        {t(`items.${testimonials[active].key}.name`).charAt(0)}
                                    </span>
                                    <span className="h-8 w-px bg-white/15" />
                                    <div className="text-left">
                                        <p className="font-sans text-sm tracking-[0.1em] text-white uppercase">
                                            {t(`items.${testimonials[active].key}.name`)}
                                        </p>
                                        <p className="mt-0.5 font-sans text-xs text-white/50">
                                            {t(`items.${testimonials[active].key}.origin`)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* prev / next */}
                        <button
                            type="button"
                            aria-label="Previous testimonial"
                            onClick={() => goTo(active - 1)}
                            className="absolute top-1/2 -left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white sm:-left-14"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            aria-label="Next testimonial"
                            onClick={() => goTo(active + 1)}
                            className="absolute top-1/2 -right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white sm:-right-14"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </Reveal>

                <div className="mt-10 flex items-center justify-center gap-3">
                    {testimonials.map((testimonial, index) => (
                        <button
                            key={testimonial.key}
                            type="button"
                            aria-label={t(`items.${testimonial.key}.name`)}
                            onClick={() => goTo(index)}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-300",
                                active === index ? "w-8 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
                            )}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}