import { test, expect } from '@playwright/test';

test('homepage renders hero copy', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: /Fast, Clear Loan Guidance/i }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: /Start Eligibility Check/i }),
  ).toBeVisible();
});

test('services page lists loan types', async ({ page }) => {
  await page.goto('/services');
  await expect(page.getByText(/Select a Loan Product/i)).toBeVisible();
  await expect(page.getByText(/Personal Loan/i)).toBeVisible();
});
