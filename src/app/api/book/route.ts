import { NextResponse } from "next/server";
import { Resend } from "resend";
import { writeClient } from "@/sanity/lib/writeClient";
import { getSiteSettings } from "@/sanity/lib/queries";
import { getBookingConfirmationEmail } from "@/lib/emailTemplates";

const resend = new Resend(process.env.RESEND_API_KEY);

type BookingRequestBody = {
    name?: string;
    email?: string;
    phone?: string;
    propertySlug?: string;
    roomSlug?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string | number;
    paymentMethod?: "pay_at_property" | "bank_deposit" | "";
    message?: string;
    locale?: string;
    website?: string; // honeypot — real users never fill this in
};

export async function POST(request: Request) {
    let body: BookingRequestBody;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const {
        name,
        email,
        phone,
        propertySlug,
        roomSlug,
        checkIn,
        checkOut,
        guests,
        paymentMethod,
        message,
        locale,
        website,
    } = body;


    // Honeypot: a real visitor never sees or fills this field (hidden via CSS,
    // not display:none). If it's populated, silently pretend success so the
    // bot doesn't learn to adapt, without writing anything to Sanity or
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

    // Resolve the property slug (if provided) to a Sanity document reference,
    // and grab its display name for the confirmation email while we're at it.
    let propertyRef: { _type: "reference"; _ref: string } | undefined;
    let propertyName: string | null = null;
    let roomName: string | null = null;

    if (propertySlug) {
        const propertyDoc: { _id: string; name?: { en?: string }; rooms?: { slug?: { current?: string }; name?: { en?: string } }[] } | null =
            await writeClient.fetch(
                `*[_type == "property" && slug.current == $slug][0]{ _id, name, rooms[]{ slug, name } }`,
                { slug: propertySlug }
            );

        if (propertyDoc) {
            propertyRef = { _type: "reference", _ref: propertyDoc._id };
            propertyName = propertyDoc.name?.en ?? null;

            if (roomSlug) {
                const room = propertyDoc.rooms?.find((r) => r.slug?.current === roomSlug);
                roomName = room?.name?.en ?? null;
            }
        }
    }
    const parsedGuests = guests ? Number(guests) : undefined;
    const safeGuests = Number.isFinite(parsedGuests) ? parsedGuests : undefined;
    let created;
    try {
        created = await writeClient.create({
            _type: "bookingInquiry",
            name,
            email,
            phone: phone || undefined,
            property: propertyRef,
            roomSlug: roomSlug || undefined,
            checkIn: checkIn || undefined,
            checkOut: checkOut || undefined,
            guests: safeGuests,
            paymentMethod: paymentMethod || undefined,
            message,
            status: "new",
        });
    } catch (error) {
        console.error("Failed to log booking inquiry to Sanity:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }

    // Internal notification email — never fails the whole request.
    try {
        await resend.emails.send({
            from: process.env.BOOKING_FROM_EMAIL!,
            to: process.env.BOOKING_NOTIFICATION_EMAIL!,
            subject: `New booking inquiry — ${name}`,
            text: [
                `Name: ${name}`,
                `Email: ${email}`,
                phone ? `Phone: ${phone}` : null,
                propertyName ? `Property: ${propertyName}` : null,
                roomName ? `Room: ${roomName}` : null,
                checkIn ? `Check-in: ${checkIn}` : null,
                checkOut ? `Check-out: ${checkOut}` : null,
                guests ? `Guests: ${guests}` : null,
                paymentMethod ? `Payment method: ${paymentMethod}` : null,
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
        const siteSettings = await getSiteSettings();
        const { subject, text } = getBookingConfirmationEmail(locale ?? "en", {
            name,
            propertyName,
            roomName,
            checkIn,
            checkOut,
            guests,
            paymentMethod,
            bankDetails: siteSettings?.bankDetails,
        });

        await resend.emails.send({
            from: process.env.BOOKING_FROM_EMAIL!,
            to: email,
            subject,
            text,
        });
    } catch (error) {
        console.error("Failed to send guest confirmation email:", error);
    }

    return NextResponse.json({ success: true, id: created._id });
}