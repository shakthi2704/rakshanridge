import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Raksha & Ridge — Studio",
};

export default function StudioRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}