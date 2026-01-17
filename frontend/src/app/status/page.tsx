import StatusContent from './StatusContent';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { WebPageJsonLd } from '@/components/JsonLd';
import { SEO } from '@/lib/constants';

export default async function StatusPage() {
  const language = await resolveRequestLanguage();
  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/status`}
        title="Check Application Status"
        description="Check your loan application status using your reference ID and email."
        image="/images/cta-bg.jpg"
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Status', url: `${SEO.url}/status` },
        ]}
      />
      <StatusContent language={language} />
    </>
  );
}
