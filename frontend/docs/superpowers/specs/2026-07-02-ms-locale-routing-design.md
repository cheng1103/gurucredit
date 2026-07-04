# Real `/ms` Locale Routing & SEO — Design

Date: 2026-07-02
Status: Approved-by-default (author away), implemented behind existing feature flag.

## Goal

Turn Malay (`ms`) from a client-only cookie toggle into **genuinely indexable
localized URLs**: `/ms/*` pages that server-render Malay, self-canonicalize to
their own `/ms` URL, and carry reciprocal `hreflang` pairs with the English
originals. English stays at the un-prefixed paths (`/about`, `/blog/x`).

## Why this is a routing problem, not a translation problem

The codebase was already scaffolded for this migration:

- `src/lib/i18n/routes.ts` — `LOCALE_PREFIX_ENABLED` env flag, `localeHref(locale, path)`
  prefix helper, `SUPPORTED_LOCALES = ['en','ms']`, typed `PATHS` registry.
- `resolveRequestLanguage()` already resolves language server-side (cookie / Accept-Language).
- 30 / 35 pages already render content by `[language]` (`home.ts`, `regions.ts`,
  `translations.ts` all have en + ms).
- All 27 blog posts already have `titleMs` / `excerptMs` / `contentMs`.
- `localeHref` is already used in Navbar, Footer, and the main CTA/section components.

Missing: the URL layer, per-locale metadata, `<html lang>`, and sitemap entries.

## Approach A (chosen): middleware rewrite + centralized metadata

Least-invasive path that completes the existing scaffold. Rejected: `[lang]`
segment (moves all 35 pages, high regression risk); `next.config` rewrites (fragile).

### 1. `src/middleware.ts` (new)
On every matched request:
- Compute `locale` and stripped `path` from the URL (`/ms/foo` → locale `ms`, path `/foo`).
- Always set request headers `x-gc-locale` and `x-gc-path` (so metadata knows both,
  even when the flag is off).
- When `LOCALE_PREFIX_ENABLED` **and** the path is `/ms` or `/ms/*`: internally
  `rewrite` to the stripped path and set `gc_lang=ms` cookie so client hydration matches.
- Matcher excludes `_next`, `api`, and static files.

### 2. `resolveRequestLanguage()`
Prefer `x-gc-locale` header (URL-driven) over cookie over Accept-Language. This
makes all 30 server pages render the correct language under `/ms` with **zero page edits**.

### 3. Root `layout.tsx`
- Convert static `metadata` → `async generateMetadata()` that reads
  `x-gc-locale` / `x-gc-path` and emits the **self-canonical** for the current
  locale plus reciprocal `hreflang` (`en-MY` → en URL, `ms-MY` → `/ms` URL,
  `x-default` → en URL) and `og:locale`. The `ms` hreflang is only emitted when
  the flag is on (otherwise `/ms` 404s).
- Make `RootLayout` async, resolve locale, render `<html lang={locale}>`, and pass
  `initialLanguage` to `<Providers>`.

Because canonical/hreflang now live in the root layout (keyed off `x-gc-path`),
individual pages **drop their own `alternates`** and inherit the correct per-path values.

### 4. `Providers` + `LanguageProvider`
Accept an `initialLanguage` prop, used as the provider's initial state so that
SSR — including the 4 client pages (blog list, blog post, eligibility-test,
tools/compare) — renders in the correct language instead of defaulting to `en`.

### 5. `buildMetadata` (`seo.ts`) + inline-metadata pages
Remove `alternates` from `buildMetadata` and from the blog `[slug]`, region,
topic, and `services` metadata. Root layout owns canonical/hreflang.

### 6. `LanguageSwitcher`
On locale select, `router.push(localeHref(lang, strippedPathname))` so the URL
carries the locale (not just cookie/state). Keep existing cookie/state sync.

### 7. `sitemap.ts`
When the flag is on, emit both the en URL and the `/ms` URL for every path, each
with `{ en-MY, ms-MY, x-default }` alternates. When off, current en-only output.

### 8. Activation
Everything ships **dormant** behind `NEXT_PUBLIC_LOCALE_PREFIX_ENABLED`. Production
goes live only when that env var is set to `true` and redeployed — a deliberate,
reversible switch owned by the site operator.

## Edge cases
- Flag off: middleware still sets headers; locale is always `en`; no `ms` hreflang.
- `/` path normalization: `path === '/'` → empty suffix so en canonical is the bare origin.
- Query strings ignored for canonical.
- `headers()` in `generateMetadata` makes affected segments dynamic — most already are.

## Verification
Build with `LOCALE_PREFIX_ENABLED=true`; confirm `/ms` routes render Malay,
`<html lang="ms">`, self-canonical `= /ms/...`, reciprocal hreflang, and sitemap
carries both locales.
