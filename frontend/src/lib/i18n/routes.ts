import type { Language } from './translations';

export const LOCALE_PREFIX_ENABLED =
  process.env.NEXT_PUBLIC_LOCALE_PREFIX_ENABLED === 'true';

export const SUPPORTED_LOCALES = ['en', 'ms'] as const;

/**
 * Produce a locale-aware href.
 *
 * When `NEXT_PUBLIC_LOCALE_PREFIX_ENABLED` is not `"true"` this returns the
 * path unchanged — matching the current cookie-based routing — so it is
 * safe to sprinkle across the codebase ahead of the full URL migration.
 *
 * When the flag is on:
 *   - `/` becomes `/{locale}`
 *   - Idempotent: passing an already-prefixed path is a no-op
 *   - Strips a mismatched locale prefix before re-prefixing
 */
export function localeHref(locale: Language, path: string): string {
  if (!LOCALE_PREFIX_ENABLED) return path;

  if (path === '/' || path === '') return `/${locale}`;

  if (path === `/${locale}` || path.startsWith(`/${locale}/`)) {
    return path;
  }

  const stripped = path.replace(/^\/(en|ms)(?=\/|$)/, '');
  return `/${locale}${stripped || ''}`;
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
