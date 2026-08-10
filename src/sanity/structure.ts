import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton — Site Settings. No "create new", no list, just the one document.
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),

      S.divider(),

      S.documentTypeListItem('property').title('Properties'),
      S.documentTypeListItem('offer').title('Offers'),

      S.divider(),

      // Everything else (future document types) still shows as a normal list.
      ...S.documentTypeListItems().filter(
        (listItem) =>
          listItem.getId() !== 'siteSettings' &&
          listItem.getId() !== 'property' &&
          listItem.getId() !== 'offer'
      ),
    ])