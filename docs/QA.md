# Quality assurance

Run `npm run build` and, while the local site is running with `npm run dev`, run `npm run qa`. The browser suite writes its report to `qa/report.json` and viewport screenshots to `qa/screenshots/`; both are ignored by Git.

The suite covers all five French, five English and five Luxembourgish routes at 320, 375, 768, 1024 and 1440 pixels. It checks page responses, document language and heading structure, booking links, local anchors, horizontal overflow, image loading and browser errors. At phone and tablet widths it also runs axe WCAG 2 A/AA and 2.1 AA checks. Separate flows exercise mobile navigation, the back-home control, position-preserving language switching, care disclosures, the practice gallery, hero-image fallback and essential use without JavaScript.

The responsive review also included visual inspection of the homepage and each detail page at phone and tablet widths. The 320-pixel footer overflow and low-contrast small text found during that review were corrected.

Automated accessibility checks and desktop Chromium screenshots do not replace testing on physical devices and assistive technology. The doctor should confirm provisional content, opening hours, the exact entrance and the suitability of the supplied street photo before final handoff. A fluent Luxembourgish speaker should also review the new medical wording. No real appointment was created during testing.
