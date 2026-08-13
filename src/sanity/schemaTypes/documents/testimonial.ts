import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        defineField({
            name: 'quote',
            title: 'Quote',
            type: 'localeText',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'name',
            title: 'Guest Name',
            type: 'string',
            description: 'Not translated — a person\'s name stays the same across languages.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'origin',
            title: 'Origin',
            type: 'localeString',
            description: 'e.g. "Zurich, Switzerland" — translated so it reads naturally in each language.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first. Used to control the order testimonials are shown on the homepage.',
            validation: (Rule) => Rule.required().integer(),
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            description: 'Only featured testimonials are shown on the homepage carousel.',
            type: 'boolean',
            initialValue: true,
        }),
    ],
    preview: {
        select: { title: 'name', subtitle: 'quote.en', order: 'order' },
        prepare({ title, subtitle, order }) {
            return {
                title: `${order ?? '—'}. ${title}`,
                subtitle,
            };
        },
    },
})