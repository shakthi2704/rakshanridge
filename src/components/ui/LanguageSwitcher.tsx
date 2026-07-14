"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const LANGUAGES = [
    { code: "en", label: "EN" },
    { code: "ru", label: "RU" },
];

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        if (open) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const currentLabel = LANGUAGES.find((l) => l.code === locale)?.label || "EN";

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 font-sans text-xs tracking-[0.1em] text-white transition-colors hover:text-white/70"
            >
                <Globe className="h-4 w-4" strokeWidth={1.75} />
                {currentLabel}
                <ChevronDown
                    className={cn("h-3 w-3 transition-transform duration-300", open && "rotate-180")}
                    strokeWidth={2}
                />
            </button>

            {open && (
                <div className="absolute right- top-full mt-2 w-24 rounded bg-ink border border-white/10 shadow-lg">
                    {LANGUAGES.map((lang) => (
                        <Link
                            key={lang.code}
                            href={pathname}
                            locale={lang.code}
                            onClick={() => setOpen(false)}
                            className={cn(
                                "block w-full px-4 py-2.5 text-left font-sans text-xs tracking-[0.1em] transition-colors",
                                locale === lang.code ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            {lang.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}