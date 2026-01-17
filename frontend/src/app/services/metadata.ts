import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Malaysia Loan Services',
  description:
    'RM30 eligibility analysis, DSR consultation, and full loan assistance for borrowers nationwide. Fast 24-hour turnaround with curated bank recommendations.',
  keywords:
    'loan consultation Malaysia, loan consultant Malaysia, RM30 eligibility analysis, DSR consultation Malaysia, GURU Credits services',
  openGraph: {
    title: 'Malaysia Loan Services | GURU Credits',
    description:
      'Explore personal, car, home, and business loan services for borrowers nationwide. RM30 analysis + bank shortlist included.',
    url: `${SEO.url}/services`,
    siteName: SEO.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malaysia Loan Services | GURU Credits',
    description: 'RM30 eligibility analysis and guided loan submissions for borrowers across Malaysia.',
  },
  alternates: {
    canonical: `${SEO.url}/services`,
  },
};
