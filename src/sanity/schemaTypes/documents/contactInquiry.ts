import { defineType, defineField } from 'sanity'

export const contactInquiry = defineType({
    name: 'contactInquiry',
    title: 'Contact Inquiry',
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
            name: 'topic',
            title: 'Topic',
            type: 'string',
            options: {
                list: [
                    { title: 'General', value: 'general' },
                    { title: 'Consulting', value: 'consulting' },
                    { title: 'Press', value: 'press' },
                    { title: 'Other', value: 'other' },
                ],
                layout: 'radio',
            },
            initialValue: 'general',
        }),
        defineField({
            name: 'message',
            title: 'Message',
            type: 'text',
            rows: 5,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'New', value: 'new' },
                    { title: 'Replied', value: 'replied' },
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
            topic: 'topic',
        },
        prepare({ title, subtitle, topic }) {
            const parts = [subtitle, topic].filter(Boolean);
            return {
                title,
                subtitle: parts.join(' — '),
            };
        },
    },
})