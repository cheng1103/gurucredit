import type { APIRequestContext } from '@playwright/test';

/**
 * Detects whether NEXT_PUBLIC_LOCALE_PREFIX_ENABLED is on for the server
 * under test, by probing a route known to exist in both languages. Lets
 * these specs pass against production (flag off, `/ms/*` 404s) and against a
 * local/staging run with the flag on, without hand-maintaining two configs.
 */
export async function localePrefixEnabled(request: APIRequestContext): Promise<boolean> {
  const res = await request.get('/ms/glossary', { maxRedirects: 0 });
  const enabled = res.status() === 200;

  // Pre-deploy / production-parity runs set EXPECT_LOCALE_PREFIX=1. Without
  // it, a server built with the flag missing makes the entire `/ms` surface
  // pass VACUOUSLY — every assertion silently skipped, 0 failures reported —
  // which is precisely the misconfigured-deploy case the suite exists to
  // catch (final-review.md I2). With it, a dormant server is a hard failure.
  if (!enabled && process.env.EXPECT_LOCALE_PREFIX === '1') {
    throw new Error(
      `EXPECT_LOCALE_PREFIX=1 but /ms/glossary returned ${res.status()} (expected 200). ` +
        'The server under test was built without NEXT_PUBLIC_LOCALE_PREFIX_ENABLED="true", ' +
        'so the whole /ms surface is dormant. Rebuild with the flag on, or unset ' +
        'EXPECT_LOCALE_PREFIX to allow the dormant-behaviour run.',
    );
  }

  return enabled;
}

/** `/` -> `/ms`, `/about` -> `/ms/about`. Mirrors `localeHref('ms', path)`. */
export function toMsPath(path: string): string {
  return path === '/' ? '/ms' : `/ms${path}`;
}
