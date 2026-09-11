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

test('mobile sticky CTA appears below the hero on the homepage', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.mouse.wheel(0, 2000);
  const link = page.getByRole('link', { name: /Check eligibility/i });
  // The bar slides in after the hero leaves the viewport; toBeInViewport retries
  // until the 200ms transition has finished.
  await expect(link).toBeInViewport({ ratio: 1 });
});
