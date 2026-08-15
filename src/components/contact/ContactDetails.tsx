import { Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { getTranslations } from "next-intl/server";
import { CONTACT_EMAIL } from "@/lib/constants";

const EMAIL = CONTACT_EMAIL;
const PHONE_DISPLAY = "+94 11 234 5678";
const PHONE_HREF = "+94112345678";
const WHATSAPP_HREF = "https://wa.me/94112345678";

export default async function ContactDetails() {
    const t = await getTranslations("contactPage.details");
    const tFooter = await getTranslations("footer");

    const rows = [
        {
            icon: Mail,
            label: t("emailLabel"),
            value: EMAIL,
            href: `mailto:${EMAIL}`,
        },
        {
            icon: Phone,
            label: t("phoneLabel"),
            value: PHONE_DISPLAY,
            href: `tel:${PHONE_HREF}`,
        },
        {
            icon: MessageCircle,
            label: t("whatsappLabel"),
            value: PHONE_DISPLAY,
            href: WHATSAPP_HREF,
        },
        // {
        //     icon: MapPin,
        //     label: t("addressLabel"),
        //     value: tFooter("addressCity"),
        //     href: null,
        // },
        {
            icon: Clock,
            label: t("hoursLabel"),
            value: t("hoursValue"),
            href: null,
        },
    ];

    return (
        <div className="relative overflow-hidden">

            <Reveal>
                <h2 className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                    {t("heading")}
                </h2>
            </Reveal>
            <Reveal delay={100}>
                <p className="mt-5 max-w-md font-sans text-md leading-relaxed text-charcoal">
                    {t("intro")}
                </p>
            </Reveal>

            <div className="mt-10 space-y-1">
                {rows.map((row, index) => {
                    const Icon = row.icon;

                    const content = (
                        <div className="flex items-start gap-4 py-5">
                            <Icon
                                className="mt-0.5 h-5 w-5 shrink-0 text-ink"
                                strokeWidth={1.5}
                            />

                            <div>
                                <span className="font-sans text-md tracking-[0.12em] text-ink uppercase font-bold">
                                    {row.label}
                                </span>

                                <p className="mt-1 font-sans text-base text-charcoal">
                                    {row.value}
                                </p>
                            </div>
                        </div>
                    );

                    return (
                        <Reveal key={row.label} delay={index * 60}>
                            {row.href ? (
                                <a
                                    href={row.href}
                                    className="block transition-colors hover:text-navy"
                                >
                                    {content}
                                </a>
                            ) : (
                                content
                            )}
                        </Reveal>
                    );
                })}
            </div>
        </div>
    );
}