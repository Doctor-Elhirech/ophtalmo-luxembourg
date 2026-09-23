import imageMetadata from './image-metadata.json';
/** Single source of truth for factual information and external destinations. */
export const practice = {
  name: 'Ophtalmo Luxembourg',
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
  reviewSummary: { rating: '5.0', maximum: '5', count: 3, source: 'Google', suppliedInBrief: true },
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
};
export type PhotoSlot = keyof typeof photoSlots;

/** The local fallback keeps previews accurate; Netlify supplies URL during builds. */
export const siteSettings = {
  origin:
    import.meta.env.PUBLIC_SITE_ORIGIN ??
    import.meta.env.URL ??
    import.meta.env.DEPLOY_PRIME_URL ??
    'http://127.0.0.1:4321',
  indexable: false,
  localOnly: !import.meta.env.NETLIFY,
};
