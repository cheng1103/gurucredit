import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '@/lib/i18n';

vi.mock('next/navigation', () => ({ usePathname: () => '/', useRouter: () => ({ push: vi.fn() }) }));

import ServicesContent from '../ServicesContent';

const wrap = (ui: React.ReactElement) => render(<LanguageProvider>{ui}</LanguageProvider>);

describe('ServicesContent', () => {
  it('renders the "Select a Loan Product" heading and Personal Loan card (e2e lock)', () => {
    wrap(<ServicesContent language="en" />);

    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toBe('Select a Loan Product');

    expect(screen.getByText(/Personal Loan/i)).toBeInTheDocument();
  });

  it('renders a single h1, the RM30 banner, FAQ accordion and closing CTA', () => {
    const { container } = wrap(<ServicesContent language="en" />);

    expect(container.querySelectorAll('h1')).toHaveLength(1);
    expect(screen.getAllByText(/RM30/).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
    expect(container.querySelector('section#closing-cta')).not.toBeNull();
  });
});
