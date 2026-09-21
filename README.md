# Ophtalmo Luxembourg

A complete French/English demonstration for the Mamer ophthalmology practice of **Dr M’Hamed EL HIRECH**. The local demo uses the supplied real photographs and verified practice information. Doctena remains the primary booking route, with Doctipro offered as a secondary option for Mamer.

## Run locally

Requires Node.js 22.12+ and npm. The committed `package-lock.json` fixes dependency versions.

```sh
npm ci
npm run dev
```

Open the local address printed by Astro (normally `http://127.0.0.1:4321`). Astro 7 may retain its development process; use `npx astro dev status` and `npx astro dev stop` to inspect/stop it.

```sh
npm run build     # Optimize local photos, check types, generate static HTML
npm run preview   # Serve the generated dist/ folder
npm run qa        # Browser checks against http://127.0.0.1:4321
npm run format    # Format the source and documentation
```

Install the QA browser once with `npx playwright install chromium`. Set `QA_URL` to test another local preview address. No credentials or environment variables are required to run the website.

## Architecture

| Location                       | Responsibility                                                                                  |
| ------------------------------ | ----------------------------------------------------------------------------------------------- |
| `src/pages/index.astro`        | French route, default language                                                                  |
| `src/pages/en/index.astro`     | English route                                                                                   |
| `src/layouts/BaseLayout.astro` | Document metadata, self-hosted fonts, shared header/footer                                      |
| `src/components/`              | Small semantic sections and shared image/CTA controls                                           |
| `src/config/practice.ts`       | Business facts, booking/profile URLs, directions, review counts, image slots, deployment origin |
| `src/content/translations.ts`  | All FR/EN copy, accessible labels, photo descriptions and review excerpts                       |
| `src/styles/global.css`        | Documented CSS layers: reset, base tokens, components, responsive overrides                     |
| `src/scripts/interactions.ts`  | Mobile navigation, language anchors, native photo dialog, fallback and restrained reveals       |
| `Photos/`                      | Original supplied photographs; retained without alteration                                      |
| `public/images/`               | Optimized local WebP variants generated from the originals                                      |
| `scripts/prepare-images.mjs`   | Repeatable image optimization and automatic dimension metadata                                  |
| `scripts/qa.mjs`               | Responsive, accessibility, links, gallery, keyboard and fallback checks                         |
| `docs/CONTENT-SOURCES.md`      | Factual provenance and doctor-confirmation items                                                |
| `docs/QA.md`                   | Verification scope and limitations                                                              |

Astro generates complete HTML for both languages. There is no frontend framework runtime, booking backend, database, form collection, analytics, external font request, embedded map, or custom authentication. Core reading and booking remain available without JavaScript. On mobile the footer supplies section links when JavaScript is unavailable.

`VisitFaq.astro` sits between the appointment and contact sections. Its native `<details>` elements support keyboard and touch interaction without JavaScript. FAQ copy lives in `translations.ts`; the location answer uses the shared practice address. Professional profile links sit beneath the doctor's qualifications. Doctipro destinations are localized and explicitly select the Mamer practice using `hospital=90`.

## Replace photographs

Replace the matching original in `Photos/`, keeping its filename, then run `npm run build`. Image variants and source dimensions regenerate automatically; component edits are unnecessary. Keep authentic source attribution when supplied. No generated people or stock images are used.

| Original    | Slot                   | Use                                |
| ----------- | ---------------------- | ---------------------------------- |
| `Img-5.png` | `exteriorWide`         | Panoramic hero                     |
| `Img-1.png` | `consultation`         | Doctor section, consultation space |
| `Img-4.png` | `exterior`             | Gallery and location               |
| `Img-2.png` | `examination`          | Examination room gallery           |
| `Img-3.png` | `examinationAlternate` | Alternate room view                |

The gallery opens complete photos, including the original visible Google Maps attribution. Responsive layout crops the exterior photograph where necessary; no retouching or material alteration is performed. A missing image keeps its reserved dimensions and shows a translated message.

## Customize content

Edit facts and external destinations in `src/config/practice.ts`. Edit language-specific copy in `src/content/translations.ts`; English must satisfy the same TypeScript shape as French. Add another locale to `locales`, supply its dictionary, and add its static route. Language links preserve the current section.

The exact requested Doctena practitioner link is retained for the primary appointment CTAs. A clearly labelled secondary Doctipro link appears in the appointment section. Do not substitute generic platform homepages or other practice locations. Reviews are the two supplied written testimonials; the separate total count remains three.

## Before a public launch

Confirm the doctor’s preferred displayed name, qualifications and surgical-service wording; final Doctena destination; rights to use all photography and identification of the correct facade/entrance; current Google rating/count and original French review wording; and the final domain, legal notice and applicable privacy information. No hours, parking claims or access claims have been invented. See `docs/CONTENT-SOURCES.md` for details.

The demo remains `noindex` until the doctor approves the content. Canonical, Open Graph and language-alternate URLs use Netlify's deployment URL when built there and fall back to localhost during local development. After client confirmation, update the origin if a custom domain is selected, decide indexing, replace the demonstration footer wording, and add the real approved legal/privacy content. No fake legal links are present.

## Deploy to Netlify

The repository includes `netlify.toml`, which sets the build command to `npm run build` and the publish directory to `dist`. Import the GitHub repository into Netlify, keep the production branch as `main`, and publish. The generated `*.netlify.app` URL can be shared with the doctor; the GitHub repository can remain private because source visibility and deployed-site visibility are separate settings. See `docs/QA.md` and `docs/CONTENT-SOURCES.md` for verification and factual handoff notes.
