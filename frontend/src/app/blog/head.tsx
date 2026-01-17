import { COMPANY, SEO } from '@/lib/constants';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/blog`;
const TITLE = `Loan Tips & Resources | ${COMPANY.name}`;
const TITLE_MS = `Tips & Sumber Pinjaman | ${COMPANY.name}`;
const DESCRIPTION =
  'Loan tips, credit score advice, and financial planning resources for Malaysia borrowers.';
const DESCRIPTION_MS =
  'Tip pinjaman, nasihat skor kredit, dan sumber perancangan kewangan untuk peminjam Malaysia.';

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
