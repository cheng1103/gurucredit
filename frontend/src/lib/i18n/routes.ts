import type { Language } from './translations';

export const LOCALE_PREFIX_ENABLED =
  process.env.NEXT_PUBLIC_LOCALE_PREFIX_ENABLED === 'true';

export const SUPPORTED_LOCALES = ['en', 'ms'] as const;

// English is the default locale and lives at un-prefixed paths (`/about`).
// Only non-default locales get a URL prefix (`/ms/about`).
export const DEFAULT_LOCALE: Language = 'en';

/**
 * Produce a locale-aware href.
 *
 * When `NEXT_PUBLIC_LOCALE_PREFIX_ENABLED` is not `"true"` this returns the
 * path unchanged — matching the cookie-only routing — so it is safe to sprinkle
 * across the codebase ahead of the URL migration.
 *
 * When the flag is on:
 *   - the default locale (`en`) stays un-prefixed: `/about`
 *   - other locales are prefixed: `/ms/about`, and `/` becomes `/ms`
 *   - idempotent and strips any existing locale prefix before re-prefixing
 */
export function localeHref(locale: Language, path: string): string {
  if (!LOCALE_PREFIX_ENABLED) return path;

  // Normalise: drop any existing locale prefix so we start from the bare path.
  const stripped = path.replace(/^\/(en|ms)(?=\/|$)/, '') || '/';

  if (locale === DEFAULT_LOCALE) {
    return stripped;
  }

  if (stripped === '/') return `/${locale}`;
  return `/${locale}${stripped}`;
}

/**
 * Typed registry of internal routes. Use instead of raw string hrefs so a
 * future URL change (e.g. `/services` → `/loan-services`) is one edit.
 *
 * Static paths are strings. Dynamic paths are builder functions.
 */
export const PATHS = {
  home: '/',

  // primary
  about: '/about',
  contact: '/contact',
  faq: '/faq',
  services: '/services',
  servicesSuccess: '/services/success',
  servicesApply: (id: string) => `/services/${id}/apply`,
  eligibilityTest: '/eligibility-test',

  // loan products
  loans: {
    personal: '/loans/personal',
    emergency: '/loans/emergency',
    debtConsolidation: '/loans/debt-consolidation',
  },
  loansRegion: (slug: string) => `/loans/my/${slug}`,

  // guides
  loanGuides: '/loan-guides',
  loanGuide: {
    creditScore: '/loan-guides/credit-score',
    debtConsolidation: '/loan-guides/debt-consolidation',
    ccrisCtos: '/loan-guides/ccris-ctos',
    loanRejectionRecovery: '/loan-guides/loan-rejection-recovery',
    selfEmployedIncomeProof: '/loan-guides/self-employed-income-proof',
    topic: (slug: string) => `/loan-guides/topics/${slug}`,
  },

  // tools
  tools: '/tools',
  toolsCompare: '/tools/compare',

  // info
  compare: '/compare',
  verifyUs: '/verify-us',
  editorialPolicy: '/editorial-policy',
  reviewMethodology: '/review-methodology',
  serviceAreas: '/service-areas',
  documents: '/documents',
  glossary: '/glossary',
  partners: '/partners',
  blog: '/blog',
  blogPost: (slug: string) => `/blog/${slug}`,
  status: '/status',

  // legal
  privacy: '/privacy',
  terms: '/terms',
  disclaimer: '/disclaimer',
} as const;
