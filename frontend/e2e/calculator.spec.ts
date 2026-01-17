import { test, expect } from '@playwright/test';

test.describe('DSR calculator', () => {
  test('shows result when using simple mode inputs', async ({ page }) => {
    await page.goto('/calculator');

    await page.getByLabel(/Monthly Net Income/i).fill('5000');
    await page.getByLabel(/Total Monthly Debt Payments/i).fill('1500');
    await page.getByRole('button', { name: /Calculate DSR/i }).click();

    await expect(page.getByText('Your DSR Result')).toBeVisible();
    await expect(page.getByText('Excellent')).toBeVisible();
    await expect(page.getByText('Max Additional Monthly Debt')).toBeVisible();
  });

  test('allows category breakdown inputs', async ({ page }) => {
    await page.goto('/calculator');

    await page.getByLabel(/Monthly Net Income/i).fill('8000');
    await page.getByRole('button', { name: /Or enter by category/i }).click();

    await page.getByLabel('House/Property Loan').fill('2000');
    await page.getByLabel('Car Loan').fill('500');

    await page.getByRole('button', { name: /Calculate DSR/i }).click();

    await expect(page.getByText('Your DSR Result')).toBeVisible();
    await expect(page.getByText('Good')).toBeVisible();
  });
});
