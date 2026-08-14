import type { BankDetails } from "@/sanity/lib/queries";

type BookingConfirmationData = {
    name: string;
    propertyName?: string | null;
    roomName?: string | null;
    checkIn?: string;
    checkOut?: string;
    guests?: string | number;
    paymentMethod?: "pay_at_property" | "bank_deposit" | "";
    bankDetails?: BankDetails;
};

type EmailContent = { subject: string; text: string };

function formatBankDetailsBlock(bankDetails?: BankDetails): string {
    if (!bankDetails) return "";
    const lines = [
        bankDetails.bankName ? `Bank: ${bankDetails.bankName}` : null,
        bankDetails.accountName ? `Account Name: ${bankDetails.accountName}` : null,
        bankDetails.accountNumber ? `Account Number: ${bankDetails.accountNumber}` : null,
        bankDetails.branch ? `Branch: ${bankDetails.branch}` : null,
        bankDetails.swiftCode ? `SWIFT/BIC: ${bankDetails.swiftCode}` : null,
    ].filter(Boolean);

    if (lines.length === 0) return "";

    return ["", "Bank Deposit Details:", ...lines].join("\n");
}

function bookingConfirmationEn(data: BookingConfirmationData): EmailContent {
    const stayLine = data.propertyName
        ? `${data.propertyName}${data.roomName ? ` — ${data.roomName}` : ""}`
        : null;

    const bankBlock =
        data.paymentMethod === "bank_deposit" ? formatBankDetailsBlock(data.bankDetails) : "";

    return {
        subject: "Your Inquiry — Raksha & Ridge",
        text: [
            `Dear ${data.name},`,
            "",
            "Thank you for reaching out to Raksha & Ridge. Your inquiry has been received, and our concierge team will be in touch within 24 hours to confirm the details of your stay.",
            "",
            stayLine ? `Property: ${stayLine}` : null,
            data.checkIn ? `Check-in: ${data.checkIn}` : null,
            data.checkOut ? `Check-out: ${data.checkOut}` : null,
            data.guests ? `Guests: ${data.guests}` : null,
            data.paymentMethod === "pay_at_property" ? "Payment: Pay at Property" : null,
            data.paymentMethod === "bank_deposit" ? "Payment: Bank Deposit" : null,
            bankBlock,
            "",
            "Warm regards,",
            "The Raksha & Ridge Team",
        ]
            .filter((line) => line !== null)
            .join("\n"),
    };
}

// TODO: translate — mirrors bookingConfirmationEn exactly, Russian copy.
function bookingConfirmationRu(data: BookingConfirmationData): EmailContent {
    return bookingConfirmationEn(data);
}

// TODO: translate — mirrors bookingConfirmationEn exactly, German copy.
function bookingConfirmationDe(data: BookingConfirmationData): EmailContent {
    return bookingConfirmationEn(data);
}

export function getBookingConfirmationEmail(
    locale: string,
    data: BookingConfirmationData
): EmailContent {
    switch (locale) {
        case "ru":
            return bookingConfirmationRu(data);
        case "de":
            return bookingConfirmationDe(data);
        default:
            return bookingConfirmationEn(data);
    }
}

type ContactConfirmationData = {
    name: string;
    topic?: "general" | "consulting" | "press" | "other" | "";
};

function contactConfirmationEn(data: ContactConfirmationData): EmailContent {
    return {
        subject: "We've received your message — Raksha & Ridge",
        text: [
            `Dear ${data.name},`,
            "",
            "Thank you for reaching out to Raksha & Ridge. Your message has been received, and our team will respond within 24 hours.",
            "",
            "Warm regards,",
            "The Raksha & Ridge Team",
        ].join("\n"),
    };
}

// TODO: translate — mirrors contactConfirmationEn exactly, Russian copy.
function contactConfirmationRu(data: ContactConfirmationData): EmailContent {
    return contactConfirmationEn(data);
}

// TODO: translate — mirrors contactConfirmationEn exactly, German copy.
function contactConfirmationDe(data: ContactConfirmationData): EmailContent {
    return contactConfirmationEn(data);
}

export function getContactConfirmationEmail(
    locale: string,
    data: ContactConfirmationData
): EmailContent {
    switch (locale) {
        case "ru":
            return contactConfirmationRu(data);
        case "de":
            return contactConfirmationDe(data);
        default:
            return contactConfirmationEn(data);
    }
}