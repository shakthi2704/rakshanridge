// Shared check-in/check-out validation for the booking form and API route.
// Dates are stored and transmitted as free-text "DD/MM/YYYY" strings (see
// DateMaskInput) — this module only validates that shape, it never converts
// the stored value into a Date object anywhere else in the app.

export type DateValidationResult =
    | { valid: true; date: Date }
    | { valid: false; reason: "format" | "invalid" | "past" };

const DATE_PATTERN = /^(\d{2})\/(\d{2})\/(\d{4})$/;

// Parses "DD/MM/YYYY" strictly — rejects wrong format and rejects dates
// that don't round-trip (e.g. "31/02/2026", which JS Date would otherwise
// silently roll over into March).
function parseStrictDate(value: string): Date | null {
    const match = DATE_PATTERN.exec(value.trim());
    if (!match) return null;

    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);

    const date = new Date(year, month - 1, day);
    const isSameDate =
        date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

    return isSameDate ? date : null;
}

function startOfToday(): Date {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
}

// Validates a single date string is well-formed, a real calendar date, and
// not in the past (today is allowed).
export function validateNotPastDate(value: string): DateValidationResult {
    const trimmed = value.trim();

    if (!DATE_PATTERN.test(trimmed)) {
        return { valid: false, reason: "format" };
    }

    const date = parseStrictDate(trimmed);
    if (!date) {
        return { valid: false, reason: "invalid" };
    }

    if (date < startOfToday()) {
        return { valid: false, reason: "past" };
    }

    return { valid: true, date };
}

// Validates a check-in/check-out pair: both must be valid, not in the past,
// and check-out must be strictly after check-in.
export function validateStayDates(
    checkIn: string,
    checkOut: string
):
    | { valid: true }
    | { valid: false; field: "checkIn" | "checkOut"; reason: "format" | "invalid" | "past" | "order" } {
    const checkInResult = validateNotPastDate(checkIn);
    if (!checkInResult.valid) {
        return { valid: false, field: "checkIn", reason: checkInResult.reason };
    }

    const checkOutResult = validateNotPastDate(checkOut);
    if (!checkOutResult.valid) {
        return { valid: false, field: "checkOut", reason: checkOutResult.reason };
    }

    if (checkOutResult.date <= checkInResult.date) {
        return { valid: false, field: "checkOut", reason: "order" };
    }

    return { valid: true };
}