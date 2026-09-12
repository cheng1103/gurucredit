import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Check Application Status',
    description:
      'Look up the status of your GURU Credits loan consultation by reference number. See review, document, and follow-up stages in real time.',
    path: '/status',
  }),
  robots: {
    index: false,
    follow: false,
  },
};
