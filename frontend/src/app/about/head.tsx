import { COMPANY, SEO, TESTIMONIALS } from '@/lib/constants';
import { BreadcrumbJsonLd, ReviewJsonLd } from '@/components/JsonLd';
import { LocalizedMeta } from '@/components/LocalizedMeta';

const URL = `${SEO.url}/about`;
const TITLE = `About ${COMPANY.name} | Trusted Loan & Credit Experts`;
const TITLE_MS = `Tentang ${COMPANY.name} | Pakar Pinjaman & Kredit Dipercayai`;
const DESCRIPTION =
  'Learn about GURU Credits: Malaysia loan consultants offering RM30 eligibility analysis, DSR consultation, and bank recommendations for personal, car, home, and business loans.';
const DESCRIPTION_MS =
  'Ketahui tentang GURU Credits: perunding pinjaman Malaysia yang menawarkan semakan kelayakan RM30, konsultasi DSR serta cadangan bank untuk pinjaman peribadi, kereta, rumah dan perniagaan.';

export default function Head() {
  const reviews = TESTIMONIALS.map((testimonial) => ({
    author: `${testimonial.name}${testimonial.location ? `, ${testimonial.location}` : ''}`,
    rating: testimonial.rating,
    reviewBody: testimonial.text,
  }));

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
          { name: 'About', url: URL },
        ]}
      />
      <ReviewJsonLd reviews={reviews} />
    </>
  );
}
