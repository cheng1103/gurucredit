import { resolveRequestLanguage } from '@/lib/i18n/server';
import { localizedMetadata } from '@/lib/seo';
import { GuideArticle } from '@/components/guides/GuideArticle';
import { creditScoreGuide } from '@/lib/content/guides/credit-score';
import { meta } from './metadata';

export async function generateMetadata() {
  return localizedMetadata(meta);
}

export default async function CreditScoreGuidePage() {
  const language = await resolveRequestLanguage();
  return <GuideArticle doc={creditScoreGuide} language={language} />;
}
