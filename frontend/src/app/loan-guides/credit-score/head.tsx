import { COMPANY, SEO } from '@/lib/constants';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/loan-guides/credit-score`;
const TITLE = `Credit Score & CCRIS Guide | ${COMPANY.name}`;
const TITLE_MS = `Panduan Skor Kredit & CCRIS | ${COMPANY.name}`;
const DESCRIPTION =
  'Step-by-step guide to improving CCRIS/CTOS credit scores in Malaysia. Learn safe utilization, recovery timelines, and approval tips.';
const DESCRIPTION_MS =
  'Panduan langkah demi langkah untuk meningkatkan skor CCRIS/CTOS di Malaysia. Ketahui penggunaan selamat dan garis masa pemulihan.';
const IMAGE = `${SEO.url}/images/loan-guides/credit-score.svg`;

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
        image={IMAGE}
        imageAlt="Credit Score Guide"
      />

    </>
  );
}
