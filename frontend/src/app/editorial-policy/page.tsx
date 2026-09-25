import { resolveRequestLanguage } from '@/lib/i18n/server';
import { localizedMetadata } from '@/lib/seo';
import { GuideArticle } from '@/components/guides/GuideArticle';
import { editorialPolicyGuide } from '@/lib/content/guides/editorial-policy';
import { meta } from './metadata';

export async function generateMetadata() {
  return localizedMetadata(meta);
}

export default async function EditorialPolicyPage() {
  const language = await resolveRequestLanguage();
  return <GuideArticle doc={editorialPolicyGuide} language={language} />;
}
