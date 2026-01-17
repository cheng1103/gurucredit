import { COMPANY, SEO } from '@/lib/constants';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/loans/debt-consolidation`;
const TITLE = `Debt Consolidation Support | ${COMPANY.name}`;
const TITLE_MS = `Sokongan Penyatuan Hutang | ${COMPANY.name}`;
const DESCRIPTION =
  'Debt consolidation guidance for Malaysia borrowers to combine debts and lower monthly commitments.';
const DESCRIPTION_MS =
  'Panduan penyatuan hutang untuk peminjam Malaysia agar gabungkan hutang dan kurangkan komitmen bulanan.';

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
