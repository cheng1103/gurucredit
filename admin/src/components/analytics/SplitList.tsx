'use client';

interface SplitListProps {
  rows: { label: string; value: number }[];
  /** Shown when every row is zero. */
  emptyLabel: string;
}

const formatNumber = (value: number) => value.toLocaleString('en-MY');

export function SplitList({ rows, emptyLabel }: SplitListProps) {
  const total = rows.reduce((sum, row) => sum + row.value, 0);

  if (total === 0) {
    return <p className="text-sm text-muted-foreground">{emptyLabel}</p>;
  }

  return (
    <ul className="space-y-3">
      {rows.map((row) => {
        const share = Math.round((row.value / total) * 100);
        return (
          <li key={row.label} className="space-y-1.5">
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="font-medium">{row.label}</span>
              <span className="text-muted-foreground">
                {formatNumber(row.value)} views · {share}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary/80"
                style={{ width: `${share}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
