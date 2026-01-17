import { COMPANY, SEO } from '@/lib/constants';
import { LocalizedMeta } from '@/components/LocalizedMeta';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

const URL = `${SEO.url}/services/success`;
const TITLE = `Application Submitted | ${COMPANY.name}`;
const TITLE_MS = `Permohonan Dihantar | ${COMPANY.name}`;
const DESCRIPTION =
  'Your loan consultation request is confirmed. Save the reference ID, follow WhatsApp instructions, and prepare documents for our RM30 eligibility analysis.';
const DESCRIPTION_MS =
  'Permohonan konsultasi pinjaman anda disahkan. Simpan ID rujukan, ikuti arahan WhatsApp dan sediakan dokumen untuk analisis kelayakan RM30 kami.';

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
        type="article"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SEO.url },
          { name: 'Services', url: `${SEO.url}/services` },
          { name: 'Success', url: URL },
        ]}
      />
    </>
  );
}
