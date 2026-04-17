import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Malaysia Loan Services',
  description:
    'Licensed personal, business, and debt consolidation loans nationwide. Start with an RM30 CTOS report — written analysis and a structured offer within 24 hours.',
  keywords:
    'licensed money lender Malaysia, personal loan, business loan, debt consolidation, Moneylenders Act 1951, CTOS report, GURU Credits',
  openGraph: {
    title: 'Malaysia Loan Services | GURU Credits',
    description:
      'Personal, business, and debt consolidation loans directly from a licensed lender. RM30 CTOS report fee + written analysis included.',
    url: `${SEO.url}/services`,
    siteName: SEO.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malaysia Loan Services | GURU Credits',
    description: 'Direct-to-lender loan analysis and offers for borrowers across Malaysia.',
  },
  alternates: {
    canonical: `${SEO.url}/services`,
  },
};
