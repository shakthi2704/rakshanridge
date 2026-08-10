import { type SchemaTypeDefinition } from 'sanity'
import { siteSettings } from './siteSettings'
import { localeString } from './objects/localeString'
import { localeText } from './objects/localeText'
import { room } from './objects/room'
import { property } from './documents/property'
import { offer } from './documents/offer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, localeString, localeText, room, property, offer],
}