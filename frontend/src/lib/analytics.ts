type EventValue = string | number | boolean;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  event: string,
  params: Record<string, EventValue | null | undefined> = {},
) {
  if (typeof window === 'undefined') {
    return;
  }

  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null),
  );

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...cleanParams });

  if (typeof window.gtag === 'function') {
    window.gtag('event', event, cleanParams);
  }
}
