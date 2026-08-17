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
    propertySlug,
    offerSlug,
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
    propertySlug: String,
    offerSlug: String

}) {
    const bookHref = offerSlug
        ? `/book?property=${propertySlug}&offer=${offerSlug}`
        : `/book?property=${propertySlug}`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${name}, ${address}`
    )}`;

    return (
        <section className="bg-paper relative overflow-hidden py-24 lg:py-32">
            <Image
                src="/images/Grayscale-image.png"
                alt=""
                aria-hidden="true"
                fill
                className="object-cover grayscale opacity-20"
            />

            <Container size="narrow" className="relative z-10">
                <div className="mx-auto max-w-4xl bg-ink px-8 py-14 text-center shadow-2xl sm:px-12 lg:px-20 lg:py-20">
                    {/* <Reveal>
                        <span className="font-sans text-xs tracking-[0.35em] text-white/70 uppercase">
                            {eyebrow}
                        </span>
                    </Reveal> */}
                    <Reveal delay={100}>
                        <h2 className="mt-6 font-serif text-3xl leading-[1.2] font-normal text-white sm:text-4xl lg:text-[3.5rem]">
                            {eyebrow}
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
                                href={bookHref}
                                className={buttonVariants({ variant: "white", size: "md" })}
                            >
                                {reserveLabel}
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section >
    );
}