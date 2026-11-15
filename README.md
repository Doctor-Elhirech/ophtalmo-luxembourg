# Ophtalmo Luxembourg

A website for Dr M’Hamed EL HIRECH’s ophthalmology practice in Mamer, Luxembourg. It provides practice information, eye care guides, contact details and links to book through Doctena or Doctipro. The site is available in French, English and Luxembourgish.

**Website:** [ophtalmo-luxembourg.vercel.app](https://ophtalmo-luxembourg.vercel.app/)

**Repository:** [Doctor-Elhirech/ophtalmo-luxembourg](https://github.com/Doctor-Elhirech/ophtalmo-luxembourg)

**Hosting:** Vercel · **Framework:** Astro · **Production branch:** `main`

## Getting started

To run the website on your computer, install [Git](https://git-scm.com/) and Node.js 22.12 or newer, which includes npm. Then open a terminal and run:

```sh
git clone https://github.com/Doctor-Elhirech/ophtalmo-luxembourg.git
cd ophtalmo-luxembourg
npm ci
npm run dev
```

The repository is private, so sign in to a GitHub account that has access when prompted. Open the local address shown in the terminal, normally `http://127.0.0.1:4321`. Press **Ctrl+C** in the terminal to stop the local site.

## Making changes

1. Update your local copy with `git pull` while on the `main` branch.
2. Edit the relevant files using the guide below. Review text changes in all three languages.
3. Run `npm run dev` and inspect the affected pages on different screen sizes. Use `npm run build` to check the project and generate the production site.
4. Review your changes with `git status` and `git diff`. Commit and push approved changes to GitHub.
5. Check the deployment in Vercel and confirm the live website after it reports **Ready**.

Vercel is connected to the repository’s `main` branch. A push to that branch is intended to trigger a production deployment. Check the deployment status after pushing, as permissions and account settings can affect automatic deployments.

## Where to find things

| What to update | Location |
| --- | --- |
| Practice details, phone number, email, booking links and review links | `src/config/practice.ts` |
| French and English website text | `src/content/translations.ts` |
| Luxembourgish website text | `src/content/luxembourgish.ts` |
| Patient guides in all three languages | `src/content/care-guides.ts` |
| Legal and privacy notices | `src/content/legal.ts` |
| Page routes | `src/pages/` |
| Page sections and the WhatsApp form | `src/components/` |
| Layout, navigation and metadata | `src/layouts/BaseLayout.astro` and `src/config/seo.ts` |
| Styling | `src/styles/` |
| Original and optimized photos | `Photos/` and `public/images/` |

The WhatsApp form opens a prepared message in WhatsApp. The visitor reviews it and presses Send there. Online bookings are completed on the external booking platforms.

## Updating photographs

Replace the appropriate original file in `Photos/`, keeping its filename. Run `npm run build` to regenerate optimized images and image metadata, then review the resulting changes and the site’s photo layouts before committing.

| File | Photograph |
| --- | --- |
| `Img-1.png` | Consultation space |
| `Img-2.png` | Examination room |
| `Img-3.png` | Alternate examination room view |
| `Img-4.png` | Practice exterior |
| `Img-5.png` | Panoramic exterior |
| `Img-6.png` | Street view on the homepage |
| `Img-7.png` | Building entrance |

## Checks and commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development site |
| `npm run build` | Prepare images, check Astro files and build the site |
| `npm run preview` | Serve the built site locally |
| `npm run qa` | Run browser checks for the main pages |
| `npm run qa:seo` | Check localized guides and search metadata |
| `npm run qa:legal` | Check legal pages and the map integration |
| `npm run qa:performance` | Check responsive images, fonts and interactions |

Browser checks require Playwright’s Chromium browser. Install it with `npx playwright install chromium`. The main, SEO and performance checks use a running local site at `http://127.0.0.1:4321` by default. For another address, set `QA_URL`. The legal check starts its own local server. See [docs/QA.md](docs/QA.md) for the scope and limitations of the checks.

## Hosting, analytics and search

The live site is hosted on Vercel. Its production deployment uses the `main` branch and the original `ophtalmo-luxembourg.vercel.app` address. The additional `ophta-vision-mamer.vercel.app` address redirects to it.

Production uses the following Vercel environment variables. `.env.example` documents the available options for local configuration.

| Variable | Purpose |
| --- | --- |
| `PUBLIC_SITE_ORIGIN` | The live origin used for canonical URLs and the sitemap |
| `PUBLIC_SITE_INDEXABLE` | Controls production indexing. Use `true` for the live site |
| `PUBLIC_GA_MEASUREMENT_ID` | Connects the site to its Google Analytics 4 web stream |
| `PUBLIC_GA_PRIVACY_NOTICE_READY` | Enables the configured analytics consent flow when set to `true` |
| `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION` | Optional verification tokens when required by those services |

Changes to Vercel environment variables require a new deployment to take effect. Development and Vercel preview builds are marked `noindex`. The live sitemap is available at [sitemap.xml](https://ophtalmo-luxembourg.vercel.app/sitemap.xml).

Google Analytics is configured on the live site. Visitors can accept or refuse measurement and change their choice through the footer. Check visits in the **Ophtalmo Luxembourg** property in Google Analytics. Search performance and indexing can be reviewed in Google Search Console.

If the public domain changes, update the production origin and domain redirects, review the analytics and privacy settings, and verify the new address in Search Console. Keep the former address and its redirects available during the transition.

## Content and maintenance

Review changes to medical information, practice hours, booking links, photographs and legal notices with the practice before publishing. The source notes in [docs/CONTENT-SOURCES.md](docs/CONTENT-SOURCES.md) record the evidence and limitations for practice information. Google reviews displayed on the site are selected excerpts with links to their sources, while the current review listing is available through Google Maps.
