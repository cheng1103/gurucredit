import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Container, Section, SectionHeader, Stat, IconTile, Marquee } from '..';

vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  return { ...actual, useInView: () => true, useReducedMotion: () => true };
});

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
    // useInView resolves true (the stat is in view) but useReducedMotion also
    // resolves true, so the count-up effect must bail out before animating —
    // the rendered text should equal the source value exactly, not a
    // truncated in-progress frame.
    render(<Stat value="1,200+" label="Applications" tone="primary" />);
    const el = screen.getByText('1,200+');
    expect(el).toHaveClass('font-mono');
    expect(el.textContent).toBe('1,200+');
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
