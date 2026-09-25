import { test, expect } from '@playwright/test';
import { localePrefixEnabled } from './locale-helpers';

const ORIGIN = 'https://guru-credit.com';

test.describe('locale routing & hreflang', () => {
  test('English pages self-canonicalize', async ({ request }) => {
    const res = await request.get('/glossary');
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(html).toMatch(/<html[^>]+lang="en"/);
    expect(html).toContain(`rel="canonical" href="${ORIGIN}/glossary"`);
  });

  test('Malay prefix behaves correctly for the current flag state', async ({ request }) => {
    if (!(await localePrefixEnabled(request))) {
      // Dormant (production default): /ms must 404 and no ms hreflang is advertised.
      expect((await request.get('/ms/glossary', { maxRedirects: 0 })).status()).toBe(404);
      const en = await (await request.get('/glossary')).text();
      // No ms hreflang link tag (the JSON-LD inLanguage array legitimately lists ms-MY).
      expect(en).not.toMatch(/hreflang="ms-MY"/i);
      test.info().annotations.push({
        type: 'note',
        description: 'LOCALE_PREFIX disabled — verified dormant behavior',
      });
      return;
    }

    // Enabled: /ms/glossary renders Malay, self-canonical, with reciprocal hreflang.
    const html = await (await request.get('/ms/glossary')).text();
    expect(html).toMatch(/<html[^>]+lang="ms"/);
    expect(html).toContain(`rel="canonical" href="${ORIGIN}/ms/glossary"`);
    expect(html).toMatch(new RegExp(`hreflang="ms-MY" href="${ORIGIN}/ms/glossary"`, 'i'));
    expect(html).toMatch(new RegExp(`hreflang="en-MY" href="${ORIGIN}/glossary"`, 'i'));
    expect(html).toMatch(new RegExp(`hreflang="x-default" href="${ORIGIN}/glossary"`, 'i'));
  });

  test('internal links keep the visitor inside their locale', async ({ request }) => {
    test.skip(!(await localePrefixEnabled(request)), 'LOCALE_PREFIX disabled');

    const ms = await (await request.get('/ms/about')).text();
    expect(ms).toContain('href="/ms/services"');
    expect(ms).toContain('href="/ms/contact"');

    const en = await (await request.get('/about')).text();
    expect(en).toContain('href="/services"');
    expect(en).not.toContain('href="/ms/services"');
  });

  test('sitemap lists both locales when enabled', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text();
    if (await localePrefixEnabled(request)) {
      expect(xml).toContain(`${ORIGIN}/ms/about`);
      expect(xml).toMatch(new RegExp(`hreflang="ms-MY" href="${ORIGIN}/ms/about"`, 'i'));
    } else {
      expect(xml).not.toContain(`${ORIGIN}/ms/`);
    }
  });
});

// C1 regression (final-review.md): `/ms/<path>` is a REWRITE of `/<path>`, so
// Next's client router keys both locales on the same segment-cache node. A
// soft navigation between them re-renders the cached tree and discards the
// fresh RSC payload — the URL and `<html lang>` flip while the visible copy
// stays in the old language. Every cross-locale transition must therefore be
// a full document load (LanguageSwitcher: `window.location.assign`;
// LocaleSuggestBanner: a plain `<a href>`), and only asserting on the
// POST-CLICK DOM catches a regression: the pre-click `href` was always right.
test.describe('cross-locale navigation actually switches the rendered language', () => {
  test('switcher: /about → Bahasa Melayu lands on /ms/about in Malay', async ({ page, request }) => {
    test.skip(!(await localePrefixEnabled(request)), 'LOCALE_PREFIX disabled');

    await page.goto('/about');
    await expect(page.locator('h1')).toHaveText('About GURU Credits');

    await page.getByRole('button', { name: /English/ }).first().click();
    await page.getByRole('menuitem', { name: /Bahasa Melayu/ }).click();

    await page.waitForURL('**/ms/about');
    expect(new URL(page.url()).pathname).toBe('/ms/about');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ms');
    await expect(page.locator('h1')).toHaveText('Tentang GURU Credits');
  });

  test('switcher: /ms/about → English lands on /about in English', async ({ page, request }) => {
    test.skip(!(await localePrefixEnabled(request)), 'LOCALE_PREFIX disabled');

    await page.goto('/ms/about');
    await expect(page.locator('h1')).toHaveText('Tentang GURU Credits');

    await page.getByRole('button', { name: /Bahasa Melayu/ }).first().click();
    await page.getByRole('menuitem', { name: /English/ }).click();

    await page.waitForURL((url) => url.pathname === '/about');
    expect(new URL(page.url()).pathname).toBe('/about');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toHaveText('About GURU Credits');
  });

  test('banner: "Read in English" on /ms/faq with gc_pref=en lands on /faq in English', async ({
    page,
    context,
    baseURL,
    request,
  }) => {
    test.skip(!(await localePrefixEnabled(request)), 'LOCALE_PREFIX disabled');

    await context.addCookies([{ name: 'gc_pref', value: 'en', url: baseURL! }]);
    await page.goto('/ms/faq');
    await expect(page.locator('h1')).toHaveText('Soalan Lazim');

    // The banner's own dismiss control must be labelled in the page's
    // language (ms here), not the target language (final-review.md M4).
    await expect(page.getByRole('note').getByRole('button')).toHaveAttribute('aria-label', 'Tutup');

    await page.getByRole('link', { name: /Read in English/i }).click();

    await page.waitForURL((url) => url.pathname === '/faq');
    expect(new URL(page.url()).pathname).toBe('/faq');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toHaveText('Frequently Asked Questions');
  });
});
