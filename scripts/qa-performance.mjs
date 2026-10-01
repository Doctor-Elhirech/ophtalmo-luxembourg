import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// Run against an existing production preview: QA_URL=http://127.0.0.1:4321
// These are regression assertions, not timed performance measurements.
const base = (process.env.QA_URL || 'http://127.0.0.1:4321').replace(/\/$/, '');
const origin = new URL(base).origin;
const manifest = JSON.parse(
  await readFile(new URL('../public/images/manifest.json', import.meta.url), 'utf8'),
);
const metadata = JSON.parse(
  await readFile(new URL('../src/config/image-metadata.json', import.meta.url), 'utf8'),
);
const variants = new Map(
  manifest.map((image) => [
    '/' + image.output.replaceAll('\\', '/').replace(/^public\//, ''),
    image,
  ]),
);
const profiles = [
  { name: 'phone', width: 375, height: 812, dpr: 2 },
  { name: 'tablet', width: 768, height: 1024, dpr: 2 },
  { name: 'laptop', width: 1366, height: 900, dpr: 1 },
];
const routes = {
  fr: ['/', '/medecin/', '/cabinet/'],
  en: ['/en/', '/en/doctor/', '/en/practice/'],
  lb: ['/lb/', '/lb/dokter/', '/lb/praxis/'],
};
const failures = [];
let passed = 0;
let photographs = 0;

async function check(name, run) {
  try {
    await run();
    passed++;
    console.log(`PASS ${name}`);
  } catch (error) {
    failures.push({ name, message: error.message });
    console.error(`FAIL ${name}: ${error.message}`);
  }
}

async function createPage(browser, profile, reducedMotion) {
  // Fresh contexts make duplicate font requests observable without a warm cache.
  const context = await browser.newContext({
    viewport: { width: profile.width, height: profile.height },
    deviceScaleFactor: profile.dpr,
    reducedMotion,
  });
  await context.route('**/*', (route) => {
    const url = new URL(route.request().url());
    const isMap =
      url.origin !== origin &&
      /(^|\.)(google\.[a-z.]+|googleapis\.com|gstatic\.com)$/.test(url.hostname) &&
      (/\/maps(?:\/|$)/.test(url.pathname) || url.hostname.startsWith('maps.'));
    return isMap ? route.abort() : route.continue();
  });
  const page = await context.newPage();
  page.setDefaultTimeout(10_000);
  page.setDefaultNavigationTimeout(45_000);
  const fontRequests = new Map();
  const errors = [];
  page.on('request', (request) => {
    if (/\.woff2(?:\?|$)/.test(request.url())) {
      fontRequests.set(request.url(), (fontRequests.get(request.url()) || 0) + 1);
    }
  });
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (new URL(response.url()).origin === origin && response.status() >= 400) {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });
  return { context, page, fontRequests, errors };
}

async function navigate(page, path) {
  const response = await page.goto(base + path, { waitUntil: 'load' });
  assert.equal(response?.status(), 200, `${path}: expected HTTP 200`);
  await page.evaluate(() => document.fonts.ready);
  // Let font-dependent initialization and any reading-position restoration finish.
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      }),
  );
}

async function scrollToPosition(page, top) {
  await page.evaluate(
    (position) =>
      new Promise((resolve) => {
        window.scrollTo({ top: position, behavior: 'instant' });
        requestAnimationFrame(() => requestAnimationFrame(resolve));
      }),
    top,
  );
}

