import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '@/lib/i18n';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
}));

import { Navbar } from '../Navbar';

describe('Navbar', () => {
  it('renders the stable Apply Now link and top-level items', () => {
    render(
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>,
    );
    expect(screen.getAllByRole('link', { name: /Apply Now/i })[0]).toHaveAttribute('href', '/eligibility-test');
    expect(screen.getByRole('button', { name: /Loans/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Guides' })).toHaveAttribute('href', '/loan-guides');
    expect(screen.getByRole('button', { name: /Open menu/i })).toBeInTheDocument();
  });
});
