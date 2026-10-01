import { readFile } from 'node:fs/promises';
import { loadEnv } from 'vite';
import { resolveSiteSettings } from '../src/config/site.mjs';

// This is public ownership proof, not a credential. Run explicitly after deployment,
// never as part of a build: only already-published sitemap URLs are submitted.
const key = 'be56cf9e2c52471d996d4ebbc9fa204d';
const environment = { ...loadEnv('production', process.cwd(), ''), ...process.env };
const { origin, indexable } = resolveSiteSettings(environment);

function decodeXml(value) {
  return value.replace(/&(amp|lt|gt|quot|apos);/g, (_, entity) => ({
    amp: '&', lt: '<', gt: '>', quot: '"', apos: "'",
  })[entity]);
}

async function publishedText(path) {
  const response = await fetch(new URL(path, origin), {
    redirect: 'error',
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`${path} is not publicly available (HTTP ${response.status}). Deploy it before submitting.`);
  return response.text();
}

async function submit() {
  if (!indexable || new URL(origin).protocol !== 'https:') {
    throw new Error('IndexNow submission requires an indexable HTTPS production site.');
  }

  const localKey = (await readFile(new URL(`../public/${key}.txt`, import.meta.url), 'utf8')).trim();
  if (localKey !== key) throw new Error('The public ownership file does not match the submission key.');

  const [publishedKey, sitemap] = await Promise.all([
    publishedText(`/${key}.txt`),
    publishedText('/sitemap.xml'),
  ]);
  if (publishedKey.trim() !== key) throw new Error('The ownership key is not deployed on the configured production domain.');
  if (!/<urlset\b/.test(sitemap) || !sitemap.includes('http://www.sitemaps.org/schemas/sitemap/0.9')) {
    throw new Error('The production response is not the expected URL sitemap.');
  }

  const urlList = [...new Set([...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)]
    .map((match) => decodeXml(match[1]).trim()))];
  if (!urlList.length || urlList.length > 10_000) {
    throw new Error('The published sitemap must contain between 1 and 10,000 canonical page URLs.');
  }
  for (const value of urlList) {
    const url = new URL(value);
    if (url.origin !== origin || url.username || url.password || url.search || url.hash) {
      throw new Error('The published sitemap contains a URL outside the configured canonical origin or an unexpected URL variant.');
    }
  }

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(origin).hostname, key, keyLocation: `${origin}/${key}.txt`, urlList }),
    signal: AbortSignal.timeout(20_000),
  });
  if (![200, 202].includes(response.status)) {
    throw new Error(`IndexNow returned HTTP ${response.status}. No indexing success can be inferred.`);
  }
  console.log(`IndexNow received ${urlList.length} published URLs for ${origin} (HTTP ${response.status}).`);
  console.log(response.status === 202
    ? 'Ownership verification is pending. Receipt does not guarantee crawling, indexing or ranking.'
    : 'Receipt does not guarantee crawling, indexing or ranking.');
}

submit().catch((error) => {
  console.error(error instanceof Error ? error.message : 'IndexNow submission failed.');
  process.exitCode = 1;
});
