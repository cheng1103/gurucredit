# Analytics (page views / unique visitors) + SEO article batch 2 — Design

Date: 2026-10-06
Status: approved (user chose: self-hosted analytics, anonymous cookie visitor id, cards + trend chart + top pages, 8 new articles)

## 1. Goals

1. **Admin analytics.** The admin dashboard shows how many page views (点击量) and how many unique visitors (点击人数) the public site receives, with a 30-day trend and the most-visited pages.
2. **SEO batch 2.** Eight more bilingual long-form articles on keywords the site does not yet cover. No programmatic or templated pages.

## 2. Non-goals

- No third-party analytics vendor (no GA4 Data API, no Vercel Analytics plan).
- No per-user tracking, funnels, session replay, or cross-site identity.
- No IP addresses, user agents, or any personal data stored at rest.
- No change to the public site's visible UI.

## 3. Architecture

```
browser (guru-credit.com, Next.js)
  └─ PageViewTracker (client) ── sendBeacon ──► POST https://api.guru-credit.com/api/analytics/track   (public, throttled)
        uses gc_vid cookie (random 32-hex, 180d)                    │
                                                                    ▼
                                                      NestJS AnalyticsModule ──► MongoDB `PageView` (TTL 180d)
                                                                    ▲
admin (gurucredit-admin.vercel.app)                                 │
  └─ /analytics page + dashboard cards ── GET /api/analytics/overview (AuthGuard + AdminGuard, JWT)
```

Three deploy targets stay as they are: frontend → Vercel `guru-credit-frontend`, admin → Vercel `gurucredit-admin`, backend → Railway.

## 4. Data model

New Prisma model in `backend/prisma/schema.prisma` (MongoDB; applied with `prisma db push`, no migration files):

```prisma
model PageView {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  path         String   // public URL path incl. /ms prefix, query stripped, ≤ 512 chars
  locale       String   // "en" | "ms"
  visitorId    String   // 32 hex chars, random, minted in the browser — not derived from any personal data
  referrerHost String?  // host only, never the full referring URL
  device       String   // "mobile" | "tablet" | "desktop"
  dayKey       String   // "YYYY-MM-DD" in Asia/Kuala_Lumpur
  expiresAt    DateTime // start of the next Kuala Lumpur day + 180 days; TTL index deletes the row

  @@index([dayKey])
  @@index([path, dayKey])
}
```

**No per-row timestamp (revised).** The model originally carried `createdAt DateTime @default(now())` and a millisecond-precision `expiresAt`. Both were removed: `Application` rows carry `applicantName`, `applicantEmail` and `applicantIcNumber` alongside their own `createdAt`, and applications are rare events, so a millisecond timestamp on `PageView` let anyone with database read access match a named applicant to the `/services/<id>/apply` view nearest their application time, recover that person's `visitorId`, and from it their entire 180-day browsing history. No query ever read `createdAt` — `dayKey` drives every aggregation and `expiresAt` drives the TTL — so the field was dropped outright, and `expiresAt` was coarsened to the start of the Kuala Lumpur day *after* the view plus 180 days. Every row written on the same day now shares one `expiresAt`, leaving the join no finer than a one-day bucket.

**`path` is an allowlist, not free text (revised).** `path` is stored only when it matches a route the site actually serves — the static `PATHS` list plus the four dynamic shapes (`/blog/<slug>`, `/loan-guides/topics/<slug>`, `/loans/my/<region>`, `/services/<id>/apply`), each optionally under `/ms`. Anything else is stored as the literal `/_other`: the view still counts, but a 404 from a mangled link (an email client turning a URL into `…/blog/x (someone@example.com)`) and a hostile caller's chosen string can no longer put text of their choosing into the collection or the admin's top-pages table. Structurally unusable input (a scheme, `..`, a control character) is still dropped without a row.

**Indexes.** Only these two are declared: every overview aggregation filters on `dayKey` alone, and the top-pages pipeline groups by `path` within that window. `[visitorId, dayKey]` and `[createdAt]` were in the original draft but no query ever used them, so they were dropped rather than charged against the write throughput of the busiest write path on the site.

**Privacy.** No IP, no user agent string, no user id, no query strings. `visitorId` is random bytes minted by the browser and is meaningless outside this dataset. Device class is derived from the user agent and the user agent itself is discarded. No per-row timestamp at all (see above). Rows self-delete after 180 days via a MongoDB TTL index on `expiresAt`, created idempotently by the module on startup (Prisma cannot declare TTL indexes); a failure to create that index is logged at `error` naming the index and retried once, because it is the only thing that deletes rows.

## 5. Backend

New `backend/src/analytics/` module, shaped like the existing `audit-logs` module.

### 5.1 `POST /api/analytics/track` — public ingestion

- No auth. Own throttle bucket, 240 requests / 60 s per IP (`@Throttle`), separate from the 60/60 global default because this endpoint is hit on every page view.
- Body DTO, `whitelist: true` so unknown fields are stripped:
  - `path`: string, required, must start with `/`, ≤ 512 chars, query and hash stripped server-side, rejected if it contains a scheme or `..`.
  - `locale`: `'en' | 'ms'`.
  - `visitorId`: string matching `/^[0-9a-f]{32}$/` — the strict format is what stops a caller from stuffing personal data into the field.
  - `referrerHost`: optional hostname, ≤ 255 chars, must not be the site's own host.
- Server derives `device` and bot-ness from the request user agent, then discards it. Requests from known bot user agents are accepted and dropped without writing a row.
- Always responds `204 No Content`, including on validation failure, so the endpoint reveals nothing and never breaks a page.
- Never logs the IP or the user agent.

