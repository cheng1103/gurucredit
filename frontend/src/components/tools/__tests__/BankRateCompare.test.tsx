import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '@/lib/i18n';
import { BankRateCompare } from '../BankRateCompare';
import { toolMoreQuestions } from '@/lib/content/listings/faq';

vi.mock('next/navigation', () => ({ usePathname: () => '/', useRouter: () => ({ push: vi.fn() }) }));

// The server page resolves these and passes them down (see final-review.md
// I3) — the component itself must never import the FAQ module.
const renderCompare = () =>
  render(
    <LanguageProvider>
      <BankRateCompare language="en" moreQuestions={toolMoreQuestions('en')} />
    </LanguageProvider>,
  );

function formatCurrency(amount: number): string {
  // testing-library's default text normalizer collapses whitespace (including
  // the U+00A0 non-breaking space Intl inserts after "RM") to a plain space —
  // do the same here so the expected string matches what getByText sees.
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\u00A0/g, ' ');
}

function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
}

describe('BankRateCompare', () => {
  it('shows the 3 default banks, recalculates a real monthly payment for personal loans, and adds a 4th bank column', () => {
    renderCompare();

    // Default selection: Maybank, CIMB Bank, Public Bank.
    expect(screen.getByRole('heading', { name: 'Maybank' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'CIMB Bank' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Public Bank' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'RHB Bank' })).not.toBeInTheDocument();

    // Switch to personal loan and set amount/tenure.
    fireEvent.click(screen.getByRole('button', { name: /Personal Loan/ }));
    fireEvent.change(screen.getByLabelText(/Loan Amount/i), { target: { value: '60000' } });
    fireEvent.change(screen.getByLabelText(/Loan Tenure/i), { target: { value: '5' } });

    // Maybank personal loan min rate is 5.00% — assert the real, computed monthly payment renders.
    const expectedMaybankPayment = formatCurrency(calculateMonthlyPayment(60000, 5.0, 5));
    expect(screen.getAllByText(expectedMaybankPayment).length).toBeGreaterThan(0);

    // Toggling a 4th bank adds its column to the results.
    fireEvent.click(screen.getByRole('button', { name: /RHB Bank/ }));
    expect(screen.getByRole('heading', { name: 'RHB Bank' })).toBeInTheDocument();

    const expectedRhbPayment = formatCurrency(calculateMonthlyPayment(60000, 6.0, 5));
    expect(screen.getAllByText(expectedRhbPayment).length).toBeGreaterThan(0);
  });
});
