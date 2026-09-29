# Ophtalmo Luxembourg

A bilingual French/English website for the Mamer ophthalmology practice of **Dr M'Hamed EL HIRECH**. The site uses real supplied photographs and verified practice information. Doctena is the primary booking route; Doctipro is offered as a secondary option for Mamer.

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
npm run format    # Format the source and documentation
```

Install the QA browser once with `npx playwright install chromium`. Set `QA_URL` to test another local preview address. No credentials or environment variables are required to run the site locally.

## Architecture

| Location                                                 | Responsibility                                                                                  |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `src/pages/index.astro`                                  | French route, default language                                                                  |
| `src/pages/en/index.astro`                               | English route                                                                                   |
| `src/pages/{medecin,expertises,cabinet,contact}.astro`   | French detail pages                                                                             |
| `src/pages/en/{doctor,expertise,practice,contact}.astro` | English detail pages                                                                            |
| `src/layouts/BaseLayout.astro`                           | Document metadata, self-hosted fonts, shared header/footer                                      |
| `src/components/`                                        | Small semantic sections and shared image/CTA controls                                           |
| `src/config/practice.ts`                                 | Business facts, booking/profile URLs, directions, review counts, image slots, deployment origin |
| `src/content/translations.ts`                            | All FR/EN copy, accessible labels, photo descriptions and review excerpts                       |
| `src/styles/global.css`                                  | Documented CSS layers: reset, base tokens, components, responsive overrides                     |
| `src/scripts/interactions.ts`                            | Mobile navigation, language anchors, native photo dialog, fallback and restrained reveals       |
| `Photos/`                                                | Original supplied photographs; retained without alteration                                      |
| `public/images/`                                         | Optimized local WebP variants generated from the originals                                      |
| `scripts/prepare-images.mjs`                             | Repeatable image optimization and automatic dimension metadata                                  |
| `scripts/qa.mjs`                                         | Responsive, accessibility, links, gallery, keyboard and fallback checks                         |
| `docs/CONTENT-SOURCES.md`                                | Factual provenance and doctor-confirmation items                                                |
| `docs/QA.md`                                             | Verification scope and limitations                                                              |

Astro generates complete static HTML for both languages. There is no frontend framework runtime, booking backend, database, form collection, analytics, external font request, or custom authentication. The contact page embeds Google Maps; core reading and booking remain available without JavaScript.

## Replace photographs

Replace the matching original in `Photos/`, keeping its filename, then run `npm run build`. Image variants and source dimensions regenerate automatically.

| Original    | Slot                   | Use                                |
| ----------- | ---------------------- | ---------------------------------- |
| `Img-6.png` | `streetReference`      | Homepage hero street view          |
| `Img-5.png` | `exteriorWide`         | Previous panoramic hero (retained) |
| `Img-1.png` | `consultation`         | Doctor section, consultation space |
| `Img-4.png` | `exterior`             | Gallery and location               |
| `Img-2.png` | `examination`          | Examination room gallery           |
| `Img-3.png` | `examinationAlternate` | Alternate room view                |

## Customize content

Edit facts and external destinations in `src/config/practice.ts`. Edit language-specific copy in `src/content/translations.ts`; English must satisfy the same TypeScript shape as French. Add another locale to `locales`, supply its dictionary, and add its static route.

## Before production handoff

Confirm the doctor's preferred displayed name, qualifications and surgical-service wording; final booking destinations; opening hours and exact entrance; rights to use all photography; current Google rating/count and original French review wording; and the final domain, legal notice and applicable privacy information. See `docs/CONTENT-SOURCES.md` for details.

The site remains `noindex` until the doctor approves the content. After client confirmation, update `PUBLIC_SITE_ORIGIN` in Vercel environment variables if a custom domain is selected, enable indexing, replace the demonstration footer wording, and add the approved legal/privacy content.

## Deploy to Vercel

The project is connected to Vercel with the following configuration:

| Setting          | Value                           |
| ---------------- | ------------------------------- |
| Framework Preset | Astro                           |
| Build Command    | `npm run images && astro build` |
| Output Directory | `dist`                          |
| Node.js Version  | 22.x                            |

**Environment variable required:**

| Key                  | Value                           |
| -------------------- | ------------------------------- |
| `PUBLIC_SITE_ORIGIN` | Production domain or Vercel URL |

Vercel auto-deploys on every push to `main`. The repository may remain private; Vercel retains OAuth access regardless of repository visibility.
