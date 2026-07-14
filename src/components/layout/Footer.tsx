import Link from "next/link";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import { InstagramIcon, FacebookIcon } from '@/components/ui/SocialIcons';
import {
    SITE_NAME,
    CONTACT_EMAIL,
    CONTACT_WHATSAPP,
} from "@/lib/constants";
import { SOCIAL_LINKS } from '@/lib/constants';
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


const SOCIAL = [
    { Icon: InstagramIcon, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
    { Icon: FacebookIcon, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
];

export default function Footer() {
    return (
        <footer className="overflow-hidden bg-black pt-20">
            <div aria-hidden className="pointer-events-none select-none pb-20">
                <p className="translate-y-[0.15em] text-center font-serif text-[10vw] leading-none font-bold whitespace-nowrap text-white/[0.10] sm:text-[8vw]">
                    RAKSHA &amp; RIDGE
                </p>
            </div>
            <Container>
                <div className="grid gap-12 pb-16 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 font-serif text-sm text-white">
                                R&amp;R
                            </span>
                            <span className="font-serif text-base tracking-[0.08em] text-white">
                                RAKSHA &amp; RIDGE
                            </span>
                        </div>
                        <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-white/70">
                            Exceptional hotel, resort, and villa experiences rooted in
                            genuine Sri Lankan hospitality.
                        </p>

                        <div className="mt-6 flex items-center gap-4">
                            {SOCIAL.map(({ Icon, href, label }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="font-sans text-xs tracking-[0.1em] text-white/60 uppercase transition-colors hover:text-white"
                                >
                                    <Icon className="w-4 h-4" />
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
                                <Link
                                    href="mailto:stay@rakshaandridge.com"
                                    className="flex items-center gap-2.5 transition-colors hover:text-white"
                                >
                                    <Mail className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                                    stay@rakshaandridge.com
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="tel:+94112345678"
                                    className="flex items-center gap-2.5 transition-colors hover:text-white"
                                >
                                    <Phone className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                                    +94 11 234 5678
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://wa.me/94112345678"
                                    className="flex items-center gap-2.5 transition-colors hover:text-white"
                                >
                                    <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                                    WhatsApp Us
                                </Link>
                            </li>
                            <li className="flex items-center gap-2.5 pt-1 text-white/60">
                                <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                                Colombo, Sri Lanka
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 sm:flex-row">
                    <p className="font-sans text-xs text-white/50">
                        © {new Date().getFullYear()} Raksha &amp; Ridge (Pvt) Ltd. All
                        rights reserved.
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