import { COMPANY, SEO } from '@/lib/constants';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/loans/car`;
const TITLE = `Car Loan Guide | ${COMPANY.name}`;
const TITLE_MS = `Panduan Pinjaman Kereta | ${COMPANY.name}`;
const DESCRIPTION =
  'Car loan guidance for Malaysia borrowers with DSR screening, dealer coordination, and bank comparisons.';
const DESCRIPTION_MS =
  'Panduan pinjaman kereta untuk peminjam Malaysia dengan semakan DSR, koordinasi pengedar, dan perbandingan bank.';

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
