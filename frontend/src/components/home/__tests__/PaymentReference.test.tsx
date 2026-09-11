import { render, screen } from '@testing-library/react';
import { homeContent } from '@/lib/content/home';
import { PaymentReference } from '../PaymentReference';

describe('PaymentReference', () => {
  it('renders 7 amount rows and 7 tenure columns', () => {
    render(<PaymentReference t={homeContent.en} />);
    expect(screen.getAllByRole('row')).toHaveLength(8);
    expect(screen.getByText('RM 100,000')).toBeInTheDocument();
    expect(screen.getByText('RM 1,597')).toBeInTheDocument();
  });
});
