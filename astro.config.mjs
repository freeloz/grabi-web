// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static-first: the whole site is prerendered HTML/CSS. The only JavaScript
// shipped is three tiny inline scripts (theme toggle, hero demo, GitHub stars).
export default defineConfig({
  site: 'https://grabi.net',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'pt', 'fr', 'de'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es', pt: 'pt', fr: 'fr', de: 'de' },
      },
    }),
  ],
});
