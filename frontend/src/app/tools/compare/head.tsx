import { COMPANY, SEO } from '@/lib/constants';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/tools/compare`;
const TITLE = `Loan Comparison Tool | ${COMPANY.name}`;
const TITLE_MS = `Alat Perbandingan Pinjaman | ${COMPANY.name}`;
const DESCRIPTION =
  'Compare Malaysia loan rates, tenures, and estimated repayments side by side.';
const DESCRIPTION_MS =
  'Bandingkan kadar, tempoh, dan anggaran bayaran pinjaman di Malaysia.';

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
