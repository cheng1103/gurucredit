import { resolveRequestLanguage } from '@/lib/i18n/server';
import { SEO } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import { localizedMetadata } from '@/lib/seo';
import { FinancialProductJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { LoanProductPage, loanProductUi } from '@/components/loans/LoanProductPage';
import { emergencyLoan } from '@/lib/content/loans/emergency';
import { meta } from './metadata';

export async function generateMetadata() {
  return localizedMetadata(meta);
}

export default async function EmergencyLoanPage() {
  const language = await resolveRequestLanguage();
  const t = emergencyLoan.content[language] ?? emergencyLoan.content.en;
  const crumbs = loanProductUi[language];

  return (
    <>
      <FinancialProductJsonLd
        url={`${SEO.url}/loans/emergency`}
        name="Emergency Personal Loan Malaysia"
        description="Fast eligibility analysis and loan structuring for urgent financial needs in Malaysia, with same-day document guidance."
        language={language}
        category="PersonalLoan"
        aprMin={4.88}
        aprMax={9.0}
        termMonthsMin={12}
        termMonthsMax={84}
        minAmount={5000}
        maxAmount={50000}
        requiredCollateral="Unsecured (no collateral required)"
        feeNote="RM30 eligibility analysis. Lender origination and stamp duty fees apply."
      />
      <WebPageJsonLd
        url={`${SEO.url}/loans/emergency`}
        title={t.title}
        description={t.lede}
        language={language}
        breadcrumbItems={[
          { name: crumbs.home, url: SEO.url },
          { name: crumbs.loans, url: `${SEO.url}${PATHS.services}` },
          { name: t.title, url: `${SEO.url}/loans/emergency` },
        ]}
        faqItems={t.faq.items}
      />
      <LoanProductPage doc={emergencyLoan} language={language} />
    </>
  );
}
