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
}

export const buildMetadata = ({
  title,
  description,
  path,
  image,
  keywords,
}: PageMetadataInput): Metadata => {
  const url = `${SEO.url}${path}`;
  const imageUrl = image
    ? new URL(image, SEO.url).toString()
    : new URL(SEO.shareImage, SEO.url).toString();
  const fullTitle = `${title} | ${SEO.siteName}`;

  return {
    // Canonical + hreflang are emitted centrally from the root layout
    // (see localeAlternates), keyed off the request's locale + path.
    title,
    description,
    keywords,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SEO.siteName,
      type: 'website',
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
