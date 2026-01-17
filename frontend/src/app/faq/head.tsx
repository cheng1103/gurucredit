import { COMPANY, SEO } from '@/lib/constants';
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/JsonLd';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/faq`;
const TITLE = `Loan FAQs & Credit Guidance | ${COMPANY.name}`;
const TITLE_MS = `Soalan Lazim Pinjaman & Panduan Kredit | ${COMPANY.name}`;
const DESCRIPTION =
  'Answers to Malaysia personal loan questions: eligibility, DSR, CCRIS/CTOS, documentation, and repayment guidance from GURU Credits.';
const DESCRIPTION_MS =
  'Jawapan kepada soalan pinjaman di Malaysia: kelayakan, DSR, CCRIS/CTOS, dokumentasi dan panduan bayaran balik oleh GURU Credits.';

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
        type="article"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SEO.url },
          { name: 'FAQ', url: URL },
        ]}
      />
      <FAQJsonLd />
    </>
  );
}
