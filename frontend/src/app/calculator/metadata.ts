import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'DSR Calculator',
  description: 'Calculate your Debt Service Ratio (DSR) for free. Understand your loan eligibility and borrowing capacity with our easy-to-use DSR calculator.',
  keywords: 'DSR calculator, debt service ratio calculator, loan eligibility calculator, Malaysia DSR, borrowing capacity',
  openGraph: {
    title: 'DSR Calculator | GURU Credits',
    description: 'Calculate your Debt Service Ratio (DSR) for free and understand your loan eligibility.',
    url: `${SEO.url}/calculator`,
    siteName: SEO.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSR Calculator | GURU Credits',
    description: 'Calculate your Debt Service Ratio (DSR) for free.',
  },
  alternates: {
    canonical: `${SEO.url}/calculator`,
  },
};
