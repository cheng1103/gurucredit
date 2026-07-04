import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Check Application Status',
  description:
    'Look up the status of your GURU Credits loan consultation by reference number. See review, document, and follow-up stages in real time.',
  // canonical + hreflang inherited from the root layout (localeAlternates)
  robots: {
    index: false,
    follow: false,
  },
};
