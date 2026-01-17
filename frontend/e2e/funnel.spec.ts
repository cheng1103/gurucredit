import { test, expect } from '@playwright/test';

test('success page renders KL/Selangor messaging from query params', async ({ page }) => {
  const reference = 'GC123456';
  await page.goto(`/services/success?ref=${reference}&service=2`);

  await expect(
    page.getByRole('heading', { name: /Application Submitted!/i }),
  ).toBeVisible();
  await expect(page.locator('code').first()).toHaveText(reference);
  await expect(page.getByText(/Car Loan/i)).toBeVisible();
  await expect(
    page.getByText(/We only collect payments through our verified WhatsApp line/i),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /Continue on WhatsApp/i })).toBeVisible();
});

test('success page generates a reference when none provided', async ({ page }) => {
  await page.goto('/services/success');
  const autoReference = await page.locator('code').first().innerText();
  expect(autoReference).toMatch(/^GC\d{8}[A-Z0-9]{6}$/);
});

test('personal loan wizard submits and redirects to success', async ({ page }) => {
  await page.route('**/applications/public', async (route) => {
    const payload = await route.request().postDataJSON();
    expect(payload.serviceId).toBe('1');
    expect(payload.serviceArea).toBe('MY-14');
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 'GCPLAYWRIGHT',
        serviceId: '1',
        status: 'PENDING',
        applicantName: payload.name,
        applicantEmail: payload.email,
        createdAt: new Date().toISOString(),
      }),
    });
  });

  await page.goto('/services/1/apply');

  await page.getByLabel(/Full Name/).fill('Playwright Tester');
  await page.getByLabel(/Email Address/i).fill('tester@example.com');
  await page.getByLabel(/Phone Number/i).fill('+60123456789');
  await page.getByRole('button', { name: /Next/i }).click();

  await page.getByLabel(/Monthly Net Income/i).fill('8000');
  await page.getByRole('button', { name: /Next/i }).click();

  await page.getByRole('button', { name: /Next/i }).click();
  await page.getByRole('button', { name: /Submit Application/i }).click();

  await page.waitForURL('**/services/success**');
  await expect(page.getByRole('heading', { name: /Application Submitted!/i })).toBeVisible();
  await expect(page.getByText(/Kuala Lumpur & Selangor/i)).toBeVisible();
  await expect(page.getByRole('link', { name: /Continue on WhatsApp/i })).toBeVisible();
});
