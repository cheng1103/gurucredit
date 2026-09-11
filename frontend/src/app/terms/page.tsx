import { SEO } from '@/lib/constants';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { WebPageJsonLd } from '@/components/JsonLd';
import { LegalPage } from '@/components/legal/LegalPage';
import { termsDoc } from '@/lib/content/legal/terms';

export default async function TermsPage() {
  const language = await resolveRequestLanguage();
  const c = termsDoc.content[language];

  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/terms`}
        title="Terms of Service"
        description={c.lede}
        image="/images/hero-bg.jpg"
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Terms of Service', url: `${SEO.url}/terms` },
        ]}
      />
      <LegalPage doc={termsDoc} language={language} />
    </>
  );
}
