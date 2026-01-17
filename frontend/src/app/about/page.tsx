import AboutContent from './AboutContent';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { WebPageJsonLd } from '@/components/JsonLd';
import { SEO } from '@/lib/constants';

export default async function AboutPage() {
  const language = await resolveRequestLanguage();
  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/about`}
        title="About GURU Credits"
        description="Learn about GURU Credits, our loan guidance process, and how we support borrowers in Kuala Lumpur & Selangor."
        image="/images/team.jpg"
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'About', url: `${SEO.url}/about` },
        ]}
      />
      <AboutContent language={language} />
    </>
  );
}
