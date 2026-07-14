import { ReactNode } from "react";

const sizes = {
    narrow: "max-w-3xl",     // ~768px — paragraphs, quotes, brand story text
    default: "max-w-[1440px]",    // 1280px — standard sections, card grids
    wide: "max-w-[1600px]",  // galleries, showcases that want more air
} as const;

export default function Container({
    children,
    size = "default",
    className = "",
}: {
    children: ReactNode;
    size?: keyof typeof sizes;
    className?: string;
}) {
    return (
        <div
            className={`mx-auto w-full px-6 sm:px-10 lg:px-16 ${sizes[size]} ${className}`}
        >
            {children}
        </div>
    );
}