# Quality assurance

Run `npm run build` and, while the local site is running with `npm run dev`, run `npm run qa`. The browser suite writes its report to `qa/report.json` and viewport screenshots to `qa/screenshots/`; both are ignored by Git.

For a release, use `npm run preview` after the build and set `QA_URL` to the printed preview address. Run both `npm run qa` and `npm run qa:seo`. The latter writes its report and screenshots inside the ignored `qa/screenshots/` folder.

The suite covers all five French, five English and five Luxembourgish routes at 320, 375, 768, 1024 and 1440 pixels. It checks page responses, document language and heading structure, booking links, local anchors, horizontal overflow, image loading and browser errors. At phone and tablet widths it also runs axe WCAG 2 A/AA and 2.1 AA checks. Separate flows exercise mobile navigation, the back-home control, position-preserving language switching, care disclosures, the practice gallery, hero-image fallback and essential use without JavaScript.

The responsive review also included visual inspection of the homepage and each detail page at phone and tablet widths. The 320-pixel footer overflow and low-contrast small text found during that review were corrected.

## SEO release review — 1 October 2026

The production build generates 24 pages with zero errors, warnings or hints. The core suite passes 94 checks; the guide/SEO suite passes 90 checks against the built preview.

The guide suite checks all 24 pages for localized, unique metadata, canonical and reciprocal alternate-language links, structured data, internal destinations and anchors, and sharing-image availability. It checks the sitemap's complete route inventory, robots behavior and the public IndexNow ownership file without submitting anything.

All nine care guides are exercised at 320, 375, 768, 1024, 1366 and 1920 pixels, including actual text clipping, active navigation, related guides, booking destinations and keyboard disclosures. Accessibility scans run at phone and tablet sizes; language switching preserves the guide and reading position at phone, tablet and laptop sizes. Essential reading and booking paths are also exercised without JavaScript. Visual review covered each guide in all three languages at phone, tablet and laptop sizes.

The review fixed two sharing-image metadata type errors, long guide headings clipping on narrow phones, unnecessary heading hyphenation, and several Luxembourgish grammar/spelling issues. All eleven primary medical source destinations were checked. Doctipro links responded successfully; Doctena's automated-request protection prevents treating every HTTP response as a conclusive booking test.

Automated accessibility checks and desktop Chromium screenshots do not replace testing on physical devices and assistive technology. The doctor should confirm provisional content, opening hours, the exact entrance and the suitability of the supplied street photo before final handoff. A fluent Luxembourgish speaker should also review the new medical wording. No real appointment was created during testing.
