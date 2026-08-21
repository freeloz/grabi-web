# Contributing to grabi-web

Thanks for helping make Grabi's website better! A few ground rules keep
everything smooth:

## Quick start

```bash
npm install
npm run dev
```

## What we welcome

- **Translation fixes** — copy lives in `src/i18n/*.ts`. Keep the brand
  voice: warm, simple, honest. No robotic literal translations.
- **Bug fixes** — broken layout, accessibility issues, performance.
- **Design fidelity** — the site must match the approved design system
  (`src/styles/tokens.css` is the source of truth; never hardcode colors,
  spacing or typography outside tokens).

## What to ask about first (open an issue)

- New sections or content changes — the copy is part of the approved design.
- New dependencies — the site is deliberately almost zero-JS.

## Pull requests

1. Fork, branch from `main` (`fix/…` or `feat/…`).
2. Small, focused PRs with clear English commit messages.
3. `npm run build` must pass. Check your change in light *and* dark mode,
   and in German (longest strings) if you touched layout.
4. Never include secrets, analytics IDs, or tokens — CI injects them.

## Code of conduct

Be kind. We're here to help people record their screens without drama.
