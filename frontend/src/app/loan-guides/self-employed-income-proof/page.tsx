import { resolveRequestLanguage } from '@/lib/i18n/server';
import { buildMetadata } from '@/lib/seo';
import { GuideArticle } from '@/components/guides/GuideArticle';
import { selfEmployedIncomeProofGuide } from '@/lib/content/guides/self-employed-income-proof';

export const metadata = buildMetadata({
  title: 'Self-Employed Income Proof Guide Malaysia',
  description:
    'How self-employed, freelance, and variable-income borrowers in Malaysia should prepare stronger income proof before applying for loans.',
  path: '/loan-guides/self-employed-income-proof',
  keywords:
    'self employed loan Malaysia, income proof self employed Malaysia, freelance loan documents, commission income loan Malaysia',
});

export default async function SelfEmployedIncomeProofPage() {
  const language = await resolveRequestLanguage();
  return <GuideArticle doc={selfEmployedIncomeProofGuide} language={language} />;
}
