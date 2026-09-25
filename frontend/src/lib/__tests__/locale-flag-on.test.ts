import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { SEO } from '@/lib/constants';

/**
 * Production runs with `NEXT_PUBLIC_LOCALE_PREFIX_ENABLED="true"`, but Vitest
 * never sets it, so every other suite in this repo exercises the *dormant*
 * flag-off path — including the pin in metadata-lengths.test.ts that asserts
 * `ms-MY` is absent. This file is that pin's flag-on twin: it stubs the env
 * var, resets the module registry, and re-imports the modules that read the
 * flag at module scope, so the code path production actually runs has at
 * least one non-skippable proof. See final-review.md I2.
 *
 * `vi.resetModules()` in both hooks is load-bearing: `routes.ts` captures
 * `LOCALE_PREFIX_ENABLED` once at evaluation time, so the stub only takes
 * effect on a fresh evaluation — and the registry must be cleared again
 * afterwards so the flag-off suites don't inherit these instances.
 */
describe('locale prefix flag ON', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_LOCALE_PREFIX_ENABLED', 'true');
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('exposes the flag as on', async () => {
    const { LOCALE_PREFIX_ENABLED } = await import('@/lib/i18n/routes');
    expect(LOCALE_PREFIX_ENABLED).toBe(true);
  });

  it('localeHref prefixes Malay paths and leaves English bare', async () => {
    const { localeHref } = await import('@/lib/i18n/routes');
    expect(localeHref('ms', '/faq')).toBe('/ms/faq');
    expect(localeHref('ms', '/')).toBe('/ms');
    expect(localeHref('ms', '/loans/personal')).toBe('/ms/loans/personal');
    expect(localeHref('en', '/faq')).toBe('/faq');
    // Idempotent: re-prefixing an already-prefixed path must not double it,
    // and switching back to English must strip it.
    expect(localeHref('ms', '/ms/faq')).toBe('/ms/faq');
    expect(localeHref('en', '/ms/faq')).toBe('/faq');
  });

  it('localeAlternates emits a reciprocal ms-MY hreflang and a /ms canonical', async () => {
    const { localeAlternates } = await import('@/lib/seo');

    const ms = localeAlternates('ms', '/about');
    expect(ms.canonical).toBe(`${SEO.url}/ms/about`);
    expect(ms.languages).toHaveProperty('ms-MY', `${SEO.url}/ms/about`);
    expect(ms.languages).toHaveProperty('en-MY', `${SEO.url}/about`);
    expect(ms.languages).toHaveProperty('x-default', `${SEO.url}/about`);

    // Reciprocal: the English side advertises the same pair.
    const en = localeAlternates('en', '/about');
    expect(en.canonical).toBe(`${SEO.url}/about`);
    expect(en.languages).toHaveProperty('ms-MY', `${SEO.url}/ms/about`);
  });

  // Flag-on twin of metadata-lengths.test.ts's
  // "keeps ms hreflang out of alternates.languages while the locale-prefix
  // flag is off" — same call, opposite expectation.
  it('buildMetadata puts ms hreflang IN alternates.languages and canonicalises to /ms', async () => {
    const { buildMetadata } = await import('@/lib/seo');
    const path = '/sample-page';
    const result = buildMetadata({
      title: 'Sample Page Title',
      description:
        'A representative description used to exercise buildMetadata in isolation from any route.',
      path,
      locale: 'ms',
    });

    expect(result.alternates?.languages).toHaveProperty('ms-MY', `${SEO.url}/ms${path}`);
    expect(result.alternates?.canonical).toBe(`${SEO.url}/ms${path}`);
    // og:url must follow the Malay canonical, not the bare English path.
    expect(result.openGraph?.url).toBe(`${SEO.url}/ms${path}`);
    expect(result.openGraph?.locale).toBe('ms_MY');
  });
});
