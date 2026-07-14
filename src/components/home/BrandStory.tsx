import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";

export default function BrandStory() {
    return (
        <section className="bg-paper py-24 lg:py-32">
            <Container>
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    {/* Image */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-[3/4]">
                        <Image
                            src="/images/Sri-lanka-high-tea-scaled.webp"
                            alt="Traditional Sri Lankan hospitality moment"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>

                    {/* Copy */}
                    <div className="max-w-xl">
                        <div className="flex items-center gap-4 text-slate">
                            <span className="h-px w-10 bg-navy/40" />
                            <span className="font-sans text-xs tracking-[0.35em] text-navy uppercase">
                                Our Story
                            </span>
                        </div>

                        <h2 className="mt-6 font-serif text-3xl leading-[1.25] font-light text-ink sm:text-4xl lg:text-[2.75rem]">
                            Rooted in genuine Sri Lankan hospitality
                        </h2>

                        <p className="mt-6 font-sans text-base leading-relaxed text-charcoal">
                            For generations, hospitality in Sri Lanka has meant something
                            deeper than service — it is an act of warmth, offered freely to
                            every guest who arrives. Raksha &amp; Ridge was founded to carry
                            that spirit forward, curating hotels, resorts, and villas where
                            every detail honors the island&apos;s culture, landscapes, and
                            people.
                        </p>

                        <p className="mt-4 font-sans text-base leading-relaxed text-charcoal">
                            Each property in our collection is chosen not for scale, but
                            for character — places that feel personal, considered, and
                            unmistakably authentic.
                        </p>

                        <Link
                            href="/about"
                            className={buttonVariants({ variant: "outline-navy", size: "md", className: "mt-8" })}
                        >
                            Discover Our Story
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}