'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { localeHref } from '@/lib/i18n/routes';

type LinkProps = ComponentProps<typeof Link>;

/**
 * Drop-in replacement for next/link that keeps the visitor inside their current
 * locale. Internal absolute paths (`/services`, `/blog/x`) are run through
 * `localeHref`, so a Malay visitor on `/ms/*` stays under `/ms`. External URLs,
 * hashes, and non-string hrefs pass through untouched.
 *
 * `localeHref` is a no-op while NEXT_PUBLIC_LOCALE_PREFIX_ENABLED is off, so this
 * behaves exactly like next/link until locale prefixes are enabled. The current
 * language comes from context, which the root layout seeds from the request —
 * so the correct prefix is present on the server render, with no hydration flash.
 */
export function LocaleLink({ href, ...props }: LinkProps) {
  const { language } = useLanguage();

  const localizedHref =
    typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')
      ? localeHref(language, href)
      : href;

  return <Link href={localizedHref} {...props} />;
}
