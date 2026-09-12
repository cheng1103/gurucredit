import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';
import { metadata as loanGuidesMetadata } from './metadata';

// `alternates` is deliberately dropped from the spread below — see the same
// note in src/app/blog/layout.tsx. Without this, this layout's canonical
// (hardcoded to `/loan-guides`) would shadow the root layout's per-request
// canonical for every descendant segment, pinning `/loan-guides/*` and
// `/loan-guides/topics/[slug]` to `/loan-guides` instead of their own URL.
const loanGuidesMetadataWithoutAlternates: Metadata = { ...loanGuidesMetadata };
delete loanGuidesMetadataWithoutAlternates.alternates;

// A bare-string `title` here would stop the root template (`%s | GURU Credits`)
// from reaching descendant segments (`/loan-guides/*`, `/loan-guides/topics/[slug]`)
// — see task-B-brief B1.1.
export const metadata: Metadata = {
  ...loanGuidesMetadataWithoutAlternates,
  title: { default: 'Malaysia Loan Guides: Home, Car & Credit', template: `%s | ${SEO.siteName}` },
};

export default function LoanGuidesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
