'use client';

import dynamic from 'next/dynamic';

const SectionSkeleton = ({ className = 'h-64' }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-3xl border border-dashed border-muted bg-muted/60 ${className}`}
    aria-hidden="true"
  />
);

const PreApprovalCalculatorDynamic = dynamic(
  () =>
    import('../PreApprovalCalculator').then((mod) => ({
      default: mod.PreApprovalCalculator,
    })),
  {
    ssr: false,
    loading: () => <SectionSkeleton className="h-[520px]" />,
  },
);

export function PreApprovalCalculatorLazy() {
  return <PreApprovalCalculatorDynamic />;
}
