# Ophtalmo Luxembourg

A French, English and Luxembourgish website for the Mamer ophthalmology practice of **Dr M'Hamed EL HIRECH**. The site uses real supplied photographs and practice information sourced from public profiles. Doctena is the primary booking route; Doctipro is offered as a secondary option for Mamer.

The deployed site is publicly accessible. Repository visibility and deployed-site visibility are independent.

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

| Location                                                  | Responsibility                                                                                  |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `src/pages/index.astro`                                   | French route, default language                                                                  |
| `src/pages/en/index.astro`                                | English route                                                                                   |
| `src/pages/lb/index.astro`                                | Luxembourgish route                                                                             |
| `src/pages/{medecin,expertises,cabinet,contact}.astro`    | French detail pages                                                                             |
| `src/pages/en/{doctor,expertise,practice,contact}.astro`  | English detail pages                                                                            |
| `src/pages/lb/{dokter,leeschtungen,praxis,kontakt}.astro` | Luxembourgish detail pages                                                                      |
| `src/layouts/BaseLayout.astro`                            | Document metadata, self-hosted fonts, shared header/footer                                      |
| `src/components/`                                         | Small semantic sections and shared image/CTA controls                                           |
| `src/config/practice.ts`                                  | Business facts, booking/profile URLs, directions, review counts and image slots                 |
| `src/config/site.mjs`                                     | Production origin and environment-aware indexing settings                                      |
| `src/config/seo.ts`                                       | Localized route inventory, canonical/hreflang URLs and structured data                          |
| `src/content/translations.ts`                             | Shared locale types, routes, FR/EN copy and accessible labels                                   |
| `src/content/luxembourgish.ts`                            | Luxembourgish copy and accessible labels                                                        |
| `src/content/care-guides.ts`                              | Three patient guides in three languages, including primary medical source links                |
| `src/scripts/language-navigation.ts`                      | Preserves the reading position when changing languages                                          |
| `src/styles/global.css`                                   | Documented CSS layers: reset, base tokens, components, responsive overrides                     |
| `src/scripts/interactions.ts`                             | Mobile navigation, language anchors, native photo dialog, fallback and restrained reveals       |
| `Photos/`                                                 | Original supplied photographs; retained without alteration                                      |
| `public/images/`                                          | Optimized local WebP variants generated from the originals                                      |
| `scripts/prepare-images.mjs`                              | Repeatable image optimization and automatic dimension metadata                                  |
| `scripts/qa.mjs`                                          | Responsive, accessibility, links, gallery, keyboard and fallback checks                         |
| `scripts/qa-seo.mjs`                                      | Localized guide layouts, navigation, metadata, schema and discovery checks                       |
| `scripts/submit-indexnow.mjs`                             | Explicit post-deployment URL submission to participating IndexNow search engines                |
| `.env.example`                                            | Optional production origin, indexing and search-property verification configuration            |
| `docs/CONTENT-SOURCES.md`                                 | Factual provenance and doctor-confirmation items                                                |
| `docs/QA.md`                                              | Verification scope and limitations                                                              |

Astro generates complete static HTML for all three languages. Literata and Plus Jakarta Sans are bundled locally. There is no frontend framework runtime, booking backend, database, form collection, analytics, external font request, or custom authentication. The contact page embeds Google Maps; core reading and booking remain available without JavaScript.

## Replace photographs

Replace the matching original in `Photos/`, keeping its filename, then run `npm run build`. Image variants and source dimensions regenerate automatically.

Photos use 480, 640, 800, 960 and 1600-pixel WebP variants at the same quality setting, capped at the original resolution. Download hints in `src/config/photo-sizes.ts` match the current layout and cover crops; run `npm run qa:performance` after replacing a photograph to check its resolution. Self-hosted font declarations retain the original Latin and Latin-ext variable files for all three site languages.

| Original    | Slot                   | Use                                |
| ----------- | ---------------------- | ---------------------------------- |
| `Img-6.png` | `streetReference`      | Homepage hero street view          |
| `Img-5.png` | `exteriorWide`         | Previous panoramic hero (retained) |
| `Img-1.png` | `consultation`         | Doctor section, consultation space |
| `Img-4.png` | `exterior`             | Gallery and location               |
| `Img-2.png` | `examination`          | Examination room gallery           |
| `Img-3.png` | `examinationAlternate` | Alternate room view                |

