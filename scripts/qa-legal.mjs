import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';

// Check only legal/privacy additions. The temporary static server always closes.
const build = resolve(process.env.QA_BUILD_DIR || 'dist');
const output = resolve('qa/screenshots/legal');
await mkdir(output, { recursive: true });
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.xml': 'application/xml' };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = resolve(build, `.${pathname}${pathname.endsWith('/') ? 'index.html' : ''}`);
    if (!file.startsWith(build + sep)) throw new Error('Invalid path');
    const data = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
    response.end(data);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
let browser;
const passed = [];
const failures = [];
const locales = ['fr', 'en', 'lb'];
const routes = {
  fr: { home: '/', contact: '/contact/', legal: '/mentions-legales/', privacy: '/confidentialite/' },
  en: { home: '/en/', contact: '/en/contact/', legal: '/en/legal-notice/', privacy: '/en/privacy/' },
  lb: { home: '/lb/', contact: '/lb/kontakt/', legal: '/lb/rechtlech-hiweiser/', privacy: '/lb/dateschutz/' },
};
const sizes = [{ width: 320, height: 812 }, { width: 375, height: 812 }, { width: 768, height: 1024 }, { width: 1366, height: 900 }];

async function check(name, action) {
  try { await action(); passed.push(name); console.log(`PASS ${name}`); }
  catch (error) { failures.push({ name, error: error.message }); console.error(`FAIL ${name}: ${error.message}`); }
}

async function localPage(size, javaScriptEnabled = true) {
  const context = await browser.newContext({ viewport: size, hasTouch: size.width < 901, isMobile: size.width < 601, reducedMotion: 'reduce', javaScriptEnabled });
  const page = await context.newPage();
  const errors = [];
  const external = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => {
    if (new URL(request.url()).origin !== base) external.push(request.url());
  });
  await page.route('**/*', (route) => {
    if (new URL(route.request().url()).origin === base) return route.continue();
    // Test the iframe integration without interacting with Google's service.
    return route.fulfill({ contentType: 'text/html', body: '<!doctype html><html lang="en"><title>Map test</title><body>Map</body></html>' });
  });
  return { context, page, errors, external };
}

