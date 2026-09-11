import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '@/lib/i18n';

const pathnameMock = vi.fn(() => '/');
vi.mock('next/navigation', () => ({ usePathname: () => pathnameMock() }));

import { StickyMobileCTA } from '../StickyMobileCTA';

const wrap = (ui: React.ReactElement) => render(<LanguageProvider>{ui}</LanguageProvider>);

describe('StickyMobileCTA', () => {
  it('renders both CTAs on content pages', () => {
    pathnameMock.mockReturnValue('/loans/personal');
    wrap(<StickyMobileCTA />);
    expect(screen.getByRole('link', { name: /Check eligibility/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /WhatsApp/i })).toBeInTheDocument();
  });

  it('does not render on form routes', () => {
    pathnameMock.mockReturnValue('/services/1/apply');
    const { container } = wrap(<StickyMobileCTA />);
    expect(container.firstChild).toBeNull();
  });
});
