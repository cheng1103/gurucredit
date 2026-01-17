import { COMPANY, SEO } from '@/lib/constants';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/calculator`;
const TITLE = `DSR Calculator | ${COMPANY.name}`;
const TITLE_MS = `Kalkulator DSR | ${COMPANY.name}`;
const DESCRIPTION =
  'Calculate your Debt Service Ratio (DSR) in Malaysia and estimate loan affordability in minutes.';
const DESCRIPTION_MS =
  'Kira DSR anda di Malaysia dan anggar kemampuan pinjaman dengan pantas.';

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

    </>
  );
}
