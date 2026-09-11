import { resolveRequestLanguage } from '@/lib/i18n/server';
import { SEO } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { FinancialProductJsonLd, LoanProductJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { LoanProductPage } from '@/components/loans/LoanProductPage';
import { debtConsolidationLoan } from '@/lib/content/loans/debt-consolidation';

export const metadata = buildMetadata({
  title: 'Debt Consolidation Loan Guidance',
  description:
    'Debt consolidation guidance for Malaysia. Combine multiple debts into one payment with lower rates and a clearer repayment plan.',
  path: '/loans/debt-consolidation',
  image: '/images/optimized/personal-loan.jpg',
  keywords:
    'GURU Credits debt consolidation, debt consolidation Malaysia, debt consolidation loan Malaysia, consolidate credit card debt Malaysia, debt restructuring Malaysia, penyatuan hutang Malaysia, lower monthly payment Malaysia, lower interest debt Malaysia, DSR strategy debt consolidation, debt consolidation for bad credit Malaysia',
});

export default async function DebtConsolidationPage() {
  const language = await resolveRequestLanguage();
  const t = debtConsolidationLoan.content[language] ?? debtConsolidationLoan.content.en;

  return (
    <>
      <LoanProductJsonLd
        name="Debt Consolidation Loan"
        description="Combine multiple debts into one manageable monthly payment with lower interest rates"
        interestRate="6-9% p.a."
        loanTerm="1-7 years"
        minAmount={10000}
        maxAmount={200000}
      />
      <FinancialProductJsonLd
        url={`${SEO.url}/loans/debt-consolidation`}
        name="Debt Consolidation Loan Malaysia"
        description="Combine multiple high-interest debts into one manageable monthly payment with a clearer repayment plan and bank recommendations."
        category="PersonalLoan"
        aprMin={6}
        aprMax={9}
        termMonthsMin={12}
        termMonthsMax={84}
        minAmount={10000}
        maxAmount={200000}
        requiredCollateral="Typically unsecured; some banks require salary-transfer assignment"
        feeNote="RM30 eligibility analysis. Early-settlement fees may apply on existing debts being consolidated."
      />
      <WebPageJsonLd
        url={`${SEO.url}/loans/debt-consolidation`}
        title={t.title}
        description={t.lede}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: t.title, url: `${SEO.url}/loans/debt-consolidation` },
        ]}
        faqItems={t.faq.items}
      />
      <LoanProductPage doc={debtConsolidationLoan} language={language} />
    </>
  );
}
