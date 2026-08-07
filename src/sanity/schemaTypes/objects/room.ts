import { defineType, defineField } from 'sanity'

export const room = defineType({
    name: 'room',
    title: 'Room',
    type: 'object',
    fields: [
        defineField({
            name: 'name',
            title: 'Room name',
            type: 'localeString',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Room slug',
            type: 'slug',
            options: { source: 'name.en', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Short description',
            description: 'Shown on the property detail page room card.',
            type: 'localeText',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'longDescription',
            title: 'Long description',
            description: 'Shown on the room detail page.',
            type: 'localeText',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'occupancy',
            title: 'Occupancy (guests)',
            type: 'number',
            validation: (Rule) => Rule.required().positive().integer(),
        }),
        defineField({
            name: 'sizeSqm',
            title: 'Size (sqm)',
            type: 'number',
            validation: (Rule) => Rule.required().positive(),
        }),
        defineField({
            name: 'beds',
            title: 'Beds',
            type: 'number',
            validation: (Rule) => Rule.required().positive().integer(),
        }),
        defineField({
            name: 'bathrooms',
            title: 'Bathrooms',
            type: 'number',
            validation: (Rule) => Rule.required().positive().integer(),
        }),
        defineField({
            name: 'priceFrom',
            title: 'Price from (USD/night)',
            type: 'number',
            validation: (Rule) => Rule.required().positive(),
        }),
    ],
    preview: {
        select: { title: 'name.en', subtitle: 'priceFrom' },
        prepare: ({ title, subtitle }) => ({
            title,
            subtitle: subtitle ? `$${subtitle}/night` : undefined,
        }),
    },
})