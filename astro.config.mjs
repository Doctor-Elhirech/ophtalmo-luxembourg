import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import { resolveSiteSettings } from './src/config/site.mjs';

const environment = { ...loadEnv(process.env.NODE_ENV || 'production', process.cwd(), ''), ...process.env };
const { origin } = resolveSiteSettings(environment);

export default defineConfig({
  site: origin,
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
