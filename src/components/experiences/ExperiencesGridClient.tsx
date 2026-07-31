"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";

type ExperienceItem = {
    key: string;
    slug: string;
    image: string;
    featured: boolean;
    title: string;
    description: string;
};

const INITIAL_VISIBLE = 4;
const LOAD_STEP = 4;

export default function ExperiencesGridClient({
    items,
    viewDetailsLabel,
    loadMoreLabel,
}: {
    items: ExperienceItem[];
    viewDetailsLabel: string;
    loadMoreLabel: string;
}) {
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
    const visibleItems = items.slice(0, visibleCount);
    const hasMore = visibleCount < items.length;

    return (
        <section className="bg-paper py-20 lg:py-28">
            <Container>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleItems.map((item, index) => (
                        <Reveal
                            key={item.key}
                            delay={index * 80}
                            className={item.featured ? "sm:col-span-2" : ""}
                        >
                            <Link
                                href={`/experiences/${item.slug}`}
                                className={`group relative block w-full overflow-hidden ${item.featured ? "aspect-[16/9]" : "aspect-[4/5]"
                                    }`}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    sizes={
                                        item.featured
                                            ? "100vw"
                                            : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                    }
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent" />

                                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                                    <h3
                                        className={`font-serif font-medium text-white ${item.featured ? "text-2xl sm:text-3xl" : "text-xl"
                                            }`}
                                    >
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-white/85">
                                        {item.description}
                                    </p>
                                    <span className="mt-4 inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] text-white uppercase underline underline-offset-4 decoration-white/40 transition-colors group-hover:decoration-white">
                                        {viewDetailsLabel}
                                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>

                {hasMore && (
                    <div className="mt-14 flex justify-center">
                        <button
                            type="button"
                            onClick={() =>
                                setVisibleCount((count) =>
                                    Math.min(count + LOAD_STEP, items.length)
                                )
                            }
                            className={buttonVariants({ variant: "ink", size: "md" })}
                        >
                            {loadMoreLabel}
                        </button>
                    </div>
                )}
            </Container>
        </section>
    );
}