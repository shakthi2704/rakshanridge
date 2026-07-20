export function Loader() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#031C1C]">
            <div className="flex flex-col items-center gap-6">

                {/* Spinner ring */}
                <div className="relative w-14 h-14">
                    <div className="absolute inset-0 rounded-full border-2 border-gold-accent/15" />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold-accent animate-spin" />
                </div>

                {/* Wordmark */}
                <p className="font-display text-2xl font-bold tracking-wide text-[#F8F5EE]">
                    CeylonVoy
                </p>

            </div>
        </div>
    );
}