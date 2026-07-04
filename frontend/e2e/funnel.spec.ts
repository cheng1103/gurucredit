import { test, expect } from '@playwright/test';

test('success page renders service messaging from query params', async ({ page }) => {
  const reference = 'GC123456';
  // service=4 → Business Loan (SERVICES ids are 1 and 4); unknown ids fall back to Personal Loan.
  await page.goto(`/services/success?ref=${reference}&service=4`);

  await expect(
    page.getByRole('heading', { name: /Application Submitted/i }),
  ).toBeVisible();
  await expect(page.locator('code').first()).toHaveText(reference);
  await expect(page.getByText(/Business Loan/i).first()).toBeVisible();
  await expect(page.getByText(/verified WhatsApp/i)).toBeVisible();
  await expect(page.getByRole('link', { name: /WhatsApp/i }).first()).toBeVisible();
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
    await route.fulfill({
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

  // Step 1 — Quick Approval Check (state, income, loan amount)
  await page.locator('#serviceArea').selectOption('MY-14');
  await page.getByLabel(/Monthly Net Income/i).fill('8000');
  await page.getByLabel(/Desired Loan Amount/i).fill('50000');
  await page.getByRole('button', { name: /^Next$/ }).click();

  // Step 2 — Contact & Work Details
  await page.getByLabel(/Full Name/i).fill('Playwright Tester');
  await page.getByLabel(/Phone Number/i).fill('+60123456789');
  await page.getByLabel(/Email Address/i).fill('tester@example.com');
  await page.getByRole('button', { name: 'Employed', exact: true }).click();
  await page.getByRole('button', { name: /^Next$/ }).click();

  // Step 3 — Review & Submit. force:true because the button disables itself
  // (loading spinner) and navigates in the same tick, which otherwise races
  // Playwright's actionability wait.
  await page.getByRole('button', { name: /Submit Application/i }).click({ force: true });

  await page.waitForURL('**/services/success**');
  await expect(page.getByRole('heading', { name: /Application Submitted/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /WhatsApp/i }).first()).toBeVisible();
});
