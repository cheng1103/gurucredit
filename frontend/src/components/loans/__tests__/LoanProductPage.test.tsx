import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '@/lib/i18n';

vi.mock('next/navigation', () => ({ usePathname: () => '/', useRouter: () => ({ push: vi.fn() }) }));

import { LoanProductPage } from '../LoanProductPage';
import { personalLoan } from '@/lib/content/loans/personal';
import { emergencyLoan } from '@/lib/content/loans/emergency';

const wrap = (ui: React.ReactElement) => render(<LanguageProvider>{ui}</LanguageProvider>);

describe('LoanProductPage', () => {
  it('renders the personal loan page with header, process, FAQ and closing CTA', () => {
    const { container } = wrap(<LoanProductPage doc={personalLoan} language="en" />);
    const c = personalLoan.content.en;

    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toContain('Personal Loan');

    expect(screen.getByRole('heading', { name: c.process.title })).toBeInTheDocument();

    expect(c.faq.items.length).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(c.faq.items.length);

    expect(container.querySelector('section#closing-cta')).not.toBeNull();
  });

  it('renders the emergency loan page with urgent banner and a 6-item situations grid', () => {
    wrap(<LoanProductPage doc={emergencyLoan} language="en" />);
    const c = emergencyLoan.content.en;

    expect(screen.getByText(c.urgentBanner!.title)).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 }).length).toBeGreaterThanOrEqual(6);
    expect(screen.getByRole('link', { name: /011-2748 6389/ })).toHaveAttribute('href', 'tel:+601127486389');
  });
});
