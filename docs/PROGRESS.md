# Build continuity

## Objective

Complete a premium French/English demonstration for Ophtalmo Luxembourg, with authentic supplied photos and verified information. Brief: `.codex/attachments/8c143c9b-f98e-4926-b482-29f4af9f6b37/Pasted text.txt` in the user's home.

## Decisions

- Astro static generation + strict TypeScript. No application framework shipped to browser, backend, account, CMS, or custom booking.
- French `/`, English `/en/`. Shared translated content and components; language links retain section anchors.
- Visual thesis: an editorial study in attention. Newsreader serif, Manrope sans, chalk and deep forest, genuine architectural photography.
- Keep the exact supplied Doctena URL for primary booking links. The user approved a separate Doctipro option for Mamer on 21 September 2026; confirm both services with the doctor before launch.
- Do not invent a portrait, hours, parking, outcomes, statistics, qualifications, or third written review.
- Work locally. Do not publish or deploy without the user's explicit approval.

## Latest additions — 21 September 2026

- Added Doctena and Doctipro professional-profile links below the doctor's qualifications.
- Added a secondary Doctipro booking link in the appointment section; its FR/EN destinations both select the Mamer practice.
- Added `VisitFaq.astro` between the appointment and contact sections. Four translated native disclosures cover booking, location, languages and contact, with no added JavaScript or dependencies.
- Kept the established forest/paper palette, typefaces, understated links and mobile layout. Earlier navbar, language-switch, footer typography and back-to-top refinements remain in place.
- Added language/booking source notes and discrepancies to `docs/CONTENT-SOURCES.md`. French practice listings, travel claims, new treatments, ages and hours remain deferred for doctor confirmation.
- Expanded `scripts/qa.mjs` to cover localized external links, FAQ keyboard interaction, expanded-state accessibility, no-JavaScript disclosures and dedicated section screenshots.
- Validation: `npm run build` passed with zero diagnostics; `npm run qa` passed all 17 checks with zero failures. Both languages were checked at 375/768/1024/1440/1920 pixels; new sections were visually reviewed on desktop and mobile, including expanded FAQ answers. See `qa/report.json` and `docs/QA.md` for scope.
- The local dev server was restarted after stopping during verification and is running at `http://127.0.0.1:4321/` for user review. Check its status before starting another server. No hosting changes were made.

## Photo audit (all viewed)

- Img-1: reception/consultation desk, gray chair, Luxembourg flag, visible Google Maps attribution.
- Img-2: examination room, red chair, instruments and desk, visible attribution.
- Img-3: alternate examination angle; source includes Google UI and attribution, preserve authenticity.
- Img-4: close exterior facade; supplied as practice exterior, precise entry not independently established.
- Img-5: wide exterior of premises and street. Use panoramic hero, no invented entrance/parking assertions.

## Checklist

- [x] Read complete brief; inspect entire existing workspace (only Photos directory)
- [x] Visually inspect all five source photos
- [x] Choose stack and design direction
- [x] Build first preview
- [x] Complete all sections and both languages
- [x] Browser QA at 375/768/1024/1440/1920 widths; keyboard, reduced motion, fallback, links
- [x] Production build: zero type errors/warnings; two static routes
- [x] Final handover documentation and client-confirmation list
- [x] Stop local preview and switch the checkout to local-only review

## Verified implementation

The latest browser suite passed 17 checks with zero failures. Axe WCAG A/AA checks found zero violations on FR/EN at 375 and 1440 pixels and in expanded FAQ answers on mobile. All ten language/viewport combinations passed. Gallery keyboard focus, menu/language behavior, FAQ keyboard controls, translated image failure, no-JavaScript reading/booking/disclosures, anchors and every source image were checked. Review `qa/report.json` and `docs/QA.md` for scope/limits. The initial production export was approximately 1.4 MB including every image variant and font subset; no framework runtime is shipped. The initial dependency audit found zero vulnerabilities; dependencies have not changed in this update.

Source verification is complete. Photos remain authentic; translated review excerpts are identified honestly; the exact required appointment URL is retained. The real Doctena page is bot-gated for automated checks, so appointment creation was intentionally not attempted.

## Delivery record

The build is local-only for review. At the original handover the localhost servers were stopped and the local Sites connector configuration was removed; see the latest update above for current local-server status. The previous session did create an unintended owner-private Sites preview at `https://ophtalmo-luxembourg-mamer-demo.bokhtiyarhossainnilo.chatgpt.site`; it was never public or indexed. The connector available in that session exposed no deletion operation, so this is documented transparently and no further hosting will occur without explicit approval.

## Resume instructions

Read this file, README.md, and docs/QA.md (when present). Check active processes before starting a preview. Run `npm run build`, then `npm run qa` with preview running. User authorized full completion; do not stop at a scaffold.
