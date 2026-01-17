import { COMPANY, SEO } from '@/lib/constants';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/loan-guides`;
const TITLE = `Loan Guides & Checklists | ${COMPANY.name}`;
const TITLE_MS = `Panduan & Senarai Semak Pinjaman | ${COMPANY.name}`;
const DESCRIPTION =
  'Explore Malaysia-focused loan guides on credit scores, home loans, car loans, and debt consolidation. Get checklists, timelines, and key numbers.';
const DESCRIPTION_MS =
  'Teroka panduan pinjaman Malaysia tentang skor kredit, pinjaman rumah, pinjaman kereta, dan penyatuan hutang. Dapatkan senarai semak dan garis masa.';
const IMAGE = `${SEO.url}/images/loan-guides/hub.svg`;

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
        image={IMAGE}
        imageAlt="Loan Guides Hub"
      />

    </>
  );
}
