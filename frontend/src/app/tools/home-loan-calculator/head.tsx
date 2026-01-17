import { COMPANY, SEO } from '@/lib/constants';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/tools/home-loan-calculator`;
const TITLE = `Home Loan Calculator | ${COMPANY.name}`;
const TITLE_MS = `Kalkulator Pinjaman Rumah | ${COMPANY.name}`;
const DESCRIPTION =
  'Estimate mortgage payments, total interest, and affordability for Malaysia home loans.';
const DESCRIPTION_MS =
  'Anggar bayaran gadai janji, jumlah faedah, dan kemampuan pinjaman rumah di Malaysia.';

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

    </>
  );
}
