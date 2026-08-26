/* Tiny API in front of the static site. Today it only handles the Grabi Cloud
   waitlist; everything else falls through to the prebuilt assets. Runs only
   for /api/* (see assets.run_worker_first in wrangler.jsonc), so the static
   site keeps its zero-Worker-invocation path. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LOCALES = new Set(['en', 'es', 'pt', 'fr', 'de']);

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/waitlist') {
      if (request.method !== 'POST') return json({ ok: false }, 405);

      let body;
      try {
        body = await request.json();
      } catch {
        return json({ ok: false }, 400);
      }

      // Honeypot filled → a bot. Pretend success, store nothing.
      if (typeof body.website === 'string' && body.website !== '') return json({ ok: true });

      const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
      if (!EMAIL_RE.test(email) || email.length > 254) return json({ ok: false }, 400);
      const locale = LOCALES.has(body.locale) ? body.locale : 'en';

      await env.DB.prepare(
        'INSERT INTO waitlist (email, locale) VALUES (?1, ?2) ON CONFLICT(email) DO NOTHING'
      )
        .bind(email, locale)
        .run();

      return json({ ok: true });
    }

    if (url.pathname.startsWith('/api/')) return json({ ok: false }, 404);
    return env.ASSETS.fetch(request);
  },
};
