import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/lib/i18n';
import { homeContent } from '@/lib/content/home';
import { Hero } from '../Hero';

describe('Hero', () => {
  it('renders h1, both CTAs, the lead form and section id', () => {
    const { container } = render(
      <LanguageProvider>
        <Hero t={homeContent.en} language="en" />
      </LanguageProvider>,
    );
    expect(container.querySelector('section#hero')).not.toBeNull();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Know if you will be approved/);
    expect(screen.getByRole('button', { name: /Start the 2-minute check/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /WhatsApp an advisor/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/WhatsApp number/i)).toBeInTheDocument();
    expect(container.querySelector('#hero-quick-check')).not.toBeNull();
  });
});
