import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost, getRelatedPosts, blogPosts } from '@/lib/blog-data';
import { SEO } from '@/lib/constants';
import { localeAlternates } from '@/lib/seo';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { BlogArticle } from '@/components/blog/BlogArticle';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const defaultOgImage = new URL(SEO.shareImage, SEO.url).toString();

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  const language = await resolveRequestLanguage();
  const ogImage = post.image ? new URL(post.image, SEO.url).toString() : defaultOgImage;
  const canonicalUrl = language === 'ms' ? `${SEO.url}/ms/blog/${post.slug}` : `${SEO.url}/blog/${post.slug}`;
  // seoTitle/seoTitleMs are shorter <title>-only overrides for posts whose
  // on-page H1 (post.title/titleMs) is too long for search result display.
  const seoTitle = language === 'ms' ? (post.seoTitleMs ?? post.titleMs) : (post.seoTitle ?? post.title);
  const description = language === 'ms' ? post.excerptMs : post.excerpt;

  return {
    title: seoTitle,
    description,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: seoTitle,
      description,
      type: 'article',
      locale: language === 'ms' ? 'ms_MY' : SEO.locale,
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      url: canonicalUrl,
      siteName: SEO.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          // Alt text has to be in the language of the page it describes —
          // a `/ms` post sharing an English alt is the same defect as an
          // English `<html lang="ms">` (final-review.md M6).
          alt: language === 'ms' ? post.titleMs : post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description,
      images: [ogImage],
    },
    // Set explicitly (rather than relying on inheritance from the root
    // layout) because blog/layout.tsx sits between this page and the root —
    // see the note there about why a layout-level `alternates` would shadow
    // this page's own canonical if it defined one.
    alternates: localeAlternates(language, `/blog/${post.slug}`),
  } satisfies Metadata;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  return <BlogArticle post={post} relatedPosts={relatedPosts} />;
}
