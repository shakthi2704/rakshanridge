import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    groups: [
        { name: 'currency', title: 'Currency', default: true },
        { name: 'payment', title: 'Payment' },
    ],
    fields: [
        defineField({
            name: 'baseCurrency',
            title: 'Base Currency',
            type: 'string',
            description: 'The currency all prices are entered in across the site (properties, rooms, offers). This should not change casually — it defines what "priceFrom" and offer prices mean everywhere.',
            initialValue: 'USD',
            readOnly: true,
            group: 'currency',
        }),
        defineField({
            name: 'exchangeRates',
            title: 'Exchange Rates',
            type: 'array',
            description: 'Conversion rates from the base currency. Add a new entry here to support a new currency — no code changes needed.',
            group: 'currency',
            of: [
                defineField({
                    name: 'exchangeRate',
                    title: 'Exchange Rate',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'currencyCode',
                            title: 'Currency Code',
                            type: 'string',
                            description: 'e.g. LKR, EUR',
                            validation: (Rule) => Rule.required().uppercase().length(3),
                        }),
                        defineField({
                            name: 'currencyLabel',
                            title: 'Display Label',
                            type: 'string',
                            description: 'e.g. "Sri Lankan Rupee" — shown in the currency switcher',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'rate',
                            title: 'Rate (per 1 base currency unit)',
                            type: 'number',
                            description: 'e.g. if base is USD and this is LKR, enter how many LKR equal 1 USD',
                            validation: (Rule) => Rule.required().positive(),
                        }),
                    ],
                    preview: {
                        select: { title: 'currencyCode', subtitle: 'rate' },
                        prepare({ title, subtitle }) {
                            return { title, subtitle: `Rate: ${subtitle}` }
                        },
                    },
                }),
            ],
        }),
        defineField({
            name: 'bankDetails',
            title: 'Bank Deposit Details',
            type: 'object',
            description: 'Shown to guests via the automatic confirmation email when they choose "Bank Deposit" as their payment method on the booking form.',
            group: 'payment',
            fields: [
                defineField({ name: 'bankName', title: 'Bank Name', type: 'string' }),
                defineField({ name: 'accountName', title: 'Account Name', type: 'string' }),
                defineField({ name: 'accountNumber', title: 'Account Number', type: 'string' }),
                defineField({ name: 'branch', title: 'Branch', type: 'string' }),
                defineField({ name: 'swiftCode', title: 'SWIFT / BIC Code', type: 'string' }),
            ],
        }),
    ],
    preview: {
        prepare() {
            return { title: 'Site Settings' }
        },
    },
})