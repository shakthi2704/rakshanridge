export default function Loading() {
    return (
        <main className="flex min-h-[70vh] flex-1 items-center justify-center bg-paper">
            <div className="flex flex-col items-center gap-6">
                <div className="relative h-12 w-12">
                    <div className="absolute inset-0 rounded-full border border-ink/15" />
                    <div className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-navy" />
                </div>

                <span className="font-serif text-xl tracking-[0.08em] text-ink">
                    Raksha &amp; Ridge
                </span>

                <span className="sr-only">Loading…</span>
            </div>
        </main>
    );
}