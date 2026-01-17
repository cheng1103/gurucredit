import { COMPANY, SEO } from '@/lib/constants';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/privacy`;
const TITLE = `Privacy Policy | ${COMPANY.name}`;
const TITLE_MS = `Dasar Privasi | ${COMPANY.name}`;
const DESCRIPTION =
  'Read how GURU Credits collects, uses, and protects your personal data in compliance with Malaysia PDPA.';
const DESCRIPTION_MS =
  'Ketahui bagaimana GURU Credits mengumpul, menggunakan, dan melindungi data peribadi anda selaras dengan PDPA Malaysia.';

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
          { name: 'Privacy', url: URL },
        ]}
      />
    </>
  );
}
