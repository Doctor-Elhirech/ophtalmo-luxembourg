import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

// Compare text, links, accessibility labels, typography and layout before/after optimization.
const base = (process.env.QA_URL || 'http://127.0.0.1:4321').replace(/\/$/, '');
const label = process.env.PERF_LABEL || 'current';
if (!/^[a-z0-9-]+$/i.test(label)) throw new Error('PERF_LABEL must be a simple filename label.');
const output = `qa/screenshots/performance/${label}`;
await mkdir(output, { recursive: true });
const routes = [
  '/',
  '/medecin/',
  '/expertises/',
  '/cabinet/',
  '/contact/',
  '/expertises/examen-vue/',
  '/expertises/lunettes-lentilles/',
  '/expertises/cataracte/',
  '/en/',
  '/en/doctor/',
  '/en/expertise/',
  '/en/practice/',
  '/en/contact/',
  '/en/expertise/eye-examination/',
  '/en/expertise/glasses-contact-lenses/',
  '/en/expertise/cataract/',
  '/lb/',
  '/lb/dokter/',
  '/lb/leeschtungen/',
  '/lb/praxis/',
  '/lb/kontakt/',
  '/lb/leeschtungen/aenuntersuchung/',
  '/lb/leeschtungen/brell-kontaktlensen/',
  '/lb/leeschtungen/groe-star/',
];
const browser = await chromium.launch({ headless: true });
const snapshots = {};
const original =
  label === 'baseline'
    ? null
    : JSON.parse(await readFile('qa/screenshots/performance/baseline/preservation.json', 'utf8'));
let checked = 0;
try {
  for (const width of [375, 768, 1366]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: 'reduce',
    });
    await context.route('**/*', (route) => {
      const url = new URL(route.request().url());
      return url.origin === new URL(base).origin ? route.continue() : route.abort();
    });
    try {
      const page = await context.newPage();
      for (const path of routes) {
        await page.goto(base + path, { waitUntil: 'load' });
        await page.evaluate(() => document.fonts.ready);
        const key = `${width} ${path}`;
        snapshots[key] = await page.evaluate(() =>
          [
            ...document.querySelectorAll(
              'header, main, footer, h1, h2, h3, p, li, figure, summary, a, button, iframe, .photo',
            ),
          ].map((element) => {
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            const round = (number) => Math.round(number * 100) / 100;
            return {
              tag: element.tagName,
              text: element.textContent.trim(),
              href: element.getAttribute('href'),
              label: element.getAttribute('aria-label'),
              font: style.fontFamily,
              fontSize: style.fontSize,
              weight: style.fontWeight,
              lineHeight: style.lineHeight,
              color: style.color,
              background: style.backgroundColor,
              bounds: [rect.x, rect.y, rect.width, rect.height].map(round),
            };
          }),
        );
        if (label !== 'baseline') {
          assert.deepEqual(snapshots[key], original[key], `Content/style/layout changed: ${key}`);
        }
        if (['/', '/cabinet/', '/lb/dokter/', '/lb/leeschtungen/aenuntersuchung/'].includes(path)) {
          // Load each existing photograph before recording the visual reference.
          for (const image of await page.locator('.photo img').all()) {
            await image.scrollIntoViewIfNeeded();
            await image.evaluate((element) => element.decode());
          }
          await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
          await page.screenshot({
            path: `${output}/${width}-${routes.indexOf(path)}.png`,
            fullPage: true,
          });
        }
        checked++;
      }
      console.log(
        `${width}px: all 24 routes ${label === 'baseline' ? 'recorded' : 'match baseline'}`,
      );
    } finally {
      await context.close();
    }
  }
  await writeFile(`${output}/preservation.json`, JSON.stringify(snapshots));
  console.log(
    `${checked} content, typography, color and layout snapshots ${label === 'baseline' ? 'recorded' : 'matched'} across FR/EN/LB.`,
  );
} finally {
  await browser.close();
}
