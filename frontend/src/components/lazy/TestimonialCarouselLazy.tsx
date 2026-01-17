'use client';

import dynamic from 'next/dynamic';

const SectionSkeleton = ({ className = 'h-64' }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-3xl border border-dashed border-muted bg-muted/60 ${className}`}
    aria-hidden="true"
  />
);

const TestimonialCarouselDynamic = dynamic(
  () =>
    import('../TestimonialCarousel').then((mod) => ({
      default: mod.TestimonialCarousel,
    })),
  {
    ssr: false,
    loading: () => <SectionSkeleton className="h-80" />,
  },
);

export function TestimonialCarouselLazy() {
  return <TestimonialCarouselDynamic />;
}
