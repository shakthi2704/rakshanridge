import { defineType, defineField } from 'sanity'

export const localeText = defineType({
    name: 'localeText',
    title: 'Localized text (long)',
    type: 'object',
    fields: [
        defineField({ name: 'en', title: 'English', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
        defineField({ name: 'ru', title: 'Russian', type: 'text', rows: 4 }),
        defineField({ name: 'de', title: 'German', type: 'text', rows: 4 }),
    ],
    preview: {
        select: { title: 'en' },
    },
})