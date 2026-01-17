import { COMPANY, SEO } from '@/lib/constants';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/eligibility-test`;
const TITLE = `Loan Eligibility Test & DSR Check | ${COMPANY.name}`;
const TITLE_MS = `Ujian Kelayakan Pinjaman & Semakan DSR | ${COMPANY.name}`;
const DESCRIPTION =
  'Take a quick eligibility test to see if you qualify for personal, car, home, or business loans. Check your DSR and get instant recommendations from GURU Credits.';
const DESCRIPTION_MS =
  'Lakukan ujian kelayakan pantas untuk mengetahui sama ada anda layak bagi pinjaman peribadi, kereta, rumah atau perniagaan. Semak DSR anda dan dapatkan cadangan segera daripada GURU Credits.';

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
          { name: 'Eligibility Test', url: URL },
        ]}
      />
    </>
  );
}
