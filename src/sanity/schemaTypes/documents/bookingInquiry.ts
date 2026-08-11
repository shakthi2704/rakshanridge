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
            title: 'Check-in date',
            type: 'date',
        }),
        defineField({
            name: 'checkOut',
            title: 'Check-out date',
            type: 'date',
        }),
        defineField({
            name: 'guests',
            title: 'Guests',
            type: 'number',
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
        select: { title: 'name', subtitle: 'email', property: 'property.name.en' },
        prepare({ title, subtitle, property }) {
            return {
                title,
                subtitle: property ? `${subtitle} — ${property}` : subtitle,
            };
        },
    },
})