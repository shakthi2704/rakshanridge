"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Coins } from "lucide-react";

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
    const [currency, setCurrency] = useState("USD");

    // LKR is only offered if a live rate was actually fetched from Sanity.
    const CURRENCIES = lkrRate ? ["USD", "LKR"] : ["USD"];

    useEffect(() => {
        const stored = getCookie(CURRENCY_COOKIE);
        if (stored && CURRENCIES.includes(stored)) {
            setCurrency(stored);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleSelect(code: string) {
        if (code === currency) return;
        setCurrency(code);
        setCookie(CURRENCY_COOKIE, code);
        router.refresh();
    }

    // Nothing to switch between — don't render a toggle with one option.
    if (CURRENCIES.length < 2) return null;

    return (
        <div className="flex items-center gap-1.5 font-sans text-xs tracking-[0.1em] text-white">
            <Coins className="size-3.5 text-white/70" />
            {CURRENCIES.map((code, i) => (
                <span key={code} className="flex items-center gap-1.5">
                    <button
                        onClick={() => handleSelect(code)}
                        className={cn(
                            "transition-colors",
                            currency === code ? "text-white" : "text-white/50 hover:text-white/80"
                        )}
                    >
                        {code}
                    </button>
                    {i < CURRENCIES.length - 1 && <span className="text-white/30">/</span>}
                </span>
            ))}
        </div>
    );
}