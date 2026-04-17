import FaqContent from './FaqContent';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { WebPageJsonLd } from '@/components/JsonLd';
import { SEO } from '@/lib/constants';

export default async function FaqPage() {
  const language = await resolveRequestLanguage();
  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/faq`}
        title="Loan FAQs & Credit Guidance"
        description="Answers to Malaysia personal loan questions: eligibility, DSR, CCRIS/CTOS, documentation, and repayment guidance from GURU Credits."
        image="/images/hero-bg.jpg"
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'FAQ', url: `${SEO.url}/faq` },
        ]}
      />
      <FaqContent language={language} />
    </>
  );
}
