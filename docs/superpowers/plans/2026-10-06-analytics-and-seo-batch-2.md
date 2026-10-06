# Analytics + SEO batch 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Record page views and unique visitors for guru-credit.com in the project's own backend, surface them in the admin app, and publish eight more bilingual SEO articles.

**Architecture:** A client beacon on the public site posts anonymous page-view rows to a new NestJS `analytics` module backed by MongoDB; an admin-guarded overview endpoint aggregates them; the admin app renders cards, a 30-day chart and a top-pages table. Articles follow the batch-1 module pattern.

**Tech Stack:** Next.js 16 (frontend + admin), React 19, Tailwind v4, recharts, NestJS 11, Prisma 5 + MongoDB, vitest, Jest (backend), Playwright.

**Spec:** `docs/superpowers/specs/2026-10-06-analytics-and-seo-batch-2-design.md`

## Global Constraints

- **Privacy:** never store or log IP addresses, user agent strings, query strings, or any user identity. `visitorId` is random browser-minted hex only. Rows expire after 180 days.
- **Never break the public site:** every tracking failure is swallowed client-side; the track endpoint always answers `204`.
- **Deploy targets:** frontend → Vercel project `guru-credit-frontend` (from repo root); admin → Vercel project `gurucredit-admin` (from `admin/`); backend → Railway. The Vercel project named `frontend` serves mudah-credit.com and must never be touched.
- **Lint:** no `dark:` classes, no `eslint-disable`, no `setState` inside `useEffect`, escaped quotes in JSX.
- **Article facts:** only the allowed-facts list in the batch-1 brief (`Moneylenders Act 1951`/KPKT, 12%/18% statutory maximums, BNM regulates banks, AKPK, CCRIS/CTOS, DSR, 60–70% bank DSR limits "vary by bank", Angkasa "may be available", Rule of 78, stamp duty with no rate, Tawarruq/Murabahah, PTPTN). No bank-specific rates, no approval percentages, no statistics without a named public source. Site facts: up to RM100,000, 1–7 years, from 4.88% flat p.a., RM30 CTOS fee via official WhatsApp only, written review within 24 hours, no guarantee of approval.
- **Commit trailers** on every commit:
  ```
  Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01SbKGsyUx1JzunHf6L7UNfd
  ```

---

### Task 1: Backend analytics module

**Files:**
- Modify: `backend/prisma/schema.prisma` (add `PageView`)
- Create: `backend/src/analytics/analytics.module.ts`, `analytics.controller.ts`, `analytics.service.ts`, `dto/track-page-view.dto.ts`
- Create: `backend/src/analytics/analytics.service.spec.ts`, `analytics.controller.spec.ts`
- Modify: `backend/src/app.module.ts` (register the module)

**Interfaces:**
- Produces: `POST /api/analytics/track` (public, 204) and `GET /api/analytics/overview?days=7|30|90` (AuthGuard + AdminGuard) returning the `AnalyticsOverview` shape in spec §5.2. Task 2 consumes the former, Task 3 the latter.

Steps:

- [ ] **Step 1: Model + TTL index.** Add the `PageView` model from spec §4 verbatim. In `AnalyticsService.onModuleInit`, create the TTL index idempotently via `$runCommandRaw` (`createIndexes` on `PageView` with `expireAfterSeconds: 0` over `expiresAt`); swallow and log-at-debug any failure so a read-only database cannot stop boot. Run `npx prisma generate`; do **not** run `db push` against production from here — the controller does that at rollout.
- [ ] **Step 2: DTO + normalisation, test-first.** Write `analytics.service.spec.ts` cases first: path keeps `/ms/faq`, strips `?utm=x` and `#frag`, rejects `http://evil`, `..`, and >512 chars; `visitorId` must match `/^[0-9a-f]{32}$/`; a Googlebot user agent is rejected as a bot; `dayKey` for `2026-10-06T17:30:00Z` is `2026-10-07` in Asia/Kuala_Lumpur. Then implement.
- [ ] **Step 3: Track endpoint.** `@Throttle` 240/60s, `@HttpCode(204)`, no auth, returns 204 even when the DTO is invalid (catch and drop). Writes one row with `expiresAt = now + 180d`. Never logs IP or user agent.
- [ ] **Step 4: Overview endpoint.** `@UseGuards(AuthGuard, AdminGuard)`, `days` validated to 7/30/90. Distinct visitor counts via `$runCommandRaw` aggregation; zero-fill missing days; top 10 pages by views; locale and device splits. Unit-test against seeded rows covering two days, two visitors, one repeat view.
- [ ] **Step 5: Gate + commit.** `cd backend && npm run lint && npm run build && npm test`. Commit `feat(analytics): page-view ingestion and admin overview endpoint`.

---

### Task 2: Public-site tracker

**Files:**
- Create: `frontend/src/lib/visitor-id.ts`, `frontend/src/components/analytics/PageViewTracker.tsx`
- Create: `frontend/src/lib/__tests__/visitor-id.test.ts`, `frontend/e2e/analytics.spec.ts`
- Modify: `frontend/src/app/layout.tsx` (mount the tracker)

**Interfaces:**
- Consumes: `POST {NEXT_PUBLIC_API_URL}/analytics/track` from Task 1.

Steps:

