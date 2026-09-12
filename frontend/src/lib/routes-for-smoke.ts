import { staticEntries } from '@/app/sitemap';
import { blogPosts } from '@/lib/blog-data';
import { guideTopics } from '@/lib/guide-topics';
import { regionSlugs } from '@/lib/content/regions';

// One representative slug per dynamic family the sitemap enumerates, plus the
// one route family the sitemap deliberately omits (per-service apply pages
// are not indexed, but they are a distinct migrated template and must still
// be smoke-tested).
const SAMPLE_BLOG_SLUG = 'personal-loan-malaysia-complete-guide-2026';
const SAMPLE_TOPIC_SLUG = 'bad-credit-loan-options';
const SAMPLE_REGION_SLUG = 'selangor';
const SAMPLE_SERVICE_APPLY = '/services/1/apply';
// Non-indexed system routes (not in sitemap.ts): a per-locked-id apply
// confirmation and a status page, neither meant to be crawled/enumerated.
const NON_INDEXED_ROUTES = ['/status', '/services/success'];

/**
 * Routes for e2e smoke coverage: every static route from the sitemap (with
 * `''` normalised to `/`) plus one sample of each dynamic family
 * (region, blog post, guide topic) and the non-indexed apply/status/success
 * routes.
 *
 * Deriving this from `sitemap.ts` instead of hand-maintaining a parallel list
 * means a new static page added to the sitemap is smoke-tested automatically.
 */
export function smokeRoutes(): string[] {
  const staticRoutes = staticEntries.map(({ path }) => (path === '' ? '/' : path));

  if (!blogPosts.some((post) => post.slug === SAMPLE_BLOG_SLUG)) {
    throw new Error(`smokeRoutes: sample blog slug "${SAMPLE_BLOG_SLUG}" no longer exists`);
  }
  if (!guideTopics.some((topic) => topic.slug === SAMPLE_TOPIC_SLUG)) {
    throw new Error(`smokeRoutes: sample guide topic slug "${SAMPLE_TOPIC_SLUG}" no longer exists`);
  }
  if (!regionSlugs.includes(SAMPLE_REGION_SLUG)) {
    throw new Error(`smokeRoutes: sample region slug "${SAMPLE_REGION_SLUG}" no longer exists`);
  }

  return [
    ...staticRoutes,
    `/blog/${SAMPLE_BLOG_SLUG}`,
    `/loan-guides/topics/${SAMPLE_TOPIC_SLUG}`,
    `/loans/my/${SAMPLE_REGION_SLUG}`,
    SAMPLE_SERVICE_APPLY,
    ...NON_INDEXED_ROUTES,
  ];
}
