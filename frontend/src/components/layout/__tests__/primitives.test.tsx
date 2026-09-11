import { render, screen } from '@testing-library/react';
import { Container, Section, SectionHeader, Stat } from '..';

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
});
