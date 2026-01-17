import { COMPANY, SEO } from '@/lib/constants';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/status`;
const TITLE = `Track Application Status | ${COMPANY.name}`;
const TITLE_MS = `Jejak Status Permohonan | ${COMPANY.name}`;
const DESCRIPTION =
  'Track your RM30 credit analysis status and get updates from our consultants in real time.';
const DESCRIPTION_MS =
  'Jejak status analisis kredit RM30 anda dan terima kemas kini daripada perunding kami.';

export default function Head() {
  return (
    <>
      <title>{TITLE}</title>
      <link rel="canonical" href={URL} />
      <meta name="robots" content="noindex, nofollow" />

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
          { name: 'Status', url: URL },
        ]}
      />
    </>
  );
}
