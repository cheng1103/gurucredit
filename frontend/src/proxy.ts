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
  const alreadyRewritten = request.headers.get('x-gc-rewritten') === '1';
  const priorLocale = request.headers.get('x-gc-locale');
  const priorPath = request.headers.get('x-gc-path');

  const isMsPath = pathname === '/ms' || pathname.startsWith('/ms/');
  const locale = isMsPath ? 'ms' : priorLocale === 'ms' ? 'ms' : 'en';
  const strippedPath = isMsPath
    ? pathname.replace(/^\/ms/, '') || '/'
    : priorPath ?? pathname;

  // Request headers are readable by server components via `headers()`. Always
  // publish locale + logical path so metadata can build an accurate canonical.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-gc-locale', locale);
  requestHeaders.set('x-gc-path', strippedPath);
  requestHeaders.set('x-pathname', pathname);

  const doRewrite = LOCALE_PREFIX_ENABLED && isMsPath && !alreadyRewritten;
  if (doRewrite) {
    requestHeaders.set('x-gc-rewritten', '1');
  }

  let response: NextResponse;
  if (doRewrite) {
    const url = request.nextUrl.clone();
    url.pathname = strippedPath;
    response = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    // Keep the client-side language in sync with the URL locale.
    response.cookies.set(LANG_COOKIE, locale, {
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
