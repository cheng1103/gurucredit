#!/usr/bin/env node
// Visits every smoke-tested route at two widths and saves full-page PNGs for
// manual visual review (overflow, unstyled blocks, dark-band remnants,
// missing h1, content hidden under the sticky bar).
//
// Usage: node scripts/screenshot-routes.mjs
// Requires a running server (default http://127.0.0.1:3000); override with
// SCREENSHOT_BASE_URL.

import { register } from 'node:module';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

register('./lib/alias-loader.mjs', import.meta.url);
const { smokeRoutes } = await import('../src/lib/routes-for-smoke.ts');

const BASE_URL = process.env.SCREENSHOT_BASE_URL || 'http://127.0.0.1:3000';
const OUT_DIR = path.resolve(import.meta.dirname, '../.superpowers/screens');

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1280, height: 900 },
];

function fileSlug(route) {
  return route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '_');
}

async function shootRoute(browser, route) {
  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
    });
    const page = await context.newPage();
    try {
      const res = await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      if (!res || res.status() >= 400) {
        console.error(`  ! ${route} (${viewport.name}) -> HTTP ${res?.status()}`);
      }
      // Scroll to bottom to trigger any reveal/lazy-load animations, then
      // back to top so the captured full-page screenshot starts clean.
      await page.evaluate(async () => {
        const step = () => window.scrollBy(0, window.innerHeight);
        for (let i = 0; i < 20 && window.scrollY + window.innerHeight < document.body.scrollHeight; i++) {
          step();
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 250));
      });
      // The sticky mobile CTA bar slides in/out on a CSS transition keyed off
      // hero visibility; on short pages the scroll-to-bottom-then-top above
      // can still be mid-transition here. Give it time to settle.
      await page.waitForTimeout(600);

      // `position: fixed` overlays (the mobile sticky CTA bar, the desktop
      // WhatsApp FAB) are anchored to the *viewport*, not the document. A
      // real visitor always sees them pinned correctly wherever they've
      // scrolled to. A `fullPage` screenshot has no single "scroll position"
      // to render them at, so Playwright bakes them in at one arbitrary spot
      // in the tall image, which can look like they overlap page content
      // when they never do in the browser. Hide them for the capture so the
      // full-page PNG reflects real document flow; their on-scroll behavior
      // (not obscuring content, appearing below the hero) is covered by
      // e2e/smoke.spec.ts's "mobile sticky CTA" test instead.
      await page.evaluate(() => {
        for (const el of document.querySelectorAll('body *')) {
          if (getComputedStyle(el).position === 'fixed') {
            el.style.setProperty('visibility', 'hidden', 'important');
          }
        }
      });

      const fileName = `${fileSlug(route)}-${viewport.width}.png`;
      await page.screenshot({ path: path.join(OUT_DIR, fileName), fullPage: true });
      console.log(`  ${route} (${viewport.name}) -> ${fileName}`);
    } catch (err) {
      console.error(`  ! ${route} (${viewport.name}) failed: ${err.message}`);
    } finally {
      await context.close();
    }
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const routes = smokeRoutes();
  console.log(`Screenshotting ${routes.length} routes at ${VIEWPORTS.map((v) => `${v.width}x${v.height}`).join(' and ')} -> ${OUT_DIR}`);

  const browser = await chromium.launch();
  try {
    for (const route of routes) {
      await shootRoute(browser, route);
    }
  } finally {
    await browser.close();
  }
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
