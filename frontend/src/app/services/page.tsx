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
        description="Licensed personal, business, and debt consolidation loan guidance for borrowers across Malaysia. Compare approval routes, credit issues, and documentation requirements before applying."
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
