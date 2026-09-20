# Build continuity

## Objective

Complete a premium French/English demonstration for Ophtalmo Luxembourg, with authentic supplied photos and verified information. Brief: `.codex/attachments/8c143c9b-f98e-4926-b482-29f4af9f6b37/Pasted text.txt` in the user's home.

## Decisions

- Astro static generation + strict TypeScript. No application framework shipped to browser, backend, account, CMS, or custom booking.
- French `/`, English `/en/`. Shared translated content and components; language links retain section anchors.
- Visual thesis: an editorial study in attention. Newsreader serif, Manrope sans, chalk and deep forest, genuine architectural photography.
- Use the EXACT booking URL provided, even though indexed Doctena canonical differs. Confirm with doctor before launch.
- Do not invent a portrait, hours, parking, outcomes, statistics, qualifications, or third written review.
- Root agent owns site files and hosting. Research agent verifies Doctena only.

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
- [ ] Publish private demo and verify deployment — see local delivery record below

## Verified implementation

The final browser suite passed 15 checks with zero failures. Axe WCAG A/AA checks found zero violations on FR/EN at 375 and 1440 pixels. All ten language/viewport combinations passed. Gallery keyboard focus, menu/language behavior, translated image failure, no-JavaScript reading/booking, anchors and every source image were checked. Review `qa/report.json` and `docs/QA.md` for scope/limits. Full production export is approximately 1.4 MB including every image variant and font subset; no framework runtime is shipped. Dependency audit: zero vulnerabilities.

Source verification is complete. Photos remain authentic; translated review excerpts are identified honestly; the exact required appointment URL is retained. The real Doctena page is bot-gated for automated checks, so appointment creation was intentionally not attempted.

## Delivery record

Site ID: `appgprj_6ab05ffe1fe88191ba4e2ea345582647`. Reuse this identity.

Publishing starts after the source snapshot is committed. Once complete, `.sites-runtime/delivery.json` records the actual deployment URL, version, deployment and full source commit. This local continuity record is ignored by Git so recording publication does not change the source snapshot that was packaged. If absent, publication has not yet been recorded; inspect the existing Site/version state before any retry.

## Resume instructions

Read this file, README.md, docs/QA.md (when present), and `.openai/hosting.json`. Never register another Site if project_id already exists. Check active processes before starting a preview. Run `npm run build`, then `npm run qa` with preview running. User authorized full completion; do not stop at a scaffold.
