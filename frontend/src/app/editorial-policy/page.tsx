import { resolveRequestLanguage } from '@/lib/i18n/server';
import { buildMetadata } from '@/lib/seo';
import { GuideArticle } from '@/components/guides/GuideArticle';
import { editorialPolicyGuide } from '@/lib/content/guides/editorial-policy';

export const metadata = buildMetadata({
  title: 'Editorial Policy and Content Standards',
  description: 'How GURU Credits researches, reviews, updates, and publishes financial education content for Malaysian borrowers.',
  path: '/editorial-policy',
  keywords: 'editorial policy finance website, content standards Malaysia loan website, GURU Credits editorial policy',
});

export default async function EditorialPolicyPage() {
  const language = await resolveRequestLanguage();
  return <GuideArticle doc={editorialPolicyGuide} language={language} />;
}
