import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';
import { metadata as servicesMetadata } from './metadata';

// See `blog/layout.tsx` for why `alternates` is dropped: this layout's
// `buildMetadata` output sets a canonical for `/services` specifically, but
// if this layout's exported metadata carried that same field, it would
// become the nearest ancestor defining `alternates` for every descendant
// segment (`/services/[id]/apply`, `/services/success`), shadowing the root
// layout's per-request canonical instead of letting each page keep its own.
const servicesMetadataWithoutAlternates: Metadata = { ...servicesMetadata };
delete servicesMetadataWithoutAlternates.alternates;

// A bare-string `title` here would stop the root template (`%s | GURU Credits`)
// from reaching descendant segments (`/services/[id]/apply`, `/services/success`).
export const metadata: Metadata = {
  ...servicesMetadataWithoutAlternates,
  title: { default: 'Malaysia Loan Services', template: `%s | ${SEO.siteName}` },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
