import { ListingShell } from '@/components/listings';
import { blogPosts, blogCategories, type BlogPost } from '@/lib/blog-data';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { PATHS } from '@/lib/i18n/routes';
import { SEO } from '@/lib/constants';
import { WebPageJsonLd } from '@/components/JsonLd';
import { blogUi } from '@/lib/content/listings/blog';
import { BlogListClient, type BlogListItem } from './BlogListClient';

// Slim projection kept in sync with `BlogListItem` in ./BlogListClient — the
// client component never imports blog-data.ts directly, so its bundle never
// pulls in the full article bodies (`content`/`contentMs`) or other
// server-only fields.
function toListItem(post: BlogPost): BlogListItem {
  const { slug, title, titleMs, excerpt, excerptMs, category, tags, image, readTime, publishedAt, updatedAt } = post;
  return { slug, title, titleMs, excerpt, excerptMs, category, tags, image, readTime, publishedAt, updatedAt };
}

export default async function BlogPage() {
  const language = await resolveRequestLanguage();
  const t = blogUi[language];
  const posts = blogPosts.map(toListItem);

  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/blog`}
        title={t.title}
        description={t.lede}
        language={language}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Blog', url: `${SEO.url}/blog` },
        ]}
      />
      <ListingShell
        language={language}
        breadcrumbs={[{ label: t.breadcrumbHome, href: PATHS.home }, { label: t.breadcrumbBlog, href: PATHS.blog }]}
        eyebrow={t.eyebrow}
        title={t.title}
        lede={t.lede}
      >
        <BlogListClient posts={posts} categories={blogCategories} />
      </ListingShell>
    </>
  );
}