async function checkPhotographs(page) {
  const images = page.locator('.photo img');
  assert.ok(await images.count(), 'No photographs found');
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element) => element.decode());
    const details = await image.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return {
        source: new URL(element.currentSrc).pathname,
        width: bounds.width,
        height: bounds.height,
        dpr: devicePixelRatio,
        fit: getComputedStyle(element).objectFit,
        hidden: element.hidden,
        naturalWidth: element.naturalWidth,
      };
    });
    assert.ok(!details.hidden && details.naturalWidth > 0, `Failed photograph: ${details.source}`);
    assert.ok(details.width > 0 && details.height > 0, `Empty photograph box: ${details.source}`);
    assert.equal(details.fit, 'cover', `Unexpected photograph fit: ${details.source}`);
    const emitted = variants.get(details.source);
    assert.ok(emitted, `Photograph missing from manifest: ${details.source}`);
    const original = metadata[emitted.slot];
    assert.ok(original?.height > 0, `Original dimensions missing: ${emitted.slot}`);
    assert.equal(
      original.width,
      emitted.originalWidth,
      `Manifest original width differs: ${emitted.slot}`,
    );
    const aspect = original.width / original.height;
    // Cover may scale the whole image wider than its visible box to fill its height.
    const required = Math.min(
      emitted.originalWidth,
      Math.max(details.width, details.height * aspect) * details.dpr,
    );
    // CSS fractional pixels and the encoder's integer output height can differ by a pixel.
    const rounding = Math.max(2, details.dpr * Math.max(1, aspect));
    assert.ok(
      emitted.width + rounding >= required,
      `${details.source}: ${emitted.width}px source is below ${required.toFixed(1)}px needed ` +
        `for ${details.width.toFixed(1)}×${details.height.toFixed(1)} cover at DPR ${details.dpr}`,
    );
    photographs++;
  }
}

