import { COMPANY, SEO } from '@/lib/constants';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/loan-guides/car-loan`;
const TITLE = `Car Loan Checklist & Approval Tips | ${COMPANY.name}`;
const TITLE_MS = `Senarai Semak Pinjaman Kereta | ${COMPANY.name}`;
const DESCRIPTION =
  'Malaysia car loan guide with down payment advice, DSR targets, document checklist, and approval timeline tips.';
const DESCRIPTION_MS =
  'Panduan pinjaman kereta Malaysia dengan nasihat deposit, sasaran DSR, senarai dokumen, dan garis masa kelulusan.';
const IMAGE = `${SEO.url}/images/loan-guides/car-loan.svg`;

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
        imageAlt="Car Loan Playbook"
      />

    </>
  );
}
