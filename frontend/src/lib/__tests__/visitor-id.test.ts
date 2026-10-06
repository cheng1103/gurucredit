import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getOrCreateVisitorId } from '@/lib/visitor-id';

const VISITOR_ID_RE = /^[0-9a-f]{32}$/;
const COOKIE_DESCRIPTOR = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');

/**
 * jsdom's real cookie jar enforces the `Secure` attribute (drops the write
 * outside an https context), which would hide exactly the bug this suite
 * needs to catch. Replacing the setter lets tests assert on the raw string
 * `getOrCreateVisitorId` asked to write, independent of jar enforcement,
 * while the getter still reflects a simple name=value jar for the
 * mint/reuse/replace assertions.
 */
function installCookieJar() {
  let jar: Record<string, string> = {};
  let lastWrite = '';

  Object.defineProperty(document, 'cookie', {
    configurable: true,
    get() {
      return Object.entries(jar)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');
    },
    set(raw: string) {
      lastWrite = raw;
      const [pair] = raw.split(';');
      const eq = pair.indexOf('=');
      if (eq === -1) return;
      const key = pair.slice(0, eq).trim();
      const value = pair.slice(eq + 1).trim();
      jar[key] = value;
    },
  });

  return {
    getLastWrite: () => lastWrite,
    reset: () => {
      jar = {};
      lastWrite = '';
    },
  };
}

describe('getOrCreateVisitorId', () => {
  let cookieJar: ReturnType<typeof installCookieJar>;
  let protocolSpy: ReturnType<typeof vi.spyOn> | null = null;

  beforeEach(() => {
    cookieJar = installCookieJar();
  });

  afterEach(() => {
    cookieJar.reset();
    if (COOKIE_DESCRIPTOR) {
      Object.defineProperty(document, 'cookie', COOKIE_DESCRIPTOR);
    }
    protocolSpy?.mockRestore();
    protocolSpy = null;
  });

  it('mints a new 32-hex id and writes it to the cookie when none exists', () => {
    const id = getOrCreateVisitorId();

    expect(id).toMatch(VISITOR_ID_RE);
    expect(document.cookie).toContain(`gc_vid=${id}`);
  });

  it('reuses an existing valid cookie instead of minting a new one', () => {
    const existing = 'a'.repeat(32);
    document.cookie = `gc_vid=${existing}`;
    cookieJar.getLastWrite(); // discard the setup write

    const id = getOrCreateVisitorId();

    expect(id).toBe(existing);
  });

  it('replaces a malformed cookie value with a freshly minted one', () => {
    document.cookie = 'gc_vid=not-a-valid-id';

    const id = getOrCreateVisitorId();

    expect(id).toMatch(VISITOR_ID_RE);
    expect(id).not.toBe('not-a-valid-id');
    expect(document.cookie).toContain(`gc_vid=${id}`);
  });

  it('appends Secure when the page is served over https', () => {
    protocolSpy = vi.spyOn(window, 'location', 'get').mockReturnValue({
      ...window.location,
      protocol: 'https:',
    });

    getOrCreateVisitorId();

    expect(cookieJar.getLastWrite()).toContain('; Secure');
  });

  it('omits Secure when the page is served over http', () => {
    protocolSpy = vi.spyOn(window, 'location', 'get').mockReturnValue({
      ...window.location,
      protocol: 'http:',
    });

    getOrCreateVisitorId();

    expect(cookieJar.getLastWrite()).not.toContain('; Secure');
  });
});
