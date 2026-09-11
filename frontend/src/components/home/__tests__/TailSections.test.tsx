import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/lib/i18n';
import { homeContent } from '@/lib/content/home';
import { Transparency } from '../Transparency';
import { Faq } from '../Faq';
import { FinalCta } from '../FinalCta';

const wrap = (ui: React.ReactElement) => render(<LanguageProvider>{ui}</LanguageProvider>);

describe('tail sections', () => {
  it('Transparency renders four linked cards', () => {
    wrap(<Transparency t={homeContent.en} />);
    expect(screen.getByRole('link', { name: /Verify us/ })).toHaveAttribute('href', '/verify-us');
    expect(screen.getByRole('link', { name: /Privacy policy/ })).toHaveAttribute('href', '/privacy');
  });

  it('Faq renders six questions with the first open', () => {
    wrap(<Faq t={homeContent.en} />);
    expect(screen.getAllByRole('button', { expanded: false })).toHaveLength(5);
    expect(screen.getByRole('button', { expanded: true })).toHaveTextContent(/What types of loans/);
    expect(screen.getByRole('link', { name: /View all questions/ })).toHaveAttribute('href', '/faq');
  });

  it('FinalCta renders on an inverse section', () => {
    const { container } = wrap(<FinalCta t={homeContent.en} />);
    expect(container.querySelector('section')?.className).toContain('bg-inverse');
    expect(screen.getByRole('link', { name: /Start the 2-minute check/ })).toHaveAttribute('href', '/eligibility-test');
  });
});
