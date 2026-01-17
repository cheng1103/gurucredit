import { COMPANY, SEO } from '@/lib/constants';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/loans/home`;
const TITLE = `Home Loan Strategy | ${COMPANY.name}`;
const TITLE_MS = `Strategi Pinjaman Rumah | ${COMPANY.name}`;
const DESCRIPTION =
  'Home loan planning with DSR strategy, margin guidance, and document checklists for Malaysia borrowers.';
const DESCRIPTION_MS =
  'Perancangan pinjaman rumah dengan strategi DSR, panduan margin, dan senarai dokumen untuk peminjam Malaysia.';

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
