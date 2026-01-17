import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest articles on credit tips, loan guides, market analysis, and financial advice from GURU Credits experts.',
  keywords: 'loan blog, credit tips, DSR guide, home loan tips, personal loan advice, Malaysia finance blog',
  openGraph: {
    title: 'Blog | GURU Credits',
    description: 'Read the latest articles on credit tips, loan guides, and financial advice.',
    url: `${SEO.url}/blog`,
    siteName: SEO.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | GURU Credits',
    description: 'Read the latest articles on credit tips, loan guides, and financial advice.',
  },
  alternates: {
    canonical: `${SEO.url}/blog`,
  },
};
