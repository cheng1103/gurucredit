import { resolveRequestLanguage } from '@/lib/i18n/server';
import { buildMetadata } from '@/lib/seo';
import { GuideArticle } from '@/components/guides/GuideArticle';
import { loanRejectionRecoveryGuide } from '@/lib/content/guides/loan-rejection-recovery';

export const metadata = buildMetadata({
  title: 'Loan Rejection Recovery Guide Malaysia',
  description:
    'A practical recovery plan for Malaysians rejected for loans. Learn how to identify the blocker and rebuild a stronger application path.',
  path: '/loan-guides/loan-rejection-recovery',
  keywords: 'loan rejection Malaysia, why loan rejected Malaysia, recover after rejected loan, fix loan file Malaysia',
});

export default async function LoanRejectionRecoveryPage() {
  const language = await resolveRequestLanguage();
  return <GuideArticle doc={loanRejectionRecoveryGuide} language={language} />;
}
