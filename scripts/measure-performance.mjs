import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

// Repeatable cold-load lab measurements, not real-user Core Web Vitals.
const base = (process.env.QA_URL || 'http://127.0.0.1:4321').replace(/\/$/, '');
const label = process.env.PERF_LABEL || 'current';
if (!/^[a-z0-9-]+$/i.test(label)) throw new Error('PERF_LABEL must be a simple filename label.');
const runs = Number(process.env.PERF_RUNS || 3);
if (!Number.isInteger(runs) || runs < 1) throw new Error('PERF_RUNS must be a positive integer.');
const output = `qa/screenshots/performance/${label}`;
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const profiles = [
  { name: 'phone', width: 375, height: 812, dpr: 2, cpu: 4 },
  { name: 'tablet', width: 768, height: 1024, dpr: 2, cpu: 4 },
  { name: 'laptop', width: 1366, height: 900, dpr: 1, cpu: 1 },
];
const measurements = [];
try {
  for (const profile of profiles) {
    for (const path of ['/', '/cabinet/', '/en/expertise/eye-examination/']) {
      for (let run = 1; run <= runs; run++) {
        const context = await browser.newContext({
          viewport: { width: profile.width, height: profile.height },
          deviceScaleFactor: profile.dpr,
        });
        try {
          const page = await context.newPage();
          const errors = [];
          page.on('pageerror', (error) => errors.push(error.message));
          await page.addInitScript(() => {
            window.__lab = { lcp: 0, lcpElement: '', cls: 0, blocking: 0 };
            new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                window.__lab.lcp = entry.startTime;
                window.__lab.lcpElement = entry.element?.className || entry.element?.tagName || '';
              }
            }).observe({ type: 'largest-contentful-paint', buffered: true });
            new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) window.__lab.cls += entry.value;
              }
            }).observe({ type: 'layout-shift', buffered: true });
            new PerformanceObserver((list) => {
              for (const entry of list.getEntries())
                window.__lab.blocking += Math.max(0, entry.duration - 50);
            }).observe({ type: 'longtask', buffered: true });
          });
          const cdp = await context.newCDPSession(page);
          await cdp.send('Network.enable');
          await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
          await cdp.send('Network.emulateNetworkConditions', {
            offline: false,
            latency: 150,
            downloadThroughput: 1_600_000 / 8,
            uploadThroughput: 750_000 / 8,
          });
          await cdp.send('Emulation.setCPUThrottlingRate', { rate: profile.cpu });
          const response = await page.goto(base + path, { waitUntil: 'load', timeout: 60_000 });
          if (response.status() !== 200) throw new Error(`${path}: HTTP ${response.status()}`);
          await page.evaluate(() => document.fonts.ready);
          await page.waitForTimeout(1500);
          const metrics = await page.evaluate(() => {
            const resources = performance
              .getEntriesByType('resource')
              .filter((entry) => new URL(entry.name).origin === location.origin);
            const navigation = performance.getEntriesByType('navigation')[0];
            const sum = (pattern) =>
              resources
                .filter((entry) => pattern.test(entry.name))
                .reduce((bytes, entry) => bytes + entry.encodedBodySize, 0);
            return {
              ...window.__lab,
              fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
              loaded: navigation.loadEventEnd,
              imageBytes: sum(/\.webp(?:\?|$)/),
              fontBytes: sum(/\.woff2(?:\?|$)/),
              cssBytes: sum(/\.css(?:\?|$)/),
              javascriptBytes: sum(/\.js(?:\?|$)/),
              images: [...document.querySelectorAll('.photo img')].map((image) => ({
                source: image.currentSrc ? new URL(image.currentSrc).pathname : null,
                renderedWidth: Math.round(image.getBoundingClientRect().width),
              })),
            };
          });
          if (errors.length) throw new Error(errors.join('\n'));
          measurements.push({ profile: profile.name, path, run, ...metrics });
          console.log(
            `${profile.name} ${path} run ${run}: LCP ${Math.round(metrics.lcp)}ms, CLS ${metrics.cls.toFixed(3)}, images ${metrics.imageBytes}B`,
          );
        } finally {
          await context.close();
        }
      }
    }
  }
  const report = {
    base,
    label,
    date: new Date().toISOString(),
    method:
      'Cold Chromium; 1.6 Mbps / 150ms latency; phone/tablet 4x CPU; laptop native CPU. Encoded resource body bytes as delivered by Astro preview. Three runs per page/profile by default.',
    measurements,
  };
  await writeFile(`${output}/measurements.json`, JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
