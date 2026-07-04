import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Malaysia Loan Services',
  description:
    'Licensed personal, business, and debt consolidation loan guidance across Malaysia. Review approval chances, CCRIS or CTOS issues, and the right borrowing route before you apply.',
  keywords:
    'GURU Credits services, GURU Credits Malaysia, licensed money lender Malaysia, personal loan Malaysia, business loan Malaysia, debt consolidation Malaysia, Moneylenders Act 1951, CTOS report Malaysia, loan consultation Malaysia, loan eligibility review Malaysia, KPKT licensed lender Malaysia',
  openGraph: {
    title: 'Malaysia Loan Services | GURU Credits',
    description:
      'Personal, business, and debt consolidation guidance from a licensed lender for borrowers across Malaysia.',
    url: `${SEO.url}/services`,
    siteName: SEO.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malaysia Loan Services | GURU Credits',
    description: 'Licensed loan guidance for Malaysian borrowers comparing personal loans, debt consolidation, and credit-fit options.',
  },
  // canonical + hreflang inherited from the root layout (localeAlternates)
};
