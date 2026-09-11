import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '@/lib/i18n';
vi.mock('next/navigation', () => ({ usePathname: () => '/', useRouter: () => ({ push: vi.fn() }) }));
import { ListingShell, CardGrid, ListingCard } from '..';

describe('listing primitives', () => {
  it('renders shell, grid and cards', () => {
    const { container } = render(
      <LanguageProvider>
        <ListingShell language="en" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Tools' }]} title="Free tools" lede="Pick one.">
          <CardGrid columns={2}>
            <ListingCard href="/tools/compare" title="Compare" description="Rates" cta="Open" />
            <ListingCard href="/eligibility-test" title="Test" description="Quiz" cta="Open" />
          </CardGrid>
        </ListingShell>
      </LanguageProvider>,
    );
    expect(container.querySelectorAll('h1')).toHaveLength(1);
    expect(screen.getByRole('link', { name: 'Compare' })).toHaveAttribute('href', '/tools/compare');
    expect(container.querySelector('section#closing-cta')).not.toBeNull();
  });
});
