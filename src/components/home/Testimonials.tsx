import { getTranslations, getLocale } from "next-intl/server";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getTestimonials } from "@/sanity/lib/queries";
import { adaptTestimonial } from "@/sanity/lib/adapters";
import type { AppLocale } from "@/sanity/lib/locale";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";

export default async function Testimonials() {
    const t = await getTranslations("testimonials");
    const locale = (await getLocale()) as AppLocale;

    const sanityTestimonials = await getTestimonials();
    const testimonials = sanityTestimonials.map((item) => adaptTestimonial(item, locale));

    if (testimonials.length === 0) return null;

    return (
        <section className="relative overflow-hidden bg-ink py-24 lg:py-32">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/25 blur-[160px]" />
            </div>

            <Container size="narrow" className="relative">
                <div className="mx-auto max-w-xl text-center">
                    <Reveal>
                        <div className="flex items-center justify-center gap-4 text-white/60">
                            <span className="font-sans text-xs tracking-[0.25em] text-white/70 uppercase">
                                {t("eyebrow")}
                            </span>
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
                    <TestimonialsCarousel testimonials={testimonials} />
                </Reveal>
            </Container>
        </section>
    );
}