import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getTranslations } from "next-intl/server";

export default async function VisionMission() {
    const t = await getTranslations("about.visionMission");
    const pillarKeys = ["protection", "culture", "service"];

    return (
        <section className="relative overflow-hidden bg-ink py-24 lg:py-32">

            <Image
                src="/images/brand-story-mask-dark.png"
                alt=""
                aria-hidden="true"
                width={500}
                height={650}
                className="absolute left-1/2 top-1/2 z-0 w-[45rem] -translate-x-1/2 -translate-y-1/2 opacity-0 animate-face-fade"
            />

            {/* Overlay */}
            <div className="absolute inset-0 z-0 bg-ink/70" />

            <Container>
                <div className="relative z-10">
                    <div className="mx-auto max-w-3xl text-center">
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
                            <p className="mt-6 font-sans text-xs tracking-[0.2em] text-white/40 uppercase">
                                {t("nameNote")}
                            </p>
                        </Reveal>

                        <Reveal delay={150}>
                            <div className="mt-10">
                                <p className="font-sans text-xs tracking-[0.35em] text-white/50 uppercase">
                                    {t("vision.heading")}
                                </p>

                                <blockquote className="mt-6 font-serif text-3xl leading-[1.35] font-light text-white sm:text-4xl lg:text-4xl">
                                    "{t("vision.body")}"
                                </blockquote>
                            </div>
                        </Reveal>
                    </div>


                    {/* Mission */}
                    <div className="mt-20">
                        <Reveal delay={200}>
                            <div className="flex items-center justify-center gap-4 text-white/60">
                                <span className="font-sans text-xs tracking-[0.35em] text-white/70 uppercase">
                                    {t("mission.heading")}
                                </span>
                            </div>
                        </Reveal>

                        <div className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-8">
                            {pillarKeys.map((key, index) => (
                                <Reveal key={key} delay={250 + index * 100}>
                                    <div className="sm:border-l sm:border-white/10 sm:pl-8 sm:first:border-l-0 sm:first:pl-0">
                                        <span className="font-serif text-sm text-white/40">
                                            0{index + 1}
                                        </span>

                                        <h3 className="mt-4 font-serif text-xl font-medium text-white">
                                            {t(`mission.pillars.${key}.name`)}
                                        </h3>

                                        <p className="mt-3 font-sans text-sm leading-relaxed text-white/60">
                                            {t(`mission.pillars.${key}.description`)}
                                        </p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}