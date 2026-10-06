import { test, expect, type Page } from '@playwright/test';

interface TrackedRequest {
  path: string;
  locale: string;
  visitorId: string;
  referrerHost?: string;
}

const VISITOR_ID_RE = /^[0-9a-f]{32}$/;

/**
 * Intercepts every beacon so the test never depends on a real backend, and
 * records exactly the fields the body carried — a stray extra field here
 * would mean the tracker leaked something beyond the four allowed.
 */
async function interceptTrack(page: Page): Promise<TrackedRequest[]> {
  const requests: TrackedRequest[] = [];
  await page.route('**/analytics/track', async (route) => {
    const request = route.request();
    if (request.method() === 'OPTIONS') {
      await route.fulfill({
        status: 204,
        headers: {
          'access-control-allow-origin': '*',
          'access-control-allow-methods': 'POST, OPTIONS',
          'access-control-allow-headers': 'content-type',
        },
      });
      return;
    }
    requests.push(request.postDataJSON() as TrackedRequest);
    await route.fulfill({ status: 204, headers: { 'access-control-allow-origin': '*' } });
  });
  return requests;
}

test.describe('page view beacon', () => {
  test('sends one beacon per visited path, with a stable visitor id', async ({ page }) => {
    const requests = await interceptTrack(page);

    // `page.waitForRequest` resolves on the browser's "request" event, which
    // fires before the route handler above has run (and therefore before it
    // has pushed to `requests`) — so poll the array itself rather than race
    // it against a request/response event.
    await page.goto('/');
    await expect.poll(() => requests.length).toBe(1);

    await page.goto('/faq');
    await expect.poll(() => requests.length).toBe(2);
    expect(requests.map((r) => r.path)).toEqual(['/', '/faq']);
    expect(requests.every((r) => r.locale === 'en')).toBe(true);

    expect(requests[0].visitorId).toMatch(VISITOR_ID_RE);
    expect(requests[1].visitorId).toBe(requests[0].visitorId);

    // Only the four contracted fields may ever be present (Task 1 interface
    // + spec §4 privacy rules) — no IP, user agent, query string, or title.
    for (const body of requests) {
      expect(Object.keys(body).sort()).toEqual(
        Object.keys(body).filter((k) => ['path', 'locale', 'visitorId', 'referrerHost'].includes(k)).sort(),
      );
    }
  });

  test('sends no beacon when Do Not Track is set', async ({ browser }) => {
    const context = await browser.newContext();
    await context.addInitScript(() => {
      Object.defineProperty(window.navigator, 'doNotTrack', {
        value: '1',
        configurable: true,
      });
    });
    const page = await context.newPage();
    const requests = await interceptTrack(page);

    await page.goto('/');
    await page.goto('/faq');
    // Beacons are fire-and-forget on mount; give a stray one a moment to
    // land before asserting it never did.
    await page.waitForTimeout(1000);

    expect(requests).toHaveLength(0);
    await context.close();
  });
});
