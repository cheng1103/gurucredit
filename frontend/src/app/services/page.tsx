import ServicesContent from './ServicesContent';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { WebPageJsonLd } from '@/components/JsonLd';
import { SEO } from '@/lib/constants';

export default async function ServicesPage() {
  const language = await resolveRequestLanguage();
  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/services`}
        title="Malaysia Loan Services"
        description="Licensed personal, business, and debt consolidation loans for borrowers across Malaysia. RM30 CTOS report + tailored loan offer within 24 hours."
        image="/images/hero-bg.jpg"
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Services', url: `${SEO.url}/services` },
        ]}
      />
      <ServicesContent language={language} />
    </>
  );
}
