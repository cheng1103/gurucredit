import { resolveRequestLanguage } from '@/lib/i18n/server';
import { SEO } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import { localizedMetadata } from '@/lib/seo';
import { FinancialProductJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { LoanProductPage } from '@/components/loans/LoanProductPage';
import { debtConsolidationLoan } from '@/lib/content/loans/debt-consolidation';
import { meta } from './metadata';

export async function generateMetadata() {
  return localizedMetadata(meta);
}

export default async function DebtConsolidationPage() {
  const language = await resolveRequestLanguage();
  const t = debtConsolidationLoan.content[language] ?? debtConsolidationLoan.content.en;

  return (
    <>
      <FinancialProductJsonLd
        url={`${SEO.url}/loans/debt-consolidation`}
        name="Debt Consolidation Loan Malaysia"
        description="Combine multiple high-interest debts into one manageable monthly payment with a clearer repayment plan and bank recommendations."
        language={language}
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
        language={language}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Loans', url: `${SEO.url}${PATHS.services}` },
          { name: t.title, url: `${SEO.url}/loans/debt-consolidation` },
        ]}
        faqItems={t.faq.items}
      />
      <LoanProductPage doc={debtConsolidationLoan} language={language} />
    </>
  );
}
