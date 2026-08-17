import { NextResponse } from "next/server";
import { Resend } from "resend";
import { writeClient } from "@/sanity/lib/writeClient";
import { getContactConfirmationEmail } from "@/lib/emailTemplates";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactRequestBody = {
    name?: string;
    email?: string;
    topic?: "general" | "consulting" | "press" | "other" | "";
    message?: string;
    locale?: string;
    website?: string; // honeypot — real users never fill this in
};

export async function POST(request: Request) {
    let body: ContactRequestBody;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { name, email, topic, message, locale, website } = body;

    // Honeypot: a real visitor never sees or fills this field. If it's
    // populated, silently pretend success without writing to Sanity or
    // sending any email.
    if (website) {
        return NextResponse.json({ success: true, id: "ok" });
    }

    if (!name || !email || !message) {
        return NextResponse.json(
            { error: "Name, email, and message are required." },
            { status: 400 }
        );
    }

    if (name.length > 200 || message.length > 5000) {
        return NextResponse.json(
            { error: "One of your fields is too long. Please shorten it and try again." },
            { status: 400 }
        );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json(
            { error: "Please enter a valid email address." },
            { status: 400 }
        );
    }

    let created;
    try {
        created = await writeClient.create({
            _type: "contactInquiry",
            name,
            email,
            topic: topic || "general",
            message,
            status: "new",
        });
    } catch (error) {
        console.error("Failed to log contact inquiry to Sanity:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }

    // Internal notification email — never fails the whole request.
    try {
        await resend.emails.send({
            from: process.env.CONTACT_FROM_EMAIL!,
            to: process.env.CONTACT_NOTIFICATION_EMAIL!,
            subject: `New contact inquiry — ${name}`,
            text: [
                `Name: ${name}`,
                `Email: ${email}`,
                topic ? `Topic: ${topic}` : null,
                "",
                "Message:",
                message,
            ]
                .filter(Boolean)
                .join("\n"),
        });
    } catch (error) {
        console.error("Failed to send internal notification email:", error);
    }

    // Guest-facing confirmation email — also never fails the whole request.
    // The inquiry is already safely logged even if this fails.
    try {
        const { subject, text } = getContactConfirmationEmail(locale ?? "en", {
            name,
            topic,
        });

        await resend.emails.send({
            from: process.env.CONTACT_FROM_EMAIL!,
            to: email,
            subject,
            text,
        });
    } catch (error) {
        console.error("Failed to send guest confirmation email:", error);
    }

    return NextResponse.json({ success: true, id: created._id });
}