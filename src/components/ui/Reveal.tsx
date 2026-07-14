"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "none";
};

export default function Reveal({
    children,
    className = "",
    delay = 0,
    direction = "up",
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={cn(
                "transition-all duration-700 ease-out",
                visible
                    ? "translate-y-0 opacity-100"
                    : direction === "up"
                        ? "translate-y-8 opacity-0"
                        : "opacity-0",
                className
            )}
        >
            {children}
        </div>
    );
}