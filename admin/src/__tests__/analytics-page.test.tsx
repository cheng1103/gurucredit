import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { AnalyticsOverview } from '@/lib/api';

const getOverview = vi.fn();

vi.mock('@/lib/api', () => ({
  analyticsAPI: {
    getOverview: (days: number) => getOverview(days),
  },
}));

// The page is wrapped in the authenticated admin chrome, which redirects when
// the auth store is empty. The chrome is not what this test is about.
vi.mock('@/components/AdminLayout', () => ({
  AdminLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const zeroCount = { views: 0, visitors: 0 };

function zeroFilledSeries(days: number): AnalyticsOverview['series'] {
  return Array.from({ length: days }, (_, index) => ({
    date: `2026-09-${String(index + 1).padStart(2, '0')}`,
    views: 0,
    visitors: 0,
  }));
}

const populatedOverview: AnalyticsOverview = {
  totals: {
    today: { views: 1234, visitors: 777 },
    last7: { views: 4321, visitors: 2222 },
    last30: { views: 9876, visitors: 5555 },
    allTime: { views: 54321, visitors: 31111 },
  },
  series: [
    { date: '2026-09-30', views: 101, visitors: 61 },
    { date: '2026-10-01', views: 102, visitors: 62 },
    { date: '2026-10-02', views: 103, visitors: 63 },
    { date: '2026-10-03', views: 480, visitors: 310 },
    { date: '2026-10-04', views: 105, visitors: 65 },
    { date: '2026-10-05', views: 106, visitors: 66 },
    { date: '2026-10-06', views: 107, visitors: 67 },
  ],
  topPages: [
    { path: '/', views: 900, visitors: 540 },
    { path: '/ms/apply', views: 250, visitors: 180 },
  ],
  localeSplit: { en: 800, ms: 400 },
  deviceSplit: { mobile: 700, tablet: 100, desktop: 420 },
  rangeDays: 7,
  generatedAt: '2026-10-06T04:00:00.000Z',
};

const emptyOverview: AnalyticsOverview = {
  totals: {
    today: zeroCount,
    last7: zeroCount,
    last30: zeroCount,
    allTime: zeroCount,
  },
  series: zeroFilledSeries(30),
  topPages: [],
  localeSplit: { en: 0, ms: 0 },
  deviceSplit: { mobile: 0, tablet: 0, desktop: 0 },
  rangeDays: 30,
  generatedAt: '2026-10-06T04:00:00.000Z',
};

async function renderPage() {
  const { default: AnalyticsPage } = await import('@/app/analytics/page');
  render(<AnalyticsPage />);
}

describe('Analytics page', () => {
  beforeEach(() => {
    getOverview.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the overview payload numbers', async () => {
    getOverview.mockResolvedValue({ data: populatedOverview });

    await renderPage();

    // Fixed-window totals.
    expect(await screen.findByText('1,234')).toBeInTheDocument();
    expect(screen.getByText('777 unique visitors today')).toBeInTheDocument();
    expect(screen.getByText('4,321')).toBeInTheDocument();
    expect(screen.getByText('2,222 unique visitors')).toBeInTheDocument();
    expect(screen.getByText('9,876')).toBeInTheDocument();
    expect(screen.getByText('54,321')).toBeInTheDocument();

    // Top pages table carries the per-page figures, not just the chart.
    const topPagesTable = screen.getByRole('table');
    expect(topPagesTable).toBeInTheDocument();
    expect(screen.getByText('/ms/apply')).toBeInTheDocument();
    expect(screen.getByText('900')).toBeInTheDocument();
    expect(screen.getByText('540')).toBeInTheDocument();
    expect(screen.getByText('250')).toBeInTheDocument();
    expect(screen.getByText('180')).toBeInTheDocument();

    // Locale and device splits.
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText(/800 views/)).toBeInTheDocument();
    expect(screen.getByText('Malay (/ms)')).toBeInTheDocument();
    expect(screen.getByText(/400 views .* 33%/)).toBeInTheDocument();
    expect(screen.getByText('Mobile')).toBeInTheDocument();
    expect(screen.getByText(/700 views/)).toBeInTheDocument();
    expect(screen.getByText('Tablet')).toBeInTheDocument();
    expect(screen.getByText('Desktop')).toBeInTheDocument();

    // The chart is described in text for anyone who cannot read it.
    expect(
      screen.getByRole('img', { name: /Page views peaked at 480 on 3 Oct/ }),
    ).toBeInTheDocument();

    expect(getOverview).toHaveBeenCalledWith(30);
  });

  it('refetches when the range toggle changes', async () => {
    getOverview.mockResolvedValue({ data: populatedOverview });

    await renderPage();
    await screen.findByText('1,234');

    await userEvent.click(screen.getByRole('button', { name: '90 days' }));

    await waitFor(() => {
      expect(getOverview).toHaveBeenCalledWith(90);
    });
    expect(screen.getByRole('button', { name: '90 days' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('shows a deliberate empty state when nothing has been tracked yet', async () => {
    getOverview.mockResolvedValue({ data: emptyOverview });

    await renderPage();

    expect(await screen.findByText('No page views recorded yet')).toBeInTheDocument();
    expect(
      screen.getByText(/Tracking is live on the public site/),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Check again' })).toBeInTheDocument();

    // No chart and no empty table pretending to hold data.
    expect(screen.queryByTestId('analytics-trend-chart')).not.toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();

    // The range toggle stays available so the page does not look broken.
    expect(screen.getByRole('group', { name: 'Date range' })).toBeInTheDocument();
  });

  it('surfaces an error card when the overview call fails', async () => {
    getOverview.mockRejectedValue(new Error('network down'));

    await renderPage();

    expect(await screen.findByText('Analytics Offline')).toBeInTheDocument();
  });
});
