import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function BrandStory() {
    return (
        <section className="bg-paper py-24 lg:py-36">
            <Container>
                <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
                    <Reveal direction="none">
                        <div className="relative aspect-[4/5] w-full overflow-hidden shadow-xl sm:aspect-[16/11] lg:aspect-[4/3]">
                            <Image
                                src="/images/about-01.webp"
                                alt="Highland tea country in the morning mist"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </Reveal>

                    <div className="max-w-md">
                        <Reveal>
                            <div className="flex items-center gap-4 text-slate">
                                <span className="h-px w-10 bg-navy/40" />
                                <span className="font-sans text-xs tracking-[0.35em] text-navy uppercase">
                                    Our Story
                                </span>
                            </div>

                        </Reveal>

                        <Reveal delay={100}>
                            <h2 className="mt-6 font-serif text-3xl leading-[1.3] font-medium text-ink sm:text-4xl">
                                It Was Never About the Room
                            </h2>
                        </Reveal>

                        <Reveal delay={200}>
                            <p className="mt-6 font-serif text-xl leading-relaxed font-light text-navy italic">
                                It&apos;s the sound of rain on a clay roof, the warmth of a
                                stranger who becomes a friend, the stillness of a hillside
                                at dawn.
                            </p>
                        </Reveal>

                        <Reveal delay={300}>
                            <p className="mt-6 font-sans text-base leading-relaxed text-charcoal">
                                We don&apos;t design stays around amenities — we design
                                them around moments. A cup of tea handed to you at exactly
                                the right time. A quiet path only the staff know about.
                                The kind of hospitality that isn&apos;t performed, but
                                felt.
                            </p>
                        </Reveal>

                        <Reveal delay={400}>
                            <Link
                                href="/about"
                                className={buttonVariants({ variant: "ink", size: "sm", className: "mt-8" })}
                            >
                                Discover Our Story
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    );
}