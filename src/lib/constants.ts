export const SITE_NAME = 'raksha ridge' as const;
export const SITE_TAGLINE = 'Discover Sri Lanka in Luxury' as const;

// Update with real contact details when available
export const CONTACT_WHATSAPP = '+94 77 712 4568';
export const CONTACT_EMAIL = 'info@rakshanridge.com';
export const RESERVATION_EMAIL = 'reservation@rakshanridge.com';
export const ADDRESS = "No 318/1 Dutugamunu Mw, Enderamulla Wattala, Sri Lanka";


export const LOCALES = ['en', 'ru', 'de'] as const;
export const DEFAULT_LOCALE = 'en' as const;

export type Locale = typeof LOCALES[number];

export const SOCIAL_LINKS = {
    instagram: 'https://instagram.com/', // ← real URL
    facebook: 'https://facebook.com/',  // ← real URL
    whatsapp: `https://wa.me/94XXXXXXXXX`,       // ← real number
};