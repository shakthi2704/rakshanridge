import { type SchemaTypeDefinition } from 'sanity'
import { siteSettings } from './siteSettings'
import { localeString } from './objects/localeString'
import { localeText } from './objects/localeText'
import { room } from './objects/room'
import { property } from './documents/property'
import { offer } from './documents/offer'
import { bookingInquiry } from './documents/bookingInquiry'
import { testimonial } from './documents/testimonial'
import { experience } from './documents/experience'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    localeString,
    localeText,
    room,
    property,
    offer,
    bookingInquiry,
    testimonial,
    experience,
  ],
}