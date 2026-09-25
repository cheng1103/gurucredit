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

  const language = await resolveRequestLanguage();
  const title = language === 'ms' ? topic.titleMs : topic.title;
  const description = language === 'ms' ? topic.descriptionMs : topic.description;
  const path = `/loan-guides/topics/${topic.slug}`;
  const canonicalUrl = language === 'ms' ? `${SEO.url}/ms${path}` : `${SEO.url}${path}`;
  const ogImage = new URL(SEO.shareImage, SEO.url).toString();

  return {
    title,
    description,
    // Set explicitly (rather than relying on inheritance from the root
    // layout) because loan-guides/layout.tsx sits between this page and the
    // root — see the note there about why a layout-level `alternates` would
    // shadow this page's own canonical if it defined one.
    alternates: localeAlternates(language, path),
    openGraph: {
      title: `${title} | ${SEO.siteName}`,
      description,
      url: canonicalUrl,
      siteName: SEO.siteName,
      type: 'article',
      locale: language === 'ms' ? 'ms_MY' : SEO.locale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SEO.siteName}`,
      description,
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
