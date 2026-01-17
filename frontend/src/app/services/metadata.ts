import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Klang Valley Loan Services',
  description:
    'RM30 eligibility analysis, DSR consultation, and full loan assistance dedicated to Kuala Lumpur & Selangor borrowers. Fast 24-hour turnaround with curated bank recommendations.',
  keywords:
    'loan consultation Kuala Lumpur, loan consultant Selangor, RM30 eligibility analysis, Klang Valley DSR, GURU Credits services',
  openGraph: {
    title: 'Klang Valley Loan Services | GURU Credits',
    description:
      'Explore personal, car, home, and business loan services for Kuala Lumpur & Selangor residents. RM30 analysis + bank shortlist included.',
    url: `${SEO.url}/services`,
    siteName: SEO.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Klang Valley Loan Services | GURU Credits',
    description: 'RM30 eligibility analysis and guided loan approvals for Kuala Lumpur & Selangor.',
  },
  alternates: {
    canonical: `${SEO.url}/services`,
  },
};
