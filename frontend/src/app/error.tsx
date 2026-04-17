'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { COMPANY } from '@/lib/constants';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Error can be logged to an error reporting service in production
    // e.g., Sentry, LogRocket, etc.
    // eslint-disable-next-line no-console
    console.error('Route error:', error);
  }, [error]);

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center">
      <div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" />
      <div className="absolute top-20 right-0 w-[30rem] h-[30rem] bg-destructive/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="container relative py-16 lg:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-destructive font-semibold mb-6">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            Unexpected error
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em] text-foreground mb-6">
            Something broke on our side.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-4">
            This is on us, not you. The page hit an unexpected error and could not load. Try
            refreshing — if it still fails, reach us on WhatsApp and we will sort it out.
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground font-mono mb-10">
              Reference: <span className="text-foreground">{error.digest}</span>
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 border-t border-border/60 pt-8">
            <Button size="lg" className="h-12 px-8 rounded-full" onClick={reset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try again
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-6 rounded-full" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to home
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 px-6 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 border-0"
            >
              <Link href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp support
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
