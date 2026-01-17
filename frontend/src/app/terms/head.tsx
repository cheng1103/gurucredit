import { COMPANY, SEO } from '@/lib/constants';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/terms`;
const TITLE = `Terms of Service | ${COMPANY.name}`;
const TITLE_MS = `Syarat Perkhidmatan | ${COMPANY.name}`;
const DESCRIPTION =
  'Review the terms of service for GURU Credits, including service scope, payments, and liability limits.';
const DESCRIPTION_MS =
  'Semak syarat perkhidmatan GURU Credits termasuk skop perkhidmatan, bayaran, dan had liabiliti.';

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
          { name: 'Terms', url: URL },
        ]}
      />
    </>
  );
}
