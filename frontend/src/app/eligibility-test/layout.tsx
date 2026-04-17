import { WebPageJsonLd } from '@/components/JsonLd';
import { SEO } from '@/lib/constants';

export { metadata } from './metadata';

export default function EligibilityTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WebPageJsonLd
        url={`${SEO.url}/eligibility-test`}
        title="Loan Eligibility Test"
        description="Check your Malaysia loan eligibility in 2 minutes: DSR, credit history, employment, and income benchmarks."
        image="/images/hero-bg.jpg"
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Eligibility Test', url: `${SEO.url}/eligibility-test` },
        ]}
      />
      {children}
    </>
  );
}
