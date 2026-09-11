import { SEO } from '@/lib/constants';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { WebPageJsonLd } from '@/components/JsonLd';
import { LegalPage } from '@/components/legal/LegalPage';
import { disclaimerDoc } from '@/lib/content/legal/disclaimer';

export default async function DisclaimerPage() {
  const language = await resolveRequestLanguage();
  const c = disclaimerDoc.content[language];

  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/disclaimer`}
        title="Disclaimer"
        description={c.lede}
        image="/images/hero-bg.jpg"
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Disclaimer', url: `${SEO.url}/disclaimer` },
        ]}
      />
      <LegalPage doc={disclaimerDoc} language={language} />
    </>
  );
}
