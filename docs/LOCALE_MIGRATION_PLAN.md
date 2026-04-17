# Locale URL Migration Plan: `?lang=ms` → `/ms/*`

**Status**: Planning. DO NOT execute in one sprint — staged rollout over 3–6 months.

## Why

Current: `/about`, `/about?lang=ms`. Same URL renders different content based on cookie/query.

Problems:
- Google indexes both URLs as the same resource → `ms-MY` content almost never ranks independently.
- `hreflang` in `layout.tsx` points `ms-MY` to `url?lang=ms`, which search engines treat as a parameter variant, not an alternate page.
- No canonical Malay indexation → leaving organic traffic on the table.
- Language toggle is client-only (flicker on first paint; SSR always serves default).

Target: `/en/about` + `/ms/about`. Two distinct URLs, two distinct cached HTML responses, two distinct index entries. `hreflang` links them as alternates.

## Target architecture

- URL shape: `/{locale}/...` where `locale ∈ {en, ms}`. Default locale `en` may render at bare path (`/about`) OR always require prefix (`/en/about`). Recommend **always-prefixed** for symmetry; add a root redirect from `/` → `/en` (or negotiate from `Accept-Language`).
- Routing: move every segment under `src/app/[locale]/...`. The `[locale]` segment parameter flows into every page via `params.locale`.
- Negotiation: `src/proxy.ts` detects if URL has locale prefix; if not, 307-redirects to `/en` or `/ms` based on cookie, then `Accept-Language`.
- `src/lib/i18n/server.ts` reads locale from `params` (via layout), not from cookie.
- `src/lib/i18n/LanguageContext.tsx` becomes a thin consumer — the URL is the source of truth.

## Files touched (inventory)

| Area | Files | Count |
|---|---|---|
| Route tree | every `src/app/*/page.tsx`, `layout.tsx`, `metadata.ts` | ~60 |
| i18n helpers | `lib/i18n/{server,LanguageContext,translations,index}.ts` | 4 |
| Proxy | `src/proxy.ts` | 1 |
| Metadata builder | `lib/seo.ts` (`buildMetadata` takes locale, emits prefixed URLs + hreflang) | 1 |
| Sitemap | `app/sitemap.ts` (emit one entry per URL per locale) | 1 |
| Robots | `app/robots.ts` (no change) | 0 |
| Links | Every `Link href="..."` needs to be locale-aware. Helper `localeHref(locale, path)` | ~200 call sites |
| Language toggle | `components/LanguageToggle.tsx` (navigates to sibling locale URL instead of setting cookie) | 1 |

## The 7 staged steps

### Step 1 — Foundation (safe, additive, NO URL changes)
*Effort: 1-2 days · Risk: low · Shippable immediately*

- [ ] Add `localeHref(locale: Language, path: string): string` helper in `lib/i18n/index.ts`. Returns `path` unchanged for now.
- [ ] Add a type-safe `PATHS` enum of all internal routes (tools + services + loans + etc.).
- [ ] Refactor 20-30 most-trafficked `<Link>` call sites to use `localeHref(language, PATHS.x)` instead of raw string. No behavior change yet.
- [ ] Add `NEXT_PUBLIC_LOCALE_PREFIX_ENABLED=false` env flag. `localeHref` respects it.
- **Rollback**: flag stays false; helper is a no-op. Trivial.

### Step 2 — Parallel route tree under `[locale]`
*Effort: 3-5 days · Risk: medium · Do in feature branch*

- [ ] Scaffold `src/app/[locale]/` mirroring the existing tree. Every `page.tsx` re-exports the non-localized version initially.
- [ ] Add `src/app/[locale]/layout.tsx` that validates `params.locale ∈ {'en','ms'}` → `notFound()` otherwise.
- [ ] Update `resolveRequestLanguage()` to accept an override `(fromParams)`. Old cookie path still wins for non-prefixed routes.
- [ ] Verify `/en/about` and `/ms/about` render correctly in dev (both may render English until Step 3).
- [ ] **Non-prefixed routes continue to work** — this is critical. We're running both in parallel.
- **Rollback**: delete `src/app/[locale]/` folder. Non-prefixed routes untouched.

### Step 3 — Content localization via params
*Effort: 2-3 days · Risk: medium*

- [ ] Rewrite each `[locale]/.../page.tsx` to take `params.locale` and pass it through to content (instead of `resolveRequestLanguage()`).
- [ ] Update `buildMetadata(path, title, description, { locale })` → emit `url = SEO.url/${locale}${path}` and hreflang alternates pointing to `/en/...` and `/ms/...`.
- [ ] Add MS-only translated titles/descriptions to every `metadata.ts` (or compute from `translations.ts`).
- [ ] `generateStaticParams` from `[locale]` returns `[{ locale: 'en' }, { locale: 'ms' }]`.
- **Rollback**: revert layout.tsx to pass-through; English still renders.

### Step 4 — Sitemap and canonical rewrites
*Effort: 1 day · Risk: low*

