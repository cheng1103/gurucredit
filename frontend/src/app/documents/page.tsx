import DocumentsContent from './DocumentsContent';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { WebPageJsonLd } from '@/components/JsonLd';
import { SEO } from '@/lib/constants';

export default async function DocumentsPage() {
  const language = await resolveRequestLanguage();
  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/documents`}
        title="Document Checklist"
        description="Prepare loan application documents for personal, car, home, and business loans in Malaysia."
        image="/images/cta-bg.jpg"
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Documents', url: `${SEO.url}/documents` },
        ]}
      />
      <DocumentsContent language={language} />
    </>
  );
}
