/* Central site configuration. Every external link and downloadable lives
   here — change once, applies everywhere. Analytics IDs come from env and
   are optional (the site works without them). */
export const SITE = {
  url: 'https://grabi.net',
  email: 'hola@grabi.net',

  // Download — TODO: point to the public GitHub release when it exists.
  downloadUrl: import.meta.env.PUBLIC_DOWNLOAD_URL ?? 'https://github.com/freeloz/grabi/releases/latest',
  version: '0.1.2',
  size: '~2 MB',
  requires: 'macOS 13+',

  // TODO: flip to the public app repo when it opens (design: freeloz/grabi).
  githubApp: 'https://github.com/freeloz/grabi',
  githubWeb: 'https://github.com/freeloz/grabi-web',
  githubIssues: 'https://github.com/freeloz/grabi/issues/new/choose',

  // Donations — TODO: real handles.
  coffee: 'https://buymeacoffee.com/freeloz',
  sponsors: 'https://github.com/sponsors/freeloz',

  // Social — TODO: real profiles (design lists YouTube · X · Mastodon).
  youtube: 'https://youtube.com/@grabi_app',
  twitter: 'https://x.com/grabi_app',
  mastodon: 'https://mastodon.social/@grabi',

  ga4: import.meta.env.PUBLIC_GA4_ID as string | undefined,
  clarity: import.meta.env.PUBLIC_CLARITY_ID as string | undefined,
} as const;

export const LOCALES = ['en', 'es', 'pt', 'fr', 'de'] as const;
export type Locale = (typeof LOCALES)[number];

export function pathFor(locale: Locale, page = ''): string {
  const base = locale === 'en' ? '' : `/${locale}`;
  return `${base}/${page}`.replace(/\/+$/, '') || '/';
}
