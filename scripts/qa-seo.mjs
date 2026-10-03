import { chromium, request } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

// Run against an Astro production preview after npm run build.
const base = (process.env.QA_URL || 'http://127.0.0.1:4321').replace(/\/$/, '');
const report = { base, date: new Date().toISOString(), passed: [], failures: [], screenshots: [] };
const api = await request.newContext({ baseURL: base });
const browser = await chromium.launch({ headless: true });
const output = 'qa/screenshots/seo';
await mkdir(output, { recursive: true });
const locales = ['fr', 'en', 'lb'];
const guides = {
  fr: ['/expertises/examen-vue/', '/expertises/lunettes-lentilles/', '/expertises/cataracte/'],
  en: ['/en/expertise/eye-examination/', '/en/expertise/glasses-contact-lenses/', '/en/expertise/cataract/'],
  lb: ['/lb/leeschtungen/aenuntersuchung/', '/lb/leeschtungen/brell-kontaktlensen/', '/lb/leeschtungen/groe-star/'],
};
const core = {
  fr: ['/', '/medecin/', '/expertises/', '/cabinet/', '/contact/'],
  en: ['/en/', '/en/doctor/', '/en/expertise/', '/en/practice/', '/en/contact/'],
  lb: ['/lb/', '/lb/dokter/', '/lb/leeschtungen/', '/lb/praxis/', '/lb/kontakt/'],
};
const legal = {
  fr: ['/mentions-legales/', '/confidentialite/'],
  en: ['/en/legal-notice/', '/en/privacy/'],
  lb: ['/lb/rechtlech-hiweiser/', '/lb/dateschutz/'],
};
const paths = locales.flatMap((locale) => [...core[locale], ...guides[locale], ...legal[locale]]);
const sizes = [
  { width: 320, height: 812, touch: true },
  { width: 375, height: 812, touch: true },
  { width: 768, height: 1024, touch: true },
  { width: 1024, height: 900, touch: true },
  { width: 1366, height: 900, touch: false },
  { width: 1920, height: 1080, touch: false },
];

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

const contextOptions = (size) => ({
  viewport: { width: size.width, height: size.height },
  hasTouch: size.touch,
  isMobile: size.width < 600,
  reducedMotion: 'reduce',
});

