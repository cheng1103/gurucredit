import { resolveRequestLanguage } from '@/lib/i18n/server';
import { homeContent } from '@/lib/content/home';
import { SEO } from '@/lib/constants';
import { WebPageJsonLd } from '@/components/JsonLd';

import { HeroSection } from '@/components/sections/HeroSection';
import { LicensedTrustBar } from '@/components/sections/LicensedTrustBar';
import { LoanProductsSection } from '@/components/sections/LoanProductsSection';
import { WhyUsSection } from '@/components/sections/WhyUsSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

import { ProcessTimeline } from '@/components/ProcessTimeline';
import { PreApprovalCalculatorLazy } from '@/components/lazy/PreApprovalCalculatorLazy';

import { RiskWarning } from '@/components/finance/RiskWarning';
import { RateDisclosure } from '@/components/finance/RateDisclosure';
import { TrustSecuritySection } from '@/components/finance/TrustSecuritySection';
import { Rm30DeliverablesSection } from '@/components/finance/Rm30DeliverablesSection';
import { PaymentReferenceTable } from '@/components/finance/PaymentReferenceTable';
import { CaseStudies } from '@/components/CaseStudies';
import { VerifyTrustCard } from '@/components/VerifyTrustCard';

export const revalidate = 300;

export default async function HomePage() {
  const language = await resolveRequestLanguage();
  const t = homeContent[language] ?? homeContent.en;

  return (
    <div className="flex flex-col">
      <WebPageJsonLd
        url={SEO.url}
        title={SEO.defaultTitle}
        description={SEO.defaultDescription}
        breadcrumbItems={[{ name: 'Home', url: SEO.url }]}
        faqItems={t.faq.items}
      />

      <HeroSection t={t} language={language} />

      <LicensedTrustBar language={language} />

      <section className="py-8 lg:py-10">
        <div className="container">
          <VerifyTrustCard language={language} compact />
        </div>
      </section>

      <Rm30DeliverablesSection language={language} />

      <PaymentReferenceTable language={language} />

      <LoanProductsSection t={t} />

      <RateDisclosure language={language} />

      <ProcessTimeline language={language} />

      <PreApprovalCalculatorLazy />

      <CaseStudies language={language} />

      <WhyUsSection t={t} />

      <RiskWarning t={t} />

      <TrustSecuritySection t={t} language={language} />

      <FaqSection t={t} language={language} />

      <FinalCtaSection t={t} language={language} />
    </div>
  );
}
