import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';
import { localizedMetadata } from '@/lib/seo';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { meta } from './metadata';

// `alternates` is deliberately dropped from the spread below — see the same
// note in src/app/blog/layout.tsx. Without this, this layout's canonical
// would shadow the root layout's per-request canonical for every descendant
// segment, pinning `/loan-guides/*` and `/loan-guides/topics/[slug]` to
// `/loan-guides` instead of their own URL.
export async function generateMetadata(): Promise<Metadata> {
  const base = await localizedMetadata(meta);
  const baseWithoutAlternates: Metadata = { ...base };
  delete baseWithoutAlternates.alternates;

  const language = await resolveRequestLanguage();

  // A bare-string `title` here would stop the root template (`%s | GURU Credits`)
  // from reaching descendant segments (`/loan-guides/*`, `/loan-guides/topics/[slug]`)
  // — see task-B-brief B1.1. `default` is locale-aware because /loan-guides
  // itself has no page-level metadata of its own.
  return {
    ...baseWithoutAlternates,
    title: { default: meta[language].title, template: `%s | ${SEO.siteName}` },
  };
}

export default function LoanGuidesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
