import { COMPANY, SEO } from '@/lib/constants';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/tools`;
const TITLE = `Loan Tools & Calculators | ${COMPANY.name}`;
const TITLE_MS = `Alat & Kalkulator Pinjaman | ${COMPANY.name}`;
const DESCRIPTION =
  'Explore DSR calculators, loan comparison tools, and eligibility checks for Malaysia borrowers. Estimate payments and compare options in minutes.';
const DESCRIPTION_MS =
  'Teroka kalkulator DSR, alat perbandingan pinjaman, dan semakan kelayakan untuk peminjam Malaysia. Anggar bayaran dan banding pilihan dengan pantas.';

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
