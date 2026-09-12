import type { Metadata } from 'next';
import { SEO } from './constants';
import { LOCALE_PREFIX_ENABLED } from './i18n/routes';
import type { Language } from './i18n/translations';

/**
 * Self-referencing canonical + reciprocal hreflang for a given locale and
 * logical (un-prefixed) path. Emitted once from the root layout so every page
 * inherits correct per-URL alternates without repeating this per page.
 *
 * - English canonical lives at the bare path (`/about`).
 * - Malay canonical lives under `/ms` (`/ms/about`) — only advertised via
 *   hreflang while the locale-prefix flag is on (otherwise `/ms` 404s).
 */
export function localeAlternates(
  locale: Language,
  path: string,
): NonNullable<Metadata['alternates']> {
  const suffix = path === '/' ? '' : path;
  const enUrl = `${SEO.url}${suffix}`;
  const msUrl = `${SEO.url}/ms${suffix}`;
  const canonical = locale === 'ms' ? msUrl : enUrl;

  const languages: Record<string, string> = {
    'en-MY': enUrl,
    'x-default': enUrl,
  };
  if (LOCALE_PREFIX_ENABLED) {
    languages['ms-MY'] = msUrl;
  }

  return { canonical, languages };
}

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string;
  /** Locale this page's content is written in. Defaults to 'en'. Drives
   * `openGraph.locale`/`alternateLocale` and the canonical/hreflang set. */
  locale?: Language;
}

export const buildMetadata = ({
  title,
  description,
  path,
  image,
  keywords,
  locale = 'en',
}: PageMetadataInput): Metadata => {
  const url = `${SEO.url}${path}`;
  const imageUrl = image
    ? new URL(image, SEO.url).toString()
    : new URL(SEO.shareImage, SEO.url).toString();
  const fullTitle = `${title} | ${SEO.siteName}`;
  const ogLocale = locale === 'ms' ? 'ms_MY' : SEO.locale;
  const alternateLocale = locale === 'ms' ? [SEO.locale] : ['ms_MY'];

  return {
    // Also emitted centrally from the root layout (see localeAlternates) for
    // the request's actual locale/path — this keeps each page's own metadata
    // object self-contained (and testable) even before that merge happens.
    title,
    description,
    keywords,
    alternates: localeAlternates(locale, path),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SEO.siteName,
      type: 'website',
      locale: ogLocale,
      alternateLocale,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
};
