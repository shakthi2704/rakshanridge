"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

const LANGUAGES = [
    { code: "en", label: "EN" },
    { code: "ru", label: "RU" },
    { code: "de", label: "DE" },
];

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-1.5 font-sans text-xs tracking-[0.1em] text-white">
            <Globe className="size-3.5 text-white/70" />
            {LANGUAGES.map((lang, i) => (
                <span key={lang.code} className="flex items-center gap-1.5">
                    <Link
                        href={pathname}
                        locale={lang.code}
                        className={cn(
                            "transition-colors",
                            locale === lang.code ? "text-white" : "text-white/50 hover:text-white/80"
                        )}
                    >
                        {lang.label}
                    </Link>
                    {i < LANGUAGES.length - 1 && <span className="text-white/30">/</span>}
                </span>
            ))}
        </div>
    );
}