try {
  browser = await chromium.launch();
  for (const locale of locales) {
    for (const type of ['legal', 'privacy']) {
      for (const size of sizes) {
        await check(`${locale} ${type}: layout, links and accessibility at ${size.width}px`, async () => {
          const { context, page, errors, external } = await localPage(size);
          try {
            assert.equal((await page.goto(base + routes[locale][type])).status(), 200);
            await page.evaluate(() => document.fonts.ready);
            assert.deepEqual(errors, []);
            assert.deepEqual(external, []);
            assert.equal(await page.locator('h1').count(), 1);
            assert.equal(await page.locator('.legal-section').count(), type === 'legal' ? 6 : 9);
            assert.equal(await page.locator('.mobile-contact-bar').count(), 0);
            const data = await page.evaluate(() => ({
              lang: document.documentElement.lang,
              title: document.title,
              canonical: document.querySelector('link[rel="canonical"]').href,
              alternates: Object.fromEntries([...document.querySelectorAll('link[hreflang]')].map((link) => [link.hreflang, new URL(link.href).pathname])),
              overflow: document.documentElement.scrollWidth - innerWidth,
              missingAnchors: [...document.querySelectorAll('.legal-contents a')].filter((link) => !document.getElementById(link.hash.slice(1))).length,
              placeholder: /(?:lorem ipsum|\[insert|à compléter|placeholder)/i.test(document.querySelector('.legal-document').textContent),
            }));
            assert.equal(data.lang, locale);
            assert.ok(data.title.length > 12);
            assert.equal(new URL(data.canonical).pathname, routes[locale][type]);
            for (const lang of locales) assert.equal(data.alternates[lang], routes[lang][type]);
            assert.ok(data.overflow <= 1, `Horizontal overflow ${data.overflow}px`);
            assert.equal(data.missingAnchors, 0);
            assert.equal(data.placeholder, false);
            for (const link of await page.locator('.legal-document a[href^="/"], .footer-legal-link').all()) {
              assert.equal((await page.request.get(base + await link.getAttribute('href'))).status(), 200);
            }
            const accessibility = await new AxeBuilder({ page }).include('.legal-document').include('.footer-top nav').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
            assert.deepEqual(accessibility.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) })), []);
            if (locale === 'en') await page.screenshot({ path: `${output}/${type}-${size.width}.png`, fullPage: true });
          } finally { await context.close(); }
        });
      }
    }
    await check(`${locale}: legal and privacy footer links`, async () => {
      const { context, page } = await localPage(sizes[1]);
      try {
        await page.goto(base + routes[locale].home);
        assert.equal(await page.locator(`.footer-legal-links > .footer-legal-link[href="${routes[locale].legal}"]`).count(), 1);
        assert.equal(await page.locator(`.footer-legal-links > .footer-legal-link[href="${routes[locale].privacy}"]`).count(), 1);
      } finally { await context.close(); }
    });
    for (const size of sizes.filter((size) => size.width !== 320)) {
      await check(`${locale}: direct map embed at ${size.width}px`, async () => {
        const { context, page, errors, external } = await localPage(size);
        try {
          await page.goto(base + routes[locale].contact);
          const map = page.locator('.contact-map');
          const iframe = map.locator('iframe');
          await map.scrollIntoViewIfNeeded();
          await page.evaluate(() => document.fonts.ready);
          assert.equal(await iframe.count(), 1);
          assert.equal(await page.locator('[data-map-load], [data-map-withdraw], [data-map-notice]').count(), 0);
          assert.ok((await iframe.getAttribute('src')).startsWith('https://www.google.com/maps/embed?'));
          assert.equal(await iframe.getAttribute('loading'), 'lazy');
          assert.ok((await iframe.getAttribute('title')).length > 0);
          assert.ok((await map.boundingBox()).width > (await map.boundingBox()).height, 'Map must stay wider than tall');
          await page.frameLocator('.contact-map iframe').locator('body').waitFor({ state: 'visible' });
          assert.ok(external.length >= 1 && external.every((url) => url.startsWith('https://www.google.com/maps/embed?')));
          const mapRect = await map.boundingBox();
          const frameRect = await iframe.boundingBox();
          assert.ok(Math.abs(frameRect.width - mapRect.width) <= 2);
          assert.ok(Math.abs(frameRect.height - mapRect.height) <= 2);
          assert.equal(await page.evaluate(() => localStorage.length), 0);
          assert.equal(await page.evaluate(() => sessionStorage.length), 0);
          assert.deepEqual(await context.cookies(), []);
          assert.deepEqual(errors, []);
          const accessibility = await new AxeBuilder({ page }).include('.contact-map').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
          assert.deepEqual(accessibility.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) })), []);
          await page.screenshot({ path: `${output}/map-${locale}-${size.width}.png`, fullPage: false });
        } finally { await context.close(); }
      });
    }
    await check(`${locale}: direct map without JavaScript`, async () => {
      const { context, page } = await localPage(sizes[1], false);
      try {
        await page.goto(base + routes[locale].contact);
        const iframe = page.locator('.contact-map iframe');
        assert.equal(await iframe.count(), 1);
        assert.ok((await iframe.getAttribute('src')).startsWith('https://www.google.com/maps/embed?'));
        assert.ok((await iframe.getAttribute('title')).length > 0);
        assert.equal(await page.locator('[data-map-load], [data-map-withdraw], [data-map-notice]').count(), 0);
      } finally { await context.close(); }
    });
  }
  await check('new legal pages included in the sitemap', async () => {
    const xml = await (await fetch(base + '/sitemap.xml')).text();
    for (const locale of locales) {
      assert.ok(xml.includes(routes[locale].legal));
      assert.ok(xml.includes(routes[locale].privacy));
    }
  });
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
  await writeFile(`${output}/report.json`, JSON.stringify({ passed, failures }, null, 2));
}
console.log(`${passed.length} passed; ${failures.length} failed. Temporary server stopped.`);
if (failures.length) process.exitCode = 1;
