"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

type CurrencySwitcherProps = {
    lkrRate?: number;
};

const CURRENCY_COOKIE = "currency";

function getCookie(name: string): string | undefined {
    if (typeof document === "undefined") return undefined;
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : undefined;
}

function setCookie(name: string, value: string) {
    document.cookie = `${name}=${value}; path=/; max-age=${60 * 60 * 24 * 365}`;
}

export default function CurrencySwitcher({ lkrRate }: CurrencySwitcherProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [currency, setCurrency] = useState("USD");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // LKR is only offered if a live rate was actually fetched from Sanity.
    const CURRENCIES = lkrRate ? ["USD", "LKR"] : ["USD"];

    useEffect(() => {
        const stored = getCookie(CURRENCY_COOKIE);
        if (stored && CURRENCIES.includes(stored)) {
            setCurrency(stored);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        if (open) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    function handleSelect(code: string) {
        setCurrency(code);
        setCookie(CURRENCY_COOKIE, code);
        setOpen(false);
        router.refresh();
    }

    // Nothing to switch between — don't render a dropdown with one option.
    if (CURRENCIES.length < 2) return null;

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 font-sans text-xs tracking-[0.1em] text-white transition-colors hover:text-white/70"
            >
                <Coins className="h-4 w-4" strokeWidth={1.75} />
                {currency}
                <ChevronDown
                    className={cn("h-3 w-3 transition-transform duration-300", open && "rotate-180")}
                    strokeWidth={2}
                />
            </button>

            {open && (
                <div className="absolute -right-10 top-10 mt-2 w-24 rounded border border-white/10 bg-black/50 backdrop-blur-md shadow-lg">
                    {CURRENCIES.map((code) => (
                        <button
                            key={code}
                            onClick={() => handleSelect(code)}
                            className={cn(
                                "block w-full px-4 py-2.5 text-left font-sans text-xs tracking-[0.1em] transition-colors",
                                currency === code ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            {code}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}