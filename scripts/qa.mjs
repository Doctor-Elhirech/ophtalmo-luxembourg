import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base = (process.env.QA_URL || 'http://127.0.0.1:4321').replace(/\/$/, '');
const routes = {
  fr: ['/', '/medecin/', '/expertises/', '/cabinet/', '/contact/'],
  en: ['/en/', '/en/doctor/', '/en/expertise/', '/en/practice/', '/en/contact/'],
  lb: ['/lb/', '/lb/dokter/', '/lb/leeschtungen/', '/lb/praxis/', '/lb/kontakt/'],
};
const widths = [320, 375, 768, 1024, 1440];
const bookingUrl = 'https://www.doctena.lu/fr/practitioner/mhamed-el-hirech';
const report = { base, date: new Date().toISOString(), passed: [], failures: [] };
const browser = await chromium.launch({ headless: true });
await mkdir('qa/screenshots', { recursive: true });

async function check(name, run) {
  try {
    await run();
    report.passed.push(name);
    console.log(`PASS ${name}`);
  } catch (error) {
    report.failures.push({ name, message: error.message });
    console.error(`FAIL ${name}: ${error.message}`);
  }
}

try {
  for (const [locale, paths] of Object.entries(routes)) {
    for (const path of paths) {
      for (const width of widths) {
        await check(`${locale} ${path} ${width}px`, async () => {
          const context = await browser.newContext({
            viewport: { width, height: 900 },
            reducedMotion: 'reduce',
          });
          const page = await context.newPage();
          const errors = [];
          page.on('pageerror', (error) => errors.push(error.message));
          page.on('response', (response) => {
            if (response.url().startsWith(base) && response.status() >= 400)
              errors.push(`${response.status()} ${response.url()}`);
          });
          try {
            // The first dev-server request can trigger a Vite reload while fonts initialize.
            const response = await page.goto(base + path, {
              waitUntil: path === '/' ? 'load' : 'domcontentloaded',
            });
            assert.equal(response.status(), 200);
            await page.evaluate(() => document.fonts.ready);
            assert.equal(await page.locator('html').getAttribute('lang'), locale);
            assert.equal(await page.locator('h1').count(), 1);
            const skippedHeadings = await page
              .locator('main h1, main h2, main h3, main h4')
              .evaluateAll((headings) =>
                headings.flatMap((heading, index) =>
                  index > 0 &&
                  Number(heading.tagName[1]) > Number(headings[index - 1].tagName[1]) + 1
                    ? [heading.textContent.trim()]
                    : [],
                ),
              );
            assert.deepEqual(skippedHeadings, [], 'Main heading hierarchy skips a level');
            assert.equal(await page.locator('.header-actions .language-link').count(), 3);
            assert.equal(await page.locator('.site-footer .language-link').count(), 3);
            assert.equal(
              await page.evaluate(() =>
                getComputedStyle(document.body).fontFamily.includes('Plus Jakarta Sans'),
              ),
              true,
              'Body font missing',
            );
            assert.equal(
              await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
              true,
              'Horizontal overflow',
            );
            assert.equal(
              (await page.locator(`a[href="${bookingUrl}"]`).count()) > 0,
              true,
              'Primary booking link missing',
            );
            if (paths.indexOf(path) !== 1) {
              assert.equal(
                (await page
                  .locator('a[href^="https://www.doctipro.lu/"][href*="rendez-vous"]')
                  .count()) > 0,
                true,
                'Secondary booking link missing',
              );
            }
            const missingAnchors = await page
              .locator('a[href^="#"]')
              .evaluateAll((links) =>
                links
                  .map((link) => link.getAttribute('href'))
                  .filter((href) => href.length > 1 && !document.getElementById(href.slice(1))),
              );
            assert.deepEqual(missingAnchors, []);

            if ([375, 768].includes(width)) {
              for (const image of await page.locator('.photo img').all()) {
                await image.scrollIntoViewIfNeeded();
                await image.evaluate((element) => element.decode());
                assert.equal(await image.evaluate((element) => element.naturalWidth > 0), true);
              }
              const axe = await new AxeBuilder({ page })
                .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
                .analyze();
              assert.deepEqual(
                axe.violations.map((violation) => ({
                  id: violation.id,
                  targets: violation.nodes.map((node) => node.target),
                })),
                [],
              );
              await page.evaluate(() => scrollTo(0, 0));
              await page.screenshot({
                path: `qa/screenshots/${locale}-${path.replaceAll('/', '-') || 'home'}-${width}.png`,
              });
            }
            assert.deepEqual(errors, []);
          } finally {
            await context.close();
          }
        });
      }
    }
  }

  const readingTargets = [
    '.practice-heading-aside .section-description',
    '.doctor-proof-card:nth-child(2) h3',
    '.care-card:nth-child(2) .care-card-detail p',
    '.journey-list li:nth-child(2) h3',
    '.faq-item:nth-child(2) .faq-answer p',
  ];
  for (const width of [375, 768, 1366]) {
    for (const [index, path] of routes.en.entries()) {
      await check(`language switch preserves reading position ${path} ${width}px`, async () => {
        const context = await browser.newContext({
          viewport: { width, height: 900 },
          reducedMotion: 'reduce',
        });
        const page = await context.newPage();
        try {
          await page.goto(base + path, { waitUntil: 'domcontentloaded' });
          await page.evaluate(() => document.fonts.ready);
          const target = page.locator(readingTargets[index]).first();
          await target.evaluate((element) => {
            const detail = element.closest('details');
            if (detail) detail.open = true;
            const line = document.querySelector('header').getBoundingClientRect().height + 16;
            window.scrollTo({
              top: scrollY + element.getBoundingClientRect().top - line + 5,
              behavior: 'instant',
            });
          });
          const fraction = await target.evaluate((element) => {
            const rect = element.getBoundingClientRect();
            const line = document.querySelector('header').getBoundingClientRect().height + 16;
            return (line - rect.top) / rect.height;
          });
          for (const locale of ['lb', 'fr', 'en']) {
            await page.locator(`.header-actions a[lang="${locale}"]`).click();
            await page.waitForURL(base + routes[locale][index], { waitUntil: 'domcontentloaded' });
            await page.waitForLoadState('domcontentloaded');
            await page.evaluate(() => document.fonts.ready);
            await page.waitForFunction(
              ({ selector, fraction }) => {
                const element = document.querySelector(selector);
                const rect = element.getBoundingClientRect();
                const line = document.querySelector('header').getBoundingClientRect().height + 16;
                return Math.abs(rect.top + rect.height * fraction - line) < 10;
              },
              { selector: readingTargets[index], fraction },
            );
            if ([2, 4].includes(index)) {
              assert.equal(
                await target.evaluate((element) => element.closest('details').open),
                true,
              );
            }
          }
          const before = await page.evaluate(() => scrollY);
          await page.locator('.header-actions a[lang="en"]').click();
          assert.equal(await page.evaluate(() => scrollY), before);
        } finally {
          await context.close();
        }
      });
    }
  }

  await check('mobile navigation, back-home control and language switch', async () => {
    const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await context.newPage();
    try {
      await page.goto(base + '/en/', { waitUntil: 'domcontentloaded' });
      const menu = page.locator('.menu-toggle');
      await menu.click();
      assert.equal(await menu.getAttribute('aria-expanded'), 'true');
      await page.keyboard.press('Escape');
      assert.equal(await menu.getAttribute('aria-expanded'), 'false');
      await menu.click();
      await page.locator('#mobile-nav a[data-nav-page="practice"]').click();
      await page.waitForURL('**/en/practice/');
      assert.equal(
        await page.locator('.desktop-nav a[data-nav-page="practice"]').getAttribute('aria-current'),
        'page',
      );
      await page.locator('.home-back-control').click();
      await page.waitForURL('**/en/');
      await page.locator('.header-actions a[lang="fr"]').click();
      await page.waitForURL(base + '/');
      assert.equal(await page.locator('html').getAttribute('lang'), 'fr');
      await page.locator('.header-actions a[lang="lb"]').click();
      await page.waitForURL(base + '/lb/');
      assert.equal(await page.locator('html').getAttribute('lang'), 'lb');
    } finally {
      await context.close();
    }
  });

  await check('care disclosure and practice gallery keyboard controls', async () => {
    const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await context.newPage();
    try {
      await page.goto(base + '/en/expertise/', { waitUntil: 'domcontentloaded' });
      const card = page.locator('.care-card').first();
      await card.locator('summary').focus();
      await page.keyboard.press('Enter');
      assert.equal(await card.getAttribute('open'), '');
      assert.equal(await card.locator('.care-card-body').isVisible(), true);
      await page.keyboard.press('Enter');
      assert.equal(await card.getAttribute('open'), null);

      await page.goto(base + '/en/practice/', { waitUntil: 'domcontentloaded' });
      const opener = page.locator('.gallery-open').first();
      await opener.click();
      assert.equal(await page.locator('.gallery-dialog').evaluate((dialog) => dialog.open), true);
      const firstPhoto = await page.locator('.lightbox-image').getAttribute('src');
      await page.keyboard.press('ArrowRight');
      assert.notEqual(await page.locator('.lightbox-image').getAttribute('src'), firstPhoto);
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.gallery-dialog').evaluate((dialog) => dialog.open), false);
      assert.equal(await opener.evaluate((element) => element === document.activeElement), true);
    } finally {
      await context.close();
    }
  });

  await check('hero image failure keeps translated fallback and layout', async () => {
    const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await context.newPage();
    try {
      await page.route(/\/images\/street-reference-[^/?]+\.(?:webp|avif)(?:\?|$)/, (route) =>
        route.abort(),
      );
      await page.goto(base + '/en/', { waitUntil: 'domcontentloaded' });
      await page.locator('.hero-figure .photo-fallback').waitFor({ state: 'visible' });
      assert.equal(
        await page.locator('.hero-figure .photo').evaluate((element) => element.clientHeight > 200),
        true,
      );
    } finally {
      await context.close();
    }
  });

  await check(
    'AVIF images retain a working WebP fallback without duplicate downloads',
    async () => {
      const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
      const page = await context.newPage();
      const requests = [];
      page.on('request', (request) => {
        if (/\/images\/street-reference-/.test(request.url())) requests.push(request.url());
      });
      try {
        await page.goto(base + '/en/', { waitUntil: 'domcontentloaded' });
        const hero = page.locator('.hero-figure img');
        await hero.evaluate((image) => image.decode());
        assert.match(await hero.evaluate((image) => image.currentSrc), /\.avif$/);
        assert.ok(requests.length > 0 && requests.every((url) => url.endsWith('.avif')));
        await page.route(base + '/en/', async (route) => {
          const response = await route.fetch();
          const body = (await response.text()).replaceAll(
            'type="image/avif"',
            'type="image/x-unsupported"',
          );
          await route.fulfill({ response, body });
        });
        await page.reload({ waitUntil: 'domcontentloaded' });
        await hero.evaluate((image) => image.decode());
        assert.match(await hero.evaluate((image) => image.currentSrc), /\.webp$/);
      } finally {
        await context.close();
      }
    },
  );

  await check('essential pages and booking links work without JavaScript', async () => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 375, height: 812 },
    });
    const page = await context.newPage();
    try {
      for (const path of [
        '/en/',
        '/en/doctor/',
        '/en/expertise/',
        '/en/practice/',
        '/en/contact/',
        '/lb/',
        '/lb/dokter/',
        '/lb/leeschtungen/',
        '/lb/praxis/',
        '/lb/kontakt/',
      ]) {
        await page.goto(base + path, { waitUntil: 'domcontentloaded' });
        assert.equal(await page.locator('main h1').count(), 1);
        assert.equal((await page.locator(`a[href="${bookingUrl}"]`).count()) > 0, true);
      }
    } finally {
      await context.close();
    }
  });
} finally {
  await browser.close();
  await writeFile('qa/report.json', JSON.stringify(report, null, 2) + '\n');
}

console.log(`${report.passed.length} checks passed; ${report.failures.length} failed.`);
if (report.failures.length) process.exitCode = 1;
