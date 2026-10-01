/** Stable production URL; generated deployment URLs must never become canonical. */
export const defaultSiteOrigin = 'https://ophtalmo-luxembourg.vercel.app';

/**
 * Shared by Astro configuration, static endpoints and deployment helpers.
 * @param {Record<string, string | boolean | undefined>} environment
 */
export function resolveSiteSettings(environment = {}) {
  const configuredOrigin = String(environment.PUBLIC_SITE_ORIGIN || defaultSiteOrigin).trim();
  const url = new URL(configuredOrigin);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password ||
      url.pathname !== '/' || url.search || url.hash) {
    throw new Error('PUBLIC_SITE_ORIGIN must be an absolute website origin, without a path, credentials or query.');
  }

  const development = environment.DEV === true || environment.NODE_ENV === 'development';
  const preview = Boolean(
    (environment.VERCEL_ENV && environment.VERCEL_ENV !== 'production') ||
    (environment.VERCEL_TARGET_ENV && environment.VERCEL_TARGET_ENV !== 'production') ||
    (environment.CONTEXT && environment.CONTEXT !== 'production'),
  );
  const localOrigin = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  const explicitlyDisabled = ['false', '0', 'no'].includes(
    String(environment.PUBLIC_SITE_INDEXABLE ?? '').trim().toLowerCase(),
  );

  if (!development && !localOrigin && url.protocol !== 'https:') {
    throw new Error('The public production origin must use HTTPS.');
  }

  return {
    origin: url.origin,
    // Production is now indexable. Development and branch previews remain excluded.
    indexable: !development && !preview && !localOrigin && !explicitlyDisabled,
    localOnly: !environment.VERCEL && !environment.NETLIFY,
  };
}
