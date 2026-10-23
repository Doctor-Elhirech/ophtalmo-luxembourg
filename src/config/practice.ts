import imageMetadata from './image-metadata.json';
import { resolveSiteSettings } from './site.mjs';
const name = 'Ophtalmo Luxembourg';
const brandName = 'Ophta Vision';
/** Single source of truth for factual information and external destinations. */
export const practice = {
  name,
  brandName,
  fullName: `${name} ${brandName}`,
  doctor: 'Dr M’Hamed EL HIRECH',
  listingName: 'Cabinet Ophtalmologique Mamer',
  address: { street: '110 Route d’Arlon', postalCity: 'L-8210 Mamer', country: 'Luxembourg' },
  phone: '+352 691 641 064',
  phoneHref: 'tel:+352691641064',
  email: 'ophtalmo.luxembourg@gmail.com',
  bookingUrl: 'https://www.doctena.lu/fr/practitioner/mhamed-el-hirech',
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=110+Rte+d'Arlon,+8210+Mamer,+Luxembourg",
  profileUrl: 'https://www.doctena.lu/fr/practitioner/cabinet-ophtalmologique-mamer',
  registrationUrl: 'https://collegemedical.lu/fr/professionals?id=44',
  // Mamer practice opening hours published on Doctena, checked 20 October 2026.
  // Doctipro publishes a different consultation schedule; never merge the two.
  openingHours: [
    { day: 'friday', periods: ['09:00 – 12:00', '15:00 – 21:00'] },
    { day: 'saturday', periods: ['08:00 – 12:00', '14:00 – 21:00'] },
    { day: 'sunday', periods: ['08:00 – 12:00', '14:00 – 21:00'] },
  ] as const,
  // Each Doctipro booking URL selects the Mamer practice (hospital=90).
  doctipro: {
    fr: {
      profileUrl: 'https://www.doctipro.lu/fr/doctor-profile/254/el-hirech-mhamed',
      bookingUrl: 'https://www.doctipro.lu/fr/rendez-vous/254?hospital=90',
    },
    en: {
      profileUrl: 'https://www.doctipro.lu/en/doctor-profile/254/el-hirech-mhamed',
      bookingUrl: 'https://www.doctipro.lu/en/rendez-vous/254?hospital=90',
    },
  },
  reviewSummary: { rating: '5.0', maximum: '5', count: 4, source: 'Google', suppliedInBrief: true },
  reviewers: ['Sarah E.', 'Aya Ads'],
  reviewUrls: [
    'https://maps.app.goo.gl/VWTVwrPauDuw95F27',
    'https://maps.app.goo.gl/r4KZSy5kVNKfcjTy6',
  ],
};

export const photoSlots = {
  exteriorWide: imageMetadata['exterior-wide'],
  exterior: imageMetadata.exterior,
  consultation: imageMetadata.consultation,
  examination: imageMetadata.examination,
  examinationAlternate: imageMetadata['examination-alternate'],
  streetReference: imageMetadata['street-reference'],
};
export type PhotoSlot = keyof typeof photoSlots;

export const siteSettings = resolveSiteSettings({
  PUBLIC_SITE_ORIGIN: import.meta.env.PUBLIC_SITE_ORIGIN,
  PUBLIC_SITE_INDEXABLE: import.meta.env.PUBLIC_SITE_INDEXABLE,
  DEV: import.meta.env.DEV,
  VERCEL: import.meta.env.VERCEL,
  VERCEL_ENV: import.meta.env.VERCEL_ENV,
  VERCEL_TARGET_ENV: import.meta.env.VERCEL_TARGET_ENV,
  NETLIFY: import.meta.env.NETLIFY,
  CONTEXT: import.meta.env.CONTEXT,
});
