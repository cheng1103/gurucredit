export const OFFLINE_MODE =
  process.env.NEXT_PUBLIC_ALLOW_OFFLINE_ADMIN === 'true';

export const DEMO_EMAIL =
  process.env.NEXT_PUBLIC_DEMO_EMAIL || 'admin@gurucredits.my';

export const DEMO_PASSWORD =
  process.env.NEXT_PUBLIC_DEMO_PASSWORD || 'Admin123!';

export const DASHBOARD_REFRESH_INTERVAL = 30_000; // 30 seconds
