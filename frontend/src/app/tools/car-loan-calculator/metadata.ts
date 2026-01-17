import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Car Loan Calculator Malaysia',
  description:
    'Calculate car loan repayments, interest, and affordability for new or used cars in Malaysia.',
  path: '/tools/car-loan-calculator',
  image: '/images/car-loan.jpg',
  keywords:
    'car loan calculator Malaysia, car loan repayment, car financing, interest calculation',
});
