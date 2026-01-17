import { COMPANY, SEO } from '@/lib/constants';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/services`;
const TITLE = `Loan Services | ${COMPANY.name}`;
const TITLE_MS = `Perkhidmatan Pinjaman | ${COMPANY.name}`;
const DESCRIPTION =
  'Compare personal, car, home, and business loans with transparent fees, RM30 eligibility analysis, and expert guidance to speed up bank decisions.';
const DESCRIPTION_MS =
  'Bandingkan pinjaman peribadi, kereta, rumah dan perniagaan dengan yuran telus, semakan kelayakan RM30 dan panduan pakar untuk kelulusan pantas.';

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
          { name: 'Loan Services', url: URL },
        ]}
      />
    </>
  );
}