try {
  await check('production sitemap, robots and ownership proof', async () => {
    const sitemap = await api.get('/sitemap.xml');
    assert.equal(sitemap.status(), 200);
    assert.match(sitemap.headers()['content-type'], /xml/);
    const xml = await sitemap.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));
    assert.equal(urls.length, paths.length);
    assert.equal(new Set(urls.map((url) => url.href)).size, paths.length);
    assert.deepEqual(urls.map((url) => url.pathname).sort(), [...paths].sort());
    assert.equal(new Set(urls.map((url) => url.origin)).size, 1);
    assert.equal(urls[0].protocol, 'https:');
    const robots = await api.get('/robots.txt');
    assert.equal(robots.status(), 200);
    assert.match(await robots.text(), /Allow: \/\s/);
    assert.ok((await robots.text()).includes(`Sitemap: ${urls[0].origin}/sitemap.xml`));
    const proof = await api.get('/be56cf9e2c52471d996d4ebbc9fa204d.txt');
    assert.equal(proof.status(), 200);
    assert.equal((await proof.text()).trim(), 'be56cf9e2c52471d996d4ebbc9fa204d');
    assert.equal((await api.get('/this-page-does-not-exist/')).status(), 404);
  });

  const titles = new Set();
  const internalLinks = new Set();
  for (const locale of locales) {
    for (const [index, path] of [...core[locale], ...guides[locale]].entries()) {
      await check(`metadata, schema and crawlable links ${path}`, async () => {
        const context = await browser.newContext(contextOptions(sizes[4]));
        const page = await context.newPage();
        try {
          assert.equal((await page.goto(base + path, { waitUntil: 'domcontentloaded' })).status(), 200);
          const data = await page.evaluate(() => ({
            lang: document.documentElement.lang,
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.content,
            robots: document.querySelector('meta[name="robots"]')?.content,
            canonical: document.querySelector('link[rel="canonical"]')?.href,
            alternates: Object.fromEntries([...document.querySelectorAll('link[hreflang]')]
              .map((link) => [link.hreflang, link.href])),
            graph: JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)['@graph'],
            ogImage: document.querySelector('meta[property="og:image"]')?.content,
            ogWidth: document.querySelector('meta[property="og:image:width"]')?.content,
            links: [...document.querySelectorAll('a[href]')].map((link) => link.getAttribute('href')),
            missingAnchors: [...document.querySelectorAll('a[href^="#"]')]
              .map((link) => link.getAttribute('href'))
              .filter((href) => href.length > 1 && !document.getElementById(href.slice(1))),
          }));
          assert.equal(data.lang, locale);
          assert.equal(await page.locator('h1').count(), 1);
          assert.ok(data.description?.length > 30);
          assert.equal(titles.has(data.title), false, 'Duplicate page title');
          titles.add(data.title);
          assert.match(data.robots, /^index, follow/);
          const canonical = new URL(data.canonical);
          assert.equal(canonical.protocol, 'https:');
          assert.equal(canonical.pathname, path);
          assert.equal(data.alternates[locale], data.canonical);
          const family = index < 5 ? core : guides;
          const familyIndex = index < 5 ? index : index - 5;
          for (const other of locales) {
            assert.equal(new URL(data.alternates[other]).pathname, family[other][familyIndex]);
            assert.equal(new URL(data.alternates[other]).origin, canonical.origin);
            assert.equal(await page.locator(`.header-actions .language-link[lang="${other}"]`).getAttribute('href'), family[other][familyIndex]);
            assert.equal(await page.locator(`.site-footer .language-link[lang="${other}"]`).getAttribute('href'), family[other][familyIndex]);
          }
          assert.equal(data.alternates['x-default'], data.alternates.fr);
          const webpage = data.graph.find((node) => node['@id'] === `${data.canonical}#webpage`);
          assert.equal(webpage.inLanguage, locale);
          assert.equal(webpage.url, data.canonical);
          if (index >= 5) assert.equal(webpage['@type'], 'MedicalWebPage');
          const physician = data.graph.find((node) => node['@type'] === 'Physician');
          assert.equal(physician.address.addressLocality, 'Mamer');
          assert.equal(physician.address.addressCountry, 'LU');
          assert.equal('openingHours' in physician || 'openingHoursSpecification' in physician, false);
          assert.equal('aggregateRating' in physician, false);
          const breadcrumb = data.graph.find((node) => node['@type'] === 'BreadcrumbList');
          if (index !== 0) assert.equal(breadcrumb.itemListElement.at(-1).item, data.canonical);
          assert.ok(Number(data.ogWidth) > 0);
          assert.equal((await api.get(new URL(data.ogImage).pathname)).status(), 200);
          assert.deepEqual(data.missingAnchors, []);
          data.links.filter((href) => href.startsWith('/')).forEach((href) => internalLinks.add(href.split('#')[0]));
        } finally {
          await context.close();
        }
      });
    }
  }

  await check('all discovered internal destinations resolve', async () => {
    for (const path of internalLinks) assert.equal((await api.get(path)).status(), 200, path);
  });

  for (const locale of locales) {
    for (const [index, path] of guides[locale].entries()) {
      for (const size of sizes) {
        await check(`care guide layout ${path} ${size.width}px`, async () => {
          const context = await browser.newContext(contextOptions(size));
          const page = await context.newPage();
          const errors = [];
          page.on('pageerror', (error) => errors.push(error.message));
          page.on('response', (response) => {
            if (response.url().startsWith(base) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
          });
          try {
            await page.goto(base + path, { waitUntil: 'domcontentloaded' });
            await page.evaluate(() => document.fonts.ready);
            assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'Horizontal page overflow');
            const clipped = await page.locator('main h1, .guide-section h2, .guide-next h2, .guide-content p, .guide-sidebar a, .guide-next a')
              .evaluateAll((elements) => elements.filter((element) => {
                if (element.clientWidth <= 0) return false;
                const bounds = element.getBoundingClientRect();
                const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
                while (walker.nextNode()) {
                  const node = walker.currentNode;
                  if (!node.textContent.trim() || node.parentElement.closest('svg')) continue;
                  const range = document.createRange();
                  range.selectNodeContents(node);
                  if ([...range.getClientRects()].some((rect) => rect.right > bounds.right + 2 || rect.left < bounds.left - 2)) return true;
                }
                return false;
              }).map((element) => ({ text: element.textContent.trim(), width: element.clientWidth, scroll: element.scrollWidth })));
            assert.deepEqual(clipped, [], 'Clipped guide text or links');
            assert.equal(await page.locator('.desktop-nav [data-nav-page="expertise"]').getAttribute('aria-current'), 'page');
            assert.equal(await page.locator('.guide-content .guide-section').count(), 5);
            assert.ok(await page.locator('.booking-options a[href*="doctena.lu"]').count());
            assert.ok(await page.locator('.booking-options a[href*="doctipro.lu"]').count());
            assert.equal(await page.locator('.guide-related a').count(), 2);
            const question = page.locator('.guide-question').first();
            await question.locator('summary').focus();
            await page.keyboard.press('Enter');
            assert.equal(await question.locator('div').isVisible(), true);
            await page.keyboard.press('Enter');
            assert.equal(await question.locator('div').isVisible(), false);
            if ([375, 768].includes(size.width)) {
              const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
              assert.deepEqual(axe.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) })), []);
            }
            if ([375, 768, 1366].includes(size.width)) {
              await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
              const file = `${output}/${locale}-${index}-${size.width}.png`;
              await page.screenshot({ path: file, fullPage: true });
              report.screenshots.push(file);
              await page.screenshot({ path: file.replace('.png', '-top.png') });
              await page.locator('.guide-content .guide-section').first().evaluate((element) => {
                const line = document.querySelector('header').getBoundingClientRect().height + 24;
                scrollTo({ top: scrollY + element.getBoundingClientRect().top - line, behavior: 'instant' });
              });
              await page.screenshot({ path: file.replace('.png', '-article.png') });
            }
            assert.deepEqual(errors, []);
          } finally {
            await context.close();
          }
        });
      }
    }
  }

  for (const size of sizes.filter(({ width }) => [375, 768, 1366].includes(width))) {
    for (let index = 0; index < guides.en.length; index++) {
      await check(`guide language switch keeps article position and disclosure ${index} ${size.width}px`, async () => {
        const context = await browser.newContext(contextOptions(size));
        const page = await context.newPage();
        try {
          await page.goto(base + guides.en[index], { waitUntil: 'domcontentloaded' });
          await page.evaluate(() => document.fonts.ready);
          await page.evaluate(() => {
            document.querySelector('.guide-question').open = true;
            const target = document.querySelector('.guide-section:nth-child(2) h2');
            const line = document.querySelector('header').getBoundingClientRect().height + 16;
            scrollTo({ top: scrollY + target.getBoundingClientRect().top - line, behavior: 'instant' });
          });
          for (const locale of ['lb', 'fr', 'en']) {
            await page.locator(`.header-actions .language-link[lang="${locale}"]`).click();
            await page.waitForURL(base + guides[locale][index], { waitUntil: 'domcontentloaded' });
            await page.evaluate(() => document.fonts.ready);
            await page.waitForFunction(() => {
              const target = document.querySelector('.guide-section:nth-child(2) h2');
              const line = document.querySelector('header').getBoundingClientRect().height + 16;
              return Math.abs(target.getBoundingClientRect().top - line) < 12;
            });
            assert.equal(await page.locator('.guide-question').first().evaluate((element) => element.open), true);
          }
          await page.locator('.home-back-control').click();
          await page.waitForURL(base + '/en/');
        } finally {
          await context.close();
        }
      });
    }
  }

  await check('care content, links and disclosures work without JavaScript', async () => {
    const context = await browser.newContext({ ...contextOptions(sizes[1]), javaScriptEnabled: false });
    const page = await context.newPage();
    try {
      for (const path of Object.values(guides).flat()) {
        assert.equal((await page.goto(base + path, { waitUntil: 'domcontentloaded' })).status(), 200);
        assert.equal(await page.locator('main h1').isVisible(), true);
        assert.equal(await page.locator('.guide-section').first().isVisible(), true);
        await page.locator('.guide-question summary').first().click();
        assert.equal(await page.locator('.guide-question div').first().isVisible(), true);
        assert.ok(await page.locator('a[href*="doctena.lu"]').count());
      }
    } finally {
      await context.close();
    }
  });
} finally {
  await browser.close();
  await api.dispose();
  await writeFile('qa/screenshots/seo-report.json', JSON.stringify(report, null, 2) + '\n');
}

console.log(`${report.passed.length} SEO/care checks passed; ${report.failures.length} failed.`);
if (report.failures.length) process.exitCode = 1;
