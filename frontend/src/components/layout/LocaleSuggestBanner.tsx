'use client';

import { useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { LOCALE_PREFIX_ENABLED, localeHref } from '@/lib/i18n/routes';
import { secureCookieFlag } from '@/lib/i18n/cookies';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { Language } from '@/lib/i18n/translations';

// `gc_pref` is written only from an explicit user switch (LanguageContext's
// `setLanguage`) — unlike `gc_lang`, which is re-derived from the current URL
// on every mount and so always agrees with whatever page you're already on.
// Reading `gc_lang` here would mean the banner could never fire.
const PREF_COOKIE_KEY = 'gc_pref';
const DISMISS_COOKIE_KEY = 'gc_pref_dismissed';

// Nothing external mutates either cookie while this component stays mounted
// (switching locale navigates to a new URL, which remounts the page tree), so
// there is no real event to subscribe to. A no-op subscription plus a
// snapshot read is the useSyncExternalStore-sanctioned way to do a one-shot
// client-only read without reaching for setState-in-effect.
function subscribe() {
  return () => {};
}

function readCookie(key: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.split('; ').find((row) => row.startsWith(`${key}=`));
  return match ? match.split('=')[1] : null;
}

function readPrefLang(): Language | null {
  const value = readCookie(PREF_COOKIE_KEY);
  return value === 'ms' || value === 'en' ? value : null;
}

function getServerPrefSnapshot(): Language | null {
  return null;
}

function readDismissed(): boolean {
  return readCookie(DISMISS_COOKIE_KEY) === '1';
}

function getServerDismissedSnapshot(): boolean {
  return false;
}

// `text` is deliberately written in the *target* language — that is the whole
// point of the nudge. `dismissLabel` is keyed by the language of the page the
// banner is rendered on, so a screen reader on `<html lang="en">` never has to
// announce a Malay word (and vice versa).
const copy = {
  toMs: { text: 'Baca dalam Bahasa Melayu' },
  toEn: { text: 'Read in English' },
};

const dismissLabel: Record<Language, string> = {
  en: 'Dismiss',
  ms: 'Tutup',
};

/**
 * Slim, dismissible bar suggesting the visitor's explicitly-chosen locale
 * (`gc_pref`) when it disagrees with the current URL's language. Never
 * redirects — the URL stays authoritative for SEO; this is purely an
 * on-page nudge.
 */
export function LocaleSuggestBanner() {
  const pathname = usePathname() || '/';
  const { language: urlLanguage } = useLanguage();
  const prefLang = useSyncExternalStore(subscribe, readPrefLang, getServerPrefSnapshot);
  const persistedDismissed = useSyncExternalStore(subscribe, readDismissed, getServerDismissedSnapshot);
  const [dismissedThisRender, setDismissedThisRender] = useState(false);

  if (
    !LOCALE_PREFIX_ENABLED ||
    !prefLang ||
    prefLang === urlLanguage ||
    persistedDismissed ||
    dismissedThisRender
  ) {
    return null;
  }

  const label = prefLang === 'ms' ? copy.toMs : copy.toEn;

  const dismiss = () => {
    // Session cookie (no max-age/expires): the suggestion can resurface next
    // visit, but stays dismissed for the rest of this browser session.
    document.cookie = `${DISMISS_COOKIE_KEY}=1; Path=/; SameSite=Lax${secureCookieFlag()}`;
    setDismissedThisRender(true);
  };

  return (
    <div
      role="note"
      className="flex items-center justify-between gap-3 border-b border-border bg-tint px-4 py-2 text-sm text-foreground"
    >
      {/*
        A PLAIN anchor, deliberately — not next/link and not LocaleLink.
        `LocaleLink` re-prefixes for the *current* language and would strip
        this straight back to where the visitor already is, and next/link
        would both prefetch and soft-navigate: because `/ms/<path>` is a
        rewrite of `/<path>` (src/proxy.ts), the two locales share one client
        router cache node, so a soft navigation renders the cached tree in the
        wrong language. A plain anchor is a document load, which re-runs the
        proxy and the server render.
      */}
      <a href={localeHref(prefLang, pathname)} className="font-medium text-primary hover:underline">
        {label.text} →
      </a>
      <button
        type="button"
        onClick={dismiss}
        aria-label={dismissLabel[urlLanguage]}
        className="shrink-0 rounded-full p-1 text-foreground-muted transition-colors hover:bg-surface-alt hover:text-foreground"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
