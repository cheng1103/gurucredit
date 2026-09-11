import type { ReactNode } from 'react';

/**
 * Shared two-column layout for interactive comparison tools: a sticky input
 * rail on the left, results on the right, with an optional disclaimer note
 * under the results. Plain composition — no hooks, so it's safe to render
 * from either a server or a client component.
 */
export function ToolLayout({
  rail,
  children,
  disclaimer,
}: {
  rail: ReactNode;
  children: ReactNode;
  disclaimer?: ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr] lg:gap-8">
      <div className="lg:sticky lg:top-24 lg:self-start">{rail}</div>
      <div className="min-w-0 space-y-6">
        {children}
        {disclaimer ? (
          <div className="flex gap-3 rounded-2xl border border-warning/30 bg-warning-soft p-5">{disclaimer}</div>
        ) : null}
      </div>
    </div>
  );
}
