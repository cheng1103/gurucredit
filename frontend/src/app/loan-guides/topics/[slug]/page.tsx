import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { SEO } from '@/lib/constants';
import { localeAlternates } from '@/lib/seo';
import { guideTopics, getGuideTopic } from '@/lib/guide-topics';
import { guideFromTopic } from '@/lib/content/guides/from-topic';
import { GuideArticle } from '@/components/guides/GuideArticle';

interface TopicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guideTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getGuideTopic(slug);

  if (!topic) {
    return { title: 'Guide Not Found' };
  }

  const canonicalUrl = `${SEO.url}/loan-guides/topics/${topic.slug}`;
  const ogImage = new URL(SEO.shareImage, SEO.url).toString();

  return {
    title: topic.title,
    description: topic.description,
    // Set explicitly (rather than relying on inheritance from the root
    // layout) because loan-guides/layout.tsx sits between this page and the
    // root — see the note there about why a layout-level `alternates` would
    // shadow this page's own canonical if it defined one.
    alternates: localeAlternates('en', `/loan-guides/topics/${topic.slug}`),
    openGraph: {
      title: `${topic.title} | ${SEO.siteName}`,
      description: topic.description,
      url: canonicalUrl,
      siteName: SEO.siteName,
      type: 'article',
      locale: SEO.locale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: topic.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${topic.title} | ${SEO.siteName}`,
      description: topic.description,
      images: [ogImage],
    },
  };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getGuideTopic(slug);
  if (!topic) notFound();
  const language = await resolveRequestLanguage();
  return <GuideArticle doc={guideFromTopic(topic)} language={language} />;
}
