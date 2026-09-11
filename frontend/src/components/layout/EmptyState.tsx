import type { ReactNode } from 'react';

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-border-strong p-10 text-center">
      <p className="text-lg font-semibold">{title}</p>
      {description ? <p className="mt-1 text-sm text-foreground-muted">{description}</p> : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}
