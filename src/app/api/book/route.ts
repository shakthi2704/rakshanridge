import { NextResponse } from "next/server";
import { Resend } from "resend";
import { writeClient } from "@/sanity/lib/writeClient";

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
    message?: string;
};

export async function POST(request: Request) {
    let body: BookingRequestBody;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { name, email, phone, propertySlug, roomSlug, checkIn, checkOut, guests, message } = body;

    if (!name || !email || !message) {
        return NextResponse.json(
            { error: "Name, email, and message are required." },
            { status: 400 }
        );
    }

    // Resolve the property slug (if provided) to a Sanity document reference.
    let propertyRef: { _type: "reference"; _ref: string } | undefined;
    if (propertySlug) {
        const propertyId: string | null = await writeClient.fetch(
            `*[_type == "property" && slug.current == $slug][0]._id`,
            { slug: propertySlug }
        );
        if (propertyId) {
            propertyRef = { _type: "reference", _ref: propertyId };
        }
    }

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
            guests: guests ? Number(guests) : undefined,
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

    // Email failure should never fail the whole request — the inquiry is
    // already safely logged in Sanity even if the notification email fails.
    try {
        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL!,
            to: process.env.BOOKING_NOTIFICATION_EMAIL!,
            subject: `New booking inquiry — ${name}`,
            text: [
                `Name: ${name}`,
                `Email: ${email}`,
                phone ? `Phone: ${phone}` : null,
                propertySlug ? `Property: ${propertySlug}` : null,
                roomSlug ? `Room: ${roomSlug}` : null,
                checkIn ? `Check-in: ${checkIn}` : null,
                checkOut ? `Check-out: ${checkOut}` : null,
                guests ? `Guests: ${guests}` : null,
                "",
                "Message:",
                message,
            ]
                .filter(Boolean)
                .join("\n"),
        });
    } catch (error) {
        console.error("Failed to send booking notification email:", error);
    }

    return NextResponse.json({ success: true, id: created._id });
}