- [ ] **Step 1: `visitor-id.ts`, test-first.** `getOrCreateVisitorId()` returns an existing `gc_vid` cookie value when it matches `/^[0-9a-f]{32}$/`, otherwise mints one from `crypto.getRandomValues` and writes the cookie with `Max-Age=15552000; Path=/; SameSite=Lax` plus `Secure` on https. Returns `null` if `document` or `crypto` is unavailable. Tests cover mint, reuse, malformed-cookie replacement, and the https flag.
- [ ] **Step 2: `PageViewTracker`.** `'use client'`; `usePathname()`; fires once per distinct path using a `useRef` of the last sent path (no state, so no `setState` in an effect). Skips on `doNotTrack`. Sends `navigator.sendBeacon(url, Blob(JSON, 'application/json'))`, falling back to `fetch(url, { method:'POST', keepalive:true, headers:{'Content-Type':'application/json'} })`. Everything wrapped so no error can surface. Body: `{ path, locale, visitorId, referrerHost }` where `locale` comes from the path prefix and `referrerHost` is `document.referrer`'s host when it is not the site's own host.
- [ ] **Step 3: Mount + e2e.** Mount in the root layout after the existing providers. Playwright `analytics.spec.ts`: intercept `**/analytics/track`, visit `/` then `/faq`, expect two requests with the two paths and the same `visitorId`; a second context with `doNotTrack` set expects zero requests.
- [ ] **Step 4: Gate + commit.** `cd frontend && npx vitest run && npx tsc --noEmit && npm run lint && npm run build`; start on port 3100 (port 3000 belongs to an unrelated dev server — never kill it) and run `EXPECT_LOCALE_PREFIX=1 PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100 npx playwright test --project=chromium`. Commit `feat(analytics): anonymous page-view beacon on the public site`.

---

### Task 3: Admin dashboard and analytics page

**Files:**
- Modify: `admin/src/lib/api.ts` (add `analyticsAPI`), `admin/src/app/page.tsx` (two cards)
- Create: `admin/src/app/analytics/page.tsx`, `admin/src/components/analytics/*` as needed
- Create: a test for the analytics page rendering from a mocked payload

**Interfaces:**
- Consumes: `GET /analytics/overview` from Task 1.

Steps:

- [ ] **Step 1: API client.** `analyticsAPI.getOverview(days = 30)` following the `applicationsAPI.getStats()` pattern, with the `AnalyticsOverview` TypeScript type mirroring spec §5.2.
- [ ] **Step 2: Dashboard cards.** Add **Page Views (today)** and **Unique Visitors (today)** `StatCard`s, fetched inside the existing `Promise.allSettled` batch, with the 7-day figure as subtext and the offline-demo fallback preserved. Link both to `/analytics`.
- [ ] **Step 3: Analytics page.** Range toggle 7/30/90, `recharts` `LineChart` with two series (views, visitors) and an accessible description, top-10 pages table, locale and device splits, empty state when there is no data yet, 30 s refresh using the existing `DASHBOARD_REFRESH_INTERVAL`. Add it to the admin navigation alongside the other sections.
- [ ] **Step 4: Gate + commit.** `cd admin && npm run lint && npx tsc --noEmit && npm run build` plus the new test. Commit `feat(admin): page views and unique visitors dashboard`.

---

### Task 4: Eight SEO articles

**Files:**
- Create: `frontend/src/lib/content/blog/<slug>.ts` ×8 (slugs in spec §8)
- Modify: `frontend/src/lib/blog-data.ts` (imports + array)
- Create: `frontend/public/images/blog/<slug>.jpg` ×8 via `scripts/make-blog-covers.mjs`

Steps:

- [ ] **Step 1: Write.** Two writers in the scratchpad, four articles each, to the batch-1 rules: English 1,200–1,800 words, complete idiomatic Malay, 5–8 `##` sections plus `## FAQ` with 4–6 `###` questions, a worked RM example labelled illustrative, a "common mistakes" or "what lenders look for" section, closing CTA linking `/eligibility-test` and one product or guide page, root-relative internal links only, `publishedAt: '2026-10-06'`, `reviewedBy: 'Policy Desk'`, `seoTitle`/`seoTitleMs` ≤ 45 chars, `excerpt` 120–155, 4–6 lowercase tags, `readTime = round(words/220)`.
- [ ] **Step 2: Check.** `node scripts/article-check.mjs src/lib/content/blog/<slug>.ts` passes for all eight.
- [ ] **Step 3: Integrate.** Copy into the repo, wire into `blogPosts`, generate covers, verify each is under 120 KB.
- [ ] **Step 4: Gate + commit.** `npx vitest run && npx tsc --noEmit && npm run lint && npm run build`; Playwright on port 3100; curl one new post in English and Malay for title, canonical, hreflang and Article JSON-LD. Commit `feat(content): 8 more bilingual keyword articles`.

---

### Task 5: Rollout

- [ ] Backend: `cd backend && npx prisma db push` against production, then deploy to Railway; confirm `POST /api/analytics/track` answers 204 and `GET /api/analytics/overview` answers 401 without a token.
- [ ] Frontend: deploy from the repo root to `guru-credit-frontend`; run `bash frontend/scripts/verify-live.sh https://guru-credit.com`; confirm beacons appear and mudah-credit.com is untouched.
- [ ] Admin: deploy from `admin/` to `gurucredit-admin`; confirm the cards and chart render against live data.
