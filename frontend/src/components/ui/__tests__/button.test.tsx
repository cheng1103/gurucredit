import { render, screen } from '@testing-library/react';
import { Button } from '../button';
import { Card } from '../card';
import { Badge } from '../badge';

describe('re-themed primitives', () => {
  it('primary button uses the blue gradient token and mobile-first height', () => {
    render(<Button>Go</Button>);
    const btn = screen.getByRole('button', { name: 'Go' });
    expect(btn.className).toContain('to-primary');
    expect(btn.className).toContain('btn-sheen');
    expect(btn.className).toContain('h-12');
    expect(btn.className).toContain('lg:h-11');
  });

  it('outline button is white with a border', () => {
    render(<Button variant="outline">Go</Button>);
    const btn = screen.getByRole('button', { name: 'Go' });
    expect(btn.className).toContain('border-border');
    expect(btn.className).toContain('bg-surface');
  });

  it('inverse variant exists', () => {
    render(<Button variant="inverse">Go</Button>);
    expect(screen.getByRole('button', { name: 'Go' }).className).toContain('bg-surface');
  });

  it('card has a resting shadow and gains stronger hover classes when interactive', () => {
    const { container, rerender } = render(<Card>x</Card>);
    expect(container.firstElementChild?.className).toContain('shadow-card');
    expect(container.firstElementChild?.className).not.toContain('hover:-translate-y-1');
    rerender(<Card interactive>x</Card>);
    expect(container.firstElementChild?.className).toContain('hover:-translate-y-1');
    expect(container.firstElementChild?.className).toContain('hover:shadow-card-hover');
  });

  it('badge success variant exists', () => {
    render(<Badge variant="success">ok</Badge>);
    expect(screen.getByText('ok').className).toContain('bg-success-soft');
  });
});
