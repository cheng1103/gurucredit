import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '@/lib/i18n';

vi.mock('next/navigation', () => ({ usePathname: () => '/', useRouter: () => ({ push: vi.fn() }) }));

import { LegalPage } from '../LegalPage';
import { privacyDoc } from '@/lib/content/legal/privacy';

const wrap = (ui: React.ReactElement) => render(<LanguageProvider>{ui}</LanguageProvider>);

describe('LegalPage', () => {
  it('renders the privacy doc with one h1, six numbered clauses and the last-updated meta', () => {
    wrap(<LegalPage doc={privacyDoc} language="en" />);
    const c = privacyDoc.content.en;

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(c.title);

    const numberedHeadings = c.clauses.map((clause, index) => `${index + 1}. ${clause.title}`);
    expect(numberedHeadings).toHaveLength(6);
    numberedHeadings.forEach((text) => {
      expect(screen.getByRole('heading', { level: 2, name: text })).toBeInTheDocument();
    });

    expect(screen.getByText(new RegExp(c.lastUpdated))).toBeInTheDocument();

    // The old intro paragraph (dropped in an earlier pass) must render before
    // the first numbered clause.
    expect(c.intro?.[0]).toBeTruthy();
    expect(screen.getByText(/committed to protecting your privacy/i)).toBeInTheDocument();
  });
});
