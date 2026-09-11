import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '@/lib/i18n';

vi.mock('next/navigation', () => ({ usePathname: () => '/', useRouter: () => ({ push: vi.fn() }) }));

import { Breadcrumbs, PageHeader, Prose, EmptyState, FilterBar, AsideCta, ClosingCta, ArticleLayout } from '..';
import { slugifyHeading } from '../TableOfContents';

const wrap = (ui: React.ReactElement) => render(<LanguageProvider>{ui}</LanguageProvider>);

describe('template primitives', () => {
  it('Breadcrumbs renders links for all but the last item', () => {
    wrap(<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Post' }]} />);
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog');
    expect(screen.queryByRole('link', { name: 'Post' })).toBeNull();
    expect(screen.getByText('Post')).toHaveAttribute('aria-current', 'page');
  });

  it('PageHeader renders eyebrow, h1, lede and breadcrumbs', () => {
    wrap(<PageHeader breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} eyebrow="Help" title="Common questions" lede="Answers." />);
    expect(screen.getByRole('heading', { level: 1, name: 'Common questions' })).toBeInTheDocument();
    expect(screen.getByText('Help')).toHaveClass('eyebrow');
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('Prose applies the prose class', () => {
    const { container } = render(<Prose id="body"><p>x</p></Prose>);
    expect(container.querySelector('#body')).toHaveClass('prose');
  });

  it('EmptyState renders title and action', () => {
    render(<EmptyState title="Nothing" description="Try again" action={<button>Reset</button>} />);
    expect(screen.getByText('Nothing')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });

  it('FilterBar wires search and chips', () => {
    const onQuery = vi.fn();
    const onSelect = vi.fn();
    render(
      <FilterBar query="" onQueryChange={onQuery} placeholder="Search" categories={[{ id: 'all', label: 'All' }, { id: 'tips', label: 'Tips' }]} active="all" onSelect={onSelect} />,
    );
    screen.getByRole('button', { name: 'Tips' }).click();
    expect(onSelect).toHaveBeenCalledWith('tips');
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('AsideCta and ClosingCta link to the eligibility test', () => {
    wrap(<><AsideCta language="en" /><ClosingCta language="en" /></>);
    const links = screen.getAllByRole('link', { name: /Check eligibility|Start the 2-minute check/i });
    expect(links.length).toBeGreaterThanOrEqual(2);
    expect(links[0]).toHaveAttribute('href', '/eligibility-test');
  });

  it('ArticleLayout renders header, body, aside and closing band', () => {
    const { container } = wrap(
      <ArticleLayout language="en" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Guide' }]} title="Guide title" lede="Lede">
        <h2>Section one</h2>
        <p>Body</p>
      </ArticleLayout>,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Guide title' })).toBeInTheDocument();
    expect(container.querySelector('#article-body.prose')).not.toBeNull();
    expect(container.querySelector('aside')).not.toBeNull();
    expect(container.querySelector('section#closing-cta')).not.toBeNull();
  });

  it('slugifyHeading produces stable ids', () => {
    expect(slugifyHeading('What is DSR? (Debt Service Ratio)')).toBe('what-is-dsr-debt-service-ratio');
  });
});
