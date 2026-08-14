"use client";

// Auto-formats digits into DD/MM/YYYY as the guest types — a plain text
// input under the hood (inputMode="numeric"), not a native <input
// type="date">, per the no-native-date-picker design rule. Works best for
// forward typing and trailing backspace; mid-string edits reformat from
// scratch each keystroke, which is the standard trade-off for a mask this
// simple.

function formatDateMask(rawValue: string): string {
    const digits = rawValue.replace(/\D/g, "").slice(0, 8); // DDMMYYYY, max 8 digits

    const day = digits.slice(0, 2);
    const month = digits.slice(2, 4);
    const year = digits.slice(4, 8);

    let result = day;
    if (month) result += "/" + month;
    if (year) result += "/" + year;

    return result;
}

type DateMaskInputProps = {
    id: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
};

export default function DateMaskInput({
    id,
    value,
    onChange,
    placeholder,
    required,
    className,
}: DateMaskInputProps) {
    return (
        <input
            id={id}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            required={required}
            value={value}
            onChange={(e) => onChange(formatDateMask(e.target.value))}
            placeholder={placeholder}
            className={className}
        />
    );
}