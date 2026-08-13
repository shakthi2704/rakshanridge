"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import CurrencySwitcher from "@/components/ui/CurrencySwitcher";

const navLinks = [
    { labelKey: "about", href: "/about" },
    { labelKey: "properties", href: "/properties" },
    { labelKey: "experiences", href: "/experiences" },
    { labelKey: "consulting", href: "/consulting" },
    { labelKey: "contact", href: "/contact" },
];

function Monogram() {
    const t = useTranslations("navigation");
    return (
        <div className="flex items-center gap-1">
            <Image
                src="/logo/logo-3.png"
                alt="Raksha & Ridge"
                width={80}
                height={80}
                priority
                className="h-20 w-20 object-contain"
            />

            <span className="leading-tight">
                <span className="block font-display text-[20px] text-white">
                    {t("logoTitle")}
                </span>
            </span>
        </div>
    );
}

type NavbarProps = {
    lkrRate?: number;
};

export default function Navbar({ lkrRate }: NavbarProps) {
    const t = useTranslations("navigation");
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <>
            <header
                className={cn(
                    "fixed inset-x-0 top-0 z-50 transition-all duration-300",
                    scrolled ? "bg-black/80 shadow-lg backdrop-blur-sm" : "bg-black/60 backdrop-blur-sm"
                )}
            >
                {/* Utility row — language / currency only */}
                <div className="border-b border-white/10">
                    <Container className="flex h-9 items-center justify-end gap-6">
                        <LanguageSwitcher />
                        <CurrencySwitcher lkrRate={lkrRate} />
                    </Container>
                </div>

                {/* Main nav row */}
                <Container className="relative flex h-20 items-center justify-between">
                    <div className="flex-shrink-0">
                        <Link href="/" onClick={() => setMenuOpen(false)}>
                            <Monogram />
                        </Link>
                    </div>

                    <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative font-sans text-xs tracking-[0.15em] text-white uppercase transition-colors hover:text-white/90",
                                    "after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2",
                                    "after:h-px after:w-0 after:bg-white",
                                    "after:transition-all after:duration-300 hover:after:w-[70%]"
                                )}
                            >
                                {t(link.labelKey)}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center justify-end gap-4">
                        <Link
                            href="/book"
                            className={cn(buttonVariants({ variant: "outline-white", size: "sm" }), "hidden lg:inline-flex")}
                        >
                            {t("bookNow")}
                        </Link>
                        <button
                            type="button"
                            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen((v) => !v)}
                            className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
                        >
                            <span
                                className={cn(
                                    "h-0.5 w-6 rounded-full bg-white transition-all duration-300",
                                    menuOpen && "translate-y-[5px] rotate-45"
                                )}
                            />
                            <span
                                className={cn(
                                    "h-0.5 w-6 rounded-full bg-white transition-all duration-300",
                                    menuOpen && "-translate-y-[5px] -rotate-45"
                                )}
                            />
                        </button>
                    </div>
                </Container>
            </header>

            <div
                className={cn(
                    "fixed inset-0 z-40 flex flex-col bg-ink transition-opacity duration-300 lg:hidden",
                    menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                )}
            >
                <nav className="flex flex-1 flex-col items-center justify-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="font-serif text-2xl text-white transition-colors hover:text-white/70"
                        >
                            {t(link.labelKey)}
                        </Link>
                    ))}
                    <Link
                        href="/book"
                        onClick={() => setMenuOpen(false)}
                        className={buttonVariants({ variant: "outline-white", size: "lg", className: "mt-4" })}
                    >
                        {t("bookNow")}
                    </Link>
                </nav>
            </div>
        </>
    );
}