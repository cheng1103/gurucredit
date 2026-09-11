import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { SEO } from '@/lib/constants';
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

  return {
    title: topic.title,
    description: topic.description,
    // canonical + hreflang inherited from the root layout (localeAlternates)
    openGraph: {
      title: `${topic.title} | ${SEO.siteName}`,
      description: topic.description,
      url: canonicalUrl,
      siteName: SEO.siteName,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${topic.title} | ${SEO.siteName}`,
      description: topic.description,
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
