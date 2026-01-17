'use client';

import dynamic from 'next/dynamic';

const WhatsAppButton = dynamic(
  () => import('@/components/WhatsAppButton').then((mod) => mod.WhatsAppButton),
  { ssr: false },
);
const BackToTop = dynamic(
  () => import('@/components/BackToTop').then((mod) => mod.BackToTop),
  { ssr: false },
);
const ExitIntentPopup = dynamic(
  () => import('@/components/ExitIntentPopup').then((mod) => mod.ExitIntentPopup),
  { ssr: false },
);
const PromoBanner = dynamic(
  () => import('@/components/PromoBanner').then((mod) => mod.PromoBanner),
  { ssr: false },
);
const FloatingPromoWidget = dynamic(
  () => import('@/components/PromoBanner').then((mod) => mod.FloatingPromoWidget),
  { ssr: false },
);

export function ClientWidgets() {
  return (
    <>
      <PromoBanner />
      <WhatsAppButton />
      <BackToTop />
      <ExitIntentPopup />
      <FloatingPromoWidget />
    </>
  );
}
