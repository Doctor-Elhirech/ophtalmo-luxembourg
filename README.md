# Ophtalmo Luxembourg

A French, English and Luxembourgish website for the Mamer ophthalmology practice of **Dr M'Hamed EL HIRECH**. It presents the doctor, eye care information, the practice location and contact details. Visitors can follow external links to book through Doctena or Doctipro. The site does not collect appointment requests or medical records.

The current public address is [ophtalmo-luxembourg.vercel.app](https://ophtalmo-luxembourg.vercel.app/). A final custom domain can be connected later. The doctor's final review of hours, clinical wording, photographs and legal pages remains part of handoff.

## Technology at a glance

| Part                                         | What it does                                                                                 |
| -------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Astro 7, TypeScript, HTML and CSS            | Builds fast, static pages without a patient database or application server.                  |
| Locally hosted fonts and responsive photographs | Keeps the main design assets within the site and prepares images for different screen sizes. |
| Sharp                                        | Produces optimized images from the files in `Photos/`.                                       |
| Playwright and axe                           | Check layouts, links, keyboard use, accessibility and image behavior.                        |
| Vercel, with Netlify configuration available | Hosts the generated pages; the site currently deploys through Vercel.                        |

Analytics is prepared in the code but remains off until it is explicitly configured with the matching privacy information. The patient-facing email and external booking links are separate from the account used to manage hosting and search tools.

## Run locally

Requires Node.js 22.12+ and npm. The committed `package-lock.json` fixes dependency versions.

```sh
npm ci
npm run dev
```

Open the local address printed by Astro (normally `http://127.0.0.1:4321`).

```sh
npm run build     # Optimize local photos, check types, generate static HTML
npm run preview   # Serve the generated dist/ folder
npm run qa        # Browser checks against http://127.0.0.1:4321
npm run qa:seo    # Care-guide layouts, links, metadata and indexing checks
npm run qa:performance # Responsive image sharpness, fonts and scroll behavior
npm run format    # Format the source and documentation
```

Install the QA browser once with `npx playwright install chromium`. Set `QA_URL` to test another local preview address. No credentials or environment variables are required to run the site locally.

## Architecture

| Location                                                  | Responsibility                                                                            |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `src/pages/index.astro`                                   | French route, default language                                                            |
| `src/pages/en/index.astro`                                | English route                                                                             |
| `src/pages/lb/index.astro`                                | Luxembourgish route                                                                       |
| `src/pages/{medecin,expertises,cabinet,contact}.astro`    | French detail pages                                                                       |
| `src/pages/en/{doctor,expertise,practice,contact}.astro`  | English detail pages                                                                      |
| `src/pages/lb/{dokter,leeschtungen,praxis,kontakt}.astro` | Luxembourgish detail pages                                                                |
| `src/layouts/BaseLayout.astro`                            | Document metadata, self-hosted fonts, shared header/footer                                |
| `src/components/`                                         | Small semantic sections and shared image/CTA controls                                     |
| `src/config/practice.ts`                                  | Business facts, booking/profile URLs, directions, review counts and image slots           |
| `src/config/site.mjs`                                     | Production origin and environment-aware indexing settings                                 |
| `src/config/seo.ts`                                       | Localized route inventory, canonical/hreflang URLs and structured data                    |
| `src/content/translations.ts`                             | Shared locale types, routes, FR/EN copy and accessible labels                             |
| `src/content/luxembourgish.ts`                            | Luxembourgish copy and accessible labels                                                  |
| `src/content/care-guides.ts`                              | Three patient guides in three languages, including primary medical source links           |
| `src/scripts/language-navigation.ts`                      | Preserves the reading position when changing languages                                    |
| `src/styles/global.css`                                   | Documented CSS layers: reset, base tokens, components, responsive overrides               |
| `src/scripts/interactions.ts`                             | Mobile navigation, language anchors, native photo dialog, fallback and restrained reveals |
| `Photos/`                                                 | Approved project photo sources, kept as provided                                          |
| `public/images/`                                          | Optimized local AVIF and WebP images generated from those sources                         |
| `scripts/prepare-images.mjs`                              | Repeatable image optimization and automatic dimension metadata                            |
| `scripts/qa.mjs`                                          | Responsive, accessibility, links, gallery, keyboard and fallback checks                   |
| `scripts/qa-seo.mjs`                                      | Localized guide layouts, navigation, metadata, schema and discovery checks                |
| `scripts/submit-indexnow.mjs`                             | Explicit post-deployment URL submission to participating IndexNow search engines          |
| `.env.example`                                            | Optional production origin, indexing and search-property verification configuration       |
| `docs/CONTENT-SOURCES.md`                                 | Factual provenance, source conflicts and supplied-claim limits                            |
| `docs/QA.md`                                              | Verification scope and limitations                                                        |

Astro generates complete static HTML for all three languages. Literata and Plus Jakarta Sans are bundled locally. There is no frontend framework runtime, booking backend, database, form collection, active analytics, external font request, or custom authentication. The contact page embeds Google Maps; core reading and booking remain available without JavaScript.

## Replace photographs

Replace the matching original in `Photos/`, keeping its filename, then run `npm run build`. Image variants and source dimensions regenerate automatically.

The six original photo slots use 480, 640, 800, 960 and 1600-pixel WebP variants, capped at the source resolution. The two heavier outdoor photo slots also offer smaller AVIF files; browsers select a supported format through a native `picture` element, with WebP as the fallback. The approved entrance crop (`Img-7.png`) produces one 751 × 616 WebP image and is not enlarged. Download hints in `src/config/photo-sizes.ts` match the other photo layouts and cover crops; run `npm run qa:performance` after replacing a photograph to check its resolution. Self-hosted font declarations retain the original Latin and Latin-ext variable files for all three site languages.

| Original    | Slot                   | Use                                |
| ----------- | ---------------------- | ---------------------------------- |
| `Img-6.png` | `streetReference`      | Homepage hero street view          |
| `Img-5.png` | `exteriorWide`         | Previous panoramic hero (retained) |
| `Img-1.png` | `consultation`         | Doctor section, consultation space |
| `Img-4.png` | `exterior`             | Gallery and location               |
| `Img-2.png` | `examination`          | Examination room gallery           |
| `Img-3.png` | `examinationAlternate` | Alternate room view                |
| `Img-7.png` | `entrance-detail`      | Practice arrival photo             |

## Customize content

Edit facts and external destinations in `src/config/practice.ts`. Edit French and English copy in `src/content/translations.ts`, and Luxembourgish copy in `src/content/luxembourgish.ts`. All three dictionaries share one TypeScript shape, so content additions must be translated in each. Patient guides and their source links live in `src/content/care-guides.ts`. The doctor or a fluent Luxembourgish reviewer should approve the final medical wording before public handoff; no doctor review is claimed for the new guides.

## Search metadata and indexing

The source defines 30 localized page routes: five main pages, two legal/privacy pages and three patient guides in each language. The guides cover an eye consultation, glasses and contact lenses, and cataracts, with links from the care overview. Pages have localized titles and descriptions, canonical and alternate-language URLs, Open Graph/Twitter metadata using a supplied examination-room photograph, and structured data. The JSON-LD connects the practice (`Physician`), doctor (`Person`), website (`WebSite`), pages including `MedicalWebPage`, and breadcrumbs. Medical guides cite their visible primary sources in the structured data. Conflicting opening hours, precise age eligibility, ratings and spoken Luxembourgish are excluded from the structured data.

The `/robots.txt` and `/sitemap.xml` endpoints are generated with the configured production origin. Production indexing is enabled by default, as authorized by the user. Preview and development environments use `noindex, follow`; `PUBLIC_SITE_INDEXABLE=false` can explicitly keep production non-indexable. `PUBLIC_SITE_ORIGIN` selects the canonical origin, with the existing stable Vercel address as the fallback.

Patient-facing copy uses the public practice profiles and official professional register. There are no demonstration footers, empty credential/photo panels or editorial instructions on the public pages. The existing patient-count claim and supplied rating snapshot retain `data-nosnippet` controls. These do not establish accuracy or guarantee omission by every search engine. Analytics preparation is inactive by default; no tracking tag is loaded without its configuration.

See `docs/QA.md` for verification scope and limits. No search-engine submission or webmaster-account setup is implied by a successful local build.

## Before production handoff

The doctor's final review should cover the published hours, service wording, supplied review/patient-count claims, photo permissions and legal/privacy accuracy. See `docs/CONTENT-SOURCES.md` for evidence and conflicts. The doctor biography uses supported Besançon training and hospital roles, with an official registration link. No unsupported years, awards, publications, machine models or onsite surgery claims have been created.

Production indexing is authorized in code. Legal and privacy pages are available in all three languages. Before handover, resolve the actual hosting account's business-use/data-processing arrangements and retain an operator review of the notices. A formal authorization identifier or specialist-title document has not been invented. When the final stable free or paid address is selected, set `PUBLIC_SITE_ORIGIN`, configure any hostname redirects, verify the search property and submit its sitemap. Google Business Profile changes require the existing profile's account access; do not create a duplicate listing.

The patient contact email is unchanged. A separate administrative Gmail can own hosting, Search Console and analytics. The prepared GA4 integration requires a valid `PUBLIC_GA_MEASUREMENT_ID` and `PUBLIC_GA_PRIVACY_NOTICE_READY=true` after all three privacy notices describe the active setup. The build rejects incomplete activation settings. With the ID blank, the consent panel, analytics stylesheet and script are omitted. When configured, the Google tag loads only after acceptance, with advertising consent denied; the footer provides a choice/withdrawal control. Events use generic page groups and CTA types, a generic page location/title and only the referrer's origin. Confirm the stream settings, consent behavior and reporting before activating it. If hosting moves to Netlify, update the provider disclosures when the move occurs.

Google Maps uses the original direct embed on the contact page, with native lazy loading and no added consent or hide-map controls. The privacy page describes this automatic connection to Google. `npm run qa:legal` checks the built legal pages and map integration without requesting the live Google service; it starts and stops its own temporary static server.

## Deploy to Vercel

The project currently deploys through Vercel. For a new deployment or a review of its settings, use:

| Setting          | Value           |
| ---------------- | --------------- |
| Framework Preset | Astro           |
| Build Command    | `npm run build` |
| Output Directory | `dist`          |
| Node.js Version  | 22.x            |

**Optional environment variables:** use `.env.example` as a reference. The site can build without search-property credentials.

| Key                        | Purpose                                                            |
| -------------------------- | ------------------------------------------------------------------ |
| `PUBLIC_SITE_ORIGIN`       | Final production origin; defaults to the stable Vercel origin      |
| `PUBLIC_SITE_INDEXABLE`    | Production indexing defaults to `true`; set `false` to opt out     |
| `GOOGLE_SITE_VERIFICATION` | Optional HTML verification token supplied by Google Search Console |
| `BING_SITE_VERIFICATION`   | Optional HTML verification token supplied by Bing Webmaster Tools  |

Vercel auto-deploys on every push to `main`. The repository may remain private; Vercel retains OAuth access regardless of repository visibility.

After deployment, the account owner can create the relevant Google Search Console and Bing Webmaster Tools properties, set the supplied verification values, redeploy and finish verification. Submit the production sitemap through those services. Merely adding an environment-variable name does not create or verify a property.

The optional `npm run seo:submit` command submits the production routes through IndexNow. Its public ownership key file must be deployed with the site before submission. Run it only after the intended production pages and ownership file are publicly available; it was not run during this implementation. Search engines decide whether and when to index submitted URLs, and submission does not guarantee rankings.
