import { test, expect } from '@playwright/test';

test('homepage renders hero copy', async ({ page }) => {
  await page.goto('/');
  // Hero H1 copy is rotated client-side, so assert the primary heading renders
  // rather than coupling to a specific variant.
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  // Primary CTA (hero copy rotates client-side; "Apply Now" is the stable nav CTA).
  await expect(page.getByRole('link', { name: /Apply Now/i }).first()).toBeVisible();
});

test('services page lists loan types', async ({ page }) => {
  await page.goto('/services');
  await expect(
    page.getByRole('heading', { name: 'Select a Loan Product' }),
  ).toBeVisible();
  await expect(page.getByText(/Personal Loan/i).first()).toBeVisible();
});
