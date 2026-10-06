import { secureCookieFlag } from '@/lib/i18n/cookies';

const COOKIE_KEY = 'gc_vid';
const VISITOR_ID_RE = /^[0-9a-f]{32}$/;
// 180 days, matching the backend's PageView TTL (spec §4) and the data the
// visitor id is allowed to outlive.
const MAX_AGE_SECONDS = 15552000;

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));
  if (!match) return null;
  return match.slice(name.length + 1);
}

/** 16 random bytes as 32 lowercase hex chars — meaningless outside this cookie. */
function mintVisitorId(): string | null {
  if (typeof crypto === 'undefined' || typeof crypto.getRandomValues !== 'function') {
    return null;
  }
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Reads the `gc_vid` cookie (a random 32-hex visitor id — never derived from
 * any personal data) or mints and persists a new one when it is missing or
 * malformed. Returns `null` when `document` or `crypto` is unavailable
 * (SSR, or a locked-down browser) — callers must treat `null` as
 * "tracking unavailable" and skip silently, never throw.
 */
export function getOrCreateVisitorId(): string | null {
  if (typeof document === 'undefined') return null;

  const existing = readCookie(COOKIE_KEY);
  if (existing && VISITOR_ID_RE.test(existing)) {
    return existing;
  }

  const minted = mintVisitorId();
  if (!minted) return null;

  document.cookie = `${COOKIE_KEY}=${minted}; Path=/; Max-Age=${MAX_AGE_SECONDS}; SameSite=Lax${secureCookieFlag()}`;
  return minted;
}
