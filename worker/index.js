/* Tiny API + edge language routing in front of the static site.
   - /api/waitlist: la lista de espera de Grabi Cloud (D1).
   - /: redirige al idioma del navegador la primera vez (302, nunca 301:
     la preferencia puede cambiar). Respeta la elección manual del usuario
     (cookie grabi-lang) y deja pasar a los bots, para no romper el SEO —
     cada versión ya se indexa por su hreflang. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LOCALES = new Set(['en', 'es', 'pt', 'fr', 'de']);

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

/** Mejor idioma soportado según Accept-Language, respetando el peso q. */
export function pickLanguage(header) {
  if (!header) return null;
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      return { code: tag.trim().slice(0, 2).toLowerCase(), q: q ? Number(q.split('=')[1]) : 1 };
    })
    .filter((entry) => entry.code && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);
  for (const { code } of ranked) if (LOCALES.has(code)) return code;
  return null;
}

const readCookie = (request, name) => {
  const raw = request.headers.get('Cookie') || '';
  for (const part of raw.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return rest.join('=');
  }
  return null;
};

// Los crawlers ven siempre lo que pidieron: el hreflang ya les dice el resto.
const BOT = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora|pinterest|whatsapp|telegram|discord|slack|twitter|linkedin|headless|lighthouse|pagespeed/i;

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

    // --- idioma del navegador, solo en la raíz y solo la primera vez ---
    if (url.pathname === '/' || url.pathname === '') {
      const chosen = readCookie(request, 'grabi-lang');
      const agent = request.headers.get('User-Agent') || '';
      if (!chosen && !BOT.test(agent)) {
        const detected = pickLanguage(request.headers.get('Accept-Language'));
        if (detected && detected !== 'en') {
          return new Response(null, {
            status: 302,
            headers: {
              Location: `/${detected}${url.search}`,
              'Cache-Control': 'no-store',
              Vary: 'Accept-Language, Cookie',
            },
          });
        }
      }
      const response = await env.ASSETS.fetch(request);
      const withVary = new Response(response.body, response);
      withVary.headers.set('Vary', 'Accept-Language, Cookie');
      return withVary;
    }

    return env.ASSETS.fetch(request);
  },
};
