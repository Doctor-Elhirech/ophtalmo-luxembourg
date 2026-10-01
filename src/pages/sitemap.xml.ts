import type { APIRoute } from 'astro';
import { siteSettings } from '../config/practice';
import { absoluteUrl, seoRoutes, xmlEscape } from '../config/seo';

export const prerender = true;

export const GET: APIRoute = () => {
  // Preview builds have no indexable URLs. Production always uses the stable origin.
  const entries = siteSettings.indexable
    ? seoRoutes.map(({ path }) => `  <url><loc>${xmlEscape(absoluteUrl(path))}</loc></url>`).join('\n')
    : '';
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
