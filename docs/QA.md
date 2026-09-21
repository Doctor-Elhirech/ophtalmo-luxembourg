# Quality assurance

The repeatable browser suite is `scripts/qa.mjs`. It produces `qa/report.json` and local screenshots in `qa/screenshots/` (screenshots are ignored by Git). The final results are recorded in the progress log after execution.

## Scope

- French and English at 375, 768, 1024, 1440 and 1920 pixels.
- One H1, correct document language, complete section anchors and local assets.
- Exact Doctena appointment URL and valid phone, email and Google directions hrefs.
- Localized Doctipro profile/booking links, Mamer practice selection, and safe new-tab attributes.
- No horizontal overflow, browser JavaScript errors or failed local HTTP assets.
- All five genuine source photographs, intrinsic dimensions and image loading.
- Automated axe WCAG 2 A/AA and 2.1 AA rules at 375 and 1440 pixels in each language.
- Keyboard skip link, mobile menu, Escape behavior, language switching with anchor retention.
- Native photo dialog, arrow-key navigation, focus cycling and restored focus on close.
- Reduced motion, image-request failure with translated fallback, and core content/booking without JavaScript.
- Four bilingual FAQ disclosures: keyboard Enter/Space, expanded-answer accessibility, internal booking/contact navigation, and native operation without JavaScript.
- Separate desktop/mobile captures of the doctor profile links, appointment alternative and collapsed/expanded FAQ.
- Visual inspection of complete French mobile/desktop and English tablet captures.

## Relevant findings addressed

- Disabled the development toolbar so test results describe the website rather than hidden development UI.
- Increased inactive language-label contrast.
- Added explicit tab wrapping inside the native photo dialog for consistent keyboard behavior.
- Localized French quotation marks and protected the postcode from breaking across lines.
- Removed a sentence that might imply operations are performed inside the photographed premises.
- Upgraded initial framework/image dependencies to current patched versions; npm audit reported zero vulnerabilities after installation.

## Limits

Automated accessibility checks complement manual keyboard and visual review; they are not a full assistive-technology certification. Phone/email links are validated without initiating calls or messages. Doctena may prevent automated retrieval; no real patient appointment was booked. No opening hours, outcomes or other unsupported claims are tested or displayed. Desktop Chromium is used for reproducible local tests; device/browser-specific field testing remains appropriate before a public launch.

The supplied source photography is lower resolution than a commissioned shoot. Image optimization does not fabricate detail. Layout reserves space via intrinsic dimensions/aspect ratios. No live map, remote font request or tracking script affects initial loading.

The Sites build wrapper encountered a Windows npm shim-path issue; the identical project's `npm run build` was used directly. The output is a standard static export, and packaging follows the normal Sites helper.
