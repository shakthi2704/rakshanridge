"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { PROPERTY_TYPES, REGIONS } from "@/lib/properties";
import { cn } from "@/lib/utils";

const PRICE_BUCKETS = ["under-300", "300-450", "450-plus"] as const;

export default function PropertyFilters() {
    const t = useTranslations("properties.filters");
    const tTypes = useTranslations("properties.types");
    const tRegions = useTranslations("properties.regions");
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentType = searchParams.get("type") ?? "";
    const currentRegion = searchParams.get("region") ?? "";
    const currentPrice = searchParams.get("price") ?? "";
    const hasActiveFilters = currentType || currentRegion || currentPrice;
    const currentCurrency = (searchParams.get("currency") as "USD" | "LKR") ?? "USD";

    function updateFilter(key: "type" | "region" | "price", value: string) {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        const query = Object.fromEntries(params.entries());
        router.push({ pathname, query });
    }
    function updateCurrency(currency: "USD" | "LKR") {
        const params = new URLSearchParams(searchParams.toString());
        params.set("currency", currency);
        const query = Object.fromEntries(params.entries());
        router.push({ pathname, query });
    }

    const selectClasses = cn(
        "w-full appearance-none bg-transparent px-1 py-2",
        "font-sans text-xs tracking-[0.15em] text-white uppercase",
        "border-0 border-b border-white/20 rounded-none",
        "focus:border-white/60 focus:outline-none",
        "cursor-pointer"
    );

    const labelClasses = "mb-2 block font-sans text-[0.65rem] tracking-[0.25em] text-white/50 uppercase";

    return (
        <div className="w-full bg-ink">
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-6 py-8 sm:px-10 sm:py-10 lg:flex-row lg:items-end lg:gap-10 lg:px-16">
                <label className="flex-1">
                    <span className={labelClasses}>{t("typeLabel")}</span>
                    <select
                        className={selectClasses}
                        value={currentType}
                        onChange={(e) => updateFilter("type", e.target.value)}
                    >
                        <option className="bg-ink text-white" value="">
                            {t("allTypes")}
                        </option>
                        {PROPERTY_TYPES.map((type) => (
                            <option className="bg-ink text-white" key={type} value={type}>
                                {tTypes(type)}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex-1">
                    <span className={labelClasses}>{t("regionLabel")}</span>
                    <select
                        className={selectClasses}
                        value={currentRegion}
                        onChange={(e) => updateFilter("region", e.target.value)}
                    >
                        <option className="bg-ink text-white" value="">
                            {t("allRegions")}
                        </option>
                        {REGIONS.map((region) => (
                            <option className="bg-ink text-white" key={region} value={region}>
                                {tRegions(region)}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex-1">
                    <span className={labelClasses}>{t("priceLabel")}</span>
                    <select
                        className={selectClasses}
                        value={currentPrice}
                        onChange={(e) => updateFilter("price", e.target.value)}
                    >
                        <option className="bg-ink text-white" value="">
                            {t("anyPrice")}
                        </option>
                        {PRICE_BUCKETS.map((bucket) => (
                            <option className="bg-ink text-white" key={bucket} value={bucket}>
                                {t(
                                    bucket === "under-300"
                                        ? "priceUnder300"
                                        : bucket === "300-450"
                                            ? "price300to450"
                                            : "price450plus"
                                )}
                            </option>
                        ))}
                    </select>
                </label>
                <div className="flex-1 lg:flex-none">
                    <span className={labelClasses}>{t("currencyLabel")}</span>
                    <div className="flex gap-1 border-b border-white/20 pb-2">
                        {(["USD", "LKR"] as const).map((currency) => (
                            <button
                                key={currency}
                                type="button"
                                onClick={() => updateCurrency(currency)}
                                className={cn(
                                    "px-3 py-1 font-sans text-xs tracking-[0.15em] uppercase transition-colors",
                                    currentCurrency === currency
                                        ? "bg-white text-ink"
                                        : "text-white/50 hover:text-white"
                                )}
                            >
                                {currency}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex-1 lg:flex-none lg:pb-2">
                    <button
                        type="button"
                        onClick={() => router.push({ pathname, query: {} })}
                        disabled={!hasActiveFilters}
                        className={cn(
                            "font-sans text-xs tracking-[0.15em] uppercase transition-colors",
                            hasActiveFilters
                                ? "text-white underline underline-offset-4 hover:text-white/70"
                                : "text-white/25 cursor-not-allowed"
                        )}
                    >
                        {t("clearFilters")}
                    </button>
                </div>
            </div>
        </div>
    );
}