- [ ] `sitemap.ts` emits `{url: '/en/...', alternates: {..., 'ms-MY': '/ms/...'}}` AND `{url: '/ms/...', alternates: {..., 'en-MY': '/en/...'}}`. Two entries per page.
- [ ] Update `app/[locale]/sitemap.ts` if Next splits by segment, otherwise root sitemap handles both.
- [ ] Canonical on each prefixed page points to itself (not to bare).
- [ ] Verify with `curl http://127.0.0.1:3000/sitemap.xml | grep -c '<loc>'` → should roughly double.
- **Rollback**: revert sitemap.ts.

### Step 5 — Proxy-based negotiation + redirects
*Effort: 2 days · Risk: HIGH · Do with feature flag*

- [ ] Extend `src/proxy.ts` to detect `/` and non-prefixed paths. If cookie/`Accept-Language` says MS → 307 to `/ms${path}`. Otherwise `/en${path}`.
- [ ] Preserve query string and hash across the redirect.
- [ ] Keep `gc_lang` cookie write (user explicitly switching language).
- [ ] Guard with `LOCALE_PREFIX_ENABLED` env. When off, proxy.ts behaves as today.
- [ ] Add a `localeHref` smart implementation: if flag on, prepends `/${locale}`; if off, returns `path?lang=ms` for MS.
- [ ] Integration test: crawl 20 known URLs with curl and assert status + final URL.
- **Rollback**: toggle env var off. The prefixed routes still exist but aren't forced.

### Step 6 — Cutover
*Effort: 1 day execution + 1 week monitoring · Risk: HIGH*

- [ ] Turn on `LOCALE_PREFIX_ENABLED=true` in production.
- [ ] Submit new sitemap to Google Search Console.
- [ ] Add 301 (permanent) redirects from `?lang=ms` URLs to `/ms/...` equivalents (keep 307 from step 5 as 301 after validation).
- [ ] Monitor GSC for:
  - Coverage drop >10% → pause.
  - Crawl errors on new URLs → fix.
  - Click share shift (English vs Malay) — this is the goal.
- [ ] Keep `?lang=ms` alive for 90 days as a redirect (not an origin).
- **Rollback**: flip flag off. Pre-indexed `/ms/...` pages still 200. Revert 301s to 307 for faster iteration.

### Step 7 — Cleanup
*Effort: 1 day · Risk: low · ~3 months after cutover*

- [ ] Confirm GSC shows `/ms/...` URLs indexed and no significant `?lang=ms` remaining traffic.
- [ ] Delete the non-prefixed route tree (`src/app/about/`, etc.) — everything now lives under `src/app/[locale]/`.
- [ ] Drop the `?lang=ms` cookie-based negotiation from `LanguageContext.tsx`.
- [ ] Delete `LOCALE_PREFIX_ENABLED` flag.
- [ ] Update docs, `LOCALE_MIGRATION_PLAN.md` → archive.

## Risks & mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Dead internal links after path rewrite | high | Grep `href="/` audit before cutover; use `localeHref` helper exclusively. |
| Google de-indexes during migration | medium | Keep non-prefixed routes 200 throughout. Use 307 (temporary) during testing, 301 (permanent) only at step 6. |
| Hreflang loop / conflict | medium | Each page canonical = self; alternates = the OTHER locale only + x-default. Verify with Google's Rich Results tool. |
| Cookie-set + prefix conflict | medium | Proxy should honor URL prefix OVER cookie. Cookie only informs the negotiation when URL is ambiguous (bare path). |
| Users bookmark `/`, get wrong locale | low | `/` 307 to default (`/en`) unless Accept-Language strongly indicates MS. Show language toggle prominently above the fold. |
| Double-indexed content (duplicate canonical) | high if misconfigured | Only the prefixed URL should be canonical. The `?lang=ms` redirect chain must be fixed. |

## Decision points to confirm before starting

1. **Always-prefixed or default-bare?**
   - `(A)` `/en/about` + `/ms/about`, `/about` 307 to default → cleanest, recommended.
   - `(B)` `/about` (English) + `/ms/about` → preserves existing English SEO but mixes conventions.
   - Recommendation: A. Short-term SEO dip on English URLs is recoverable via 301s; long-term clarity wins.

2. **Default locale behavior when no cookie/Accept-Language?**
   - `en-MY` default is consistent with current setup.

3. **Marketing impact of changed URLs?**
   - Run a link audit (internal docs, WhatsApp templates, social bios, old blog embeds). Provide a mapping table to marketing before cutover.

4. **Admin panel?**
   - Admin is single-language (English). No change needed.

## Definition of done

- `/en/about`, `/ms/about` both return 200 with locale-specific `<title>`, `<html lang>`, and content.
- `hreflang` on each page correctly names its alternate.
- `sitemap.xml` lists both locale variants of every page.
- GSC Coverage report shows stable or increased indexed URL count after 30 days.
- No internal `<Link>` or fetch URL hardcodes `/about` without going through `localeHref`.
- Language toggle changes URL (visible in address bar), not just a cookie.

## Estimated timeline

- Steps 1–2: 1–2 weeks (pre-work, safe)
- Steps 3–4: 1–2 weeks (content + sitemap)
- Step 5: 1 week + bake time
- Step 6: single cutover day + 1 week monitoring
- Step 7: 1 day after 90-day cleanup window

**Total calendar**: 3–6 months including GSC re-indexation stabilization.
