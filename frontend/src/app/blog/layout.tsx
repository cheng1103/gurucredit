import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';
import { localizedMetadata } from '@/lib/seo';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { meta } from './metadata';

// `alternates` is deliberately dropped from the spread below: `buildMetadata`
// sets a canonical for `/blog` specifically (needed so the unit test and any
// direct import of ./metadata see a real canonical — see B1.5), but if this
// *layout's* exported metadata carried that same field, it would become the
// nearest ancestor defining `alternates` for every descendant segment,
// shadowing the root layout's per-request canonical (`localeAlternates`,
// keyed off the actual request path) for `/blog/[slug]` — pinning every post
// to `/blog` as its canonical instead of its own URL. Omitting the key here
// lets descendants keep inheriting the correct one from the root layout.
export async function generateMetadata(): Promise<Metadata> {
  const base = await localizedMetadata(meta);
  const baseWithoutAlternates: Metadata = { ...base };
  delete baseWithoutAlternates.alternates;

  const language = await resolveRequestLanguage();

  // A bare-string `title` here would stop the root template (`%s | GURU Credits`)
  // from reaching descendant segments (`/blog/[slug]`) — see task-B-brief B1.1.
  // `default` is locale-aware because /blog itself has no page-level metadata
  // of its own — this layout's title IS the index route's title.
  return {
    ...baseWithoutAlternates,
    title: { default: meta[language].title, template: `%s | ${SEO.siteName}` },
  };
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
