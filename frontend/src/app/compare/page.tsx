import CompareContent from './CompareContent';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { WebPageJsonLd } from '@/components/JsonLd';
import { SEO } from '@/lib/constants';

export default async function ComparePage() {
  const language = await resolveRequestLanguage();
  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/compare`}
        title="Compare Loan Options"
        description="Compare personal, car, home, and business loan options with eligibility insights for Malaysia borrowers."
        image="/images/cta-bg.jpg"
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Compare', url: `${SEO.url}/compare` },
        ]}
      />
      <CompareContent language={language} />
    </>
  );
}
