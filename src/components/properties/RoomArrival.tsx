import { MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";

export default function RoomArrival({
    heading,
    body,
    caption,
    address,
    phoneLabel,
    phone,
    emailLabel,
    email,
    directionsLabel,
    name,
}: {
    heading: string;
    body: string;
    caption: string;
    address: string;
    phoneLabel: string;
    phone: string;
    emailLabel: string;
    email: string;
    directionsLabel: string;
    name: string;
}) {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${name}, ${address}`
    )}`;

    return (
        <section className="relative flex min-h-[640px] w-full items-center justify-center overflow-hidden bg-mist py-24">
            {/* Decorative topographic pattern — full bleed, outside Container */}
            <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full text-navy/[0.07]"
                preserveAspectRatio="xMidYMid slice"
                viewBox="0 0 800 600"
                fill="none"
            >
                {Array.from({ length: 14 }).map((_, i) => (
                    <path
                        key={i}
                        d={`M ${-50 + i * 5},${600} C ${150 + i * 20},${450 - i * 22} ${350 - i * 15},${380 - i * 18} ${400 + i * 12},${250 - i * 14} S ${650 - i * 10},${120 - i * 10} ${850 + i * 5},${60 - i * 8}`}
                        stroke="currentColor"
                        strokeWidth="1"
                    />
                ))}
            </svg>

            <Container className="relative z-10 flex flex-col items-center text-center">
                <Reveal>
                    <span className="font-sans text-xs tracking-[0.35em] text-slate uppercase">
                        {caption}
                    </span>
                </Reveal>

                <Reveal delay={100}>
                    <div className="mt-8 w-full max-w-md border border-navy/10 bg-paper p-8 text-left shadow-xl sm:p-10">
                        <h2 className="font-serif text-2xl font-medium text-ink sm:text-3xl">
                            {heading}
                        </h2>
                        <p className="mt-4 font-sans text-sm leading-relaxed text-charcoal">
                            {body}
                        </p>

                        <div className="mt-6 flex items-start gap-3 border-t border-navy/10 pt-6">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-navy" strokeWidth={1.5} />
                            <p className="font-sans text-sm text-charcoal">{address}</p>
                        </div>

                        <p className="mt-3 font-sans text-sm text-slate">
                            {phoneLabel}: {phone} &nbsp;•&nbsp; {emailLabel}: {email}
                        </p>

                        <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${buttonVariants({
                                variant: "outline-navy",
                                size: "sm",
                            })} mt-6 w-full justify-center`}
                        >
                            {directionsLabel}
                        </a>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}