'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { SplitList } from '@/components/analytics/SplitList';
import {
  TREND_SERIES_LEGEND,
  TrendChart,
  formatDayLabel,
} from '@/components/analytics/TrendChart';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { analyticsAPI, type AnalyticsOverview, type AnalyticsRangeDays } from '@/lib/api';
import { DASHBOARD_REFRESH_INTERVAL, OFFLINE_MODE } from '@/lib/config';
import { cn } from '@/lib/utils';
import { Activity, Eye, Loader2, Stethoscope, UserRound } from 'lucide-react';

const RANGE_OPTIONS: AnalyticsRangeDays[] = [7, 30, 90];

const formatNumber = (value: number) => value.toLocaleString('en-MY');

/** Only used when NEXT_PUBLIC_ALLOW_OFFLINE_ADMIN is on and the API is unreachable. */
function demoOverview(days: AnalyticsRangeDays): AnalyticsOverview {
  const series = Array.from({ length: days }, (_, index) => {
    const date = new Date(Date.now() - (days - 1 - index) * 86_400_000);
    const views = 40 + ((index * 17) % 55);
    return {
      date: date.toISOString().slice(0, 10),
      views,
      visitors: Math.max(1, Math.round(views * 0.62)),
    };
  });
  const rangeViews = series.reduce((sum, point) => sum + point.views, 0);

  return {
    totals: {
      today: { views: series[series.length - 1]?.views ?? 0, visitors: 38 },
      last7: { views: 412, visitors: 263 },
      last30: { views: 1684, visitors: 1021 },
      allTime: { views: 5290, visitors: 3144 },
    },
    series,
    topPages: [
      { path: '/', views: Math.round(rangeViews * 0.31), visitors: 412 },
      { path: '/apply', views: Math.round(rangeViews * 0.18), visitors: 230 },
      { path: '/ms/apply', views: Math.round(rangeViews * 0.11), visitors: 142 },
      { path: '/blog/personal-loan-malaysia-guide', views: 96, visitors: 81 },
      { path: '/contact', views: 72, visitors: 64 },
    ],
    localeSplit: { en: Math.round(rangeViews * 0.72), ms: Math.round(rangeViews * 0.28) },
    deviceSplit: {
      mobile: Math.round(rangeViews * 0.68),
      tablet: Math.round(rangeViews * 0.07),
      desktop: Math.round(rangeViews * 0.25),
    },
    rangeDays: days,
    generatedAt: new Date().toISOString(),
  };
}

function peakOf(
  series: AnalyticsOverview['series'],
  key: 'views' | 'visitors',
): { value: number; date: string } | null {
  let best: { value: number; date: string } | null = null;
  for (const point of series) {
    if (!best || point[key] > best.value) {
      best = { value: point[key], date: point.date };
    }
  }
  return best && best.value > 0 ? best : null;
}

