import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { LanguageProvider } from '@/lib/i18n';
import { Toaster } from '@/components/ui/sonner';
import { ApplyWizard } from '../ApplyWizard';
import { applyContent } from '@/lib/content/apply';
import { applicationsAPI } from '@/lib/api';

const push = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

vi.mock('@/lib/api', () => ({
  applicationsAPI: {
    createPublic: vi.fn(),
  },
}));

const renderWizard = () =>
  render(
    <LanguageProvider>
      <ApplyWizard serviceId="1" service={applyContent.en.services['1']} />
      <Toaster />
    </LanguageProvider>,
  );

describe('ApplyWizard', () => {
  beforeEach(() => {
    push.mockClear();
    vi.mocked(applicationsAPI.createPublic).mockReset();
  });

  it('renders step 1 with the locked field ids and labels', () => {
    renderWizard();

    expect(document.querySelector('#serviceArea')).toBeInTheDocument();
    expect(screen.getByLabelText(/Monthly Net Income/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Desired Loan Amount/i)).toBeInTheDocument();
  });

  it('shows the fillRequired toast when Next is clicked with an empty income', async () => {
    renderWizard();

    fireEvent.click(screen.getByRole('button', { name: /^Next$/ }));

    await waitFor(() => {
      expect(screen.getAllByText(applyContent.en.toast.fillRequired).length).toBeGreaterThan(0);
    });
  });

  it('advances to step 2 after step 1 is filled in', async () => {
    renderWizard();

    fireEvent.change(screen.getByLabelText(/Monthly Net Income/i), { target: { value: '8000' } });
    fireEvent.change(screen.getByLabelText(/Desired Loan Amount/i), { target: { value: '50000' } });
    fireEvent.click(screen.getByRole('button', { name: /^Next$/ }));

    await waitFor(() => {
      expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    });
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Employed', exact: true })).toBeInTheDocument();
  });

  it('submits and redirects to the success page with the returned reference', async () => {
    vi.mocked(applicationsAPI.createPublic).mockResolvedValue({
      data: { id: 'GC1' },
    } as never);

    renderWizard();

    fireEvent.change(screen.getByLabelText(/Monthly Net Income/i), { target: { value: '8000' } });
    fireEvent.change(screen.getByLabelText(/Desired Loan Amount/i), { target: { value: '50000' } });
    fireEvent.click(screen.getByRole('button', { name: /^Next$/ }));

    await waitFor(() => screen.getByLabelText(/Full Name/i));
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Playwright Tester' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '+60123456789' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'tester@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Employed', exact: true }));
    fireEvent.click(screen.getByRole('button', { name: /^Next$/ }));

    await waitFor(() => screen.getByRole('button', { name: /Submit Application/i }));
    fireEvent.click(screen.getByRole('button', { name: /Submit Application/i }));

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/services/success?service=1&ref=GC1');
    });
  });
});
