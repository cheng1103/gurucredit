import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest articles on credit tips, loan guides, market analysis, and financial advice from GURU Credits experts.',
  keywords: 'GURU Credits blog, GURU Credits articles, loan blog Malaysia, credit tips Malaysia, DSR guide Malaysia, home loan tips Malaysia, personal loan advice Malaysia, CCRIS CTOS guide Malaysia, debt consolidation tips Malaysia, Malaysia finance blog',
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
  // canonical + hreflang inherited from the root layout (localeAlternates)
};
