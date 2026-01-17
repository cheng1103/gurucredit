import { COMPANY, SEO } from '@/lib/constants';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/documents`;
const TITLE = `Document Checklist | ${COMPANY.name}`;
const TITLE_MS = `Senarai Semak Dokumen | ${COMPANY.name}`;
const DESCRIPTION =
  'Use our document checklist to prepare faster loan applications for personal, car, home, and business loans in Malaysia.';
const DESCRIPTION_MS =
  'Gunakan senarai semak dokumen kami untuk menyediakan permohonan pinjaman peribadi, kereta, rumah, dan perniagaan dengan lebih cepat.';

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
          { name: 'Documents', url: URL },
        ]}
      />
    </>
  );
}
