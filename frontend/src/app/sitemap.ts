import type { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-data';
import { guideTopics, contentUpdatedAt as guideTopicsUpdatedAt } from '@/lib/guide-topics';
import { SEO } from '@/lib/constants';
import { regionSlugs, contentUpdatedAt as regionsUpdatedAt } from '@/lib/content/regions';
import { LOCALE_PREFIX_ENABLED } from '@/lib/i18n/routes';

type Alt = { [lang: string]: string };

// Stable lastmod for the static/legal pages below, which have no per-item
// content date of their own. Bump this when that content is meaningfully
// revised — do NOT use `new Date()` here, which would stamp every page as
// "modified now" on each build and make the lastmod signal worthless to
// search engines.
//
// Region (`/loans/my/*`) and guide topic (`/loan-guides/topics/*`) entries
// instead derive their lastmod from `contentUpdatedAt` exported alongside
// that content (src/lib/content/regions.ts, src/lib/guide-topics.ts), so
// editing those files is what has to bump the date — it can't go stale
// behind an unrelated constant here.
const LAST_CONTENT_UPDATE = new Date('2026-06-25T00:00:00Z');
const REGIONS_UPDATED = new Date(regionsUpdatedAt);
const GUIDE_TOPICS_UPDATED = new Date(guideTopicsUpdatedAt);

const buildAlternates = (path: string): Alt => {
  const languages: Alt = {
    'en-MY': `${SEO.url}${path}`,
    'x-default': `${SEO.url}${path}`,
  };
  if (LOCALE_PREFIX_ENABLED) {
    languages['ms-MY'] = `${SEO.url}/ms${path}`;
  }
  return languages;
};

type EntryMeta = {
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  lastModified: Date;
};

// One logical path → an English entry plus, when locale prefixes are on, its
// `/ms` counterpart. Both carry the full hreflang set so the two URLs cross-link.
const localizedEntries = (path: string, meta: EntryMeta): MetadataRoute.Sitemap => {
  const languages = buildAlternates(path);
  const entries: MetadataRoute.Sitemap = [
    { url: `${SEO.url}${path}`, ...meta, alternates: { languages } },
  ];
  if (LOCALE_PREFIX_ENABLED) {
    entries.push({ url: `${SEO.url}/ms${path}`, ...meta, alternates: { languages } });
  }
  return entries;
};

export type StaticEntry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
};

// Exported so e2e/smoke can derive its route list from the same source of
// truth instead of maintaining a second, hand-copied list.
export const staticEntries: StaticEntry[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/loan-guides', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/tools', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/eligibility-test', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/tools/compare', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/documents', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/glossary', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/partners', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/verify-us', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/editorial-policy', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/review-methodology', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/service-areas', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/loans/debt-consolidation', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/loans/emergency', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/loans/personal', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/loan-guides/credit-score', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/loan-guides/debt-consolidation', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/loan-guides/ccris-ctos', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/loan-guides/loan-rejection-recovery', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/loan-guides/self-employed-income-proof', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/disclaimer', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = staticEntries.flatMap(({ path, priority, changeFrequency }) =>
    localizedEntries(path, { priority, changeFrequency, lastModified: LAST_CONTENT_UPDATE }),
  );

  const regionPages: MetadataRoute.Sitemap = regionSlugs.flatMap((slug) =>
    localizedEntries(`/loans/my/${slug}`, {
      priority: 0.75,
      changeFrequency: 'monthly',
      lastModified: REGIONS_UPDATED,
    }),
  );

  const blogPages: MetadataRoute.Sitemap = blogPosts.flatMap((post) =>
    localizedEntries(`/blog/${post.slug}`, {
      priority: 0.7,
      changeFrequency: 'monthly',
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
    }),
  );

  const topicPages: MetadataRoute.Sitemap = guideTopics.flatMap((topic) =>
    localizedEntries(`/loan-guides/topics/${topic.slug}`, {
      priority: 0.72,
      changeFrequency: 'monthly',
      lastModified: GUIDE_TOPICS_UPDATED,
    }),
  );

  return [...staticPages, ...regionPages, ...blogPages, ...topicPages];
}
