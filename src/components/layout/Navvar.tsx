"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
    { label: "Properties", href: "/properties" },
    { label: "Experiences", href: "/experiences" },
    // { label: "Offers", href: "/offers" },
    { label: "About", href: "/about" },
    { label: "Consulting", href: "/consulting" },
    { label: "Contact", href: "/contact" },
];

function Monogram() {
    return (
        <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 font-serif text-sm text-white">
                R&amp;R
            </span>
            <span className="leading-tight">
                <span className="block font-serif text-base tracking-[0.08em] text-white">
                    RAKSHA &amp; RIDGE
                </span>
                {/* <span className="block text-[0.6rem] tracking-[0.2em] text-white/70 uppercase">
                    Authentic Sri Lankan Hospitality
                </span> */}
            </span>
        </div>
    );
}

// function Monogram() {
//     return (
//         <Image
//             src="/logo/logo.png"
//             alt="Raksha & Ridge"
//             width={220}
//             height={60}
//             priority
//             className="h-14 w-auto"
//         />
//     );
// }

export default function Navbar() {
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
                    scrolled ? "bg-navy/95 shadow-lg backdrop-blur-md" : "bg-black/10 backdrop-blur-md"
                )}
            >
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 z-20" />
                <Container className="relative flex h-24 items-center justify-between">
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
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex justify-end">
                        <Link
                            href="/book"
                            className={cn(buttonVariants({ variant: "primary", size: "sm" }), "hidden lg:inline-flex")}
                        >
                            Book Now
                        </Link>

                        <button
                            type="button"
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
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

            {/* Sibling of <header>, NOT nested inside it — this is the fix */}
            <div
                className={cn(
                    "fixed inset-0 z-40 flex flex-col bg-navy transition-opacity duration-300 lg:hidden",
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
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/book"
                        onClick={() => setMenuOpen(false)}
                        className={buttonVariants({ variant: "outline-white", size: "lg", className: "mt-4" })}
                    >
                        Book Now
                    </Link>
                </nav>
            </div>
        </>
    );
}