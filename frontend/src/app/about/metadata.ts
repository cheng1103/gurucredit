import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about GURU Credits - your trusted partner in loan consultation and credit analysis services in Malaysia. We help Malaysians make informed financial decisions.',
  keywords: 'about GURU Credits, loan consultation Malaysia, credit analysis, financial services, loan advisor',
  openGraph: {
    title: 'About Us | GURU Credits',
    description: 'Your trusted partner in loan consultation and credit analysis services in Malaysia.',
    url: `${SEO.url}/about`,
    siteName: SEO.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | GURU Credits',
    description: 'Your trusted partner in loan consultation and credit analysis services in Malaysia.',
  },
  alternates: {
    canonical: `${SEO.url}/about`,
  },
};
