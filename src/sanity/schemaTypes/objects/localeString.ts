import { defineType, defineField } from 'sanity'

export const localeString = defineType({
    name: 'localeString',
    title: 'Localized text',
    type: 'object',
    fields: [
        defineField({ name: 'en', title: 'English', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'ru', title: 'Russian', type: 'string' }),
        defineField({ name: 'de', title: 'German', type: 'string' }),
    ],
    preview: {
        select: { title: 'en' },
    },
})