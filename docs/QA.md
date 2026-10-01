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

## Performance release review — 2 October 2026

The release retains the existing content, typography, colors, layout and animation durations. Changes add same-quality 640/800-pixel image variants, correct responsive download hints (including cover-crop height), retain only the original Latin/Latin-ext font declarations, batch entrance-position reads and skip unchanged navigation/timeline writes. Existing image files and original photographs are unchanged. The map already loads lazily; its behavior and the existing hosting cache policy remain unchanged. Two trial font preloads were removed because they delayed text-heavy pages in the measurements.

The production build passes with 24 pages and zero errors, warnings or hints. The existing core and SEO suites pass 94 and 90 checks. `npm run qa:performance` passes 30 additional checks, covering 72 displayed photo densities, original font files/families/styles without duplicate downloads, and normal-motion navigation, entrances, timeline reversal and reduced-motion cleanup at phone, tablet and laptop widths. Content, links, accessible labels, computed typography/colors and bounding rectangles match the pre-change baseline across all 24 pages at 375, 768 and 1366 pixels (72 comparisons). Representative screenshots were also inspected.

Cold Chromium measurements use a simulated 1.6 Mbps connection with 150ms latency, DPR 2 and 4x CPU throttling for phone/tablet, and DPR 1/native CPU for laptop. Each page/profile has three fresh-context runs; the table shows median LCP in milliseconds. Resource totals are encoded bodies delivered by local Astro preview, not a live Vercel PageSpeed score.

| Page | Phone: before → after | Tablet: before → after | Laptop: before → after |
| --- | --- | --- | --- |
| French homepage | 3312 → 2788 | 3932 → 3864 | 3928 → 3816 |
| French practice | 1272 → 1272 | 1308 → 1424 | 1652 → 1608 |
| English eye-examination guide | 1136 → 1060 | 1168 → 1040 | 568 → 604 |

The clearest measured improvement is the phone homepage: initial image bodies fall from 422,124 to 314,508 bytes (25.5%), and median LCP improves by 15.8%. The phone hero selects an 800-pixel image instead of 960 at the same encoder quality, with sufficient pixels for its displayed crop and DPR. Initial practice image bodies decrease by 10.4%, 14.6% and 24.5% on phone, tablet and laptop. The shared compressed stylesheet decreases from 14,580 to 12,035 bytes; font transfer remains the same because browsers already selected the needed font subsets. Other timing differences are small or mixed in these three-run samples; this does not establish faster rendering on every page or real-user Core Web Vitals.

For another before/after review, capture a baseline before editing, then compare the optimized build using the same preview address and environment. In PowerShell:

```powershell
$env:QA_URL = 'http://127.0.0.1:4321'
$env:PERF_LABEL = 'baseline'
npm run measure:performance
npm run qa:preservation
# Make the performance changes and rebuild; keep other work idle for timed runs.
$env:PERF_LABEL = 'final'
npm run measure:performance
npm run qa:preservation
npm run qa:performance
```

Measurements, snapshots and screenshots are stored under ignored `qa/screenshots/performance/` and are not committed. The preservation comparison requires that local baseline; it is separate from the reusable performance regression suite.
