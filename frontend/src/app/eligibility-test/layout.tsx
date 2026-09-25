import { WebPageJsonLd } from '@/components/JsonLd';
import { SEO } from '@/lib/constants';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { localizedMetadata } from '@/lib/seo';
import { meta } from './metadata';

export async function generateMetadata() {
  return localizedMetadata(meta);
}

export default async function EligibilityTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const language = await resolveRequestLanguage();
  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/eligibility-test`}
        title="Loan Eligibility Test"
        description="Check your Malaysia loan eligibility in 2 minutes: DSR, credit history, employment, and income benchmarks."
        image="/images/hero-bg.jpg"
        language={language}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Eligibility Test', url: `${SEO.url}/eligibility-test` },
        ]}
      />
      {children}
    </>
  );
}
