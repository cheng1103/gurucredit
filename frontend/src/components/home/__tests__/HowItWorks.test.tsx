import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/lib/i18n';
import { homeContent } from '@/lib/content/home';
import { HowItWorks } from '../HowItWorks';
import { Products } from '../Products';

describe('HowItWorks + Products', () => {
  it('renders three numbered steps and three deliverables', () => {
    render(<HowItWorks t={homeContent.en} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Three steps/ })).toBeInTheDocument();
    expect(screen.getByText(/Priority document checklist/)).toBeInTheDocument();
  });

  it('renders three product cards linking to their pages', () => {
    render(
      <LanguageProvider>
        <Products t={homeContent.en} />
      </LanguageProvider>,
    );
    // Each card's CTA link has an sr-only product suffix (e.g. "Learn more
    // Personal Loan", no colon) so it reads as a distinct, descriptive link
    // name for assistive tech and Lighthouse's link-text audit — matched here
    // by /Learn more/ — instead of three identical "Learn more" links.
    expect(screen.getAllByRole('link', { name: /Learn more/ })).toHaveLength(3);
    expect(screen.getByRole('link', { name: 'Personal Loan' })).toHaveAttribute('href', '/loans/personal');
  });
});
