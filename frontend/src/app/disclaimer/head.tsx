import { COMPANY, SEO } from '@/lib/constants';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/disclaimer`;
const TITLE = `Disclaimer | ${COMPANY.name}`;
const TITLE_MS = `Penafian | ${COMPANY.name}`;
const DESCRIPTION =
  'Understand the scope and limitations of GURU Credits services before using our loan consultation and analysis.';
const DESCRIPTION_MS =
  'Fahami skop dan had perkhidmatan GURU Credits sebelum menggunakan konsultasi dan analisis pinjaman kami.';

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
          { name: 'Disclaimer', url: URL },
        ]}
      />
    </>
  );
}
