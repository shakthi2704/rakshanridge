import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline-white" | "outline-navy" | "ghost" | "ink" | "outline-ink";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonVariantsProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
}

export function buttonVariants({
    variant = "primary",
    size = "md",
    className,
}: ButtonVariantsProps = {}) {
    return cn(
        // Base
        "inline-flex items-center justify-center font-sans font-medium uppercase tracking-[0.15em] rounded-base",
        "transition-all duration-300 cursor-pointer whitespace-nowrap",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",

        // Variants
        variant === "primary" &&
        "bg-navy text-white shadow-md hover:bg-navy/90 hover:-translate-y-0.5 hover:shadow-lg",
        variant === "outline-white" &&
        "border border-white text-white backdrop-blur-sm hover:bg-transparent hover:text-white hover:-translate-y-0.5 hover:shadow-lg",
        variant === "outline-navy" &&
        "border border-navy text-navy bg-transparent backdrop-blur-sm hover:bg-navy hover:bg-transparent hover:-translate-y-0.5 hover:shadow-lg",
        variant === "ink" &&
        "bg-ink text-white shadow-md hover:bg-ink/90 hover:-translate-y-0.5 hover:shadow-lg",
        variant === "outline-ink" &&
        "border border-ink text-ink bg-transparent backdrop-blur-sm hover:bg-ink hover:text-white hover:-translate-y-0.5 hover:shadow-lg",
        // Sizes
        size === "sm" && "text-xs px-5 py-2.5",
        size === "md" && "text-sm px-8 py-3.5",
        size === "lg" && "text-sm px-10 py-4",

        className
    );
}

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={buttonVariants({ variant, size, className })}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };