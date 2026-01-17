import FaqContent from './FaqContent';
import { resolveRequestLanguage } from '@/lib/i18n/server';

export default async function FaqPage() {
  const language = await resolveRequestLanguage();
  return <FaqContent language={language} />;
}
