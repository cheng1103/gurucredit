import { test, expect } from '@playwright/test';

const ROUTES = [
  '/', '/about', '/contact', '/faq', '/services', '/eligibility-test', '/tools', '/tools/compare',
  '/loans/personal', '/loans/debt-consolidation', '/loans/emergency', '/loans/my/selangor', '/loans/my/sabah',
  '/loan-guides', '/loan-guides/ccris-ctos', '/blog', '/glossary', '/documents', '/partners',
  '/service-areas', '/verify-us', '/privacy', '/terms', '/disclaimer', '/status',
];

for (const route of ROUTES) {
  test(`${route} renders with one h1`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
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
    expect(breadcrumbListCount).toBeLessThanOrEqual(1);
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
