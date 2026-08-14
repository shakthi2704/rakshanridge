import { defineType, defineField } from 'sanity'

export const bookingInquiry = defineType({
    name: 'bookingInquiry',
    title: 'Booking Inquiry',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: 'phone',
            title: 'Phone',
            type: 'string',
        }),
        defineField({
            name: 'property',
            title: 'Property',
            type: 'reference',
            to: [{ type: 'property' }],
            description: 'The property this inquiry relates to, if known.',
        }),
        defineField({
            name: 'roomSlug',
            title: 'Room',
            type: 'string',
            description: 'Room slug within the selected property, if a specific room was requested.',
        }),
        defineField({
            name: 'checkIn',
            title: 'Check-in',
            type: 'string',
            description: 'Free text as entered by the guest (e.g. "12 Dec 2026") — not a strict date, by design.',
        }),
        defineField({
            name: 'checkOut',
            title: 'Check-out',
            type: 'string',
            description: 'Free text as entered by the guest (e.g. "20 Dec 2026") — not a strict date, by design.',
        }),
        defineField({
            name: 'guests',
            title: 'Guests',
            type: 'number',
        }),
        defineField({
            name: 'paymentMethod',
            title: 'Payment Method',
            type: 'string',
            options: {
                list: [
                    { title: 'Pay at Property', value: 'pay_at_property' },
                    { title: 'Bank Deposit', value: 'bank_deposit' },
                ],
                layout: 'radio',
            },
        }),
        defineField({
            name: 'message',
            title: 'Message',
            type: 'text',
            rows: 5,
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'New', value: 'new' },
                    { title: 'Contacted', value: 'contacted' },
                    { title: 'Confirmed', value: 'confirmed' },
                    { title: 'Closed', value: 'closed' },
                ],
                layout: 'radio',
            },
            initialValue: 'new',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'email',
            property: 'property.name.en',
            payment: 'paymentMethod',
        },
        prepare({ title, subtitle, property, payment }) {
            const paymentLabel =
                payment === 'bank_deposit'
                    ? 'Bank Deposit'
                    : payment === 'pay_at_property'
                        ? 'Pay at Property'
                        : null;
            const parts = [subtitle, property, paymentLabel].filter(Boolean);
            return {
                title,
                subtitle: parts.join(' — '),
            };
        },
    },
})