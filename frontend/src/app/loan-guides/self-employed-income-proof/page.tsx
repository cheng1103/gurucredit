import { resolveRequestLanguage } from '@/lib/i18n/server';
import { localizedMetadata } from '@/lib/seo';
import { GuideArticle } from '@/components/guides/GuideArticle';
import { selfEmployedIncomeProofGuide } from '@/lib/content/guides/self-employed-income-proof';
import { meta } from './metadata';

export async function generateMetadata() {
  return localizedMetadata(meta);
}

export default async function SelfEmployedIncomeProofPage() {
  const language = await resolveRequestLanguage();
  return <GuideArticle doc={selfEmployedIncomeProofGuide} language={language} />;
}
