import type { APIRoute } from 'astro';
import { siteSettings } from '../config/practice';

export const prerender = true;

export const GET: APIRoute = () => new Response(
  // Crawl access is intentional: crawlers must be able to read preview noindex tags.
  `User-agent: *\nAllow: /\n${siteSettings.indexable ? `\nSitemap: ${siteSettings.origin}/sitemap.xml\n` : ''}`,
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
