import { resolveRequestLanguage } from '@/lib/i18n/server';
import { localizedMetadata } from '@/lib/seo';
import { GuideArticle } from '@/components/guides/GuideArticle';
import { loanRejectionRecoveryGuide } from '@/lib/content/guides/loan-rejection-recovery';
import { meta } from './metadata';

export async function generateMetadata() {
  return localizedMetadata(meta);
}

export default async function LoanRejectionRecoveryPage() {
  const language = await resolveRequestLanguage();
  return <GuideArticle doc={loanRejectionRecoveryGuide} language={language} />;
}
