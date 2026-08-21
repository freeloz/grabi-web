<p align="center">
  <img src="public/favicon.svg" width="72" alt="Grabi mascot" />
</p>

# grabi-web

The official website for **[Grabi](https://grabi.net)** — the no-drama, free
and open-source screen recorder for macOS, made by [Freeloz](https://github.com/freeloz).

**https://grabi.net** · English (default) · Español · Português · Français · Deutsch

## Stack

- [Astro 5](https://astro.build) — fully static output; the only JavaScript
  shipped is three tiny inline scripts (theme toggle, hero demo, GitHub stars)
- Design tokens from the approved Grabi brand manual as CSS custom properties
  (light + dark via `prefers-color-scheme` **and** a manual toggle)
- Native Astro i18n with per-language routes and `hreflang`
- Deployed on Cloudflare Workers (static assets) with CI/CD from GitHub Actions

## Run it locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static build into dist/
```

No environment variables are required to develop. Analytics (GA4 / Clarity)
only activate when `PUBLIC_GA4_ID` / `PUBLIC_CLARITY_ID` are present at build
time — see `.env.example`. **Never commit real IDs or tokens.**

## Contributing

Issues and PRs welcome — see [CONTRIBUTING.md](CONTRIBUTING.md). Translation
fixes are especially appreciated: all copy lives in `src/i18n/`.

## License

[MIT](LICENSE) © Freeloz

---

## En español

Sitio oficial de **Grabi**, el grabador de pantalla gratuito y de código
abierto para macOS que es lo contrario de OBS: abres, presionas el punto
rojo, listo.

- **Correr en local**: `npm install && npm run dev`
- **Textos**: todo el copy vive en `src/i18n/` (5 idiomas). El español y la
  voz de la marca son la fuente de verdad del diseño aprobado.
- **Diseño**: los tokens (colores, tipografía, espaciado) vienen del manual
  de marca de Grabi y viven en `src/styles/tokens.css` — nada hardcodeado
  fuera de ahí.
