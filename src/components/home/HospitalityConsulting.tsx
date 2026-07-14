import Link from "next/link";
import Container from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";

export default function HospitalityConsulting() {
    return (
        <section className="border-y border-navy/10 bg-mist py-16 lg:py-20">
            <Container size="narrow">
                <div className="flex flex-col items-center gap-6 text-center">
                    <span className="font-sans text-xs tracking-[0.3em] text-slate uppercase">
                        Raksha &amp; Ridge Consulting
                    </span>

                    <h2 className="max-w-lg font-serif text-2xl leading-snug font-light text-ink sm:text-3xl">
                        Advisory Services for Independent Hospitality Owners
                    </h2>

                    <p className="max-w-md font-sans text-sm leading-relaxed text-charcoal">
                        We partner with property owners across Sri Lanka to bring the
                        same standard of hospitality to their own operations —
                        from brand positioning to guest experience design.
                    </p>

                    <Link
                        href="/consulting"
                        className={buttonVariants({ variant: "ghost", size: "md" })}
                    >
                        Learn About Consulting
                    </Link>
                </div>
            </Container>
        </section>
    );
}