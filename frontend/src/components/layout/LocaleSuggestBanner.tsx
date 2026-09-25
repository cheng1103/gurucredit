'use client';

import Link from 'next/link';
import { useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { LOCALE_PREFIX_ENABLED, localeHref } from '@/lib/i18n/routes';
import type { Language } from '@/lib/i18n/translations';

const COOKIE_KEY = 'gc_lang';
const DISMISS_KEY = 'gc_locale_suggest_dismissed';

// Nothing external mutates the cookie or the dismissal flag while this
// component stays mounted (switching locale navigates to a new URL, which
// remounts the page tree), so there is no real event to subscribe to. A
// no-op subscription plus a snapshot read is the useSyncExternalStore-
// sanctioned way to do a one-shot client-only read without reaching for
// setState-in-effect.
function subscribe() {
  return () => {};
}

function readCookieLang(): Language | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.split('; ').find((row) => row.startsWith(`${COOKIE_KEY}=`));
  const value = match?.split('=')[1];
  return value === 'ms' || value === 'en' ? value : null;
}

function getServerCookieSnapshot(): Language | null {
  return null;
}

function readDismissed(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(DISMISS_KEY) === '1';
  } catch {
    return false;
  }
}

function getServerDismissedSnapshot(): boolean {
  return false;
}

const copy = {
  toMs: { text: 'Baca dalam Bahasa Melayu', dismissLabel: 'Tutup' },
  toEn: { text: 'Read in English', dismissLabel: 'Dismiss' },
};

/**
 * Slim, dismissible bar suggesting the visitor's cookie-remembered locale
 * when it disagrees with the current URL. Never redirects — the URL stays
 * authoritative for SEO; this is purely an on-page nudge.
 */
export function LocaleSuggestBanner() {
  const pathname = usePathname() || '/';
  const cookieLang = useSyncExternalStore(subscribe, readCookieLang, getServerCookieSnapshot);
  const persistedDismissed = useSyncExternalStore(subscribe, readDismissed, getServerDismissedSnapshot);
  const [dismissedThisRender, setDismissedThisRender] = useState(false);

  if (!LOCALE_PREFIX_ENABLED || !cookieLang || persistedDismissed || dismissedThisRender) {
    return null;
  }

  const isMsPath = pathname === '/ms' || pathname.startsWith('/ms/');
  const suggestMs = !isMsPath && cookieLang === 'ms';
  const suggestEn = isMsPath && cookieLang === 'en';
  if (!suggestMs && !suggestEn) {
    return null;
  }

  const targetLocale: Language = suggestMs ? 'ms' : 'en';
  const label = suggestMs ? copy.toMs : copy.toEn;

  const dismiss = () => {
    try {
      window.sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // Private-mode/sessionStorage unavailable — the in-render dismissal
      // below still hides the banner for the rest of this page view.
    }
    setDismissedThisRender(true);
  };

  return (
    <div
      role="note"
      className="flex items-center justify-between gap-3 border-b border-border bg-tint px-4 py-2 text-sm text-foreground"
    >
      {/*
        This link intentionally crosses locales, so it uses next/link with an
        explicit `localeHref` target rather than `LocaleLink` — `LocaleLink`
        re-prefixes for the *current* language and would strip this straight
        back to where the visitor already is (the same reason LanguageSwitcher
        calls `localeHref` directly instead of going through `LocaleLink`).
      */}
      <Link href={localeHref(targetLocale, pathname)} className="font-medium text-primary hover:underline">
        {label.text} →
      </Link>
      <button
        type="button"
        onClick={dismiss}
        aria-label={label.dismissLabel}
        className="shrink-0 rounded-full p-1 text-foreground-muted transition-colors hover:bg-surface-alt hover:text-foreground"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
