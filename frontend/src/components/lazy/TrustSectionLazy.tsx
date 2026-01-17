'use client';

import dynamic from 'next/dynamic';

const SectionSkeleton = ({ className = 'h-64' }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-3xl border border-dashed border-muted bg-muted/60 ${className}`}
    aria-hidden="true"
  />
);

const TrustSectionDynamic = dynamic(
  () =>
    import('../TrustSection').then((mod) => ({
      default: mod.TrustSection,
    })),
  {
    ssr: false,
    loading: () => <SectionSkeleton className="h-80" />,
  },
);

export function TrustSectionLazy() {
  return <TrustSectionDynamic />;
}
