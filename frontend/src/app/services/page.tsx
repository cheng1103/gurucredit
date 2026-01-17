import ServicesContent from './ServicesContent';
import { resolveRequestLanguage } from '@/lib/i18n/server';

export default async function ServicesPage() {
  const language = await resolveRequestLanguage();
  return <ServicesContent language={language} />;
}
