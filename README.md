# Ophtalmo Luxembourg

A complete French/English demonstration for the Mamer ophthalmology practice of **Dr M’Hamed EL HIRECH**. The private demo uses the supplied real photographs, verified practice information, and Doctena for all appointments.

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

| Location                       | Responsibility                                                                             |
| ------------------------------ | ------------------------------------------------------------------------------------------ |
| `src/pages/index.astro`        | French route, default language                                                             |
| `src/pages/en/index.astro`     | English route                                                                              |
| `src/layouts/BaseLayout.astro` | Document metadata, self-hosted fonts, shared header/footer                                 |
| `src/components/`              | Small semantic sections and shared image/CTA controls                                      |
| `src/config/practice.ts`       | Business facts, **Doctena URL**, directions, review counts, image slots, deployment origin |
| `src/content/translations.ts`  | All FR/EN copy, accessible labels, photo descriptions and review excerpts                  |
| `src/styles/global.css`        | Documented CSS layers: reset, base tokens, components, responsive overrides                |
| `src/scripts/interactions.ts`  | Mobile navigation, language anchors, native photo dialog, fallback and restrained reveals  |
| `Photos/`                      | Original supplied photographs; retained without alteration                                 |
| `public/images/`               | Optimized local WebP variants generated from the originals                                 |
| `scripts/prepare-images.mjs`   | Repeatable image optimization and automatic dimension metadata                             |
| `scripts/qa.mjs`               | Responsive, accessibility, links, gallery, keyboard and fallback checks                    |
| `docs/PROGRESS.md`             | Session continuity and current delivery status                                             |
| `docs/CONTENT-SOURCES.md`      | Factual provenance and doctor-confirmation items                                           |
| `docs/QA.md`                   | Verification scope and limitations                                                         |

Astro generates complete HTML for both languages. There is no frontend framework runtime, booking backend, database, form collection, analytics, external font request, embedded map, or custom authentication. Core reading and booking remain available without JavaScript. On mobile the footer supplies section links when JavaScript is unavailable.

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

The exact requested Doctena practitioner link is used for every appointment CTA. Do not substitute the generic Doctena homepage. Reviews are the two supplied written testimonials; the separate total count remains three.

## Before a public launch

Confirm the doctor’s preferred displayed name, qualifications and surgical-service wording; final Doctena destination; rights to use all photography and identification of the correct facade/entrance; current Google rating/count and original French review wording; and the final domain, legal notice and applicable privacy information. No hours, parking claims or access claims have been invented. See `docs/CONTENT-SOURCES.md` for details.

The demo is deliberately private and `noindex`. After client confirmation, update `siteSettings.origin`, decide indexing, replace the demonstration footer wording, and add the real approved legal/privacy content. No fake legal links are present. Open Graph text, canonical URLs and language alternatives are prepared; an unrequested sharing image has not been fabricated.

## Local-only delivery and continuity

The complete portable static build is in `dist/`. This checkout is configured for local-only review and contains no Sites connector configuration. The local preview is currently stopped. To review in a normal browser, open PowerShell in this folder and run `npm run dev`, then visit the printed `http://127.0.0.1:4321/` address. The site itself stays on the laptop until you explicitly approve a hosting destination.

During the previous build session, an unintended owner-private Sites preview was created at `https://ophtalmo-luxembourg-mamer-demo.bokhtiyarhossainnilo.chatgpt.site`. It was never made public or indexed. Local hosting is now stopped and no future publish will be attempted. The available Sites connector exposes no deletion operation in this session, so the private preview remains an isolated owner-only deployment until it expires or is removed from the Sites account controls. It is not part of the local build or its current configuration.

Read `docs/PROGRESS.md` first when resuming. No automated wakeup or scheduled continuation has been created.
