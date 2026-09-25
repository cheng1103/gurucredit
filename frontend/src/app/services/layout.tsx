import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';
import { localizedMetadata } from '@/lib/seo';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { meta } from './metadata';

// See `blog/layout.tsx` for why `alternates` is dropped: this layout's
// metadata sets a canonical for `/services` specifically, but if this
// layout's exported metadata carried that same field, it would become the
// nearest ancestor defining `alternates` for every descendant segment
// (`/services/[id]/apply`, `/services/success`), shadowing the root
// layout's per-request canonical instead of letting each page keep its own.
export async function generateMetadata(): Promise<Metadata> {
  const base = await localizedMetadata(meta);
  const baseWithoutAlternates: Metadata = { ...base };
  delete baseWithoutAlternates.alternates;

  const language = await resolveRequestLanguage();

  // A bare-string `title` here would stop the root template (`%s | GURU Credits`)
  // from reaching descendant segments (`/services/[id]/apply`, `/services/success`).
  // `default` is locale-aware because /services itself has no page-level
  // metadata of its own.
  return {
    ...baseWithoutAlternates,
    title: { default: meta[language].title, template: `%s | ${SEO.siteName}` },
  };
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
