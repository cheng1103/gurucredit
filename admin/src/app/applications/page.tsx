'use client';

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { applicationsAPI } from '@/lib/api';
import { SERVICE_AREA_FILTERS, formatServiceArea } from '@/lib/serviceAreas';
import { toast } from 'sonner';
import { Search, Eye, Edit, Loader2, Filter, AlertTriangle, Download, Phone, Mail, MapPin, Target, Calendar, User as UserIcon, Copy } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { EmptyState } from '@/components/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination } from '@/components/Pagination';

interface Application {
  id: string;
  status: string;
  createdAt: string;
  followUpAt?: string | null;
  followUpStatus?: string | null;
  serviceArea: string;
  monthlyIncome?: number;
  existingDebts?: number;
  loanAmount?: number;
  dsrPercentage?: number;
  approvalChance?: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  loanPurpose?: string;
  referralSource?: string;
  contactPreference?: string;
  service: {
    name: string;
    type: string;
  };
  user?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  } | null;
}

const OVERDUE_THRESHOLD_HOURS = 24;
const FOLLOW_UP_SOON_HOURS = 24;

function ApplicationsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [totalApplications, setTotalApplications] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [areaFilter, setAreaFilter] = useState(searchParams.get('serviceArea') || 'all');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showAnalysisDialog, setShowAnalysisDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportFields, setExportFields] = useState<string[]>([
    'applicant',
    'email',
    'phone',
    'service',
    'serviceArea',
    'status',
    'income',
    'loanAmount',
    'createdAt',
  ]);
  const [analysisData, setAnalysisData] = useState({
    dsrPercentage: 0,
    creditScore: 650,
    approvalChance: 'medium',
    maxLoanAmount: 0,
    recommendations: '',
    issues: '',
    adminNotes: '',
  });

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await applicationsAPI.getAll({
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: search || undefined,
        serviceArea: areaFilter !== 'all' ? areaFilter : undefined,
        page,
        pageSize,
      });
      const payload = response.data;
      setApplications(payload.data ?? payload);
      setTotalApplications(payload.total ?? payload.length ?? 0);
    } catch {
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, areaFilter, page, pageSize]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  useEffect(() => {
    setSelectedIds([]);
    setPage(1);
  }, [search, statusFilter, areaFilter]);

  const handleSearch = () => {
    fetchApplications();
  };

  const handleSubmitAnalysis = async () => {
    if (!selectedApp) return;

    setSubmitting(true);
    try {
      await applicationsAPI.submitAnalysis(selectedApp.id, {
        dsrPercentage: analysisData.dsrPercentage,
        creditScore: analysisData.creditScore,
        approvalChance: analysisData.approvalChance,
        maxLoanAmount: analysisData.maxLoanAmount,
        recommendations: analysisData.recommendations.split('\n').filter(Boolean),
        issues: analysisData.issues.split('\n').filter(Boolean),
        adminNotes: analysisData.adminNotes,
      });
      toast.success('Analysis submitted');
      setShowAnalysisDialog(false);
      fetchApplications();
    } catch {
      toast.error('Failed to submit analysis');
    } finally {
      setSubmitting(false);
    }
  };

  const openAnalysisDialog = (app: Application) => {
    setSelectedApp(app);
    setAnalysisData({
      dsrPercentage: app.existingDebts && app.monthlyIncome
        ? Math.round((app.existingDebts / app.monthlyIncome) * 100 * 100) / 100
        : 0,
      creditScore: 650,
      approvalChance: 'medium',
      maxLoanAmount: app.loanAmount || 0,
      recommendations: '',
      issues: '',
      adminNotes: '',
    });
    setShowAnalysisDialog(true);
  };

  const summaryMetrics = useMemo(() => {
    const total = totalApplications;
    const pending = applications.filter((a) => a.status === 'PENDING').length;
    const inReview = applications.filter((a) => a.status === 'IN_REVIEW').length;
    const completed = applications.filter((a) => a.status === 'COMPLETED').length;
    const overdue = applications.filter((app) => {
      if (!['PENDING', 'IN_REVIEW'].includes(app.status)) return false;
      const created = new Date(app.createdAt).getTime();
      return Date.now() - created > OVERDUE_THRESHOLD_HOURS * 60 * 60 * 1000;
    }).length;
    return [
      { label: 'Total in view', value: total },
      { label: 'Pending review', value: pending },
      { label: 'In analysis', value: inReview },
      { label: 'Completed', value: completed },
      { label: 'Need follow-up', value: overdue },
    ];
  }, [applications]);

  const allSelected = applications.length > 0 && selectedIds.length === applications.length;
  const toggleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? applications.map((app) => app.id) : []);
  };
  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id],
    );
  };

  const handleBulkStatus = async (status: string) => {
    if (selectedIds.length === 0) {
      toast.error('Select at least one application');
      return;
    }
    if (!confirm(`Update ${selectedIds.length} application(s) to ${status}?`)) {
      return;
    }
    setBulkLoading(true);
    try {
      const results = await Promise.allSettled(
        selectedIds.map((id) => applicationsAPI.updateStatus(id, { status })),
      );
      const failures = results.filter((result) => result.status === 'rejected').length;
      if (failures > 0) {
        toast.error(`${failures} application(s) failed to update`);
      } else {
        toast.success('Applications updated');
      }
      fetchApplications();
    } finally {
      setBulkLoading(false);
    }
  };

  const exportCsv = (fields = exportFields) => {
    if (applications.length === 0) {
      toast.error('No applications to export');
      return;
    }
    const rows = selectedIds.length > 0
      ? applications.filter((app) => selectedIds.includes(app.id))
      : applications;
    const columns = [
      { key: 'applicant', label: 'Applicant', value: (app: Application) => getContactName(app) },
      { key: 'email', label: 'Email', value: (app: Application) => getContactEmail(app) },
      { key: 'phone', label: 'Phone', value: (app: Application) => app.applicantPhone || '' },
      { key: 'service', label: 'Service', value: (app: Application) => app.service.name },
      { key: 'serviceArea', label: 'Service Area', value: (app: Application) => formatServiceArea(app.serviceArea) },
      { key: 'status', label: 'Status', value: (app: Application) => app.status },
      { key: 'income', label: 'Income', value: (app: Application) => app.monthlyIncome || '' },
      { key: 'loanAmount', label: 'Loan Amount', value: (app: Application) => app.loanAmount || '' },
      { key: 'dsr', label: 'DSR %', value: (app: Application) => app.dsrPercentage ?? '' },
      { key: 'approvalChance', label: 'Approval Chance', value: (app: Application) => app.approvalChance || '' },
      { key: 'createdAt', label: 'Created At', value: (app: Application) => new Date(app.createdAt).toISOString() },
    ];
    const selectedColumns = columns.filter((column) => fields.includes(column.key));
    if (selectedColumns.length === 0) {
      toast.error('Select at least one export field');
      return;
    }
    const toCsvValue = (value: unknown) => {
      const text = String(value ?? '');
      return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
    };
    const csv = [
      selectedColumns.map((column) => column.label).join(','),
      ...rows.map((app) =>
        selectedColumns
          .map((column) => toCsvValue(column.value(app)))
          .join(','),
      ),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `applications-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const isOverdue = useCallback((app: Application, now: number) => {
    if (!['PENDING', 'IN_REVIEW'].includes(app.status)) return false;
    const created = new Date(app.createdAt).getTime();
    return now - created > OVERDUE_THRESHOLD_HOURS * 60 * 60 * 1000;
  }, []);

  const followUpMeta = useCallback((app: Application, now: number) => {
    if (!app.followUpAt || app.followUpStatus === 'DONE') {
      return { overdue: false, soon: false };
    }
    const followUpTime = new Date(app.followUpAt).getTime();
    const diff = followUpTime - now;
    return {
      overdue: diff < 0,
      soon: diff >= 0 && diff <= FOLLOW_UP_SOON_HOURS * 60 * 60 * 1000,
    };
  }, []);

  const sortedApplications = useMemo(() => {
    const now = Date.now();
    return [...applications].sort((a, b) => {
      const overdueA = isOverdue(a, now);
      const overdueB = isOverdue(b, now);
      const followA = followUpMeta(a, now);
      const followB = followUpMeta(b, now);
      if (followA.overdue !== followB.overdue) return followA.overdue ? -1 : 1;
      if (followA.soon !== followB.soon) return followA.soon ? -1 : 1;
      if (overdueA !== overdueB) return overdueA ? -1 : 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [applications, isOverdue, followUpMeta]);

  const getContactName = (app: Application) => app.user?.name ?? app.applicantName;
  const getContactEmail = (app: Application) => app.user?.email ?? app.applicantEmail;
  const contactPreferenceLabels: Record<string, string> = {
    any: 'Anytime',
    morning: 'Morning (9am-12pm)',
    afternoon: 'Afternoon (12pm-4pm)',
    evening: 'Evening (4pm-8pm)',
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title="Applications"
          description="Track every consultation request from submission to completion."
          actions={
            <Button variant="outline" onClick={fetchApplications} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Refresh
            </Button>
          }
        />

        {!loading && applications.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {summaryMetrics.map((metric) => (
              <Card key={metric.label} className="bg-gradient-to-br from-white to-indigo-50/60 shadow-sm dark:from-slate-900 dark:to-indigo-950/20">
                <CardContent className="pt-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{metric.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card className="shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Filter className="h-4 w-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex flex-1 items-center gap-2">
              <Input
                placeholder="Search by client name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button variant="outline" onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col gap-2 md:w-[200px]">
              <Label className="text-xs uppercase text-muted-foreground">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="IN_REVIEW">In Review</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1 md:w-[220px]">
              <Label className="text-xs uppercase text-muted-foreground">Service Area</Label>
              <Select value={areaFilter} onValueChange={setAreaFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Area" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_AREA_FILTERS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-[11px] text-muted-foreground">Focus on Kuala Lumpur & Selangor leads</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-base font-semibold">Bulk actions</CardTitle>
            <p className="text-xs text-muted-foreground">
              {selectedIds.length} selected in current view
            </p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => handleBulkStatus('IN_REVIEW')}
              disabled={bulkLoading}
            >
              Mark In Review
            </Button>
            <Button
              variant="outline"
              onClick={() => handleBulkStatus('COMPLETED')}
              disabled={bulkLoading}
            >
              Mark Completed
            </Button>
            <Button
              variant="outline"
              onClick={() => handleBulkStatus('REJECTED')}
              disabled={bulkLoading}
            >
              Mark Rejected
            </Button>
            <Button variant="outline" onClick={() => setShowExportDialog(true)} disabled={bulkLoading}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </CardContent>
        </Card>

        {applications.length > 0 && (
          <div className="flex items-center gap-3 px-1 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => toggleSelectAll(e.target.checked)}
              aria-label="Select all applications"
              className="h-4 w-4"
            />
            <span>Select all {applications.length} on this page</span>
          </div>
        )}

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={`loading-${idx}`} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        ) : applications.length === 0 ? (
          <Card>
            <CardContent className="py-10">
              <EmptyState
                title="No applications found"
                description="Try adjusting your filters or check back later."
                action={{
                  label: 'Reset filters',
                  onClick: () => {
                    setStatusFilter('all');
                    setSearch('');
                    setAreaFilter('all');
                    fetchApplications();
                  },
                  variant: 'outline',
                }}
              />
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sortedApplications.map((app) => {
              const overdue = isOverdue(app, Date.now());
              const follow = followUpMeta(app, Date.now());
              const phone = app.applicantPhone?.trim();
              const phoneDigits = phone?.replace(/[^\d+]/g, '') ?? '';
              const whatsappLink = phoneDigits
                ? `https://wa.me/${phoneDigits.replace(/^\+/, '')}`
                : null;
              return (
                <Card
                  key={app.id}
                  className={`group relative overflow-hidden border shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                    overdue ? 'border-amber-300 bg-amber-50/40 dark:bg-amber-900/10' : 'border-border/70'
                  }`}
                >
                  {/* Accent stripe by status */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 w-1 ${
                      app.status === 'COMPLETED'
                        ? 'bg-emerald-500'
                        : app.status === 'IN_REVIEW'
                          ? 'bg-blue-500'
                          : app.status === 'REJECTED'
                            ? 'bg-rose-500'
                            : 'bg-amber-500'
                    }`}
                  />
                  <CardContent className="space-y-4 p-5 pl-6">
                    {/* Header: checkbox + name + status */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(app.id)}
                          onChange={() => toggleSelection(app.id)}
                          aria-label={`Select application ${getContactName(app)}`}
                          className="mt-1 h-4 w-4 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <UserIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                            <p className="truncate text-base font-semibold">
                              {getContactName(app)}
                            </p>
                          </div>
                          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(app.createdAt).toLocaleDateString('en-MY', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={app.status} />
                    </div>

                    {/* Contact block — highlighted for easy screenshot */}
                    <div className="rounded-lg border border-border/60 bg-background p-3 space-y-2 text-sm">
                      {phone && (
                        <div className="flex items-center justify-between gap-2">
                          <a
                            href={`tel:${phoneDigits}`}
                            className="flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            <Phone className="h-4 w-4 text-emerald-600" />
                            <span className="tabular-nums">{phone}</span>
                          </a>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(phone);
                                toast.success('Phone copied');
                              }}
                              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                              aria-label="Copy phone number"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </button>
                            {whatsappLink && (
                              <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white hover:bg-emerald-500"
                              >
                                WA
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                      {getContactEmail(app) && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Mail className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{getContactEmail(app)}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span>{formatServiceArea(app.serviceArea)}</span>
                      </div>
                    </div>

                    {/* Loan ask */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-lg border border-border/60 bg-background p-3">
                        <p className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                          <Target className="h-3 w-3" />
                          Loan Purpose
                        </p>
                        <p className="mt-1 text-sm font-semibold leading-tight break-words">
                          {app.loanPurpose || '—'}
                        </p>
                      </div>
                      <div className="rounded-lg border border-border/60 bg-background p-3">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Loan Amount
                        </p>
                        <p className="mt-1 text-sm font-semibold tabular-nums">
                          {app.loanAmount ? `RM ${app.loanAmount.toLocaleString()}` : '—'}
                        </p>
                      </div>
                    </div>

                    {/* Secondary info */}
                    {(app.monthlyIncome || app.referralSource || app.contactPreference) && (
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                        {app.monthlyIncome ? (
                          <span>
                            Income:{' '}
                            <span className="font-semibold text-foreground tabular-nums">
                              RM {app.monthlyIncome.toLocaleString()}
                            </span>
                          </span>
                        ) : null}
                        {app.referralSource && <span>Src: {app.referralSource}</span>}
                        {app.contactPreference && (
                          <span>
                            {contactPreferenceLabels[app.contactPreference] ||
                              app.contactPreference}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Status chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {overdue && (
                        <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Follow up overdue
                        </Badge>
                      )}
                      {!overdue && ['PENDING', 'IN_REVIEW'].includes(app.status) && (
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          SLA on track
                        </Badge>
                      )}
                      {app.followUpAt && (
                        <Badge
                          variant="secondary"
                          className={
                            follow.overdue
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : follow.soon
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-muted'
                          }
                        >
                          {follow.overdue ? 'Overdue: ' : follow.soon ? 'Due soon: ' : 'Follow-up: '}
                          {new Date(app.followUpAt).toLocaleDateString('en-MY', {
                            day: '2-digit',
                            month: 'short',
                          })}
                        </Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t border-border/50">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/applications/${app.id}`)}
                        className="flex-1"
                      >
                        <Eye className="mr-1 h-4 w-4" />
                        View
                      </Button>
                      {(app.status === 'PENDING' || app.status === 'IN_REVIEW') && (
                        <Button size="sm" onClick={() => openAnalysisDialog(app)} className="flex-1">
                          <Edit className="mr-1 h-4 w-4" />
                          Analyze
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <Pagination
          page={page}
          pageSize={pageSize}
          total={totalApplications}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
        />

        {/* Analysis Dialog */}
        <Dialog open={showAnalysisDialog} onOpenChange={setShowAnalysisDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit Analysis</DialogTitle>
              <DialogDescription>
                Complete the analysis for {selectedApp ? getContactName(selectedApp) : ''}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label>DSR Percentage</Label>
                <Input
                  type="number"
                  value={analysisData.dsrPercentage}
                  onChange={(e) => setAnalysisData({ ...analysisData, dsrPercentage: parseFloat(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Credit Score</Label>
                <Input
                  type="number"
                  value={analysisData.creditScore}
                  onChange={(e) => setAnalysisData({ ...analysisData, creditScore: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Approval Chance</Label>
                <Select
                  value={analysisData.approvalChance}
                  onValueChange={(v) => setAnalysisData({ ...analysisData, approvalChance: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="very_low">Very Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Max Loan Amount (RM)</Label>
                <Input
                  type="number"
                  value={analysisData.maxLoanAmount}
                  onChange={(e) => setAnalysisData({ ...analysisData, maxLoanAmount: parseFloat(e.target.value) })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Recommendations (one per line)</Label>
                <Textarea
                  value={analysisData.recommendations}
                  onChange={(e) => setAnalysisData({ ...analysisData, recommendations: e.target.value })}
                  placeholder="Consider Maybank for best rates&#10;Extend loan tenure to reduce DSR"
                  rows={3}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Issues (one per line)</Label>
                <Textarea
                  value={analysisData.issues}
                  onChange={(e) => setAnalysisData({ ...analysisData, issues: e.target.value })}
                  placeholder="High DSR ratio&#10;Short employment history"
                  rows={3}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Admin Notes</Label>
                <Textarea
                  value={analysisData.adminNotes}
                  onChange={(e) => setAnalysisData({ ...analysisData, adminNotes: e.target.value })}
                  placeholder="Internal notes..."
                  rows={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAnalysisDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitAnalysis} disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Analysis
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Export applications</DialogTitle>
              <DialogDescription>Select the fields to include in the CSV export.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 py-2 text-sm">
              {[
                { key: 'applicant', label: 'Applicant' },
                { key: 'email', label: 'Email' },
                { key: 'phone', label: 'Phone' },
                { key: 'service', label: 'Service' },
                { key: 'serviceArea', label: 'Service area' },
                { key: 'status', label: 'Status' },
                { key: 'income', label: 'Monthly income' },
                { key: 'loanAmount', label: 'Loan amount' },
                { key: 'dsr', label: 'DSR %' },
                { key: 'approvalChance', label: 'Approval chance' },
                { key: 'createdAt', label: 'Created at' },
              ].map((field) => (
                <label key={field.key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={exportFields.includes(field.key)}
                    onChange={(event) => {
                      setExportFields((prev) =>
                        event.target.checked
                          ? [...prev, field.key]
                          : prev.filter((value) => value !== field.key),
                      );
                    }}
                  />
                  <span>{field.label}</span>
                </label>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowExportDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  exportCsv(exportFields);
                  setShowExportDialog(false);
                }}
              >
                Export
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

export default function ApplicationsPage() {
  return (
    <Suspense fallback={
      <AdminLayout>
        <div className="space-y-6">
          <div className="h-8 w-64 animate-pulse rounded bg-muted" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="h-24 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
          <div className="h-96 animate-pulse rounded-lg bg-muted" />
        </div>
      </AdminLayout>
    }>
      <ApplicationsPageContent />
    </Suspense>
  );
}
