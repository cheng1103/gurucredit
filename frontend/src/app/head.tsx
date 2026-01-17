import { COMPANY, SEO } from '@/lib/constants';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const HOME_TITLE = `${COMPANY.name} | Loan Guidance for Kuala Lumpur & Selangor`;
const HOME_TITLE_MS = `${COMPANY.name} | Panduan Pinjaman untuk Kuala Lumpur & Selangor`;
const HOME_DESCRIPTION =
  'Serving Kuala Lumpur & Selangor only: RM30 eligibility analysis, DSR consultation, and curated bank recommendations with 24-hour turnaround for personal, car, and home loans.';
const HOME_DESCRIPTION_MS =
  'Khusus untuk Kuala Lumpur & Selangor: Semakan kelayakan RM30, analisis DSR, dan cadangan bank dengan laporan pantas 24 jam untuk pinjaman peribadi, kereta, dan rumah.';
const SHARE_IMAGE = new URL(SEO.shareImage, SEO.url).toString();

export default function Head() {
  return (
    <>
      <title>{HOME_TITLE}</title>
      <link rel="canonical" href={SEO.url} />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />

      <LocalizedMeta
        url={SEO.url}
        title={HOME_TITLE}
        titleMs={HOME_TITLE_MS}
        description={HOME_DESCRIPTION}
        descriptionMs={HOME_DESCRIPTION_MS}
        image={SHARE_IMAGE}
        imageAlt={`${COMPANY.name} logo`}
        keywords={SEO.keywords}
        keywordsMs={SEO.translations?.ms?.keywords}
      />
    </>
  );
}
