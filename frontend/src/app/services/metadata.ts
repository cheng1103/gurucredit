import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Malaysia Loan Services',
  description:
    'Licensed personal, business, and debt consolidation loans nationwide. Start with an RM30 CTOS report — written analysis and a structured offer within 24 hours.',
  keywords:
    'GURU Credits services, GURU Credits Malaysia, licensed money lender Malaysia, personal loan Malaysia, business loan Malaysia, debt consolidation Malaysia, Moneylenders Act 1951, CTOS report Malaysia, loan consultation Malaysia, loan eligibility review Malaysia, KPKT licensed lender Malaysia',
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
