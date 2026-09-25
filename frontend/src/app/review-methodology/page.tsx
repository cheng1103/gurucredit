import { resolveRequestLanguage } from '@/lib/i18n/server';
import { localizedMetadata } from '@/lib/seo';
import { GuideArticle } from '@/components/guides/GuideArticle';
import { reviewMethodologyGuide } from '@/lib/content/guides/review-methodology';
import { meta } from './metadata';

export async function generateMetadata() {
  return localizedMetadata(meta);
}

export default async function ReviewMethodologyPage() {
  const language = await resolveRequestLanguage();
  return <GuideArticle doc={reviewMethodologyGuide} language={language} />;
}
