import { COMPANY, SEO } from '@/lib/constants';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/glossary`;
const TITLE = `Loan Glossary | ${COMPANY.name}`;
const TITLE_MS = `Glosari Pinjaman | ${COMPANY.name}`;
const DESCRIPTION =
  'Understand loan, credit, and banking terms in Malaysia with our easy-to-search financial glossary.';
const DESCRIPTION_MS =
  'Fahami istilah pinjaman, kredit, dan perbankan di Malaysia melalui glosari kewangan kami yang mudah dicari.';

export default function Head() {
  return (
    <>
      <title>{TITLE}</title>
      <link rel="canonical" href={URL} />

      <LocalizedMeta
        url={URL}
        title={TITLE}
        titleMs={TITLE_MS}
        description={DESCRIPTION}
        descriptionMs={DESCRIPTION_MS}
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SEO.url },
          { name: 'Glossary', url: URL },
        ]}
      />
    </>
  );
}
