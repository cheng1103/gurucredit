import type { Metadata } from 'next';
import { SEO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with GURU Credits for loan consultation services. Contact us via WhatsApp, phone, or email. We respond within 24 hours.',
  keywords: 'contact GURU Credits, loan consultation contact, WhatsApp loan advice, Malaysia loan help',
  openGraph: {
    title: 'Contact Us | GURU Credits',
    description: 'Get in touch with GURU Credits for professional loan consultation services.',
    url: `${SEO.url}/contact`,
    siteName: SEO.siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | GURU Credits',
    description: 'Get in touch with GURU Credits for professional loan consultation services.',
  },
  alternates: {
    canonical: `${SEO.url}/contact`,
  },
};
