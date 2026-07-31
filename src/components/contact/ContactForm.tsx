"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

const fieldClass =
    "w-full border-0 border-b border-white/20 bg-transparent px-0 py-4 font-sans text-sm text-white placeholder:text-white/40 transition-colors focus:border-white focus:outline-none focus:ring-0";

export default function ContactForm() {
    const t = useTranslations("contactPage.form");

    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [topic, setTopic] = useState("general");
    const [message, setMessage] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        console.log({
            name,
            email,
            topic,
            message,
        });

        setSubmitted(true);
    }

    if (submitted) {
        return (
            <div className="border border-white/10 bg-ink px-8 py-14 text-center">
                <p className="font-serif text-2xl text-white">
                    {t("submitted")}
                </p>
            </div>
        );
    }
    return (
        <div className="bg-ink px-8 py-10 lg:px-10 lg:py-12">
            <div className="mb-10">
                <span className="font-sans text-xs tracking-[0.25em] text-white/60 uppercase">
                    {t("heading")}
                </span>

                <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-white/70">
                    {t("intro")}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                <div>
                    <label
                        htmlFor="name"
                        className="font-sans text-[0.75rem] tracking-[0.15em] text-white/60 uppercase"
                    >
                        {t("nameLabel")}
                    </label>

                    <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("namePlaceholder")}
                        className={fieldClass}
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="font-sans text-[0.75rem] tracking-[0.15em] text-white/60 uppercase"
                    >
                        {t("emailLabel")}
                    </label>

                    <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("emailPlaceholder")}
                        className={fieldClass}
                    />
                </div>

                <div>
                    <label
                        htmlFor="topic"
                        className="font-sans text-[0.75rem] tracking-[0.15em] text-white/60 uppercase"

                    >
                        {t("topicLabel")}
                    </label>

                    <select
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className={`${fieldClass} cursor-pointer`}
                    >
                        <option value="general">
                            {t("topicGeneral")}
                        </option>

                        <option value="consulting">
                            {t("topicConsulting")}
                        </option>

                        <option value="press">
                            {t("topicPress")}
                        </option>

                        <option value="other">
                            {t("topicOther")}
                        </option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="message"
                        className="font-sans text-[0.75rem] tracking-[0.15em] text-white/60 uppercase"
                    >
                        {t("messageLabel")}
                    </label>

                    <textarea
                        id="message"
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={t("messagePlaceholder")}
                        className={`${fieldClass} resize-none`}
                    />
                </div>

                <button
                    type="submit"
                    className={buttonVariants({
                        variant: "white",
                        size: "md",
                    })}
                >
                    {t("submit")}
                </button>
            </form>
        </div>
    );
}