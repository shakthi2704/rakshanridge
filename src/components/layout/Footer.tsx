import Link from "next/link";
import Image from "next/image";
import { Link as LocaleLink } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import { InstagramIcon, FacebookIcon } from '@/components/ui/SocialIcons';
import { SOCIAL_LINKS } from '@/lib/constants';
const exploreLinks = [
    { labelKey: "properties", href: "/properties" },
    { labelKey: "experiences", href: "/experiences" },
    { labelKey: "offers", href: "/offers" },
    { labelKey: "about", href: "/about" },
    { labelKey: "consulting", href: "/consulting" },
];

const propertyLinks = [
    { key: "kandyRetreat", href: "/properties/kandy-retreat" },
    { key: "galleEscape", href: "/properties/galle-escape" },
];

const legalLinks = [
    { labelKey: "privacyPolicy", href: "/privacy" },
    { labelKey: "termsOfService", href: "/terms" },
]

const SOCIAL = [
    { Icon: InstagramIcon, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
    { Icon: FacebookIcon, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
];

const experienceLinks = [
    { labelKey: "wildlife", href: "/experiences/wildlife" },
    { labelKey: "culture", href: "/experiences/culture" },
    { labelKey: "wellness", href: "/experiences/wellness" },
];
export default async function Footer() {
    const t = await getTranslations("footer");
    const tNav = await getTranslations("navigation");
    const tProperties = await getTranslations("featuredProperties");
    return (
        <footer className="relative overflow-hidden bg-black pt-30">
            <Image
                src="/images/brand-story-mask-2.png"
                alt=""
                aria-hidden="true"
                width={500}
                height={650}
                className="pointer-events-none absolute right-0 -bottom-20 z-0 hidden w-64 opacity-60 sm:block lg:w-[28rem]"
            />
            <Image
                src="/images/brand-story-mask-2.png"
                alt=""
                aria-hidden="true"
                width={500}
                height={650}
                className="pointer-events-none absolute left-0 -bottom-20 z-0 hidden w-64 -scale-x-100 opacity-60 lg:block lg:w-[28rem]"
            />

            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/75 via-black/85 to-black" />


            <Container>
                <div className="grid gap-12 pb-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr]">
                    {/* Brand */}
                    <div>
                        {/* <div className="relative h-12 w-48">
                            <Image
                                src="/logo/logo-3.png"
                                alt="Raksha & Ridge"
                                width={200}
                                height={56}
                                className="h-14 w-auto"
                            />
                        </div>
                         */}
                        <div className="flex items-center gap-3">

                            <span className="font-serif text-2xl tracking-[0.08em] text-white">
                                RAKSHA &amp; RIDGE
                            </span>
                        </div>
                        <div className="mt-3 h-px w-12 bg-white/50" />

                        <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-white/70">
                            {t("brandBlurb")}
                        </p>

                        <div className="mt-6 flex items-center gap-4">
                            {SOCIAL.map(({ Icon, href, label }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-9 h-9 rounded-full border border-[#B68A2D]/20 flex items-center justify-center text-[#CFCFCF]/70 hover:border-slate hover:text-slate hover:bg-slate/10 transition-all duration-200"
                                >
                                    <Icon className="w-4 h-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-white/50">
                            {t("exploreHeading")}
                        </h3>
                        <div className="mt-3 h-px w-12 bg-white/50" />
                        <ul className="mt-6 flex flex-col gap-4">
                            {exploreLinks.map((link) => (
                                <li key={link.href}>
                                    <LocaleLink
                                        href={link.href}
                                        className="group inline-flex items-center gap-0 font-sans text-sm text-white/80 transition-all duration-300"
                                    >
                                        <span className="w-0 overflow-hidden  transition-all duration-300 group-hover:w-3">
                                            —
                                        </span>
                                        {tNav(link.labelKey)}
                                    </LocaleLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Properties */}
                    <div>
                        <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-white/50">
                            {t("propertiesHeading")}
                        </h3>
                        <div className="mt-3 h-px w-12 bg-white/50" />
                        <ul className="mt-5 flex flex-col gap-3">
                            {propertyLinks.map((link) => (
                                <li key={link.href}>
                                    <LocaleLink
                                        href={link.href}
                                        className="group inline-flex items-center gap-0 font-sans text-sm text-white/80 transition-all duration-300"
                                    >
                                        <span className="w-0 overflow-hidden  transition-all duration-300 group-hover:w-3">
                                            —
                                        </span>

                                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                                            {tProperties(`items.${link.key}.name`)}
                                        </span>
                                    </LocaleLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Experiences */}
                    <div>
                        <h3 className="font-sans text-xs tracking-[0.2em] text-white/50 uppercase">
                            Other Services
                        </h3>
                        <div className="mt-3 h-px w-12 bg-white/50" />
                        <ul className="mt-5 flex flex-col gap-3">
                            {experienceLinks.map((link) => (
                                <li key={link.href}>
                                    <LocaleLink
                                        href={link.href}
                                        className="group inline-flex items-center gap-0 font-sans text-sm text-white/80 transition-all duration-300"
                                    >
                                        <span className="w-0 overflow-hidden  transition-all duration-300 group-hover:w-3">
                                            —
                                        </span>
                                        {link.labelKey}
                                    </LocaleLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Contact */}
                    <div>
                        <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-white/50">
                            {t("contactHeading")}
                        </h3>
                        <div className="mt-3 h-px w-12 bg-white/50" />
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
                                    {t("whatsappUs")}
                                </Link>
                            </li>
                            <li className="flex items-center gap-2.5 pt-1 text-white/60">
                                <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                                {t("addressCity")}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col items-center justify-between gap-4 border-t mt-6 pt-8 border-white/10 py-8 sm:flex-row">
                    <p className="font-sans text-xs text-white/50">
                        {t("copyright", { year: new Date().getFullYear() })}
                    </p>

                    <div className="flex items-center gap-6">
                        {legalLinks.map((link) => (
                            <LocaleLink
                                key={link.href}
                                href={link.href}
                                className="group relative w-fit font-sans text-xs text-white/50 transition-colors duration-300 hover:text-white"
                            >
                                {t(link.labelKey)}
                                <span className="absolute -bottom-1 left-0 h-px w-0 bg-white/60 transition-all duration-300 group-hover:w-full" />
                            </LocaleLink>
                        ))}

                        <span className="text-white/20">|</span>

                        <Link
                            href="https://youragency.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative font-sans text-xs text-white/50 transition-colors duration-300 hover:text-white"
                        >
                            Developed by <span className="text-gold">Ads Rova Degital Marketing</span>
                            <span className="absolute -bottom-1 left-0 h-px w-0 bg-white/60 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    </div>
                </div>
            </Container>


        </footer >
    );
}