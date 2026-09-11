import { resolveRequestLanguage } from '@/lib/i18n/server';
import { buildMetadata } from '@/lib/seo';
import { GuideArticle } from '@/components/guides/GuideArticle';
import { debtConsolidationGuide } from '@/lib/content/guides/debt-consolidation';

export const metadata = buildMetadata({
  title: 'Debt Consolidation Strategy in Malaysia',
  description:
    'Debt consolidation strategy for Malaysians. Plan payments, calculate new instalments, and reduce interest costs.',
  path: '/loan-guides/debt-consolidation',
  image: '/images/loan-guides/debt-consolidation.svg',
  keywords:
    'debt consolidation Malaysia, debt strategy, lower interest, repayment plan',
});

export default async function DebtConsolidationGuidePage() {
  const language = await resolveRequestLanguage();
  return <GuideArticle doc={debtConsolidationGuide} language={language} />;
}
