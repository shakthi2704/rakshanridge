import type { routing } from "@/i18n/routing";

export type AppLocale = (typeof routing.locales)[number];

export type LocaleString = {
    en: string;
    ru?: string;
    de?: string;
};

// Picks the string for the requested locale, falling back to English when
// that locale's translation is missing or blank (matches how ru.json /
// de.json gaps are already handled — partial translation, not a hard error).
export function pickLocale(field: LocaleString | undefined | null, locale: AppLocale): string {
    if (!field) return "";
    const value = field[locale];
    return value && value.trim().length > 0 ? value : field.en;
}