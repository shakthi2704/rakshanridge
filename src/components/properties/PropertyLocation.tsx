import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";

export default function PropertyLocation({
    eyebrow,
    heading,
    body,
    address,
    phoneLabel,
    phone,
    emailLabel,
    email,
    directionsLabel,
    reserveLabel,
    image,
    name,
}: {
    eyebrow: string;
    heading: string;
    body: string;
    address: string;
    phoneLabel: string;
    phone: string;
    emailLabel: string;
    email: string;
    directionsLabel: string;
    reserveLabel: string;
    image: string;
    name: string;
}) {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${name}, ${address}`
    )}`;

    return (
        <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden py-24">
            <Image src={image} alt={name} fill className="object-cover" />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/55" />

            <Container size="narrow" className="relative z-10 flex flex-col items-center text-center">
                <Reveal>
                    <span className="font-sans text-xs tracking-[0.35em] text-white/70 uppercase">
                        {eyebrow}
                    </span>
                </Reveal>
                <Reveal delay={100}>
                    <h2 className="mt-6 font-serif text-3xl leading-[1.2] font-normal text-white sm:text-4xl lg:text-[3.5rem]">
                        {heading}
                    </h2>
                </Reveal>
                <Reveal delay={150}>
                    <p className="mt-6 max-w-lg font-serif text-lg leading-relaxed text-white/85 italic">
                        {body}
                    </p>
                </Reveal>

                <Reveal delay={200}>
                    <div className="mt-6 font-sans text-sm text-white/80">
                        <p>{address}</p>
                        <p className="mt-2">
                            {phoneLabel}: {phone} &nbsp;•&nbsp; {emailLabel}: {email}
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={300}>
                    <div className="mt-9 flex flex-wrap justify-center gap-4">

                        <Link
                            href="/book"
                            className={buttonVariants({ variant: "ink", size: "md" })}
                        >
                            {reserveLabel}
                        </Link>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}