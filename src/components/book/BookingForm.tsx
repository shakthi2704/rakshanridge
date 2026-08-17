"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import DateMaskInput from "@/components/book/DateMaskInput";
import { CreditCard, Landmark } from "lucide-react";
import { validateStayDates } from "@/lib/dateValidation";

const fieldClass =
    "w-full border-0 border-b border-white/20 bg-transparent px-0 py-4 font-sans text-sm text-white placeholder:text-white/40 transition-colors focus:border-white focus:outline-none focus:ring-0";

type BookingFormProps = {
    propertySlug?: string;
    roomSlug?: string;
    initialMessage?: string;
};

type Status = "idle" | "submitting" | "success" | "error";
type PaymentMethod = "pay_at_property" | "bank_deposit" | "";

export default function BookingForm({ propertySlug, roomSlug, initialMessage }: BookingFormProps) {
    const t = useTranslations("bookPage.form");
    const locale = useLocale();

    const [status, setStatus] = useState<Status>("idle");
    const [dateError, setDateError] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("");
    const [message, setMessage] = useState(initialMessage ?? "");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setDateError(null);

        const dateCheck = validateStayDates(checkIn, checkOut);
        if (!dateCheck.valid) {
            const errorKey =
                dateCheck.reason === "past"
                    ? "dateErrorPast"
                    : dateCheck.reason === "order"
                        ? "dateErrorOrder"
                        : dateCheck.reason === "invalid"
                            ? "dateErrorInvalid"
                            : "dateErrorFormat";
            setDateError(t(errorKey));
            return;
        }
        setStatus("submitting");

        try {
            const res = await fetch("/api/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    propertySlug,
                    roomSlug,
                    checkIn,
                    checkOut,
                    guests,
                    paymentMethod,
                    message,
                    locale,
                }),
            });

            if (!res.ok) throw new Error("Request failed");

            setStatus("success");
        } catch {
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <div className="border border-white/10 bg-ink px-8 py-14 text-center">
                <p className="font-serif text-2xl text-white">{t("submitted")}</p>
            </div>
        );
    }

    return (
        <div className="bg-ink px-8 py-10 lg:px-10 lg:py-12">
            <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                    <label
                        htmlFor="name"
                        className="font-sans text-[0.75rem] tracking-[0.15em] text-white/60 uppercase"
                    >
                        {t("nameLabel")}
                    </label>
                    <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("namePlaceholder")}
                        className={fieldClass}
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="font-sans text-[0.75rem] tracking-[0.15em] text-white/60 uppercase"
                    >
                        {t("emailLabel")}
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("emailPlaceholder")}
                        className={fieldClass}
                    />
                </div>

                <div>
                    <label
                        htmlFor="phone"
                        className="font-sans text-[0.75rem] tracking-[0.15em] text-white/60 uppercase"
                    >
                        {t("phoneLabel")}
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t("phonePlaceholder")}
                        className={fieldClass}
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label
                            htmlFor="checkIn"
                            className="font-sans text-[0.75rem] tracking-[0.15em] text-white/60 uppercase"
                        >
                            {t("checkInLabel")}
                        </label>
                        <DateMaskInput
                            id="checkIn"
                            value={checkIn}
                            onChange={setCheckIn}
                            placeholder={t("checkInPlaceholder")}
                            className={fieldClass}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="checkOut"
                            className="font-sans text-[0.75rem] tracking-[0.15em] text-white/60 uppercase"
                        >
                            {t("checkOutLabel")}
                        </label>
                        <DateMaskInput
                            id="checkOut"
                            value={checkOut}
                            onChange={setCheckOut}
                            placeholder={t("checkOutPlaceholder")}
                            className={fieldClass}
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="guests"
                        className="font-sans text-[0.75rem] tracking-[0.15em] text-white/60 uppercase"
                    >
                        {t("guestsLabel")}
                    </label>
                    <input
                        id="guests"
                        type="number"
                        min={1}
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        placeholder={t("guestsPlaceholder")}
                        className={fieldClass}
                    />
                </div>

                <div>
                    <span className="font-sans text-[0.75rem] tracking-[0.15em] text-white/60 uppercase">
                        {t("paymentMethodLabel")}
                    </span>

                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-4">
                        {(
                            [
                                {
                                    value: "pay_at_property",
                                    label: t("paymentPayAtProperty"),
                                    icon: CreditCard,
                                },
                                {
                                    value: "bank_deposit",
                                    label: t("paymentBankDeposit"),
                                    icon: Landmark,
                                },
                            ] as const
                        ).map((option) => {
                            const Icon = option.icon;

                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setPaymentMethod(option.value)}
                                    className={cn(
                                        "flex flex-1 items-center gap-3 border px-4 py-3 text-left font-sans text-sm transition-colors",
                                        paymentMethod === option.value
                                            ? "border-white bg-white/10 text-white"
                                            : "border-white/20 text-white/70 hover:border-white/40"
                                    )}
                                >
                                    <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                                    <span>{option.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="message"
                        className="font-sans text-[0.75rem] tracking-[0.15em] text-white/60 uppercase"
                    >
                        {t("messageLabel")}
                    </label>
                    <textarea
                        id="message"
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={t("messagePlaceholder")}
                        className={`${fieldClass} resize-none`}
                    />
                </div>
                {dateError && (
                    <p className="font-sans text-sm text-red-400">{dateError}</p>
                )}
                {status === "error" && (
                    <p className="font-sans text-sm text-red-400">{t("error")}</p>
                )}

                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className={buttonVariants({ variant: "white", size: "sm" })}
                >
                    {status === "submitting" ? t("submitting") : t("submit")}
                </button>
            </form>
        </div>
    );
}