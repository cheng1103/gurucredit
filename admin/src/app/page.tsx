'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { applicationsAPI, usersAPI } from '@/lib/api';
import { Users, FileText, DollarSign, TrendingUp, Sparkles, ShieldCheck, Stethoscope } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { OFFLINE_MODE } from '@/lib/config';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Stats {
  applications: {
    total: number;
    pending: number;
    inReview: number;
    completed: number;
    rejected: number;
    revenue: number;
  };
  users: {
    total: number;
    active: number;
    admins: number;
  };
}

interface ApplicationSummary {
  id: string;
  createdAt: string;
  status: string;
  applicantName: string;
  service?: {
    name: string;
  } | null;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentApps, setRecentApps] = useState<ApplicationSummary[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
          const [appStatsResult, userStatsResult, recentResult] = await Promise.allSettled([
          applicationsAPI.getStats(),
          usersAPI.getStats(),
          applicationsAPI.getAll({ page: 1, pageSize: 10 }),
        ]);

        if (appStatsResult.status === 'fulfilled' && userStatsResult.status === 'fulfilled') {
          setStats({ applications: appStatsResult.value.data, users: userStatsResult.value.data });
          setError(null);
        } else if (!OFFLINE_MODE) {
          setError('Unable to load metrics. Please check your API service.');
        }

        if (recentResult.status === 'fulfilled') {
          const data = recentResult.value.data.data ?? recentResult.value.data;
          const sorted = [...data].sort((a, b) => (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ));
          setRecentApps(sorted.slice(0, 5));
        }
      } catch (err) {
        console.error('Failed to fetch stats', err);
        if (OFFLINE_MODE) {
          setStats({
            applications: {
              total: 24,
              pending: 5,
              inReview: 3,
              completed: 12,
              rejected: 4,
              revenue: 8600,
            },
            users: {
              total: 128,
              active: 96,
              admins: 4,
            },
          });
          setRecentApps([
            {
              id: 'demo-1',
              createdAt: new Date().toISOString(),
              status: 'PENDING',
              applicantName: 'Nur Aina',
              service: { name: 'Personal Loan' },
            },
            {
              id: 'demo-2',
              createdAt: new Date(Date.now() - 86400000).toISOString(),
              status: 'IN_REVIEW',
              applicantName: 'Jia Wei',
              service: { name: 'Home Loan' },
            },
            {
              id: 'demo-3',
              createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
              status: 'COMPLETED',
              applicantName: 'Farah Aziz',
              service: { name: 'Car Loan' },
            },
          ]);
        } else {
          setError('Unable to load metrics. Please check your API service.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const completionRate = useMemo(() => {
    if (!stats?.applications.total) return 0;
    return Math.round(
      (stats.applications.completed / stats.applications.total) * 100,
    );
  }, [stats?.applications.completed, stats?.applications.total]);

  const statCards = [
    {
      label: 'Total Applications',
      value: stats?.applications.total?.toLocaleString() ?? '—',
      subtext: `${stats?.applications.pending || 0} waiting for review`,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      label: 'Active Users',
      value: stats?.users.active?.toLocaleString() ?? '—',
      subtext: `${stats?.users.total || 0} total contacts`,
      icon: <Users className="h-4 w-4" />,
      tone: 'positive' as const,
    },
    {
      label: 'Revenue Collected',
      value: `RM ${stats?.applications.revenue?.toLocaleString() ?? '0'}`,
      icon: <DollarSign className="h-4 w-4" />,
      tone: 'premium' as const,
    },
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      subtext: `${stats?.applications.completed || 0} approved`,
      icon: <TrendingUp className="h-4 w-4" />,
    },
  ];

  const quickLinks = [
    {
      href: '/applications?status=PENDING',
      label: 'Review Pending Applications',
      metric: stats?.applications.pending || 0,
      accent: 'from-rose-500/20 to-orange-300/20 text-rose-600 dark:text-rose-200',
    },
    {
      href: '/applications?status=IN_REVIEW',
      label: 'Complete In-Review Files',
      metric: stats?.applications.inReview || 0,
      accent: 'from-indigo-500/20 to-cyan-300/20 text-indigo-600 dark:text-indigo-200',
    },
    {
      href: '/users',
      label: 'Manage Users',
      metric: stats?.users.total || 0,
      accent: 'from-emerald-500/20 to-lime-300/20 text-emerald-600 dark:text-emerald-200',
    },
    {
      href: '/services',
      label: 'Update Services',
      metric: stats?.applications.total ? 'View' : 'Edit',
      accent: 'from-amber-400/25 to-yellow-200/20 text-amber-600 dark:text-amber-200',
    },
  ];

  const statusMetrics = [
    { label: 'Pending', value: stats?.applications.pending || 0, badge: 'PENDING' },
    { label: 'In Review', value: stats?.applications.inReview || 0, badge: 'IN_REVIEW' },
    { label: 'Completed', value: stats?.applications.completed || 0, badge: 'COMPLETED' },
    { label: 'Rejected', value: stats?.applications.rejected || 0, badge: 'REJECTED' },
  ];

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('en-MY', { day: '2-digit', month: 'short' });

  return (
    <AdminLayout>
      <div className="space-y-8">
        <PageHeader
          title="Command Center"
          description="Keep an eye on applications, revenue, and team performance."
          actions={
            <div className="flex items-center gap-2">
              <Button asChild variant="outline">
                <Link href="/applications">View pipeline</Link>
              </Button>
              <Button asChild>
                <Link href="/applications?status=PENDING">Add new application</Link>
              </Button>
            </div>
          }
        />

        {error && (
          <Card className="border-amber-200 bg-amber-50/80 dark:bg-amber-500/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-700">
                <Stethoscope className="h-4 w-4" />
                Metrics Offline
              </CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <Card key={`skeleton-${idx}`} className="border-none shadow-sm">
                  <CardContent className="space-y-3 pt-6">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </CardContent>
                </Card>
              ))
            : statCards.map((card) => (
                <StatCard key={card.label} {...card} />
              ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Pipeline status</CardTitle>
                <CardDescription>
                  Track all application states across the funnel
                </CardDescription>
              </div>
              <Button variant="outline" asChild>
                <Link href="/applications">Go to applications</Link>
              </Button>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {statusMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center justify-between rounded-2xl border bg-muted/40 px-4 py-3"
                >
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-semibold">{metric.value}</p>
                  </div>
                  <StatusBadge status={metric.badge} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white via-white to-indigo-50/40 shadow-lg dark:from-slate-900/80 dark:via-slate-900 dark:to-indigo-950/30">
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
              <CardDescription>Jump into frequent admin workflows.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickLinks.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className={cn(
                    'flex items-center justify-between rounded-2xl border border-white/40 bg-gradient-to-r px-5 py-4 text-sm font-medium shadow-sm transition hover:scale-[1.01] dark:border-white/10',
                    action.accent,
                  )}
                >
                  <span>{action.label}</span>
                  <span className="text-sm font-semibold text-muted-foreground">
                    {action.metric}
                  </span>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Performance insights
              </CardTitle>
              <CardDescription>Automatic recommendations from your data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-2xl border bg-muted/40 p-3">
                <p className="font-medium">Focus on pending reviews</p>
                <p className="text-muted-foreground">
                  An average review now takes 2.3 days. Completing the pending queue today
                  will unlock RM {(stats?.applications.pending || 0) * 350} in service fees.
                </p>
              </div>
              <div className="rounded-2xl border bg-muted/40 p-3">
                <p className="font-medium">Grow your user base</p>
                <p className="text-muted-foreground">
                  {stats?.users.admins || 0} admins currently handle{' '}
                  {stats?.applications.total || 0} total files. Invite another analyst to
                  keep SLAs healthy.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Reliability checklist
              </CardTitle>
              <CardDescription>Ensure operations stay predictable.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                'Confirm automated reminders fire daily at 9am',
                'Sync completed cases with accounting export',
                'Share weekly update with partners',
              ].map((item) => (
                <label key={item} className="flex items-start gap-3 text-sm">
                  <input type="checkbox" className="mt-1" />
                  <span>{item}</span>
                </label>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Recent applications</CardTitle>
              <CardDescription>Newest submissions waiting in the pipeline.</CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link href="/applications">View all</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentApps.length === 0 ? (
              <div className="rounded-2xl border border-dashed bg-muted/30 p-6 text-sm text-muted-foreground">
                No recent applications found yet.
              </div>
            ) : (
              recentApps.map((app) => (
                <Link
                  key={app.id}
                  href={`/applications/${app.id}`}
                  className="flex items-center justify-between rounded-2xl border bg-muted/40 px-4 py-3 text-sm transition hover:bg-muted/60"
                >
                  <div>
                    <p className="font-medium text-foreground">{app.applicantName}</p>
                    <p className="text-xs text-muted-foreground">
                      {app.service?.name ?? 'Loan application'} · {formatDate(app.createdAt)}
                    </p>
                  </div>
                  <StatusBadge status={app.status} />
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        {!stats && !loading && (
          <EmptyState
            icon={<ShieldCheck className="h-5 w-5" />}
            title="No data yet"
            description="As soon as applications start flowing in, this view will light up."
            action={{
              label: 'Create application',
              onClick: () => window.open('/applications', '_self'),
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}
