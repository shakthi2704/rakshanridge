"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import {
    PROPERTY_TYPES,
    PROPERTY_REGIONS,
    PRICE_BRACKETS,
    type PropertyType,
    type PropertyRegion,
    type PriceBracketId,
} from "@/lib/properties";

const selectWrapperClass =
    "relative border border-ink/15 bg-white transition-colors focus-within:border-ink";

const selectClass =
    "w-full cursor-pointer appearance-none bg-transparent px-4 py-3.5 pr-10 font-sans text-sm text-ink focus:outline-none";

type PropertyFiltersBarProps = {
    resultsCount: number;
};

export default function PropertyFiltersBar({ resultsCount }: PropertyFiltersBarProps) {
    const t = useTranslations("properties.filters");
    const tTypes = useTranslations("properties.types");
    const tRegions = useTranslations("properties.regions");

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const type = searchParams.get("type") ?? "all";
    const region = searchParams.get("region") ?? "all";
    const price = searchParams.get("price") ?? "all";

    const hasActiveFilters = type !== "all" || region !== "all" || price !== "all";

    function updateParam(key: "type" | "region" | "price", value: string) {
        const params = new URLSearchParams(searchParams.toString());

        if (value === "all") {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname);
    }

    function handleClear() {
        router.push(pathname);
    }

    return (
        <div className="border-b border-ink/10 bg-paper py-8">
            <Container>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:flex lg:items-center lg:gap-4">
                        {/* Type */}
                        <label className="flex flex-col gap-2">
                            <span className="font-sans text-xs tracking-[0.2em] text-slate uppercase">
                                {t("typeLabel")}
                            </span>
                            <span className={selectWrapperClass}>
                                <select
                                    className={selectClass}
                                    value={type}
                                    onChange={(e) => updateParam("type", e.target.value)}
                                >
                                    <option value="all">{t("allTypes")}</option>
                                    {PROPERTY_TYPES.map((option: PropertyType) => (
                                        <option key={option} value={option}>
                                            {tTypes(option)}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown
                                    className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate"
                                    strokeWidth={1.5}
                                />
                            </span>
                        </label>

                        {/* Region */}
                        <label className="flex flex-col gap-2">
                            <span className="font-sans text-xs tracking-[0.2em] text-slate uppercase">
                                {t("regionLabel")}
                            </span>
                            <span className={selectWrapperClass}>
                                <select
                                    className={selectClass}
                                    value={region}
                                    onChange={(e) => updateParam("region", e.target.value)}
                                >
                                    <option value="all">{t("allRegions")}</option>
                                    {PROPERTY_REGIONS.map((option: PropertyRegion) => (
                                        <option key={option} value={option}>
                                            {tRegions(option)}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown
                                    className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate"
                                    strokeWidth={1.5}
                                />
                            </span>
                        </label>

                        {/* Price */}
                        <label className="flex flex-col gap-2">
                            <span className="font-sans text-xs tracking-[0.2em] text-slate uppercase">
                                {t("priceLabel")}
                            </span>
                            <span className={selectWrapperClass}>
                                <select
                                    className={selectClass}
                                    value={price}
                                    onChange={(e) => updateParam("price", e.target.value)}
                                >
                                    <option value="all">{t("anyPrice")}</option>
                                    {PRICE_BRACKETS.map((bracket: { id: PriceBracketId; labelKey: string }) => (
                                        <option key={bracket.id} value={bracket.id}>
                                            {t(bracket.labelKey as "priceUnder300" | "price300to450" | "price450plus")}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown
                                    className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate"
                                    strokeWidth={1.5}
                                />
                            </span>
                        </label>
                    </div>

                    <div className="flex items-center justify-between gap-6 lg:justify-end">
                        <span className="font-sans text-xs tracking-[0.2em] text-charcoal uppercase">
                            {t("resultsCount", { count: resultsCount })}
                        </span>

                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="font-sans text-xs tracking-[0.2em] text-ink uppercase underline underline-offset-4 transition-colors hover:text-charcoal"
                            >
                                {t("clearFilters")}
                            </button>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}