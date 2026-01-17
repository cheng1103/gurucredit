import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Home Loan Calculator Malaysia',
  description:
    'Estimate mortgage payments, interest, and affordability for home loans in Malaysia.',
  path: '/tools/home-loan-calculator',
  image: '/images/home-loan.jpg',
  keywords:
    'home loan calculator Malaysia, mortgage calculator, housing loan, interest calculation',
});
