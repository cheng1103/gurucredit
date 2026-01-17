import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { PreApprovalCalculator } from '../PreApprovalCalculator';
import { LanguageProvider } from '@/lib/i18n';

const renderWithProviders = () =>
  render(
    <LanguageProvider>
      <PreApprovalCalculator />
    </LanguageProvider>,
  );

describe('PreApprovalCalculator', () => {
  it('shows eligibility results after entering income and commitments', async () => {
    renderWithProviders();

    const incomeInput = screen.getByLabelText(/Monthly Net Income/i);
    const commitmentsInput = screen.getByLabelText(/Monthly Commitments/i);
    const submitButton = screen.getByRole('button', { name: /Check Eligibility/i });

    fireEvent.change(incomeInput, { target: { value: '8000' } });
    fireEvent.change(commitmentsInput, { target: { value: '1500' } });
    fireEvent.click(submitButton);

    const dsrLabels = await screen.findAllByText(/Debt Service Ratio/i);
    expect(dsrLabels.length).toBeGreaterThan(0);

    expect(screen.getByText(/Pre-Approved!/i)).toBeInTheDocument();
    expect(screen.getByText(/Apply Now/i)).toBeInTheDocument();
  });
});
