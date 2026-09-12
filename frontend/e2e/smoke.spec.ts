import { test, expect } from '@playwright/test';
import { smokeRoutes } from '../src/lib/routes-for-smoke';

const ROUTES = smokeRoutes();

for (const route of ROUTES) {
  test(`${route} renders with one h1 and no console errors`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => consoleErrors.push(err.message));

    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(consoleErrors).toEqual([]);
  });
}

// Routes covering every migrated template (blog post, all loan guides + topic,
// services apply/success, editorial/review-methodology, and every listing/
// legal/loan/region page) — each must emit at most one BreadcrumbList, whether
// standalone or nested inside a WebPageJsonLd @graph.
const BREADCRUMB_ROUTES = [
  '/',
  '/blog',
  '/blog/personal-loan-malaysia-complete-guide-2026',
  '/loan-guides',
  '/loan-guides/self-employed-income-proof',
  '/loan-guides/ccris-ctos',
  '/loan-guides/loan-rejection-recovery',
  '/loan-guides/debt-consolidation',
  '/loan-guides/credit-score',
  '/loan-guides/topics/personal-loan-minimum-salary',
  '/tools',
  '/tools/compare',
  '/eligibility-test',
  '/service-areas',
  '/glossary',
  '/faq',
  '/documents',
  '/loans/personal',
  '/loans/debt-consolidation',
  '/loans/emergency',
  '/loans/my/selangor',
  '/about',
  '/partners',
  '/verify-us',
  '/services',
  '/services/1/apply',
  '/services/success',
  '/contact',
  '/status',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/editorial-policy',
  '/review-methodology',
];

for (const route of BREADCRUMB_ROUTES) {
  test(`${route} emits at most one BreadcrumbList`, async ({ page }) => {
    await page.goto(route);
    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const breadcrumbListCount = scripts.reduce((count, text) => {
      const normalised = JSON.stringify(JSON.parse(text));
      const matches = normalised.match(/"@type":"BreadcrumbList"/g);
      return count + (matches?.length ?? 0);
    }, 0);
    expect(breadcrumbListCount).toBe(1);
  });
}

test('/compare redirects permanently to /tools/compare', async ({ page }) => {
  const res = await page.request.get('/compare', { maxRedirects: 0 });
  expect(res.status()).toBe(308);
  expect(res.headers()['location']).toMatch(/\/tools\/compare$/);
});

test('/this-page-does-not-exist renders the 404 page with one h1', async ({ page }) => {
  const res = await page.goto('/this-page-does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveCount(1);
});

test('mobile sticky CTA appears below the hero on the homepage', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.mouse.wheel(0, 2000);
  const link = page.getByRole('link', { name: /Check eligibility/i });
  // The bar slides in after the hero leaves the viewport; toBeInViewport retries
  // until the 200ms transition has finished.
  await expect(link).toBeInViewport({ ratio: 1 });
});

// The `ms` locale resolves by cookie today (LOCALE_PREFIX flag is off, so
// `/ms/*` paths 404 — see e2e/locale-routing.spec.ts). Setting `gc_lang=ms`
// before navigating exercises the Malay render on the un-prefixed routes.
test.describe('ms locale via gc_lang cookie', () => {
  const MS_ROUTES = ['/', '/loans/personal', '/blog', '/faq'];

  for (const route of MS_ROUTES) {
    test(`${route} renders <html lang="ms"> with the gc_lang cookie set`, async ({
      page,
      context,
      baseURL,
    }) => {
      await context.addCookies([{ name: 'gc_lang', value: 'ms', url: baseURL }]);
      await page.goto(route);
      await expect(page.locator('html')).toHaveAttribute('lang', 'ms');
    });
  }
});

// `x-gc-locale`/`x-gc-path` are internal signals the proxy derives from the
// URL — they must never be trusted from an inbound request header, or a
// client could force the Malay render or an arbitrary canonical URL on any
// route. See src/proxy.ts.
test.describe('proxy ignores spoofed internal headers', () => {
  test('a spoofed x-gc-locale: ms header does not force the Malay render', async ({ page }) => {
    await page.setExtraHTTPHeaders({ 'x-gc-locale': 'ms' });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).not.toContain('/ms');
  });

  test('a spoofed x-gc-path header does not change the canonical URL', async ({ page }) => {
    await page.setExtraHTTPHeaders({ 'x-gc-path': '/evil' });
    await page.goto('/');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://guru-credit.com',
    );
  });

  test('a spoofed x-gc-rewritten: 1 combined with x-gc-locale/x-gc-path does not survive either', async ({ page }) => {
    await page.setExtraHTTPHeaders({
      'x-gc-rewritten': '1',
      'x-gc-locale': 'ms',
      'x-gc-path': '/evil',
    });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://guru-credit.com',
    );
  });

  test('a forged x-gc-sig does not verify, so the carried locale/path are not trusted', async ({ page }) => {
    await page.setExtraHTTPHeaders({
      'x-gc-sig': 'abc',
      'x-gc-locale': 'ms',
      'x-gc-path': '/',
    });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://guru-credit.com',
    );
  });
});
