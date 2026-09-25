/**
 * `; Secure` when — and only when — the page is actually served over HTTPS.
 *
 * The proxy already sets `gc_lang` with `Secure` in production
 * (src/proxy.ts), so a client-side write without it silently downgrades the
 * cookie. Gating on `location.protocol` rather than `NODE_ENV` keeps the
 * cookie writable on `http://127.0.0.1` during local dev and e2e runs, where
 * a `Secure` cookie would simply be dropped.
 */
export function secureCookieFlag(): string {
  return typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : '';
}
