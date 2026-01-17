import { COMPANY, SEO } from '@/lib/constants';
import { LocalizedMeta } from '@/components/LocalizedMeta';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

const SERVICE_META = {
  '1': {
    name: 'Personal Loan',
    title: `Apply for Personal Loan | ${COMPANY.name}`,
    titleMs: `Mohon Pinjaman Peribadi | ${COMPANY.name}`,
    description:
      'Start your personal loan consultation with RM30 eligibility analysis, CCRIS/CTOS review, and a curated shortlist of Malaysian banks.',
    descriptionMs:
      'Mulakan konsultasi pinjaman peribadi anda dengan analisis kelayakan RM30, semakan CCRIS/CTOS, dan senarai bank Malaysia yang dipadankan.',
  },
  '2': {
    name: 'Car Loan',
    title: `Apply for Car Loan | ${COMPANY.name}`,
    titleMs: `Mohon Pinjaman Kereta | ${COMPANY.name}`,
    description:
      'Plan your hire purchase financing with expert DSR guidance, bank matching, and WhatsApp document support for faster bank decisions.',
    descriptionMs:
      'Rancang pembiayaan sewa beli anda dengan panduan DSR pakar, padanan bank, dan sokongan dokumen WhatsApp untuk kelulusan pinjaman kereta yang pantas.',
  },
  '3': {
    name: 'Home Loan',
    title: `Apply for Home Loan | ${COMPANY.name}`,
    titleMs: `Mohon Pinjaman Rumah | ${COMPANY.name}`,
    description:
      'Prepare your mortgage submission with RM30 eligibility analysis, property financing limits, and tailored Malaysian bank recommendations.',
    descriptionMs:
      'Sediakan permohonan gadai janji anda dengan analisis kelayakan RM30, had pembiayaan hartanah, dan cadangan bank Malaysia yang disesuaikan.',
  },
  '4': {
    name: 'Business Loan',
    title: `Apply for Business Loan | ${COMPANY.name}`,
    titleMs: `Mohon Pinjaman Perniagaan | ${COMPANY.name}`,
    description:
      'Secure SME financing with detailed cash flow assessment, professional documentation review, and introductions to suitable lenders.',
    descriptionMs:
      'Dapatkan pembiayaan PKS dengan penilaian aliran tunai terperinci, semakan dokumen profesional, dan pengenalan kepada pemberi pinjaman yang sesuai.',
  },
} as const;

const DEFAULT_META = {
  name: 'Loan Application',
  title: `Apply for Loan Consultation | ${COMPANY.name}`,
  titleMs: `Mohon Konsultasi Pinjaman | ${COMPANY.name}`,
  description:
    'Submit your RM30 eligibility analysis request to receive DSR evaluation, CCRIS/CTOS review, and curated bank recommendations.',
  descriptionMs:
    'Hantar permintaan analisis kelayakan RM30 anda untuk menerima penilaian DSR, semakan CCRIS/CTOS dan cadangan bank yang dipilih.',
};

export default function Head({ params }: { params: { id?: string } }) {
  const service = params?.id ? SERVICE_META[params.id as keyof typeof SERVICE_META] ?? DEFAULT_META : DEFAULT_META;
  const slug = params?.id || 'apply';
  const url = `${SEO.url}/services/${slug}/apply`;

  return (
    <>
      <title>{service.title}</title>
      <link rel="canonical" href={url} />
      <meta name="robots" content="noindex, nofollow" />

      <LocalizedMeta
        url={url}
        title={service.title}
        titleMs={service.titleMs}
        description={service.description}
        descriptionMs={service.descriptionMs}
        type="article"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SEO.url },
          { name: 'Services', url: `${SEO.url}/services` },
          { name: service.name, url },
        ]}
      />
    </>
  );
}
