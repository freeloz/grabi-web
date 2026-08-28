export interface Dict {
  meta: { title: string; description: string; changelogTitle: string; changelogDesc: string; pressTitle: string; pressDesc: string };
  nav: { how: string; features: string; compare: string; cloud: string; faq: string; download: string; theme: string; language: string };
  hero: {
    title: string; sub: string; cta: string; meta: string; github: string;
    demoWindow: string; demoPlay: string; demoEnd: string; demoReplay: string;
    notifTitle: string; notifMeta: string; selfie: string;
    panel: { screen: string; camera: string; mic: string; system: string; record: string };
    recBadgeLabel: string;
    slide: { window: string; title: string; sun: string; water: string; co2: string };
  };
  trust: string[];
  how: { eyebrow: string; title: string; steps: { title: string; text: string }[]; closing: string };
  features: {
    eyebrow: string; title: string;
    blocks: { eyebrow: string; title: string; text: string }[];
    shortcutRecord: string; shortcutPause: string;
    quality: { standard: string; sharp: string };
    capture: { screen: string; window: string; region: string };
  };
  usecases: { eyebrow: string; title: string; cards: { title: string; text: string }[] };
  compare: { eyebrow: string; title: string; note: string; rows: { label: string; cells: string[] }[] };
  privacy: { eyebrow: string; title: string; items: { title: string; text: string }[]; footnote: string };
  oss: { eyebrow: string; title: string; code: string; contribute: string; bug: string };
  donate: { title: string; coffee: string; sponsors: string };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  cloud: {
    eyebrow: string; title: string; text: string;
    placeholder: string; button: string;
    success: string; invalid: string; error: string; privacy: string;
    more: string;
  };
  cloudPage: {
    metaTitle: string; metaDesc: string;
    eyebrow: string; title: string; sub: string;
    optIn: { title: string; text: string };
    steps: { title: string; text: string }[];
    plansTitle: string; plansSub: string;
    monthly: string; annual: string; annualNote: string;
    perMonth: string; perYear: string;
    free: { name: string; price: string; note: string; features: string[] };
    pro: { name: string; badge: string; monthly: string; annual: string; features: string[] };
    student: { name: string; monthly: string; annual: string; note: string; features: string[] };
    cta: string; ctaNote: string;
    faqTitle: string;
    faq: { q: string; a: string }[];
  };
  cta: { title: string; button: string; meta: string };
  footer: {
    tagline: string; product: string; download: string; cloudLink: string; changelog: string; roadmap: string; faq: string;
    resources: string; github: string; press: string; bug: string; donate: string; contact: string;
    legal: string; honesty: string;
  };
  changelog: { title: string; intro: string; entries: { version: string; date: string; notes: string[] }[] };
  press: {
    title: string; intro: string; kit: string; assetsTitle: string;
    logoLight: string; logoDark: string; wordmark: string; icon: string;
    boilerplateTitle: string; boilerplate: string; rulesTitle: string; rules: string[];
  };
  notFound: { text: string; button: string };
  a11y: { themeToggle: string; langSelector: string; skip: string; demoRegion: string };
}
