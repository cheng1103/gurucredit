import { COMPANY, SEO } from '@/lib/constants';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/loan-guides/home-loan`;
const TITLE = `Home Loan Checklist & DSR Tips | ${COMPANY.name}`;
const TITLE_MS = `Senarai Semak Pinjaman Rumah | ${COMPANY.name}`;
const DESCRIPTION =
  'Malaysia home loan guide with DSR planning, margin benchmarks, document checklist, and bank comparison tips for mortgage approval.';
const DESCRIPTION_MS =
  'Panduan pinjaman rumah Malaysia dengan perancangan DSR, margin pembiayaan, senarai dokumen, dan tip perbandingan bank.';
const IMAGE = `${SEO.url}/images/loan-guides/home-loan.svg`;

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
        imageAlt="Home Loan Checklist"
      />

    </>
  );
}
