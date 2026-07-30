import { getMessages } from "next-intl/server";

export default async function MarqueeStrip() {
    const messages = await getMessages();

    const marqueeItems = messages.marquee.items as string[];
    const items = [...marqueeItems, ...marqueeItems];

    return (
        <div className="bg-ink overflow-hidden border-t border-white/5 py-3">
            <div className="marquee-track flex whitespace-nowrap [animation:marquee_40s_linear_infinite] [will-change:transform]">
                {items.map((item, index) => (
                    <span key={index} className="inline-flex items-center">
                        <span className="px-5 text-[10px] font-medium tracking-[0.18em] text-white/60 uppercase lg:text-[12px]">
                            {item}
                        </span>

                        <span className="text-white/20 text-lg">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
}