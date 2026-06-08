import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Loan Comparison Tool',
  description:
    'Compare loan offers, rates, and monthly instalments across banks in Malaysia.',
  path: '/tools/compare',
  image: '/images/cta-bg.jpg',
  keywords:
    'GURU Credits loan comparison, loan comparison Malaysia, compare loan rates Malaysia, compare bank loans Malaysia, bank offers Malaysia, loan instalment comparison, personal loan comparison Malaysia, debt consolidation comparison Malaysia',
});
