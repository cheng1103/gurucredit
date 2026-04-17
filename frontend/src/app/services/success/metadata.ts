import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Application Submitted',
    description:
      'Your GURU Credits consultation request has been received. Save your reference number and we will follow up within 24 business hours.',
    path: '/services/success',
  }),
  robots: { index: false, follow: false },
};
