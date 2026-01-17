import { COMPANY, SEO } from '@/lib/constants';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/loan-guides/debt-consolidation`;
const TITLE = `Debt Consolidation Strategy | ${COMPANY.name}`;
const TITLE_MS = `Strategi Penyatuan Hutang | ${COMPANY.name}`;
const DESCRIPTION =
  'Debt consolidation guide for Malaysia borrowers. Learn DSR targets, required documents, and steps to lower monthly repayments.';
const DESCRIPTION_MS =
  'Panduan penyatuan hutang untuk peminjam Malaysia. Ketahui sasaran DSR, dokumen diperlukan, dan langkah kurangkan komitmen bulanan.';
const IMAGE = `${SEO.url}/images/loan-guides/debt-consolidation.svg`;

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
        imageAlt="Debt Consolidation Guide"
      />

    </>
  );
}