async function checkFonts(page, fontRequests) {
  await page.evaluate(() => document.fonts.ready);
  const fonts = await page.evaluate(() => ({
    faces: [...document.fonts].map((face) => ({
      family: face.family.replace(/["']/g, ''),
      style: face.style,
      weight: face.weight,
      display: face.display,
      status: face.status,
    })),
    body: getComputedStyle(document.body).fontFamily,
    heading: getComputedStyle(document.querySelector('h1')).fontFamily,
    italic: getComputedStyle(document.querySelector('h1 em, h2 em')).fontFamily,
    preloads: [...document.querySelectorAll('link[rel="preload"][as="font"]')].map((link) => ({
      href: link.href,
      type: link.type,
      cors: link.hasAttribute('crossorigin'),
    })),
    resources: performance
      .getEntriesByType('resource')
      .filter((resource) => /\.woff2(?:\?|$)/.test(resource.name))
      .map((resource) => resource.name),
  }));
  assert.match(fonts.body, /Plus Jakarta Sans Variable/, 'Body family changed');
  assert.match(fonts.heading, /Literata Variable/, 'Heading family changed');
  assert.match(fonts.italic, /Literata Variable/, 'Italic family changed');
  const allowedFaces = new Map([
    ['Literata Variable normal', '200 900'],
    ['Literata Variable italic', '200 900'],
    ['Plus Jakarta Sans Variable normal', '200 800'],
  ]);
  const loaded = new Set();
  for (const face of fonts.faces) {
    const key = `${face.family} ${face.style}`;
    assert.equal(face.weight, allowedFaces.get(key), `Unexpected variable font face: ${key}`);
    assert.equal(face.display, 'swap', `Font display changed: ${key}`);
    if (face.status === 'loaded') loaded.add(key);
  }
  assert.deepEqual(
    [...loaded].sort(),
    [...allowedFaces.keys()].sort(),
    'Expected normal and italic fonts did not load',
  );
  assert.ok(fontRequests.size >= 3, 'Expected original normal and italic font resources');
  const allowedFiles =
    /(?:literata-latin(?:-ext)?-wght-(?:normal|italic)|plus-jakarta-sans-latin(?:-ext)?-wght-normal)(?:[.-][^/]*)?\.woff2$/;
  for (const [url, count] of fontRequests) {
    assert.match(new URL(url).pathname, allowedFiles, `Unexpected font binary: ${url}`);
    assert.equal(count, 1, `Font fetched more than once: ${url}`);
    assert.equal(
      fonts.resources.filter((resource) => resource === url).length,
      1,
      `Font resource was not completed once: ${url}`,
    );
  }
  // Preloads are optional: validate reuse if later performance work adds any.
  const preloadFiles = new Set();
  for (const preload of fonts.preloads) {
    const file = new URL(preload.href).pathname;
    assert.match(
      file,
      /(?:literata|plus-jakarta-sans)-latin-wght-normal(?:[.-][^/]*)?\.woff2$/,
      `Unexpected font preload: ${file}`,
    );
    assert.equal(preload.type, 'font/woff2');
    assert.ok(preload.cors, `Font preload missing crossorigin: ${file}`);
    assert.ok(!preloadFiles.has(preload.href), `Duplicate font preload: ${file}`);
    preloadFiles.add(preload.href);
    assert.equal(fontRequests.get(preload.href), 1, `Font preload was not reused: ${file}`);
  }
}

async function expectActivePage(page, expected) {
  await page.waitForFunction((name) => {
    const links = [...document.querySelectorAll('.nav-link.is-active[data-nav-page]')];
    return links.length === 2 && links.every((link) => link.dataset.navPage === name);
  }, expected);
}

async function expectSettledReadingArea(page) {
  // Bottom-edge content may await its entrance; central reading content must settle.
  await page.waitForFunction(
    () => {
      const top = document.querySelector('.site-header').getBoundingClientRect().bottom;
      const bar = document.querySelector('.mobile-contact-bar')?.getBoundingClientRect();
      const bottom = Math.min(innerHeight * 0.8, bar?.height ? bar.top : innerHeight);
      return [...document.querySelectorAll('.motion-target')].every((element) => {
        const bounds = element.getBoundingClientRect();
        if (bounds.bottom <= top || bounds.top >= bottom || !bounds.width || !bounds.height)
          return true;
        const style = getComputedStyle(element);
        return (
          !element.classList.contains('motion-pending') &&
          !element.classList.contains('motion-running') &&
          Number(style.opacity) >= 0.99 &&
          style.translate === 'none' &&
          style.scale === 'none'
        );
      });
    },
    undefined,
    { timeout: 5000 },
  );
}

async function checkNavigation(page) {
  await navigate(page, '/en/');
  await scrollToPosition(page, 0);
  await expectActivePage(page, 'home');
  assert.ok(
    await page.locator('.motion-target').count(),
    'Entrance enhancement did not initialize',
  );
  const sections = [
    ['doctor', 'doctor'],
    ['expertise', 'expertise'],
    ['practice', 'practice'],
    ['appointment', 'contact'],
  ];
  for (const [id, expected] of sections) {
    const position = await page
      .locator(`#${id}`)
      .evaluate(
        (element) =>
          scrollY +
          element.getBoundingClientRect().top -
          document.querySelector('.site-header').getBoundingClientRect().height -
          32,
      );
    await scrollToPosition(page, position);
    await expectActivePage(page, expected);
    await expectSettledReadingArea(page);
    const current = await page.evaluate(() => scrollY);
    await scrollToPosition(page, current + 24);
    await expectActivePage(page, expected);
  }
  await scrollToPosition(page, 0);
  await expectActivePage(page, 'home');
  await expectSettledReadingArea(page);
}

async function readJourney(page) {
  return page.locator('.journey-list li').evaluateAll((items) =>
    items.flatMap((item, index) => {
      const values = [Number(item.style.getPropertyValue('--circle-progress'))];
      if (index < items.length - 1)
        values.push(Number(item.style.getPropertyValue('--line-progress')));
      return values;
    }),
  );
}

async function checkJourney(page) {
  await navigate(page, '/en/practice/');
  await page.waitForFunction(() => {
    const items = [...document.querySelectorAll('.journey-list li')];
    return (
      items.length > 1 &&
      items.every((item) => item.style.getPropertyValue('--circle-progress') !== '')
    );
  });
  await scrollToPosition(page, 0);
  const initial = await readJourney(page);
  assert.ok(
    initial.every((value) => value === 0),
    'Journey should start empty before reaching it',
  );
  const range = await page.locator('.journey-list').evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    return {
      start: Math.max(0, scrollY + bounds.top - innerHeight),
      end: Math.min(document.documentElement.scrollHeight - innerHeight, scrollY + bounds.bottom),
    };
  });
  assert.ok(range.end > range.start, 'Journey has no scrollable travel');
  const samples = [];
  let previous = initial;
  for (let step = 0; step <= 12; step++) {
    const position = range.start + ((range.end - range.start) * step) / 12;
    await scrollToPosition(page, position);
    const values = await readJourney(page);
    assert.equal(values.length, initial.length);
    assert.ok(
      values.every(
        (value, index) =>
          Number.isFinite(value) && value >= 0 && value <= 1 && value >= previous[index] - 0.001,
      ),
      'Journey progress must rise as the reader scrolls forward',
    );
    samples.push({ position, values });
    previous = values;
  }
  assert.ok(
    previous.every((value) => value === 1),
    'Journey should finish after the last step',
  );
  assert.ok(
    samples.some(({ values }) => values.some((value) => value > 0 && value < 1)),
    'Journey should show intermediate progress',
  );
  for (const sample of samples.slice(0, -1).reverse()) {
    await scrollToPosition(page, sample.position);
    const values = await readJourney(page);
    assert.ok(
      values.every((value, index) => value <= previous[index] + 0.001),
      'Journey progress must reverse when scrolling back',
    );
    assert.ok(
      values.every((value, index) => Math.abs(value - sample.values[index]) < 0.01),
      'Journey should return to the same progress at the same position',
    );
    previous = values;
  }
  assert.ok(
    previous.every((value) => value === 0),
    'Journey should reset before reaching it',
  );
  await scrollToPosition(page, samples[Math.floor(samples.length / 2)].position);
  await expectSettledReadingArea(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => {
    const items = [...document.querySelectorAll('.journey-list li')];
    return (
      items.every(
        (item) =>
          item.style.getPropertyValue('--circle-progress') === '' &&
          item.style.getPropertyValue('--line-progress') === '',
      ) && !document.querySelector('.motion-pending, .motion-running')
    );
  });
  await page.waitForFunction(
    () =>
      [...document.querySelectorAll('.journey-number circle')].every(
        (circle) => Math.abs(parseFloat(getComputedStyle(circle).strokeDashoffset)) < 0.001,
      ) &&
      [...document.querySelectorAll('.journey-list li:not(:last-child)')].every(
        (item) =>
          Math.abs(new DOMMatrix(getComputedStyle(item, '::before').transform).m22 - 1) < 0.001,
      ),
  );
  await expectSettledReadingArea(page);
  await scrollToPosition(page, 0);
  assert.ok(
    await page
      .locator('.journey-list li')
      .evaluateAll((items) =>
        items.every(
          (item) =>
            item.style.getPropertyValue('--circle-progress') === '' &&
            item.style.getPropertyValue('--line-progress') === '',
        ),
      ),
    'Scrolling with reduced motion should keep the journey styles restored',
  );
}

const browser = await chromium.launch({ headless: true });
try {
  for (const profile of profiles) {
    for (const [locale, paths] of Object.entries(routes)) {
      for (const path of paths) {
        await check(`${profile.name} ${locale} ${path}: crop density and fonts`, async () => {
          const { context, page, fontRequests, errors } = await createPage(
            browser,
            profile,
            'reduce',
          );
          try {
            await navigate(page, path);
            assert.equal(await page.locator('html').getAttribute('lang'), locale);
            await checkPhotographs(page);
            await checkFonts(page, fontRequests);
            assert.deepEqual(errors, [], 'Local resource or JavaScript errors');
          } finally {
            await context.close();
          }
        });
      }
    }
    await check(`${profile.name} English: navigation and journey behavior`, async () => {
      const { context, page, errors } = await createPage(browser, profile, 'no-preference');
      try {
        await checkNavigation(page);
        await checkJourney(page);
        assert.deepEqual(errors, [], 'Local resource or JavaScript errors');
      } finally {
        await context.close();
      }
    });
  }
} finally {
  await browser.close();
}

console.log(
  `${passed} checks passed; ${failures.length} failed; ${photographs} photograph densities checked.`,
);
if (failures.length) process.exitCode = 1;