### 5.2 `GET /api/analytics/overview?days=30` — admin read

- `@UseGuards(AuthGuard, AdminGuard)` plus `@ApiBearerAuth()`, exactly like `users.controller.ts`.
- `days` ∈ {7, 30, 90}, default 30.
- Response:

```ts
{
  totals: {
    today:    { views: number; visitors: number };
    last7:    { views: number; visitors: number };
    last30:   { views: number; visitors: number };
    allTime:  { views: number; visitors: number };
  };
  series:     { date: string; views: number; visitors: number }[];  // one row per day, zero-filled
  topPages:   { path: string; views: number; visitors: number }[];  // top 10 in the window
  localeSplit:{ en: number; ms: number };
  deviceSplit:{ mobile: number; tablet: number; desktop: number };
  rangeDays:  number;
  generatedAt: string;
}
```

- Unique-visitor counts are distinct counts, computed with a MongoDB aggregation pipeline via `prisma.$runCommandRaw` (`$group` by `{day, visitor}` then `$group` by day), because Prisma has no distinct-count aggregate. Days with no traffic are zero-filled in the service so the chart has no gaps.
- All day bucketing uses `Asia/Kuala_Lumpur`, matching `dayKey` written at ingestion.

## 6. Frontend (public site)

- `src/lib/visitor-id.ts` — reads or mints the `gc_vid` cookie: 32 hex chars from `crypto.getRandomValues`, `Max-Age` 180 days, `Path=/`, `SameSite=Lax`, `Secure` on https (reuse the existing `secureCookieFlag()` helper). Returns `null` when storage is unavailable.
- `src/components/analytics/PageViewTracker.tsx` — client component mounted once in the root layout. On mount and on every `usePathname()` change it sends one beacon. Guards: skips when `navigator.doNotTrack === '1'` or `window.doNotTrack === '1'`; skips when no visitor id can be minted; de-duplicates repeated fires for the same path with a ref, so React strict mode and the locale rewrite cannot double-count. Uses `navigator.sendBeacon`, falling back to `fetch(..., { keepalive: true })`. Every failure is swallowed.
- The recorded `path` is the browser URL path, so `/ms/...` pages are counted separately from their English twins.
- No change to `proxy.ts`: counting at the edge would double-count the rewrite pass and count crawlers.
- CSP needs no change — `connect-src` already derives from `NEXT_PUBLIC_API_URL`.

## 7. Admin

- `admin/src/lib/api.ts` — `analyticsAPI.getOverview(days)` → `GET /analytics/overview`, same axios instance and JWT interceptor as the other APIs.
- Dashboard (`admin/src/app/page.tsx`): two more `StatCard`s — **Page Views (today)** and **Unique Visitors (today)** — each with the 7-day trend as its subtext, fetched in the existing `Promise.allSettled` batch so a failure degrades to the offline placeholder rather than breaking the page.
- New page `admin/src/app/analytics/page.tsx`: range toggle 7 / 30 / 90 days, a `recharts` line chart of views and visitors per day, a top-10 pages table (path, views, visitors), and locale and device splits. Follows the existing `OFFLINE_MODE` demo fallback and the 30 s refresh constant.
- Labels stay in English to match the rest of the admin app.

## 8. SEO batch 2 — eight articles

Same `BlogPost` module pattern as batch 1 (`frontend/src/lib/content/blog/<slug>.ts`), same writing rules, same allowed-facts list, same `scripts/article-check.mjs` gate, covers generated by `scripts/make-blog-covers.mjs`.

| # | Slug | Intent |
|---|------|--------|
| 1 | `fresh-graduate-first-personal-loan-malaysia` | First loan with a short employment history |
| 2 | `housewife-no-payslip-loan-options-malaysia` | Borrowers with no payslip; joint applicant route |
| 3 | `how-to-read-loan-offer-letter-malaysia` | Reading the offer: rate basis, fees, tenure, clauses |
| 4 | `late-loan-repayment-consequences-malaysia` | What happens after a missed payment, and recovery |
| 5 | `angkasa-salary-deduction-loan-explained` | How Angkasa deduction works, eligibility, exiting it |
| 6 | `loan-scam-red-flags-malaysia-2026` | Upfront-fee scams, fake licences, how to verify |
| 7 | `sabah-sarawak-borrower-guide-loan-malaysia` | East Malaysia: documents, remote applications, timing |
| 8 | `loan-top-up-vs-refinance-personal-loan-malaysia` | Top-up vs refinance vs new loan |

Each must link out to the existing article closest to it rather than restate it — notably #5 links to `personal-loan-government-employees-malaysia` and #2 to `gig-worker-grab-driver-loan-income-proof`, so the batch does not cannibalise batch 1.

## 9. Testing

- Backend: unit tests for path normalisation, visitor-id validation, bot rejection, day bucketing in Kuala Lumpur time, and the overview aggregation against seeded rows; e2e-style controller test that the track endpoint answers 204 without auth and the overview endpoint answers 401/403 without an admin JWT.
- Frontend: unit tests for `visitor-id` (mint, reuse, https flag) and a Playwright test that loading two pages sends two beacons with different paths and the same visitor id, and that `doNotTrack` suppresses them.
- Admin: the analytics page renders from a mocked overview payload, including the empty state.
- Articles: `scripts/article-check.mjs` plus the existing metadata-length and link suites.

## 10. Rollout

1. Backend first (`prisma db push` + Railway deploy) — the endpoint exists before anything calls it.
2. Frontend tracker, deployed to `guru-credit-frontend`.
3. Admin, deployed to `gurucredit-admin`.
4. Articles can ship with the frontend deploy.

A missing backend simply means no rows are written; the site is unaffected either way.