export default function AnalyticsPage() {
  const [range, setRange] = useState<AnalyticsRangeDays>(30);
  const [data, setData] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (options: { silent?: boolean } = {}) => {
      if (options.silent) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      try {
        const response = await analyticsAPI.getOverview(range);
        setData(response.data);
        setError(null);
      } catch {
        if (OFFLINE_MODE) {
          setData(demoOverview(range));
          setError(null);
        } else {
          setError('Unable to load analytics. Please check your API service.');
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [range],
  );

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const timer = setInterval(() => {
      void load({ silent: true });
    }, DASHBOARD_REFRESH_INTERVAL);
    return () => clearInterval(timer);
  }, [load]);

  const series = useMemo(() => data?.series ?? [], [data]);

  const chartDescription = useMemo(() => {
    if (series.length === 0) return 'No daily traffic data available.';
    const first = formatDayLabel(series[0].date);
    const last = formatDayLabel(series[series.length - 1].date);
    const viewPeak = peakOf(series, 'views');
    const visitorPeak = peakOf(series, 'visitors');
    const parts = [
      `Daily page views and unique visitors from ${first} to ${last}.`,
    ];
    if (viewPeak) {
      parts.push(
        `Page views peaked at ${formatNumber(viewPeak.value)} on ${formatDayLabel(viewPeak.date)}.`,
      );
    }
    if (visitorPeak) {
      parts.push(
        `Unique visitors peaked at ${formatNumber(visitorPeak.value)} on ${formatDayLabel(visitorPeak.date)}.`,
      );
    }
    parts.push('The same figures are listed in the tables below.');
    return parts.join(' ');
  }, [series]);

  const rangeDays = data?.rangeDays ?? range;
  const hasAnyTraffic = (data?.totals.allTime.views ?? 0) > 0;
  const rangeHasTraffic = series.some((point) => point.views > 0);
  const rangeViews = series.reduce((sum, point) => sum + point.views, 0);

  const totalsCards = data
    ? [
        {
          label: 'Page Views (today)',
          value: formatNumber(data.totals.today.views),
          subtext: `${formatNumber(data.totals.today.visitors)} unique visitors today`,
          icon: <Eye className="h-4 w-4" />,
        },
        {
          label: 'Last 7 Days',
          value: formatNumber(data.totals.last7.views),
          subtext: `${formatNumber(data.totals.last7.visitors)} unique visitors`,
          icon: <Activity className="h-4 w-4" />,
        },
        {
          label: 'Last 30 Days',
          value: formatNumber(data.totals.last30.views),
          subtext: `${formatNumber(data.totals.last30.visitors)} unique visitors`,
          icon: <Activity className="h-4 w-4" />,
        },
        {
          label: 'All Time',
          value: formatNumber(data.totals.allTime.views),
          subtext: `${formatNumber(data.totals.allTime.visitors)} unique visitors`,
          icon: <UserRound className="h-4 w-4" />,
        },
      ]
    : [];

  const updatedAt = data
    ? new Date(data.generatedAt).toLocaleTimeString('en-MY', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title="Site Analytics"
          description="Page views and unique visitors on the public site. No personal data is collected."
          actions={
            <Button variant="outline" onClick={() => void load()} disabled={loading}>
              {(loading || refreshing) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Refresh
            </Button>
          }
        />

        {error && (
          <Card className="border-amber-200 bg-amber-50/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <Stethoscope className="h-4 w-4" />
                Analytics Offline
              </CardTitle>
              <CardDescription className="text-amber-800/80">{error}</CardDescription>
            </CardHeader>
          </Card>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="group"
            aria-label="Date range"
            className="inline-flex w-fit items-center gap-1 rounded-xl border bg-card/70 p-1"
          >
            {RANGE_OPTIONS.map((option) => {
              const isActive = range === option;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setRange(option)}
                  className={cn(
                    'whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  {option} days
                </button>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            {updatedAt ? `Updated ${updatedAt} · refreshes every 30s` : 'Loading…'}
          </p>
        </div>

        {loading && !data ? (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={`totals-skeleton-${index}`} className="border-none shadow-sm">
                  <CardContent className="space-y-3 pt-6">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardContent className="pt-6">
                <Skeleton className="h-[260px] w-full" />
              </CardContent>
            </Card>
          </div>
        ) : null}

        {data && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {totalsCards.map((card) => (
                <StatCard key={card.label} {...card} />
              ))}
            </div>
            {hasAnyTraffic && (
              <p className="text-xs text-muted-foreground">
                These four totals are fixed windows and do not follow the range toggle.
                The chart, the top pages and the splits below cover the last {rangeDays}{' '}
                days.
              </p>
            )}

            {!hasAnyTraffic ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center gap-3 px-6 py-14 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Activity className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">No page views recorded yet</h3>
                  <p className="max-w-md text-sm text-muted-foreground">
                    Tracking is live on the public site, but nothing has been counted so
                    far. The first visit shows up here within a minute, and the daily
                    trend fills in from tomorrow.
                  </p>
                  <p className="max-w-md text-xs text-muted-foreground">
                    Views are counted per URL path, including the Malay{' '}
                    <span className="font-mono">/ms</span> pages. Known bots are excluded
                    and rows are deleted automatically after 180 days.
                  </p>
                  <Button variant="outline" onClick={() => void load()} disabled={loading}>
                    Check again
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <Card>
                  <CardHeader className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <CardTitle>Daily trend</CardTitle>
                      <CardDescription>
                        Page views and unique visitors per day, last {rangeDays} days.
                      </CardDescription>
                    </div>
                    <ul className="flex flex-wrap items-center gap-4">
                      {TREND_SERIES_LEGEND.map((entry) => (
                        <li
                          key={entry.label}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <span
                            aria-hidden="true"
                            className="h-0.5 w-6 rounded-full"
                            style={
                              entry.dashed
                                ? {
                                    backgroundImage: `repeating-linear-gradient(to right, ${entry.color} 0 5px, transparent 5px 9px)`,
                                  }
                                : { backgroundColor: entry.color }
                            }
                          />
                          {entry.label}
                        </li>
                      ))}
                    </ul>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {rangeHasTraffic ? (
                      <>
                        <TrendChart series={series} description={chartDescription} />
                        <p className="text-xs text-muted-foreground">
                          {formatNumber(rangeViews)} views over {rangeDays} days. Peaks and
                          per-page figures are listed below, so the chart is never the only
                          way to read the numbers.
                        </p>
                      </>
                    ) : (
                      <div className="rounded-2xl border border-dashed bg-muted/30 px-6 py-10 text-center text-sm text-muted-foreground">
                        No traffic in the last {rangeDays} days. Try a wider range — the
                        all-time total above still counts{' '}
                        {formatNumber(data.totals.allTime.views)} views.
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top pages</CardTitle>
                    <CardDescription>
                      Most visited paths in the last {rangeDays} days, up to ten. Paths
                      outside the site&rsquo;s known routes are grouped as /_other.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {data.topPages.length === 0 ? (
                      <p className="rounded-2xl border border-dashed bg-muted/30 px-6 py-8 text-center text-sm text-muted-foreground">
                        No pages were visited in this range.
                      </p>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Path</TableHead>
                            <TableHead className="text-right">Views</TableHead>
                            <TableHead className="text-right">Visitors</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data.topPages.map((page) => (
                            <TableRow key={page.path}>
                              {/* w-full + max-w-0 lets the path truncate instead
                                  of pushing the counts off a narrow screen. */}
                              <TableCell className="w-full max-w-0">
                                <span
                                  title={page.path}
                                  className="block truncate font-mono text-xs"
                                >
                                  {page.path}
                                </span>
                              </TableCell>
                              <TableCell className="whitespace-nowrap text-right font-medium">
                                {formatNumber(page.views)}
                              </TableCell>
                              <TableCell className="whitespace-nowrap text-right text-muted-foreground">
                                {formatNumber(page.visitors)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Language</CardTitle>
                      <CardDescription>
                        Views by URL language prefix, last {rangeDays} days.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SplitList
                        rows={[
                          { label: 'English', value: data.localeSplit.en },
                          { label: 'Malay (/ms)', value: data.localeSplit.ms },
                        ]}
                        emptyLabel="No language data in this range."
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Device</CardTitle>
                      <CardDescription>
                        Views by device class, last {rangeDays} days.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SplitList
                        rows={[
                          { label: 'Mobile', value: data.deviceSplit.mobile },
                          { label: 'Tablet', value: data.deviceSplit.tablet },
                          { label: 'Desktop', value: data.deviceSplit.desktop },
                        ]}
                        emptyLabel="No device data in this range."
                      />
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}
