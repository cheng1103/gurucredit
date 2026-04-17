import AboutContent from './AboutContent';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { ReviewJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { SEO, TESTIMONIALS } from '@/lib/constants';

export default async function AboutPage() {
  const language = await resolveRequestLanguage();
  const reviews = TESTIMONIALS.map((t) => ({
    author: `${t.name}${t.location ? `, ${t.location}` : ''}`,
    rating: t.rating,
    reviewBody: t.text,
  }));
  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/about`}
        title="About GURU Credits"
        description="Learn about GURU Credits, our loan guidance process, and how we support borrowers across Malaysia."
        image="/images/team.jpg"
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'About', url: `${SEO.url}/about` },
        ]}
      />
      <ReviewJsonLd reviews={reviews} />
      <AboutContent language={language} />
    </>
  );
}
