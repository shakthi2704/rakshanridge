import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";

export default function MainCta() {
    return (
        <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden py-24">
            <Image
                src="/images/hero.jpg"
                alt="Sri Lankan coastline at dusk"
                fill
                className="object-cover"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/55" />

            <Container size="narrow" className="relative z-10 flex flex-col items-center text-center">
                <span className="font-sans text-xs tracking-[0.35em] text-white/70 uppercase">
                    Your Journey Awaits
                </span>

                <h2 className="mt-6 font-serif text-3xl leading-[1.2] font-light text-white sm:text-4xl lg:text-[2.75rem]">
                    Begin Your Sri Lankan Story
                </h2>

                <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-white/85">
                    Reserve directly with us for our best available rate, and let every
                    detail of your stay be shaped around you.
                </p>

                <div className="mt-9 flex flex-wrap justify-center gap-4">
                    {/* <Link href="/book" className={buttonVariants({ variant: "primary", size: "lg" })}>
                        Book Your Stay
                    </Link> */}
                    <Link
                        href="/properties"
                        className={buttonVariants({ variant: "outline-white", size: "sm" })}
                    >
                        Book Your Stay
                    </Link>
                </div>
            </Container>
        </section>
    );
}