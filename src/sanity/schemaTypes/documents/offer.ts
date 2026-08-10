import { defineType, defineField } from 'sanity'

export const offer = defineType({
    name: 'offer',
    title: 'Offer',
    type: 'document',
    groups: [
        { name: 'content', title: 'Content', default: true },
        { name: 'media', title: 'Media' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Offer title',
            type: 'localeString',
            group: 'content',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title.en', maxLength: 96 },
            group: 'content',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'localeText',
            group: 'content',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'property',
            title: 'Property',
            type: 'reference',
            to: [{ type: 'property' }],
            group: 'content',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'roomSlug',
            title: 'Specific room (optional)',
            description:
                'Leave empty for a property-wide offer. If set, must match a room slug on the selected property exactly.',
            type: 'string',
            group: 'content',
        }),
        defineField({
            name: 'discountType',
            title: 'Discount type',
            type: 'string',
            group: 'content',
            options: {
                list: [
                    { title: 'Percentage off', value: 'percentage' },
                    { title: 'Fixed amount off (USD)', value: 'fixed' },
                ],
                layout: 'radio',
            },
            initialValue: 'percentage',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'discountValue',
            title: 'Discount value',
            description:
                'For percentage: enter e.g. 20 for 20% off. For fixed: enter the USD amount off (e.g. 50 for $50 off).',
            type: 'number',
            group: 'content',
            validation: (Rule) => Rule.required().positive(),
        }),
        defineField({
            name: 'validFrom',
            title: 'Valid from',
            type: 'date',
            group: 'content',
        }),
        defineField({
            name: 'validUntil',
            title: 'Valid until',
            type: 'date',
            group: 'content',
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            description: 'Show prominently on the Offers listing / homepage.',
            type: 'boolean',
            initialValue: false,
            group: 'content',
        }),
        defineField({
            name: 'image',
            title: 'Image (optional)',
            description: "Leave empty to fall back to the property's hero image at render time.",
            type: 'image',
            options: { hotspot: true },
            group: 'media',
        }),
    ],
    preview: {
        select: { title: 'title.en', subtitle: 'property.name.en', media: 'image' },
    },
})