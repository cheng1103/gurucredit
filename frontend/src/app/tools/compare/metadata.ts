import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Loan Comparison Tool',
  description:
    'Compare loan offers, rates, and monthly instalments across banks in Malaysia.',
  path: '/tools/compare',
  image: '/images/cta-bg.jpg',
  keywords:
    'loan comparison Malaysia, compare loan rates, bank offers, loan instalment',
});
