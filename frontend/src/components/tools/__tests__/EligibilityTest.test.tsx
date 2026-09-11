import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '@/lib/i18n';
import { EligibilityTest } from '../EligibilityTest';

vi.mock('next/navigation', () => ({ usePathname: () => '/', useRouter: () => ({ push: vi.fn() }) }));

const renderTest = () =>
  render(
    <LanguageProvider>
      <EligibilityTest language="en" />
    </LanguageProvider>,
  );

describe('EligibilityTest', () => {
  it('shows the excellent result title after answering all 5 questions with the best option', () => {
    renderTest();

    // Best-option index per question (index into each question's options array).
    const bestOptionIndexes = [3, 0, 0, 0, 0];

    for (const index of bestOptionIndexes) {
      const options = screen.getAllByRole('button', { pressed: false });
      fireEvent.click(options[index]);
    }

    expect(screen.getByText('Excellent Eligibility!')).toBeInTheDocument();
    expect(screen.getByText('100/100')).toBeInTheDocument();
  });
});
