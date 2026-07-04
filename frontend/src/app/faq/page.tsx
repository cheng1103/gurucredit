import FaqContent from './FaqContent';
import { resolveRequestLanguage } from '@/lib/i18n/server';

export default async function FaqPage() {
  const language = await resolveRequestLanguage();
  // FAQPage / WebPage structured data (with the visible Q&A) is emitted inside
  // FaqContent — keep it there so the markup matches on-page content and we
  // don't duplicate the WebPage @id.
  return <FaqContent language={language} />;
}
