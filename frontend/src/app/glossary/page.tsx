import GlossaryContent from './GlossaryContent';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { WebPageJsonLd, DefinedTermSetJsonLd } from '@/components/JsonLd';
import { SEO } from '@/lib/constants';
import { glossaryTerms, glossaryUi } from '@/lib/content/listings/glossary';

export default async function GlossaryPage() {
  const language = await resolveRequestLanguage();
  const t = glossaryUi[language];
  const terms = glossaryTerms[language];

  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/glossary`}
        title="Loan Glossary"
        description="Loan glossary for Malaysian borrowers: DSR, CCRIS, CTOS, flat vs effective rates, and more."
        image="/images/hero-bg.jpg"
        language={language}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Glossary', url: `${SEO.url}/glossary` },
        ]}
      />
      <DefinedTermSetJsonLd
        url={`${SEO.url}/glossary`}
        name={t.title}
        description={t.lede}
        language={language}
        terms={terms.map((term) => ({ slug: term.slug, term: term.term, definition: term.definition }))}
      />
      <GlossaryContent language={language} />
    </>
  );
}
