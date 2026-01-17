import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost, getRelatedPosts, blogPosts } from '@/lib/blog-data';
import { SEO } from '@/lib/constants';
import { BlogPostClient } from './BlogPostClient';

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

  const ogImage = post.image ? new URL(post.image, SEO.url).toString() : defaultOgImage;
  const canonicalUrl = `${SEO.url}/blog/${post.slug}`;
  const malayUrl = `${canonicalUrl}?lang=ms`;
  const msTitle = post.titleMs ?? post.title;
  const msDescription = post.excerptMs ?? post.excerpt;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      locale: SEO.locale,
      alternateLocale: ['ms_MY'],
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
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-MY': canonicalUrl,
        'ms-MY': malayUrl,
      },
    },
    other: {
      'description:ms': msDescription,
      'og:title:ms': msTitle,
      'og:description:ms': msDescription,
      'twitter:title:ms': msTitle,
      'twitter:description:ms': msDescription,
      'link:alternate:ms-MY': malayUrl,
    },
  } satisfies Metadata;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
