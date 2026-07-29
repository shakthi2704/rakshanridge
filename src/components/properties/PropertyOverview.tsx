import { MapPin, Phone, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function PropertyOverview({
    eyebrow,
    heading,
    description,
    addressLabel,
    address,
    phoneLabel,
    phone,
    emailLabel,
    email,
}: {
    eyebrow: string;
    heading: string;
    description: string;
    addressLabel: string;
    address: string;
    phoneLabel: string;
    phone: string;
    emailLabel: string;
    email: string;
}) {
    return (
        <section className="bg-paper py-20 lg:py-28">
            <Container>
                <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
                    {/* Left — text */}
                    <div className="lg:col-span-3">
                        <Reveal>
                            <div className="flex items-center gap-4">
                                <span className="h-px w-8 bg-ink" />
                                <span className="font-sans text-xs tracking-[0.2em] text-ink uppercase">
                                    {eyebrow}
                                </span>
                            </div>
                            <h2 className="mt-4 font-serif text-3xl font-medium text-ink sm:text-4xl">
                                {heading}
                            </h2>
                        </Reveal>

                        <Reveal delay={100}>
                            <p className="mt-8 font-serif text-lg leading-relaxed text-charcoal first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:font-medium first-letter:leading-[0.85] first-letter:text-slate">
                                {description}
                            </p>
                        </Reveal>
                    </div>

                    {/* Right — contact panel */}
                    <div className="lg:col-span-2">
                        <Reveal delay={150}>
                            <div className="flex flex-col gap-8 bg-ink p-8 lg:p-10">
                                <div className="flex items-start gap-4">
                                    <MapPin className="h-5 w-5 shrink-0 text-white/60" />
                                    <div>
                                        <span className="font-sans text-xs tracking-[0.15em] text-white/50 uppercase">
                                            {addressLabel}
                                        </span>
                                        <p className="mt-1 font-sans text-sm text-white">
                                            {address}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Phone className="h-5 w-5 shrink-0 text-white/60" />
                                    <div>
                                        <span className="font-sans text-xs tracking-[0.15em] text-white/50 uppercase">
                                            {phoneLabel}
                                        </span>
                                        <p className="mt-1 font-sans text-sm text-white">
                                            {phone}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Mail className="h-5 w-5 shrink-0 text-white/60" />
                                    <div>
                                        <span className="font-sans text-xs tracking-[0.15em] text-white/50 uppercase">
                                            {emailLabel}
                                        </span>
                                        <p className="mt-1 font-sans text-sm text-white">
                                            {email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    );
}