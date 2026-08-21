/* Central site configuration. Every external link and downloadable lives
   here — change once, applies everywhere. Analytics IDs come from env and
   are optional (the site works without them). */
export const SITE = {
  url: 'https://grabi.net',
  email: 'hola@grabi.net',

  // Download — served from R2 behind dl.grabi.net; `latest/` always points
  // to the newest DMG and publishes its SHA-256 alongside (.sha256 + latest.json).
  downloadUrl: import.meta.env.PUBLIC_DOWNLOAD_URL ?? 'https://dl.grabi.net/macos/latest/Grabi.dmg',
  version: '0.1.4',
  size: '~2 MB',
  requires: 'macOS 13+',

  githubRepoLive: true,
  githubApp: 'https://github.com/freeloz/grabi-macos',
  githubWeb: 'https://github.com/freeloz/grabi-web',
  githubIssues: 'https://github.com/freeloz/grabi-macos/issues/new',

  // Donations — TODO: paste the real URLs when the accounts exist.
  // Empty string = the UI hides that button/link (never a dead link).
  coffee: '',        // Buy Me a Coffee
  sponsors: '',      // GitHub Sponsors

  // Social — TODO: real profiles (design lists YouTube · X · Mastodon).
  // Empty string = hidden in the footer.
  youtube: '',
  twitter: '',
  mastodon: '',

  ga4: import.meta.env.PUBLIC_GA4_ID as string | undefined,
  clarity: import.meta.env.PUBLIC_CLARITY_ID as string | undefined,
} as const;

export const LOCALES = ['en', 'es', 'pt', 'fr', 'de'] as const;
export type Locale = (typeof LOCALES)[number];

export function pathFor(locale: Locale, page = ''): string {
  const base = locale === 'en' ? '' : `/${locale}`;
  return `${base}/${page}`.replace(/\/+$/, '') || '/';
}
