import { resolveRequestLanguage } from '@/lib/i18n/server';
import { buildMetadata } from '@/lib/seo';
import { GuideArticle } from '@/components/guides/GuideArticle';
import { ccrisCtosGuide } from '@/lib/content/guides/ccris-ctos';

export const metadata = buildMetadata({
  title: 'CCRIS and CTOS Guide Malaysia',
  description:
    'A practical Malaysia guide to CCRIS and CTOS: what lenders actually look at, how old issues differ from active ones, and what to fix before reapplying.',
  path: '/loan-guides/ccris-ctos',
  keywords:
    'CCRIS CTOS guide Malaysia, how lenders read CCRIS, CTOS report Malaysia, improve loan file Malaysia',
});

export default async function CcrisCtosGuidePage() {
  const language = await resolveRequestLanguage();
  return <GuideArticle doc={ccrisCtosGuide} language={language} />;
}
