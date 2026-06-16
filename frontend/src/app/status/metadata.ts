import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Check Application Status',
  description:
    'Look up the status of your GURU Credits loan consultation by reference number. See review, document, and follow-up stages in real time.',
  alternates: {
    canonical: `${SEO.url}/status`,
  },
  robots: {
    index: false,
    follow: false,
  },
};
