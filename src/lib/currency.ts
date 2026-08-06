import { cookies } from "next/headers";
import { getSiteSettings } from "@/sanity/lib/queries";
import type { Currency } from "@/lib/properties";

const CURRENCY_COOKIE = "currency";

type CurrencyContext = {
    currency: Currency;
    rate?: number; // USD -> currency conversion rate, undefined when currency is "USD"
};

// Server-side only. Reads the user's currency cookie (set by CurrencySwitcher)
// and resolves the matching live rate from Sanity's siteSettings document.
export async function getCurrencyContext(): Promise<CurrencyContext> {
    const cookieStore = await cookies();
    const stored = cookieStore.get(CURRENCY_COOKIE)?.value;

    if (stored !== "LKR") {
        return { currency: "USD" };
    }

    const siteSettings = await getSiteSettings();
    const rate = siteSettings?.exchangeRates.find((r) => r.currencyCode === "LKR")?.rate;

    // Cookie says LKR but no live rate is available — fall back to USD
    // rather than risk formatPrice() throwing.
    if (!rate) {
        return { currency: "USD" };
    }

    return { currency: "LKR", rate };
}