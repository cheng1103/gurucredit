import { resolveRequestLanguage } from '@/lib/i18n/server';
import { SEO } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import { buildMetadata } from '@/lib/seo';
import { FinancialProductJsonLd, LoanProductJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { LoanProductPage } from '@/components/loans/LoanProductPage';
import { personalLoan } from '@/lib/content/loans/personal';

export const metadata = buildMetadata({
  title: 'Personal Loan Playbook',
  description:
    'Personal loan guidance for Malaysians. Get DSR strategy, CCRIS/CTOS checks, and loan offer structure to unlock better personal financing terms.',
  path: '/loans/personal',
  image: '/images/optimized/personal-loan.jpg',
  keywords:
    'GURU Credits personal loan, GURU Credits Malaysia personal financing, personal loan Malaysia, personal financing Malaysia, personal loan for bad credit Malaysia, personal loan for self employed Malaysia, pinjaman peribadi Malaysia, pinjaman peribadi lulus cepat, CCRIS CTOS personal loan, loan eligibility personal loan Malaysia, DSR analysis personal loan',
});

export default async function PersonalLoanPage() {
  const language = await resolveRequestLanguage();
  const t = personalLoan.content[language] ?? personalLoan.content.en;

  return (
    <>
      <LoanProductJsonLd
        name="Personal Loan Malaysia"
        description="Personal loan guidance with RM30 analysis, DSR strategy, and tailored loan offer."
        interestRate="4.88% - 8.5% flat p.a."
        loanTerm="1-7 years"
        minAmount={5000}
        maxAmount={100000}
      />
      <FinancialProductJsonLd
        url={`${SEO.url}/loans/personal`}
        name="Personal Loan Malaysia"
        description="Personal loan guidance with RM30 eligibility analysis, DSR strategy, and written loan offer tailored to your profile."
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
