import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getTranslations } from "next-intl/server";

const members = [
    { key: "founder", image: "/images/person.jpg" },
    { key: "operations", image: "/images/person.jpg" },
    { key: "guestExperience", image: "/images/person.jpg" },
];

export default async function Team() {
    const t = await getTranslations("about.team");

    return (
        <section className="bg-paper py-24 lg:py-32">
            <Container>
                <div className="mx-auto max-w-xl text-center">
                    <Reveal>
                        <div className="flex items-center justify-center gap-4 text-slate">
                            <span className="h-px w-10 bg-navy/40" />
                            <span className="font-sans text-xs tracking-[0.35em] text-navy uppercase">
                                {t("eyebrow")}
                            </span>
                            <span className="h-px w-10 bg-navy/40" />
                        </div>
                    </Reveal>

                    <Reveal delay={100}>
                        <h2 className="mt-6 font-serif text-3xl leading-[1.3] font-bold text-ink sm:text-4xl">
                            {t("heading")}
                        </h2>
                    </Reveal>

                    <Reveal delay={200}>
                        <p className="mt-5 font-sans text-base leading-relaxed text-charcoal">
                            {t("subheading")}
                        </p>
                    </Reveal>
                </div>

                <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                    {members.map((member, i) => (
                        <Reveal key={member.key} delay={300 + i * 100}>
                            <div>
                                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-md">
                                    <Image
                                        src={member.image}
                                        alt={t(`members.${member.key}.name`)}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="mt-5 font-serif text-xl font-medium text-ink">
                                    {t(`members.${member.key}.name`)}
                                </h3>
                                <p className="mt-1 font-sans text-xs tracking-[0.1em] text-navy uppercase">
                                    {t(`members.${member.key}.role`)}
                                </p>
                                <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal">
                                    {t(`members.${member.key}.bio`)}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}