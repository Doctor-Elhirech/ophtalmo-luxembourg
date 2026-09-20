import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const base = process.env.QA_URL || 'http://127.0.0.1:4321';
const browser = await chromium.launch({ headless: true });
const report = { base, date: new Date().toISOString(), viewports: [], checks: [], failures: [] };
await mkdir('qa/screenshots', { recursive: true });
async function check(name, fn) {
  try {
    await fn();
    report.checks.push(name);
    console.log(`PASS ${name}`);
  } catch (error) {
    report.failures.push({ name, message: error.message });
    console.error(`FAIL ${name}: ${error.message}`);
  }
}
const expectedBooking = 'https://www.doctena.lu/fr/practitioner/mhamed-el-hirech';
try {
  for (const locale of ['fr', 'en']) {
    for (const width of [375, 768, 1024, 1440, 1920]) {
      await check(`${locale} layout ${width}px`, async () => {
        const context = await browser.newContext({
          viewport: { width, height: 1000 },
          reducedMotion: 'reduce',
        });
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', (error) => errors.push(error.message));
        page.on('console', (message) => {
          if (message.type() === 'error') errors.push(message.text());
        });
        page.on('response', (response) => {
          if (response.url().startsWith(base) && response.status() >= 400)
            errors.push(`${response.status()} ${response.url()}`);
        });
        try {
          const response = await page.goto(base + (locale === 'en' ? '/en/' : '/'), {
            waitUntil: 'networkidle',
          });
          assert.equal(response.status(), 200);
          await page.evaluate(() => document.fonts.ready);
          assert.equal(await page.locator('h1').count(), 1);
          assert.equal(await page.locator('html').getAttribute('lang'), locale);
          const dimensions = await page.evaluate(() => ({
            width: innerWidth,
            scroll: document.documentElement.scrollWidth,
          }));
          assert.ok(dimensions.scroll <= dimensions.width, JSON.stringify(dimensions));
          const anchors = await page
            .locator('a[href^="#"]')
            .evaluateAll((links) =>
              links.map((link) => ({
                href: link.getAttribute('href'),
                exists: !!document.getElementById(link.hash.slice(1)),
              })),
            );
          assert.ok(
            anchors.every((item) => item.exists),
            `Broken anchors: ${JSON.stringify(anchors.filter((item) => !item.exists))}`,
          );
          assert.ok((await page.locator(`a[href="${expectedBooking}"]`).count()) >= 4);
          assert.ok((await page.locator('a[href="tel:+352691641064"]').count()) > 0);
          assert.ok(
            (await page.locator('a[href="mailto:ophtalmo.luxembourg@gmail.com"]').count()) > 0,
          );
          assert.ok(
            (await page.locator('a[href^="https://www.google.com/maps/dir/"]').count()) === 1,
          );
          for (const img of await page.locator('.photo img').all()) {
            await img.scrollIntoViewIfNeeded();
            await img.evaluate((el) => el.decode());
            assert.ok(
              await img.evaluate((el) => el.naturalWidth > 0 && el.width > 0 && el.height > 0),
            );
          }
          await page.evaluate(() => scrollTo(0, 0));
          await page.screenshot({
            path: `qa/screenshots/${locale}-${width}-full.png`,
            fullPage: true,
          });
          await page.screenshot({ path: `qa/screenshots/${locale}-${width}-hero.png` });
          if ([375, 1440].includes(width)) {
            const axe = await new AxeBuilder({ page })
              .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
              .analyze();
            assert.deepEqual(
              axe.violations.map((v) => ({
                id: v.id,
                impact: v.impact,
                nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
              })),
              [],
            );
          }
          assert.deepEqual(errors, []);
          report.viewports.push({ locale, width, overflow: false, imagesLoaded: true, errors: 0 });
        } finally {
          await context.close();
        }
      });
    }
  }
  await check('mobile menu, anchors, Escape and language switching', async () => {
    const page = await browser.newPage({
      viewport: { width: 375, height: 812 },
      reducedMotion: 'reduce',
    });
    try {
      await page.goto(base);
      const toggle = page.locator('.menu-toggle');
      await toggle.click();
      assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
      assert.equal(await page.locator('#mobile-nav').evaluate((el) => el.inert), false);
      await page.keyboard.press('Escape');
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
      assert.equal(await page.locator(':focus').getAttribute('class'), 'menu-toggle');
      await toggle.click();
      await page.locator('#mobile-nav a[href="#expertise"]').click();
      assert.ok(page.url().endsWith('#expertise'));
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
      await page.locator('.header-actions .language-link[lang="en"]').click();
      await page.waitForURL('**/en/#expertise');
      assert.equal(await page.locator('html').getAttribute('lang'), 'en');
      assert.equal(await page.locator('h1').innerText(), 'Your vision.\nOur attention.');
      await page.locator('.header-actions .language-link[lang="fr"]').click();
      await page.waitForURL('**/#expertise');
      assert.equal(await page.locator('html').getAttribute('lang'), 'fr');
    } finally {
      await page.close();
    }
  });
  await check('keyboard skip link and accessible gallery', async () => {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      reducedMotion: 'reduce',
    });
    try {
      await page.goto(base);
      await page.keyboard.press('Tab');
      assert.equal(await page.locator(':focus').getAttribute('class'), 'skip-link');
      await page.keyboard.press('Enter');
      assert.equal(await page.locator(':focus').getAttribute('id'), 'main');
      const opener = page.locator('.gallery-open').first();
      await opener.focus();
      await page.keyboard.press('Enter');
      assert.equal(await page.locator('dialog').evaluate((el) => el.open), true);
      const alt = await page.locator('.lightbox-image').getAttribute('alt');
      await page.keyboard.press('ArrowRight');
      assert.notEqual(await page.locator('.lightbox-image').getAttribute('alt'), alt);
      for (let i = 0; i < 7; i++) {
        await page.keyboard.press('Tab');
        assert.equal(await page.locator(':focus').evaluate((el) => !!el.closest('dialog')), true);
      }
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('dialog').evaluate((el) => el.open), false);
      assert.equal(await opener.evaluate((el) => el === document.activeElement), true);
      assert.equal(
        await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
        'auto',
      );
    } finally {
      await page.close();
    }
  });
  await check('missing images show translated fallback and reserve layout', async () => {
    const page = await browser.newPage({
      viewport: { width: 375, height: 812 },
      reducedMotion: 'reduce',
    });
    try {
      await page.route('**/images/exterior-wide-*.webp', (route) => route.abort());
      await page.goto(base + '/en/');
      const fallback = page.locator('.hero-figure .photo-fallback');
      await fallback.waitFor({ state: 'visible' });
      assert.equal(await fallback.innerText(), 'Photograph temporarily unavailable');
      assert.ok((await page.locator('.hero-figure .photo').boundingBox()).height > 200);
      await page.screenshot({ path: 'qa/screenshots/fallback-375.png' });
    } finally {
      await page.close();
    }
  });
  await check('reading and booking work without JavaScript', async () => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 375, height: 812 },
    });
    try {
      const page = await context.newPage();
      await page.goto(base);
      assert.ok(await page.locator('#doctor').isVisible());
      assert.ok(await page.locator('#contact').isVisible());
      assert.equal(
        await page.locator('.hero-intro .booking-link').getAttribute('href'),
        expectedBooking,
      );
      assert.ok(await page.locator('.footer-top nav a[href="#doctor"]').count());
    } finally {
      await context.close();
    }
  });
  await check('200 percent text enlargement has no horizontal overflow', async () => {
    const page = await browser.newPage({
      viewport: { width: 375, height: 812 },
      reducedMotion: 'reduce',
    });
    try {
      await page.goto(base);
      await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        true,
      );
    } finally {
      await page.close();
    }
  });
} finally {
  await browser.close();
  await writeFile('qa/report.json', JSON.stringify(report, null, 2) + '\n');
}
console.log(`${report.checks.length} checks passed; ${report.failures.length} failed.`);
if (report.failures.length) process.exitCode = 1;
