import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/lib/i18n';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('renders link groups, regulatory line and no newsletter form', () => {
    render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>,
    );
    expect(screen.getByRole('heading', { name: 'Loans' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Resources' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Company' })).toBeInTheDocument();
    expect(screen.getByText(/Moneylenders Act 1951/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Bank Negara Malaysia/ })).toHaveAttribute('target', '_blank');
    expect(screen.queryByRole('textbox')).toBeNull();
  });
});
