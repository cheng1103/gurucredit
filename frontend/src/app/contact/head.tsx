import { COMPANY, SEO } from '@/lib/constants';
import { BreadcrumbJsonLd, ContactPageJsonLd } from '@/components/JsonLd';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/contact`;
const TITLE = `Contact ${COMPANY.name} | Loan Help & Credit Consultation`;
const TITLE_MS = `Hubungi ${COMPANY.name} | Bantuan Pinjaman & Konsultasi Kredit`;
const DESCRIPTION =
  'Talk to GURU Credits about personal, car, home, and business loans. Get RM30 eligibility analysis, DSR check, and bank recommendations in Malaysia.';
const DESCRIPTION_MS =
  'Hubungi GURU Credits untuk pinjaman peribadi, kereta, rumah dan perniagaan. Dapatkan semakan kelayakan RM30, analisis DSR dan cadangan bank di Malaysia.';

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
          { name: 'Contact', url: URL },
        ]}
      />
      <ContactPageJsonLd />
    </>
  );
}
