'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { AnalyticsSeriesPoint } from '@/lib/api';

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/** "2026-10-06" -> "6 Oct". Plain string work, so no timezone shifting. */
export function formatDayLabel(dayKey: string): string {
  const [, month, day] = dayKey.split('-');
  const monthLabel = MONTH_LABELS[Number(month) - 1];
  if (!monthLabel || !day) return dayKey;
  return `${Number(day)} ${monthLabel}`;
}

const VIEWS_COLOR = '#6c47ff';
const VISITORS_COLOR = '#0f9488';

interface TrendChartProps {
  series: AnalyticsSeriesPoint[];
  /** Spoken description of the chart for screen readers. */
  description: string;
}

export function TrendChart({ series, description }: TrendChartProps) {
  const rows = series.map((point) => ({
    ...point,
    label: formatDayLabel(point.date),
  }));

  return (
    <div
      className="h-[260px] w-full"
      role="img"
      aria-label={description}
      data-testid="analytics-trend-chart"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={rows} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="rgba(15, 23, 42, 0.1)"
          />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            minTickGap={28}
            interval="preserveStartEnd"
            tick={{ fontSize: 11, fill: '#6b7280' }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={48}
            allowDecimals={false}
            tick={{ fontSize: 11, fill: '#6b7280' }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: '1px solid rgba(15, 23, 42, 0.08)',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.12)',
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="views"
            name="Page views"
            stroke={VIEWS_COLOR}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="visitors"
            name="Unique visitors"
            stroke={VISITORS_COLOR}
            strokeWidth={2}
            strokeDasharray="5 4"
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export const TREND_SERIES_LEGEND = [
  { label: 'Page views', color: VIEWS_COLOR, dashed: false },
  { label: 'Unique visitors', color: VISITORS_COLOR, dashed: true },
];
