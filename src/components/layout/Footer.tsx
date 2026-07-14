import Link from "next/link";
import Container from "@/components/ui/Container";

const exploreLinks = [
    { label: "Properties", href: "/properties" },
    { label: "Experiences", href: "/experiences" },
    { label: "Offers", href: "/offers" },
    { label: "About", href: "/about" },
    { label: "Consulting", href: "/consulting" },
];

const propertyLinks = [
    { label: "Kandy Retreat", href: "/properties/kandy-retreat" },
    { label: "Galle Escape", href: "/properties/galle-escape" },
];

const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
    return (
        <footer className="bg-navy pt-20 pb-8 text-white">
            <Container>
                <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 font-serif text-sm">
                                R&amp;R
                            </span>
                            <span className="font-serif text-base tracking-[0.08em]">
                                RAKSHA &amp; RIDGE
                            </span>
                        </div>
                        <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-white/70">
                            Exceptional hotel, resort, and villa experiences rooted in
                            genuine Sri Lankan hospitality.
                        </p>

                        <div className="mt-6 flex items-center gap-4">
                            {["Instagram", "Facebook", "LinkedIn"].map((platform) => (
                                <Link
                                    key={platform}
                                    href="#"
                                    aria-label={platform}
                                    className="font-sans text-xs tracking-[0.1em] text-white/60 uppercase transition-colors hover:text-white"
                                >
                                    {platform}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="font-sans text-xs tracking-[0.2em] text-white/50 uppercase">
                            Explore
                        </h3>
                        <ul className="mt-5 flex flex-col gap-3">
                            {exploreLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="font-sans text-sm text-white/80 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Properties */}
                    <div>
                        <h3 className="font-sans text-xs tracking-[0.2em] text-white/50 uppercase">
                            Our Properties
                        </h3>
                        <ul className="mt-5 flex flex-col gap-3">
                            {propertyLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="font-sans text-sm text-white/80 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-sans text-xs tracking-[0.2em] text-white/50 uppercase">
                            Contact
                        </h3>
                        <ul className="mt-5 flex flex-col gap-3 font-sans text-sm text-white/80">
                            <li>
                                <Link href="mailto:stay@rakshaandridge.com" className="transition-colors hover:text-white">
                                    stay@rakshaandridge.com
                                </Link>
                            </li>
                            <li>
                                <Link href="tel:+94112345678" className="transition-colors hover:text-white">
                                    +94 11 234 5678
                                </Link>
                            </li>
                            <li>
                                <Link href="https://wa.me/94112345678" className="transition-colors hover:text-white">
                                    WhatsApp Us
                                </Link>
                            </li>
                            <li className="pt-2 text-white/60">Colombo, Sri Lanka</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
                    <p className="font-sans text-xs text-white/50">
                        © {new Date().getFullYear()} Raksha &amp; Ridge (Pvt) Ltd. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {legalLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="font-sans text-xs text-white/50 transition-colors hover:text-white"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>
        </footer>
    );
}