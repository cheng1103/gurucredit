import { resolveRequestLanguage } from '@/lib/i18n/server';
import { buildMetadata } from '@/lib/seo';
import { GuideArticle } from '@/components/guides/GuideArticle';
import { reviewMethodologyGuide } from '@/lib/content/guides/review-methodology';

export const metadata = buildMetadata({
  title: 'Review Methodology for Borrower Assessments',
  description: 'How GURU Credits reviews borrower files: CCRIS, CTOS, income proof, DSR, commitments, and product fit before recommending the next step.',
  path: '/review-methodology',
  keywords: 'loan review methodology Malaysia, borrower file review, DSR review method, CCRIS CTOS assessment process',
});

export default async function ReviewMethodologyPage() {
  const language = await resolveRequestLanguage();
  return <GuideArticle doc={reviewMethodologyGuide} language={language} />;
}
