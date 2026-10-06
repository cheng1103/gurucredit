'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { getOrCreateVisitorId } from '@/lib/visitor-id';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const BEACON_URL = `${API_URL}/analytics/track`;

type Locale = 'en' | 'ms';

/** Mirrors the `/ms` URL prefix the proxy already rewrites on (spec §6). */
function localeFromPath(path: string): Locale {
  return path === '/ms' || path.startsWith('/ms/') ? 'ms' : 'en';
}

function doNotTrackRequested(): boolean {
  if (typeof navigator !== 'undefined' && navigator.doNotTrack === '1') {
    return true;
  }
  const win = typeof window !== 'undefined' ? (window as Window & { doNotTrack?: string }) : undefined;
  return win?.doNotTrack === '1';
}

/** Host of `document.referrer`, omitted when it is this site's own host. */
function externalReferrerHost(): string | undefined {
  if (typeof document === 'undefined' || !document.referrer) return undefined;
  try {
    const referrerHost = new URL(document.referrer).hostname;
    const ownHost = typeof window !== 'undefined' ? window.location.hostname : undefined;
    if (!referrerHost || referrerHost === ownHost) return undefined;
    return referrerHost;
  } catch {
    return undefined;
  }
}

function sendPageView(path: string, locale: Locale): void {
  try {
    const visitorId = getOrCreateVisitorId();
    if (!visitorId) return;

    const body = JSON.stringify({
      path,
      locale,
      visitorId,
      referrerHost: externalReferrerHost(),
    });

    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' });
      const sent = navigator.sendBeacon(BEACON_URL, blob);
      if (sent) return;
    }

    if (typeof fetch === 'function') {
      fetch(BEACON_URL, {
        method: 'POST',
        keepalive: true,
        headers: { 'Content-Type': 'application/json' },
        body,
      }).catch(() => {
        // Tracking must never surface to the visitor.
      });
    }
  } catch {
    // Tracking must never break a render.
  }
}

/**
 * Mounted once in the root layout. Fires one anonymous beacon per distinct
 * path to `POST {NEXT_PUBLIC_API_URL}/analytics/track` (Task 1's endpoint).
 * Only `{ path, locale, visitorId, referrerHost? }` is ever sent — no IP, no
 * user agent, no query string, no page title, no user identity.
 *
 * `lastSentPath` (a ref, not state — no `setState` in an effect) is what
 * keeps a single navigation from being counted twice: React strict mode
 * double-invokes this effect for the same commit, and the `/ms` rewrite can
 * re-render without actually changing the path. Both leave `pathname`
 * unchanged on the repeat run, so the ref guard skips it.
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const lastSentPath = useRef<string | null>(null);

  useEffect(() => {
    try {
      if (!pathname) return;
      if (doNotTrackRequested()) return;
      if (lastSentPath.current === pathname) return;
      lastSentPath.current = pathname;

      sendPageView(pathname, localeFromPath(pathname));
    } catch {
      // Tracking must never break a render.
    }
  }, [pathname]);

  return null;
}
