import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about loan consultation, DSR calculation, CCRIS, CTOS, and our services at GURU Credits.',
  keywords: 'GURU Credits FAQ, loan FAQ Malaysia, DSR questions Malaysia, CCRIS FAQ, CTOS questions, loan consultation FAQ, licensed money lender FAQ Malaysia, Malaysia loan help',
  openGraph: {
    title: 'FAQ | GURU Credits',
    description: 'Find answers to common questions about loan consultation and credit analysis.',
    url: `${SEO.url}/faq`,
    siteName: SEO.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ | GURU Credits',
    description: 'Find answers to common questions about loan consultation and credit analysis.',
  },
  // canonical + hreflang inherited from the root layout (localeAlternates)
};
