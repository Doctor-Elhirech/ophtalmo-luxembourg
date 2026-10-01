import { practice, photoSlots, siteSettings } from './practice';
import { localePath, locales, pageKeys, translations, type Locale, type PageKey } from '../content/translations';
import { careGuideIds, careGuides, careGuidePath, type CareGuideId } from '../content/care-guides';

export interface SeoRoute {
  locale: Locale;
  page: PageKey;
  guide?: CareGuideId;
  path: string;
}

export const seoRoutes: SeoRoute[] = locales.flatMap((locale) => [
  ...pageKeys.map((page) => ({ locale, page, path: localePath(locale, page) })),
  ...careGuideIds.map((guide) => ({ locale, page: 'expertise' as const, guide, path: careGuidePath(locale, guide) })),
]);

export function pagePath(locale: Locale, page: PageKey, guide?: CareGuideId) {
  return guide ? careGuidePath(locale, guide) : localePath(locale, page);
}

export function pageAlternates(page: PageKey, guide?: CareGuideId): Record<Locale, string> {
  return {
    fr: pagePath('fr', page, guide),
    en: pagePath('en', page, guide),
    lb: pagePath('lb', page, guide),
  };
}

export const absoluteUrl = (path: string) => new URL(path, siteSettings.origin).href;
const sharingPhoto = photoSlots.examination;
export const sharingImage = {
  url: absoluteUrl(`/images/${sharingPhoto.base}-1600.webp`),
  width: Math.min(1600, sharingPhoto.width),
  height: Math.round(sharingPhoto.height * Math.min(1600, sharingPhoto.width) / sharingPhoto.width),
};

/** Only supported identity facts belong here; hours, counts and clinical promises are omitted. */
export function structuredData(locale: Locale, page: PageKey, guide?: CareGuideId) {
  const t = translations[locale];
  const metadata = guide ? careGuides[locale][guide] : t.pageMeta[page];
  const url = absoluteUrl(pagePath(locale, page, guide));
  const practiceId = absoluteUrl('/#practice');
  const doctorId = absoluteUrl('/#doctor');
  const websiteId = absoluteUrl('/#website');
  const imageId = absoluteUrl('/#practice-image');
  const pageId = `${url}#webpage`;
  const breadcrumbId = `${url}#breadcrumb`;
  const breadcrumbs = [{ '@type': 'ListItem', position: 1, name: t.nav.home, item: absoluteUrl(localePath(locale)) }];
  if (page !== 'home') {
    breadcrumbs.push({ '@type': 'ListItem', position: 2, name: t.nav[page], item: absoluteUrl(localePath(locale, page)) });
  }
  if (guide) {
    breadcrumbs.push({ '@type': 'ListItem', position: 3, name: careGuides[locale][guide].name, item: url });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Physician',
        '@id': practiceId,
        name: practice.name,
        alternateName: practice.listingName,
        url: absoluteUrl('/'),
        telephone: practice.phone,
        email: practice.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: practice.address.street,
          addressLocality: 'Mamer',
          postalCode: '8210',
          addressCountry: 'LU',
        },
        medicalSpecialty: 'https://schema.org/Ophthalmologic',
        image: { '@id': imageId },
        hasMap: practice.directionsUrl,
        sameAs: [practice.profileUrl, practice.doctipro.fr.profileUrl],
      },
      {
        '@type': 'Person',
        '@id': doctorId,
        name: practice.doctor,
        jobTitle: t.doctorSection.role,
        url: absoluteUrl(localePath(locale, 'doctor')),
        worksFor: { '@id': practiceId },
        sameAs: [practice.profileUrl, practice.doctipro.fr.profileUrl],
      },
      {
        '@type': 'ImageObject',
        '@id': imageId,
        contentUrl: sharingImage.url,
        width: sharingImage.width,
        height: sharingImage.height,
        caption: t.photos.examination,
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: absoluteUrl('/'),
        name: practice.name,
        inLanguage: [...locales],
        publisher: { '@id': practiceId },
      },
      {
        '@type': guide ? 'MedicalWebPage' : page === 'contact' ? 'ContactPage' : page === 'doctor' ? 'AboutPage' : 'WebPage',
        '@id': pageId,
        url,
        name: metadata.title,
        description: metadata.description,
        inLanguage: locale,
        isPartOf: { '@id': websiteId },
        publisher: { '@id': practiceId },
        ...(page === 'doctor' ? { mainEntity: { '@id': doctorId } } : {}),
        ...(guide ? { about: { '@type': 'Thing', name: careGuides[locale][guide].name } } : {}),
        ...(page !== 'home' ? { breadcrumb: { '@id': breadcrumbId } } : {}),
      },
      ...(page !== 'home' ? [{ '@type': 'BreadcrumbList', '@id': breadcrumbId, itemListElement: breadcrumbs }] : []),
    ],
  };
}

export function xmlEscape(value: string) {
  const entities: Record<string, string> = {
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
  };
  return value.replace(/[<>&"']/g, (character) => entities[character] ?? character);
}
