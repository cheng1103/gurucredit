'use client';

import Link from 'next/link';
import { COMPANY } from '@/lib/constants';

// The root error boundary can fire before the app's stylesheet has loaded, so
// this page cannot assume Tailwind utilities are available — everything here
// is inline-styled, plain markup, English only.
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '28rem' }}>
            <p
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#71717a',
                marginBottom: '0.75rem',
              }}
            >
              Error
            </p>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 0.75rem', color: '#18181b' }}>
              Something went wrong.
            </h1>
            <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#52525b', margin: '0 0 2rem' }}>
              We apologize for the inconvenience. Please head back home or reach us on WhatsApp.
            </p>
            {error.digest ? (
              <p style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#a1a1aa', margin: '0 0 1.5rem' }}>
                {error.digest}
              </p>
            ) : null}
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'underline' }}>
                Back to home
              </Link>
              <a
                href={COMPANY.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'underline' }}
              >
                WhatsApp support
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
