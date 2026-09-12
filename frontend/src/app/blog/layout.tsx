import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';
import { metadata as blogMetadata } from './metadata';

// `alternates` is deliberately dropped from the spread below: `buildMetadata`
// sets a canonical for `/blog` specifically (needed so the unit test and any
// direct import of ./metadata see a real canonical — see B1.5), but if this
// *layout's* exported metadata carried that same field, it would become the
// nearest ancestor defining `alternates` for every descendant segment,
// shadowing the root layout's per-request canonical (`localeAlternates`,
// keyed off the actual request path) for `/blog/[slug]` — pinning every post
// to `/blog` as its canonical instead of its own URL. Omitting the key here
// lets descendants keep inheriting the correct one from the root layout.
const blogMetadataWithoutAlternates: Metadata = { ...blogMetadata };
delete blogMetadataWithoutAlternates.alternates;

// A bare-string `title` here would stop the root template (`%s | GURU Credits`)
// from reaching descendant segments (`/blog/[slug]`) — see task-B-brief B1.1.
export const metadata: Metadata = {
  ...blogMetadataWithoutAlternates,
  title: { default: 'Blog', template: `%s | ${SEO.siteName}` },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
