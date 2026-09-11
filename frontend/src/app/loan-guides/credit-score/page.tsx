import { resolveRequestLanguage } from '@/lib/i18n/server';
import { buildMetadata } from '@/lib/seo';
import { GuideArticle } from '@/components/guides/GuideArticle';
import { creditScoreGuide } from '@/lib/content/guides/credit-score';

export const metadata = buildMetadata({
  title: 'Improve Credit Score in Malaysia',
  description:
    'Step-by-step CCRIS + CTOS guidance to improve your credit score and loan approval odds in Malaysia.',
  path: '/loan-guides/credit-score',
  image: '/images/loan-guides/credit-score.svg',
  keywords:
    'credit score Malaysia, improve credit score, CCRIS, CTOS, loan approval tips',
});

export default async function CreditScoreGuidePage() {
  const language = await resolveRequestLanguage();
  return <GuideArticle doc={creditScoreGuide} language={language} />;
}
