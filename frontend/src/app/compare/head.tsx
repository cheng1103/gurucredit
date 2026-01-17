import { COMPANY, SEO } from '@/lib/constants';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/compare`;
const TITLE = `Compare Loan Options | ${COMPANY.name}`;
const TITLE_MS = `Bandingkan Pilihan Pinjaman | ${COMPANY.name}`;
const DESCRIPTION =
  'Compare personal, car, home, and business loan options. Use GURU Credits tools to see eligibility, rates, and repayment insights for Malaysia borrowers.';
const DESCRIPTION_MS =
  'Bandingkan pilihan pinjaman peribadi, kereta, rumah dan perniagaan. Gunakan alat GURU Credits untuk melihat kelayakan, kadar dan panduan bayaran balik bagi peminjam di Malaysia.';

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

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SEO.url },
          { name: 'Compare', url: URL },
        ]}
      />
    </>
  );
}
