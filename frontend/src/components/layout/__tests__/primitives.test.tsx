import { render, screen } from '@testing-library/react';
import { Container, Section, SectionHeader, Stat, IconTile, Marquee } from '..';

describe('layout primitives', () => {
  it('Container applies width by size', () => {
    const { container, rerender } = render(<Container>x</Container>);
    expect(container.firstElementChild?.className).toContain('max-w-[1120px]');
    rerender(<Container size="prose">x</Container>);
    expect(container.firstElementChild?.className).toContain('max-w-[680px]');
  });

  it('Section renders a <section> with rhythm and tone', () => {
    const { container } = render(<Section tone="inverse" id="cta">x</Section>);
    const el = container.querySelector('section#cta');
    expect(el).not.toBeNull();
    expect(el?.className).toContain('py-16');
    expect(el?.className).toContain('lg:py-24');
    expect(el?.className).toContain('bg-inverse');
  });

  it('SectionHeader renders eyebrow, h2 and lede', () => {
    render(<SectionHeader eyebrow="Why us" title="Four things" lede="Because." />);
    expect(screen.getByText('Why us')).toHaveClass('eyebrow');
    expect(screen.getByRole('heading', { level: 2, name: 'Four things' })).toBeInTheDocument();
    expect(screen.getByText('Because.')).toBeInTheDocument();
  });

  it('Stat renders value in mono', () => {
    render(<Stat value="24h" label="Turnaround" />);
    expect(screen.getByText('24h').className).toContain('font-mono');
  });

  it('Stat renders the exact source text under reduced motion', () => {
    const original = window.matchMedia;
    window.matchMedia = ((query: string) =>
      ({
        matches: query.includes('prefers-reduced-motion'),
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList) as typeof window.matchMedia;

    render(<Stat value="1,200+" label="Applications" tone="primary" />);
    expect(screen.getByText('1,200+')).toHaveClass('font-mono');

    window.matchMedia = original;
  });

  it('Section tone="tint" applies bg-tint', () => {
    const { container } = render(<Section tone="tint" id="tint">x</Section>);
    const el = container.querySelector('section#tint');
    expect(el?.className).toContain('bg-tint');
  });

  it('IconTile applies tone and size classes', () => {
    const { container } = render(
      <IconTile tone="violet" size="lg">
        <span>icon</span>
      </IconTile>
    );
    const el = container.querySelector('span.inline-flex');
    expect(el?.className).toContain('bg-violet-soft');
    expect(el?.className).toContain('text-violet');
    expect(el?.className).toContain('size-14');
  });

  it('Marquee renders items twice with the second copy aria-hidden', () => {
    render(<Marquee items={['A', 'B']} ariaLabel="Partners" />);
    const copies = screen.getAllByText('A');
    expect(copies).toHaveLength(2);
    expect(copies[0].closest('[aria-hidden="true"]')).toBeNull();
    expect(copies[1].closest('[aria-hidden="true"]')).not.toBeNull();
  });
});
