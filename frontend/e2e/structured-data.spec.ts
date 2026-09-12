import { test, expect, type Page } from '@playwright/test';

// Routes covering every JSON-LD emitter touched by task-B-brief B2: the
// homepage (Organization/Website/Services/GeoCoverage + WebPage), a loan
// product page (FinancialProduct + WebPage), a blog post (Article + WebPage),
// a guide topic (HowTo + WebPage), and FAQ (WebPage w/ FAQPage in its @graph).
const ROUTES = [
  '/',
  '/loans/personal',
  '/blog/personal-loan-malaysia-complete-guide-2026',
  '/loan-guides/topics/personal-loan-minimum-salary',
  '/faq',
  '/tools/compare',
];

// Routes whose FAQPage is guaranteed to render (rather than merely optional)
// — asserting `toBe(1)` here (instead of the generic `toBeLessThanOrEqual(1)`
// below) makes the test actually fail if the FAQPage node ever goes missing.
const ROUTES_WITH_GUARANTEED_FAQ = new Set(['/', '/faq']);

/**
 * Flattens every `application/ld+json` block on the page into a single list
 * of schema.org nodes — unwrapping `{ "@graph": [...] }` wrappers so a
 * BreadcrumbList/FAQPage nested inside WebPageJsonLd's graph counts the same
 * as one emitted standalone.
 */
async function collectJsonLdNodes(page: Page): Promise<Record<string, unknown>[]> {
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  const nodes: Record<string, unknown>[] = [];
  for (const text of scripts) {
    const parsed = JSON.parse(text) as Record<string, unknown>;
    const graph = parsed['@graph'];
    if (Array.isArray(graph)) {
      nodes.push(...(graph as Record<string, unknown>[]));
    } else {
      nodes.push(parsed);
    }
  }
  return nodes;
}

function typesOf(node: Record<string, unknown>): string[] {
  const t = node['@type'];
  if (typeof t === 'string') return [t];
  if (Array.isArray(t)) return t.filter((v): v is string => typeof v === 'string');
  return [];
}

function hasType(node: Record<string, unknown>, type: string): boolean {
  return typesOf(node).includes(type);
}

// Collects every numeric-looking `Offer.price` on the page, whether the
// Offer sits at the node's top level (`offers`) or nested one level deeper
// (e.g. inside an ItemList's `itemListElement[].item.offers`).
function collectOfferPrices(nodes: Record<string, unknown>[]): number[] {
  const prices: number[] = [];

  const visitOffer = (offer: unknown) => {
    if (!offer || typeof offer !== 'object') return;
    const offers = Array.isArray(offer) ? offer : [offer];
    for (const o of offers) {
      if (o && typeof o === 'object' && 'price' in o) {
        const price = Number((o as { price: unknown }).price);
        if (!Number.isNaN(price)) prices.push(price);
      }
    }
  };

  const visit = (value: unknown) => {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (!value || typeof value !== 'object') return;
    const obj = value as Record<string, unknown>;
    if ('offers' in obj) visitOffer(obj.offers);
    for (const v of Object.values(obj)) visit(v);
  };

  nodes.forEach(visit);
  return prices;
}

for (const route of ROUTES) {
  test.describe(`${route} structured data`, () => {
    test('has exactly one BreadcrumbList and at most one FAQPage', async ({ page }) => {
      await page.goto(route);
      const nodes = await collectJsonLdNodes(page);

      const breadcrumbCount = nodes.filter((n) => hasType(n, 'BreadcrumbList')).length;
      const faqCount = nodes.filter((n) => hasType(n, 'FAQPage')).length;

      expect(breadcrumbCount).toBe(1);
      if (ROUTES_WITH_GUARANTEED_FAQ.has(route)) {
        expect(faqCount).toBe(1);
      } else {
        expect(faqCount).toBeLessThanOrEqual(1);
      }
    });

    test('every Offer.price is numeric and is not a mislabelled APR (< 20)', async ({ page }) => {
      await page.goto(route);
      const nodes = await collectJsonLdNodes(page);
      const prices = collectOfferPrices(nodes);

      if (route === '/tools/compare') {
        // Guards against this assertion loop silently no-op'ing: the tool
        // page must actually emit at least one Offer (its WebApplication's
        // free-to-use price) for the numeric checks below to mean anything.
        expect(prices.length).toBeGreaterThan(0);
      }

      for (const price of prices) {
        expect(Number.isNaN(price)).toBe(false);
        // The bug this guards against: an interest rate (e.g. 4.88, 5.5,
        // "6-9") mislabelled as Offer.price. Every real fee in this product
        // (RM20-RM50 consultation fees, or RM0 for free tools) is >= 20 or
        // exactly 0 (free); APR-shaped mistakes land strictly between.
        if (price !== 0) {
          expect(price).toBeGreaterThanOrEqual(20);
        }
      }
    });

    test('inLanguage is a single string, not an array', async ({ page }) => {
      await page.goto(route);
      const nodes = await collectJsonLdNodes(page);

      const withLanguage = nodes.filter((n) => 'inLanguage' in n);
      expect(withLanguage.length).toBeGreaterThan(0);
      for (const node of withLanguage) {
        expect(typeof node.inLanguage).toBe('string');
      }
    });

    test('parses as valid JSON with no duplicate @id across nodes', async ({ page }) => {
      await page.goto(route);
      const nodes = await collectJsonLdNodes(page);
      expect(nodes.length).toBeGreaterThan(0);

      const ids = nodes.map((n) => n['@id']).filter((id): id is string => typeof id === 'string');
      expect(new Set(ids).size).toBe(ids.length);
    });
  });
}

test('/services renders ServicesJsonLd without an offers/price on any service ListItem', async ({ page }) => {
  await page.goto('/services');
  const nodes = await collectJsonLdNodes(page);
  const itemList = nodes.find((n) => hasType(n, 'ItemList'));
  expect(itemList).toBeTruthy();

  const items = (itemList?.itemListElement as { item?: { offers?: unknown } }[]) ?? [];
  expect(items.length).toBeGreaterThan(0);
  for (const listItem of items) {
    expect(listItem.item?.offers).toBeUndefined();
  }
});

test('ServicesJsonLd and GeoCoverageJsonLd render only on / and /services, not elsewhere', async ({ page }) => {
  await page.goto('/about');
  const nodes = await collectJsonLdNodes(page);
  expect(nodes.some((n) => hasType(n, 'ItemList'))).toBe(false);
  expect(nodes.some((n) => n['serviceType'] === 'Loan Consultation & Eligibility Analysis')).toBe(false);
});
