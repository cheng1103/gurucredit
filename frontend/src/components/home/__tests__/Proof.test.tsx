import { render, screen } from '@testing-library/react';
import { homeContent } from '@/lib/content/home';
import { Proof } from '../Proof';

describe('Proof', () => {
  it('renders four points and three cases', () => {
    render(<Proof t={homeContent.en} />);
    expect(screen.getByRole('heading', { name: /Four things/ })).toBeInTheDocument();
    expect(screen.getByText(/You borrow from the lender/)).toBeInTheDocument();
    expect(screen.getAllByText(/approved in/)).toHaveLength(2);
    expect(screen.getByText(/Rajesh K\./)).toBeInTheDocument();
  });
});
