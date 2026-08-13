"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { adaptTestimonial } from "@/sanity/lib/adapters";

type AdaptedTestimonial = ReturnType<typeof adaptTestimonial>;

type TestimonialsCarouselProps = {
    testimonials: AdaptedTestimonial[];
};

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
    const [active, setActive] = useState(0);

    const goTo = (index: number) => {
        setActive((index + testimonials.length) % testimonials.length);
    };

    const current = testimonials[active];

    return (
        <div className="relative mx-auto mt-16 max-w-2xl">
            <span
                aria-hidden
                className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 font-serif text-[10rem] leading-none text-white/[0.06] select-none"
            >
                &ldquo;
            </span>

            <div className="relative rounded-sm border border-white/10 bg-white/[0.03] px-8 py-12 backdrop-blur-sm sm:px-14 sm:py-14">
                <div
                    key={current.id}
                    className="flex flex-col items-center text-center animate-[fadeIn_0.5s_ease-out]"
                >
                    <p className="font-serif text-xl font-light italic leading-relaxed text-white sm:text-2xl">
                        {current.quote}
                    </p>

                    <div className="mt-8 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 font-serif text-sm text-white/80">
                            {current.name.charAt(0)}
                        </span>
                        <span className="h-8 w-px bg-white/15" />
                        <div className="text-left">
                            <p className="font-sans text-sm tracking-[0.1em] text-white uppercase">
                                {current.name}
                            </p>
                            <p className="mt-0.5 font-sans text-xs text-white/50">
                                {current.origin}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {testimonials.length > 1 && (
                <>
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
                </>
            )}

            {testimonials.length > 1 && (
                <div className="mt-10 flex items-center justify-center gap-3">
                    {testimonials.map((testimonial, index) => (
                        <button
                            key={testimonial.id}
                            type="button"
                            aria-label={testimonial.name}
                            onClick={() => goTo(index)}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-300",
                                active === index ? "w-8 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
                            )}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}