## Customize content

Edit facts and external destinations in `src/config/practice.ts`. Edit French and English copy in `src/content/translations.ts`, and Luxembourgish copy in `src/content/luxembourgish.ts`. All three dictionaries share one TypeScript shape, so content additions must be translated in each. Patient guides and their source links live in `src/content/care-guides.ts`. The doctor or a fluent Luxembourgish reviewer should approve the final medical wording before public handoff; no doctor review is claimed for the new guides.

## Search metadata and indexing (1 October 2026)

The source now defines 24 localized page routes: the five existing pages and three patient guides in each language. The guides cover an eye consultation, glasses and contact lenses, and cataracts, with links from the care overview. Pages have localized titles and descriptions, canonical and alternate-language URLs, Open Graph/Twitter metadata using a supplied examination-room photograph, and appropriate structured data. The JSON-LD connects the practice (`Physician`), doctor (`Person`), website (`WebSite`), pages including `MedicalWebPage`, and breadcrumbs. Unconfirmed opening hours, age eligibility, ratings and spoken Luxembourgish are excluded from the new structured data.

The `/robots.txt` and `/sitemap.xml` endpoints are generated with the configured production origin. Production indexing is enabled by default, as authorized by the user. Preview and development environments use `noindex, follow`; `PUBLIC_SITE_INDEXABLE=false` can explicitly keep production non-indexable. `PUBLIC_SITE_ORIGIN` selects the canonical origin, with the existing stable Vercel address as the fallback.

Draft facts and evidence placeholders remain visible. Applicable draft content uses `data-nosnippet` to limit its use in Google search snippets. This does not validate the content, remove it from indexing, or guarantee that every search engine will omit it. No tracking or analytics was added.

The user subsequently authorized release verification on 1 October 2026. The production build passes with zero errors, warnings or hints and generates all 24 pages. The core browser suite passes 94 checks and the SEO/guide suite passes 90 checks against the built preview. The nine guides were also visually reviewed at phone, tablet and laptop sizes. The review corrected sharing-image metadata types, narrow-phone guide headings and several Luxembourgish grammar/spelling issues. See `docs/QA.md` for coverage and limits. No search-engine submission or webmaster-account setup was performed.

## Before production handoff

Confirm the doctor's preferred displayed name, qualifications and surgical-service wording; final booking destinations; opening hours and exact entrance; rights to use all photography; current Google rating/count and original French review wording; and the final domain, legal notice and applicable privacy information. See `docs/CONTENT-SOURCES.md` for details.

The user has authorized production indexing in code; doctor confirmation of the remaining factual items is still outstanding. Choose the final domain, set `PUBLIC_SITE_ORIGIN` if it changes, configure domain redirects, replace the demonstration footer wording and add the approved legal/privacy content. Google Business Profile ownership and practice details require a separate account-owner update.

## Deploy to Vercel

The project is connected to Vercel with the following configuration:

| Setting          | Value                           |
| ---------------- | ------------------------------- |
| Framework Preset | Astro                           |
| Build Command    | `npm run images && astro build` |
| Output Directory | `dist`                          |
| Node.js Version  | 22.x                            |

**Optional environment variables:** use `.env.example` as a reference. The site can build without search-property credentials.

| Key                        | Purpose                                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| `PUBLIC_SITE_ORIGIN`       | Final production origin; defaults to the stable Vercel origin                                    |
| `PUBLIC_SITE_INDEXABLE`    | Production indexing defaults to `true`; set `false` to opt out                                    |
| `GOOGLE_SITE_VERIFICATION` | Optional HTML verification token supplied by Google Search Console                               |
| `BING_SITE_VERIFICATION`   | Optional HTML verification token supplied by Bing Webmaster Tools                                |

Vercel auto-deploys on every push to `main`. The repository may remain private; Vercel retains OAuth access regardless of repository visibility.

After deployment, the account owner can create the relevant Google Search Console and Bing Webmaster Tools properties, set the supplied verification values, redeploy and finish verification. Submit the production sitemap through those services. Merely adding an environment-variable name does not create or verify a property.

The optional `npm run seo:submit` command submits the production routes through IndexNow. Its public ownership key file must be deployed with the site before submission. Run it only after the intended production pages and ownership file are publicly available; it was not run during this implementation. Search engines decide whether and when to index submitted URLs, and submission does not guarantee rankings.
