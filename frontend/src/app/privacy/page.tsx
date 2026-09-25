import { SEO } from '@/lib/constants';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { WebPageJsonLd } from '@/components/JsonLd';
import { LegalPage } from '@/components/legal/LegalPage';
import { privacyDoc } from '@/lib/content/legal/privacy';

export default async function PrivacyPage() {
  const language = await resolveRequestLanguage();
  const c = privacyDoc.content[language];

  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/privacy`}
        title="Privacy Policy"
        description={c.lede}
        image="/images/hero-bg.jpg"
        language={language}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Privacy Policy', url: `${SEO.url}/privacy` },
        ]}
      />
      <LegalPage doc={privacyDoc} language={language} />
    </>
  );
}
