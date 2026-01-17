import { COMPANY, SEO } from '@/lib/constants';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/tools/car-loan-calculator`;
const TITLE = `Car Loan Calculator | ${COMPANY.name}`;
const TITLE_MS = `Kalkulator Pinjaman Kereta | ${COMPANY.name}`;
const DESCRIPTION =
  'Estimate car loan repayments, total interest, and affordability for Malaysia borrowers.';
const DESCRIPTION_MS =
  'Anggar bayaran pinjaman kereta, jumlah faedah, dan kemampuan peminjam Malaysia.';

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
