import { resolveRequestLanguage } from '@/lib/i18n/server';
import { localizedMetadata } from '@/lib/seo';
import { GuideArticle } from '@/components/guides/GuideArticle';
import { debtConsolidationGuide } from '@/lib/content/guides/debt-consolidation';
import { meta } from './metadata';

export async function generateMetadata() {
  return localizedMetadata(meta);
}

export default async function DebtConsolidationGuidePage() {
  const language = await resolveRequestLanguage();
  return <GuideArticle doc={debtConsolidationGuide} language={language} />;
}
