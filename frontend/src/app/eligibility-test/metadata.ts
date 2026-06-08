import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Loan Eligibility Test',
  description: 'Take our free loan eligibility test to check your chances of loan approval. Get instant results and personalized recommendations.',
  keywords: 'GURU Credits eligibility test, loan eligibility test Malaysia, loan approval check Malaysia, credit check Malaysia, loan qualification Malaysia, personal loan eligibility Malaysia, CTOS CCRIS eligibility check, free loan assessment Malaysia',
  openGraph: {
    title: 'Loan Eligibility Test | GURU Credits',
    description: 'Take our free loan eligibility test to check your chances of loan approval.',
    url: `${SEO.url}/eligibility-test`,
    siteName: SEO.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Eligibility Test | GURU Credits',
    description: 'Take our free loan eligibility test to check your chances of loan approval.',
  },
  alternates: {
    canonical: `${SEO.url}/eligibility-test`,
  },
};
