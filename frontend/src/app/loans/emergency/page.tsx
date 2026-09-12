import { resolveRequestLanguage } from '@/lib/i18n/server';
import { SEO } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import { buildMetadata } from '@/lib/seo';
import { FinancialProductJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { LoanProductPage } from '@/components/loans/LoanProductPage';
import { emergencyLoan } from '@/lib/content/loans/emergency';

export const metadata = buildMetadata({
  title: 'Emergency Loan Guidance',
  description:
    'Emergency loan support for Malaysians. Get fast eligibility checks, DSR planning, and loan structuring for urgent funding needs.',
  path: '/loans/emergency',
  image: '/images/optimized/personal-loan.jpg',
  keywords:
    'GURU Credits emergency loan, emergency loan Malaysia, urgent cash loan Malaysia, same day emergency loan Malaysia, fast approval loan Malaysia, pinjaman kecemasan Malaysia, pinjaman segera Malaysia, emergency personal loan bad credit Malaysia, urgent cash loan Kuala Lumpur, fast loan eligibility Malaysia',
});

export default async function EmergencyLoanPage() {
  const language = await resolveRequestLanguage();
  const t = emergencyLoan.content[language] ?? emergencyLoan.content.en;

  return (
    <>
      <FinancialProductJsonLd
        url={`${SEO.url}/loans/emergency`}
        name="Emergency Personal Loan Malaysia"
        description="Fast eligibility analysis and loan structuring for urgent financial needs in Malaysia, with same-day document guidance."
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
          { name: 'Home', url: SEO.url },
          { name: 'Loans', url: `${SEO.url}${PATHS.services}` },
          { name: t.title, url: `${SEO.url}/loans/emergency` },
        ]}
        faqItems={t.faq.items}
      />
      <LoanProductPage doc={emergencyLoan} language={language} />
    </>
  );
}
