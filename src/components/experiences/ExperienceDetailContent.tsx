import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

export default function ExperienceDetailContent({
    description,
    exploreLabel,
}: {
    description: string;
    exploreLabel: string;
}) {
    return (
        <section className="bg-paper py-20 lg:py-28">
            <Container size="narrow" className="text-center">
                <Reveal>
                    <p className="font-serif text-xl leading-relaxed text-charcoal sm:text-2xl">
                        {description}
                    </p>
                </Reveal>

                <Reveal delay={100}>
                    <div className="mt-10">
                        <Link
                            href="/experiences"
                            className={buttonVariants({ variant: "outline-ink", size: "md" })}
                        >
                            {exploreLabel}
                        </Link>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}