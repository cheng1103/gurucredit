import { COMPANY, SEO } from '@/lib/constants';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/partners`;
const TITLE = `Bank Partners | ${COMPANY.name}`;
const TITLE_MS = `Rakan Bank | ${COMPANY.name}`;
const DESCRIPTION =
  'Explore our network of trusted Malaysian bank partners and how we match you to the best lender for your loan profile.';
const DESCRIPTION_MS =
  'Terokai rangkaian rakan bank Malaysia kami dan bagaimana kami memadankan anda dengan bank terbaik untuk profil pinjaman anda.';

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
          { name: 'Partners', url: URL },
        ]}
      />
    </>
  );
}
