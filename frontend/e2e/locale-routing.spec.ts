import { test, expect, type APIRequestContext } from '@playwright/test';

const ORIGIN = 'https://guru-credit.com';

async function localePrefixEnabled(request: APIRequestContext): Promise<boolean> {
  const res = await request.get('/ms/glossary', { maxRedirects: 0 });
  return res.status() === 200;
}

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
