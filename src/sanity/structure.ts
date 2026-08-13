import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
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
      S.documentTypeListItem('experience').title('Experiences'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('bookingInquiry').title('Booking Inquiries'),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (listItem) =>
          listItem.getId() !== 'siteSettings' &&
          listItem.getId() !== 'property' &&
          listItem.getId() !== 'offer' &&
          listItem.getId() !== 'experience' &&
          listItem.getId() !== 'testimonial' &&
          listItem.getId() !== 'bookingInquiry'
      ),
    ])