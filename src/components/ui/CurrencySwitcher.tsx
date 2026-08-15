"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Coins } from "lucide-react";

type CurrencySwitcherProps = {
    lkrRate?: number;
    initialCurrency?: "USD" | "LKR";
};

const CURRENCY_COOKIE = "currency";



function setCookie(name: string, value: string) {
    document.cookie = `${name}=${value}; path=/; max-age=${60 * 60 * 24 * 365}`;
}

export default function CurrencySwitcher({ lkrRate, initialCurrency = "USD" }: CurrencySwitcherProps) {
    const router = useRouter();
    const [currency, setCurrency] = useState(initialCurrency);

    // LKR is only offered if a live rate was actually fetched from Sanity.
    const CURRENCIES = lkrRate ? ["USD", "LKR"] : ["USD"];

    function handleSelect(code: string) {
        if (code === currency) return;
        setCurrency(code as "USD" | "LKR");
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