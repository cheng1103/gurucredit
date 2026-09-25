import { resolveRequestLanguage } from '@/lib/i18n/server';
import { SEO } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import { localizedMetadata } from '@/lib/seo';
import { FinancialProductJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { LoanProductPage } from '@/components/loans/LoanProductPage';
import { personalLoan } from '@/lib/content/loans/personal';
import { meta } from './metadata';

export async function generateMetadata() {
  return localizedMetadata(meta);
}

export default async function PersonalLoanPage() {
  const language = await resolveRequestLanguage();
  const t = personalLoan.content[language] ?? personalLoan.content.en;

  return (
    <>
      <FinancialProductJsonLd
        url={`${SEO.url}/loans/personal`}
        name="Personal Loan Malaysia"
        description="Personal loan guidance with RM30 eligibility analysis, DSR strategy, and written loan offer tailored to your profile."
        language={language}
        category="PersonalLoan"
        aprMin={4.88}
        aprMax={8.5}
        termMonthsMin={12}
        termMonthsMax={84}
        minAmount={5000}
        maxAmount={100000}
        requiredCollateral="Unsecured (no collateral required)"
        feeNote="Eligibility analysis fee. Lender processing and stamp duties apply per bank."
      />
      <WebPageJsonLd
        url={`${SEO.url}/loans/personal`}
        title={t.title}
        description={t.lede}
        language={language}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Loans', url: `${SEO.url}${PATHS.services}` },
          { name: t.title, url: `${SEO.url}/loans/personal` },
        ]}
        faqItems={t.faq.items}
      />
      <LoanProductPage doc={personalLoan} language={language} />
    </>
  );
}
