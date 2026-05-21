import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-data';
import { SEO } from '@/lib/constants';
import { regionSlugs } from '@/lib/content/regions';

type Alt = { [lang: string]: string };

const buildAlternates = (path: string): Alt => ({
  'en-MY': `${SEO.url}${path}`,
  'ms-MY': `${SEO.url}${path}?lang=ms`,
  'x-default': `${SEO.url}${path}`,
});

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SEO.url;

  const staticEntries: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/loan-guides', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/tools', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/eligibility-test', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/tools/compare', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/compare', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/documents', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/glossary', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/partners', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/loans/debt-consolidation', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/loans/emergency', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/loans/personal', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/loan-guides/credit-score', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/loan-guides/debt-consolidation', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/disclaimer', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const staticPages: MetadataRoute.Sitemap = staticEntries.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages: buildAlternates(path) },
  }));

  const regionPages: MetadataRoute.Sitemap = regionSlugs.map((slug) => ({
    url: `${base}/loans/my/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
    alternates: { languages: buildAlternates(`/loans/my/${slug}`) },
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    alternates: { languages: buildAlternates(`/blog/${post.slug}`) },
  }));

  return [...staticPages, ...regionPages, ...blogPages];
}
