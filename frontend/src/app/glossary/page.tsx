import GlossaryContent from './GlossaryContent';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { WebPageJsonLd } from '@/components/JsonLd';
import { SEO } from '@/lib/constants';

export default async function GlossaryPage() {
  const language = await resolveRequestLanguage();
  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/glossary`}
        title="Loan Glossary"
        description="Loan glossary for Malaysian borrowers: DSR, CCRIS, CTOS, flat vs effective rates, and more."
        image="/images/hero-bg.jpg"
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Glossary', url: `${SEO.url}/glossary` },
        ]}
      />
      <GlossaryContent language={language} />
    </>
  );
}
