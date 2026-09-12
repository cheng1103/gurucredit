import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LANG_COOKIE = 'gc_lang';
const LANG_MAX_AGE = 60 * 60 * 24 * 365;

// URL-prefixed locale routing. Ships dormant: until
// NEXT_PUBLIC_LOCALE_PREFIX_ENABLED === 'true', `/ms` paths are not rewritten
// and no locale cookie is forced from the URL — behaviour matches the previous
// cookie-only setup. See docs/superpowers/specs/2026-07-02-ms-locale-routing-design.md
const LOCALE_PREFIX_ENABLED =
  process.env.NEXT_PUBLIC_LOCALE_PREFIX_ENABLED === 'true';

export function proxy(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl;

  // In production, middleware re-runs on internal rewrites — the second pass
  // sees the already-stripped path (no `/ms` prefix). Carry the locale + logical
  // path we resolved on the first pass so the second pass can't reset them to
  // English. (`x-gc-rewritten` marks that first pass.)
  //
  // `x-gc-rewritten`/`x-gc-locale`/`x-gc-path` are client-suppliable request
  // headers — `new Headers(request.headers)` below starts as a clone of
  // whatever the caller sent, including these. A request can claim
  // `x-gc-rewritten: 1` and `x-gc-locale: ms` (or an arbitrary `x-gc-path`)
  // without ever hitting `/ms`, so those inbound values must never be trusted
  // as-is: an internal rewrite only ever lands on the un-prefixed path (never
  // `/ms/...`), so a rewritten-marker on an `/ms` path is necessarily a spoof.
  // The two header lines further down then unconditionally overwrite
  // `x-gc-locale`/`x-gc-path` on every response so a client-supplied value can
  // never survive untouched.
  const rewrittenHeaderClaimed = request.headers.get('x-gc-rewritten') === '1';
  const isMsPath = pathname === '/ms' || pathname.startsWith('/ms/');
  const alreadyRewritten = rewrittenHeaderClaimed && !isMsPath;
  const priorLocale = alreadyRewritten ? request.headers.get('x-gc-locale') : null;
  const priorPath = alreadyRewritten ? request.headers.get('x-gc-path') : null;

  // Only the URL itself is authoritative for locale — either this request's
  // path is `/ms`, or (on the internal rewrite's second middleware pass,
  // verified genuine above) `x-gc-locale` was already set to `ms` from the
  // first pass. Any other bare path carries no URL signal: leave the header
  // empty so `resolveRequestLanguage()` falls through to the `gc_lang` cookie
  // / `Accept-Language`, matching the pre-migration cookie-only behaviour the
  // comment above promises.
  const urlLocale = isMsPath ? 'ms' : priorLocale === 'ms' ? 'ms' : null;
  const strippedPath = isMsPath
    ? pathname.replace(/^\/ms/, '') || '/'
    : priorPath ?? pathname;

  // Request headers are readable by server components via `headers()`.
  // Always overwrite the locale/path headers so a client-supplied value can
  // never survive through to `resolveRequestLanguage()` / `generateMetadata()`
  // — empty string on `x-gc-locale` means "URL said nothing", which
  // `resolveRequestLanguage()` treats as no signal and falls through to the
  // cookie.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-gc-locale', urlLocale ?? '');
  requestHeaders.set('x-gc-path', strippedPath);
  requestHeaders.set('x-pathname', pathname);

  const doRewrite = LOCALE_PREFIX_ENABLED && isMsPath && !alreadyRewritten;
  // Always set this explicitly too, rather than leaving whatever the client
  // sent — the second-pass marker must only ever be true when we ourselves
  // are issuing the rewrite this pass.
  requestHeaders.set('x-gc-rewritten', doRewrite ? '1' : '0');

  let response: NextResponse;
  if (doRewrite) {
    const url = request.nextUrl.clone();
    url.pathname = strippedPath;
    response = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    // Keep the client-side language in sync with the URL locale.
    // `doRewrite` implies `isMsPath`, so `urlLocale` is always 'ms' here.
    response.cookies.set(LANG_COOKIE, 'ms', {
      maxAge: LANG_MAX_AGE,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  } else {
    response = NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Preserve the legacy ?lang= override (used by the client language toggle).
  const queryLang = searchParams.get('lang');
  if (queryLang === 'en' || queryLang === 'ms') {
    response.cookies.set(LANG_COOKIE, queryLang, {
      maxAge: LANG_MAX_AGE,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!api/|_next/|_vercel|.*\\..*).*)'],
};
