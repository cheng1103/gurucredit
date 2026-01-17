import { COMPANY, SEO } from '@/lib/constants';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/loans/emergency`;
const TITLE = `Emergency Loan Help | ${COMPANY.name}`;
const TITLE_MS = `Bantuan Pinjaman Kecemasan | ${COMPANY.name}`;
const DESCRIPTION =
  'Emergency loan guidance with same-day review, document checklist, and priority assistance for urgent needs.';
const DESCRIPTION_MS =
  'Panduan pinjaman kecemasan dengan semakan hari yang sama, senarai dokumen, dan bantuan keutamaan.';

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
