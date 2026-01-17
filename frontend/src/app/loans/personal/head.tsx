import { COMPANY, SEO } from '@/lib/constants';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/loans/personal`;
const TITLE = `Personal Loan Guidance | ${COMPANY.name}`;
const TITLE_MS = `Panduan Pinjaman Peribadi | ${COMPANY.name}`;
const DESCRIPTION =
  'Personal loan guidance in Malaysia with DSR review, CCRIS/CTOS checks, and bank shortlist recommendations.';
const DESCRIPTION_MS =
  'Panduan pinjaman peribadi di Malaysia dengan semakan DSR, CCRIS/CTOS, dan senarai bank cadangan.';

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
