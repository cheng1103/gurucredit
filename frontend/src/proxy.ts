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

// Next.js middleware DOES re-run in this project on an internal
// `NextResponse.rewrite` (confirmed empirically against this actual runtime —
// see final-fix-report.md fix-round-2/3). The second pass sees the
// already-stripped path (no `/ms` prefix), so it needs to recover the locale
// the first pass derived from the URL. But `x-gc-locale`/`x-gc-path` are
// ordinary client-suppliable request headers, so a second pass can't just
// trust whatever it's handed — a client could forge the same headers on an
// arbitrary path. Instead, the first pass signs `${locale}|${path}` with an
// HMAC keyed by a secret generated fresh per process (never exposed to the
// client, never derivable from it), and the "second pass" branch only trusts
// the carried values when the signature verifies AND the current path
// matches the signed path. A forged request can't produce a valid signature
// without the secret, so it always falls through to the URL-only branch.
// Prefer a deterministic, operator-supplied secret (`LOCALE_SIG_SECRET`, set
// once on the Vercel project) so the signature still verifies if the two
// passes ever land in different isolates — a cold start, a different region,
// or a future Next change. Without it we fall back to per-process randomness,
// which is still fail-closed (a mismatch just falls through to the URL-only
// branch) but would resolve `/ms/x` to English on a cross-isolate second pass.
const SECRET = process.env.LOCALE_SIG_SECRET
  ? new TextEncoder().encode(process.env.LOCALE_SIG_SECRET)
  : crypto.getRandomValues(new Uint8Array(32));
let keyPromise: Promise<CryptoKey> | null = null;
const getKey = () =>
  (keyPromise ??= crypto.subtle.importKey('raw', SECRET, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']));
async function sign(payload: string): Promise<string> {
  const sig = await crypto.subtle.sign('HMAC', await getKey(), new TextEncoder().encode(payload));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function proxy(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl;

  const inboundLocale = request.headers.get('x-gc-locale');
  const inboundPath = request.headers.get('x-gc-path');
  const inboundSig = request.headers.get('x-gc-sig');

  // A genuine second pass lands on the exact stripped path the first pass
  // signed — if the current pathname doesn't match, or the locale isn't one
  // of the two we ever sign, or the signature doesn't verify, this cannot be
  // a real second pass, only a forgery.
  const trusted =
    !!inboundSig &&
    inboundPath === pathname &&
    (inboundLocale === 'en' || inboundLocale === 'ms') &&
    inboundSig === (await sign(`${inboundLocale}|${inboundPath}`));

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  let response: NextResponse;

  if (trusted) {
    // Second pass, verified genuine: re-stamp the already-correct
    // locale/path/signature and let the request through — no further
    // rewrite needed.
    requestHeaders.set('x-gc-locale', inboundLocale as string);
    requestHeaders.set('x-gc-path', inboundPath as string);
    requestHeaders.set('x-gc-sig', inboundSig as string);
    response = NextResponse.next({ request: { headers: requestHeaders } });
  } else {
    // No trusted carry-over: derive everything from the URL alone. Empty
    // string on `x-gc-locale` means "URL said nothing"; `resolveRequestLanguage()`
    // treats that as no signal and falls through to the `gc_lang` cookie /
    // `Accept-Language`, matching the pre-migration cookie-only behaviour.
    const isMsPath = pathname === '/ms' || pathname.startsWith('/ms/');
    const urlLocale = isMsPath ? 'ms' : '';
    const strippedPath = isMsPath ? pathname.slice(3) || '/' : pathname;

    requestHeaders.set('x-gc-locale', urlLocale);
    requestHeaders.set('x-gc-path', strippedPath);
    requestHeaders.delete('x-gc-sig');
    requestHeaders.delete('x-gc-rewritten');

    const doRewrite = LOCALE_PREFIX_ENABLED && isMsPath;

    if (doRewrite) {
      requestHeaders.set('x-gc-sig', await sign(`ms|${strippedPath}`));
      const url = new URL(strippedPath + request.nextUrl.search, request.url);
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

// The proxy is what NORMALISES `x-gc-locale`/`x-gc-path`/`x-gc-sig` — every
// request it does not run on delivers the client's raw values straight to
// `resolveRequestLanguage()` and the root layout's canonical builder. So the
// matcher must cover every path that can reach a React route, including ones
// with a dot in them (`/blog/foo.bar`): excluding `.*\..*` wholesale used to
// leave those spoofable. Exclude only the framework prefixes and an explicit
// list of real static asset extensions.
export const config = {
  matcher: [
    '/((?!api/|_next/|_vercel|\\.well-known/|.*\\.(?:png|jpe?g|webp|avif|gif|svg|ico|css|js|mjs|map|txt|xml|webmanifest|json|woff2?|ttf|otf|eot|mp4|webm|pdf)$).*)',
  ],
};
