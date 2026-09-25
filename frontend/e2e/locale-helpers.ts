import type { APIRequestContext } from '@playwright/test';

/**
 * Detects whether NEXT_PUBLIC_LOCALE_PREFIX_ENABLED is on for the server
 * under test, by probing a route known to exist in both languages. Lets
 * these specs pass against production (flag off, `/ms/*` 404s) and against a
 * local/staging run with the flag on, without hand-maintaining two configs.
 */
export async function localePrefixEnabled(request: APIRequestContext): Promise<boolean> {
  const res = await request.get('/ms/glossary', { maxRedirects: 0 });
  return res.status() === 200;
}

/** `/` -> `/ms`, `/about` -> `/ms/about`. Mirrors `localeHref('ms', path)`. */
export function toMsPath(path: string): string {
  return path === '/' ? '/ms' : `/ms${path}`;
}
