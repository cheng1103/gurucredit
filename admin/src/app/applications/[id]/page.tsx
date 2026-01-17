'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/AdminLayout';
import { applicationsAPI, auditLogsAPI } from '@/lib/api';
import { formatServiceArea } from '@/lib/serviceAreas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { maskIc, maskPhone } from '@/lib/utils';
import {
  AlertCircle,
  ArrowLeft,
  Banknote,
  CalendarClock,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  Mail,
  MessageSquare,
  NotebookPen,
  Phone,
  UserRound,
  Wallet2,
  ClipboardList,
  MapPin,
} from 'lucide-react';

interface ApplicationDetail {
  id: string;
  status: string;
  createdAt: string;
  completedAt?: string;
  serviceArea: string;
  monthlyIncome?: number;
  existingDebts?: number;
  employmentType?: string;
  employerName?: string;
  yearsEmployed?: number;
  loanAmount?: number;
  loanPurpose?: string;
  loanTenure?: number;
  dsrPercentage?: number;
  creditScore?: number;
  approvalChance?: string;
  maxLoanAmount?: number;
  recommendations?: string[];
  issues?: string[];
  notes?: string;
  adminNotes?: string;
  followUpAt?: string | null;
  followUpNotes?: string | null;
  followUpStatus?: string | null;
  contactPreference?: string;
  referralSource?: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  applicantIcNumber?: string;
  service: {
    id: string;
    name: string;
    type: string;
    features?: string[];
  };
  user?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    icNumber?: string;
  } | null;
  documents: Array<{
    id: string;
    fileName: string;
    fileUrl: string;
    fileType: string;
    uploadedAt: string;
  }>;
  payments: Array<{
    id: string;
    amount: number;
    status: string;
    paymentMethod?: string;
    transactionId?: string;
    createdAt: string;
    paidAt?: string;
  }>;
}

interface AuditLogEntry {
  id: string;
  action: string;
  actorName?: string | null;
  actor?: { name?: string | null } | null;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  IN_REVIEW: 'bg-blue-100 text-blue-800',
  APPROVED: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-emerald-100 text-emerald-800',
  REJECTED: 'bg-red-100 text-red-800',
};

const statusOptions = ['PENDING', 'IN_REVIEW', 'APPROVED', 'COMPLETED', 'REJECTED'];

const formatCurrency = (value?: number | null) => {
  if (!value) return 'RM 0';
  return `RM ${value.toLocaleString()}`;
};

const ensureStringArray = (value?: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
  }
  return [];
};

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [application, setApplication] = useState<ApplicationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [adminNotesDraft, setAdminNotesDraft] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [followUpDraft, setFollowUpDraft] = useState({
    followUpAt: '',
    followUpNotes: '',
    followUpStatus: 'OPEN',
  });
  const [savingFollowUp, setSavingFollowUp] = useState(false);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [contactLogDraft, setContactLogDraft] = useState({
    channel: 'PHONE',
    outcome: 'CONNECTED',
    notes: '',
  });
  const [savingContactLog, setSavingContactLog] = useState(false);

  const recommendations = useMemo(
    () => ensureStringArray(application?.recommendations),
    [application?.recommendations],
  );

  const issues = useMemo(
    () => ensureStringArray(application?.issues),
    [application?.issues],
  );

  useEffect(() => {
    const fetchApplication = async () => {
      if (!id) return;
      try {
        const response = await applicationsAPI.getOne(id);
        setApplication(response.data);
      } catch {
        toast.error('Failed to load application details');
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const fetchLogs = async () => {
    if (!application?.id) return;
    try {
      const response = await auditLogsAPI.getAll({
        targetType: 'Application',
        targetId: application.id,
        page: 1,
        pageSize: 20,
      });
      const payload = response.data;
      setAuditLogs(payload.data ?? payload);
    } catch {
      setAuditLogs([]);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [application?.id]);

  useEffect(() => {
    setAdminNotesDraft(application?.adminNotes ?? '');
  }, [application?.id]);

  useEffect(() => {
    setFollowUpDraft({
      followUpAt: application?.followUpAt
        ? new Date(application.followUpAt).toISOString().slice(0, 16)
        : '',
      followUpNotes: application?.followUpNotes ?? '',
      followUpStatus: application?.followUpStatus ?? 'OPEN',
    });
  }, [application?.id]);

  const handleStatusChange = async (value: string) => {
    if (!application || value === application.status) return;

    setStatusLoading(true);
    try {
      await applicationsAPI.updateStatus(application.id, { status: value });
      setApplication({ ...application, status: value });
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    } finally {
      setStatusLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!application) return;
    setSavingNotes(true);
    try {
      await applicationsAPI.updateStatus(application.id, {
        status: application.status,
        adminNotes: adminNotesDraft.trim(),
      });
      setApplication({ ...application, adminNotes: adminNotesDraft.trim() });
      toast.success('Admin notes updated');
      fetchLogs();
    } catch {
      toast.error('Failed to update admin notes');
    } finally {
      setSavingNotes(false);
    }
  };

  const handleSaveFollowUp = async () => {
    if (!application) return;
    setSavingFollowUp(true);
    try {
      await applicationsAPI.updateFollowUp(application.id, {
        followUpAt: followUpDraft.followUpAt,
        followUpNotes: followUpDraft.followUpNotes,
        followUpStatus: followUpDraft.followUpStatus,
      });
      setApplication({
        ...application,
        followUpAt: followUpDraft.followUpAt ? new Date(followUpDraft.followUpAt).toISOString() : null,
        followUpNotes: followUpDraft.followUpNotes,
        followUpStatus: followUpDraft.followUpStatus,
      });
      toast.success('Follow-up updated');
      fetchLogs();
    } catch {
      toast.error('Failed to update follow-up');
    } finally {
      setSavingFollowUp(false);
    }
  };

  const handleLogContact = async () => {
    if (!application) return;
    setSavingContactLog(true);
    try {
      await applicationsAPI.logContact(application.id, {
        channel: contactLogDraft.channel,
        outcome: contactLogDraft.outcome,
        notes: contactLogDraft.notes || undefined,
      });
      toast.success('Contact log saved');
      setContactLogDraft({ channel: 'PHONE', outcome: 'CONNECTED', notes: '' });
      fetchLogs();
    } catch {
      toast.error('Failed to save contact log');
    } finally {
      setSavingContactLog(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  if (!application) {
    return (
      <AdminLayout>
        <div className="flex h-[70vh] flex-col items-center justify-center space-y-4 text-center">
          <AlertCircle className="h-10 w-10 text-muted-foreground" />
          <div>
            <p className="text-lg font-semibold">Application not found</p>
            <p className="text-muted-foreground">It may have been removed or you do not have access.</p>
          </div>
          <Button onClick={() => router.push('/applications')}>Back to Applications</Button>
        </div>
      </AdminLayout>
    );
  }

  const contactName = application.user?.name ?? application.applicantName;
  const contactEmail = application.user?.email ?? application.applicantEmail;
  const contactPhone = application.user?.phone ?? application.applicantPhone;
  const contactPreferenceLabels: Record<string, string> = {
    any: 'Anytime',
    morning: 'Morning (9am-12pm)',
    afternoon: 'Afternoon (12pm-4pm)',
    evening: 'Evening (4pm-8pm)',
  };
  const contactPreferenceLabel = application.contactPreference
    ? contactPreferenceLabels[application.contactPreference] ?? application.contactPreference
    : null;
  const areaLabel = formatServiceArea(application.serviceArea);
  const missingFields = [
    !application.monthlyIncome ? 'Monthly income' : null,
    !application.existingDebts ? 'Existing debts' : null,
    !application.loanAmount ? 'Requested loan amount' : null,
    !application.loanPurpose ? 'Loan purpose' : null,
    !application.loanTenure ? 'Loan tenure' : null,
    !application.employmentType ? 'Employment type' : null,
    !application.employerName ? 'Employer name' : null,
    application.yearsEmployed === undefined ? 'Years employed' : null,
    !contactPhone ? 'Phone number' : null,
    !application.applicantIcNumber && !application.user?.icNumber ? 'IC number' : null,
  ].filter(Boolean) as string[];
  const hasDocuments = application.documents.length > 0;
  const hasPayments = application.payments.length > 0;
  const whatsappNumber = contactPhone ? contactPhone.replace(/[^0-9]/g, '') : '';
  const emailBody = encodeURIComponent(
    `Hi ${contactName},\n\nWe are reviewing your ${application.service.name} application. Let us know a good time to call you.\n\nThank you,\nGURU Credits Team`,
  );
  const whatsappBody = encodeURIComponent(
    `Hi ${contactName}, we are reviewing your ${application.service.name} application. Let us know a good time to call you.`,
  );
  const lastFollowUpLog = auditLogs.find((log) => log.action === 'application.follow_up_updated');
  const lastNotesLog = auditLogs.find((log) => log.action === 'application.status_updated');
  const lastContactLog = auditLogs.find((log) => log.action === 'application.contact_logged');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button
            variant="ghost"
            className="px-0 text-muted-foreground hover:text-foreground"
            onClick={() => router.push('/applications')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Applications
          </Button>
        </div>

        <PageHeader
          title="Application Details"
          description={`${application.service.name} • ${contactName}`}
          actions={(
            <div className="flex items-center gap-3">
              <Badge className={statusColors[application.status] || 'bg-gray-100 text-gray-800'}>
                {application.status}
              </Badge>
              <Select value={application.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[170px]">
                  <SelectValue placeholder="Update status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {statusLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
            </div>
          )}
        />

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle>Overview</CardTitle>
            <p className="text-sm text-muted-foreground">Key highlights for this consultation</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Applicant</p>
                <div className="flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{contactName}</p>
                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {contactEmail}
                      </div>
                      {contactPhone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          {maskPhone(contactPhone)}
                        </div>
                      )}
                      {(application.applicantIcNumber || application.user?.icNumber) && (
                        <div className="flex items-center gap-2">
                          <UserRound className="h-3 w-3" />
                          {maskIc(application.applicantIcNumber || application.user?.icNumber)}
                        </div>
                      )}
                      {(application.referralSource || contactPreferenceLabel) && (
                        <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                          {application.referralSource && (
                            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                              {application.referralSource}
                            </span>
                          )}
                          {contactPreferenceLabel && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                              Pref: {contactPreferenceLabel}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Service</p>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{application.service.name}</p>
                    <p className="text-sm text-muted-foreground">{application.service.type.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{areaLabel}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Timeline</p>
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{new Date(application.createdAt).toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">
                      {application.completedAt ? `Completed ${new Date(application.completedAt).toLocaleDateString()}` : 'In progress'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Financial Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Income</p>
                  <p className="text-lg font-semibold">{formatCurrency(application.monthlyIncome)}</p>
                </div>
                <Wallet2 className="h-5 w-5 text-muted-foreground" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Existing Debts</p>
                  <p className="text-lg font-semibold">{formatCurrency(application.existingDebts)}</p>
                </div>
                <Banknote className="h-5 w-5 text-muted-foreground" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Requested Loan</p>
                  <p className="text-lg font-semibold">{formatCurrency(application.loanAmount)}</p>
                </div>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Employment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Employment Type</p>
                <p className="font-medium">{application.employmentType || '—'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Employer</p>
                <p className="font-medium">{application.employerName || '—'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Years Employed</p>
                <p className="font-medium">{application.yearsEmployed ?? '—'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Loan Purpose</p>
                <p className="font-medium">{application.loanPurpose || '—'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Loan Tenure</p>
                <p className="font-medium">
                  {application.loanTenure ? `${application.loanTenure} years` : '—'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">DSR %</p>
                  <p className="text-lg font-semibold">
                    {application.dsrPercentage ? `${application.dsrPercentage.toFixed(2)}%` : '—'}
                  </p>
                </div>
                <ClipboardList className="h-5 w-5 text-muted-foreground" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Credit Score</p>
                  <p className="text-lg font-semibold">{application.creditScore || '—'}</p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approval Chance</p>
                  <p className="text-lg font-semibold capitalize">{application.approvalChance || '—'}</p>
                </div>
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Max Loan Amount</p>
                  <p className="text-lg font-semibold">{formatCurrency(application.maxLoanAmount)}</p>
                </div>
                <Wallet2 className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Contact actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild>
                  <a href={`mailto:${contactEmail}?subject=Loan%20Application%20Update&body=${emailBody}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email template
                  </a>
                </Button>
                <Button variant="outline" asChild disabled={!contactPhone}>
                  <a href={contactPhone ? `tel:${contactPhone}` : '#'} aria-disabled={!contactPhone}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call client
                  </a>
                </Button>
                <Button variant="outline" asChild disabled={!whatsappNumber}>
                  <a
                    href={whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${whatsappBody}` : '#'}
                    target="_blank"
                    rel="noreferrer"
                    aria-disabled={!whatsappNumber}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    WhatsApp template
                  </a>
                </Button>
              </div>
              {lastContactLog && (
                <p className="text-xs text-muted-foreground">
                  Last contact log by {lastContactLog.actorName || lastContactLog.actor?.name || 'System'} ·{' '}
                  {new Date(lastContactLog.createdAt).toLocaleString()}
                </p>
              )}
              <Separator />
              <div className="grid gap-3 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Channel</Label>
                  <Select
                    value={contactLogDraft.channel}
                    onValueChange={(value) =>
                      setContactLogDraft((prev) => ({ ...prev, channel: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PHONE">Phone</SelectItem>
                      <SelectItem value="WHATSAPP">WhatsApp</SelectItem>
                      <SelectItem value="EMAIL">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Outcome</Label>
                  <Select
                    value={contactLogDraft.outcome}
                    onValueChange={(value) =>
                      setContactLogDraft((prev) => ({ ...prev, outcome: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CONNECTED">Connected</SelectItem>
                      <SelectItem value="NO_ANSWER">No answer</SelectItem>
                      <SelectItem value="LEFT_MESSAGE">Left message</SelectItem>
                      <SelectItem value="FOLLOW_UP">Follow-up needed</SelectItem>
                      <SelectItem value="NOT_INTERESTED">Not interested</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-3">
                  <Label>Notes</Label>
                  <textarea
                    className="min-h-[90px] w-full rounded-md border bg-background px-3 py-2 text-sm"
                    value={contactLogDraft.notes}
                    onChange={(event) =>
                      setContactLogDraft((prev) => ({ ...prev, notes: event.target.value }))
                    }
                    placeholder="Add call notes or next steps..."
                  />
                </div>
                <div className="md:col-span-3">
                  <Button onClick={handleLogContact} disabled={savingContactLog}>
                    {savingContactLog && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save contact log
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data completeness</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {missingFields.length === 0 ? (
                <div className="rounded-lg border bg-emerald-50/70 p-3 text-emerald-800">
                  All essential fields captured.
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    Missing {missingFields.length} key fields:
                  </p>
                  <ul className="space-y-1">
                    {missingFields.map((field) => (
                      <li key={field} className="flex items-center gap-2">
                        <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                        <span>{field}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Follow-up reminder</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Follow-up date</Label>
              <Input
                type="datetime-local"
                value={followUpDraft.followUpAt}
                onChange={(event) =>
                  setFollowUpDraft((prev) => ({ ...prev, followUpAt: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={followUpDraft.followUpStatus}
                onValueChange={(value) =>
                  setFollowUpDraft((prev) => ({ ...prev, followUpStatus: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OPEN">Open</SelectItem>
                  <SelectItem value="DONE">Done</SelectItem>
                  <SelectItem value="SNOOZED">Snoozed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-3">
              <Label>Follow-up notes</Label>
              <textarea
                className="min-h-[120px] w-full rounded-md border bg-background px-3 py-2 text-sm"
                value={followUpDraft.followUpNotes}
                onChange={(event) =>
                  setFollowUpDraft((prev) => ({ ...prev, followUpNotes: event.target.value }))
                }
                placeholder="Add call outcomes or next steps..."
              />
            </div>
            <div className="md:col-span-3">
              <Button onClick={handleSaveFollowUp} disabled={savingFollowUp}>
                {savingFollowUp && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save follow-up
              </Button>
            </div>
            {lastFollowUpLog && (
              <p className="text-xs text-muted-foreground md:col-span-3">
                Last saved by {lastFollowUpLog.actorName || lastFollowUpLog.actor?.name || 'System'} ·{' '}
                {new Date(lastFollowUpLog.createdAt).toLocaleString()}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consultation Findings</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-semibold">Recommendations</p>
              {recommendations.length === 0 ? (
                <p className="text-sm text-muted-foreground">No recommendations recorded.</p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {recommendations.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">Issues & Risks</p>
              {issues.length === 0 ? (
                <p className="text-sm text-muted-foreground">No issues logged.</p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {issues.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 text-amber-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
          <CardContent className="border-t pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {application.notes && (
                <div>
                  <p className="mb-1 text-sm font-semibold">Client Notes</p>
                  <p className="rounded-lg border bg-muted/40 p-3 text-sm">{application.notes}</p>
                </div>
              )}
              <div>
                <p className="mb-1 text-sm font-semibold">Admin Notes</p>
                <div className="rounded-lg border bg-muted/40 p-3 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <NotebookPen className="h-4 w-4" />
                    Internal notes shared with the team only.
                  </div>
                  <textarea
                    className="min-h-[100px] w-full rounded-md border bg-background px-3 py-2 text-sm"
                    value={adminNotesDraft}
                    onChange={(event) => setAdminNotesDraft(event.target.value)}
                    placeholder="Add follow-up notes, call outcomes, or next steps..."
                  />
                  <Button onClick={handleSaveNotes} disabled={savingNotes}>
                    {savingNotes && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save notes
                  </Button>
                  {lastNotesLog && (
                    <p className="text-xs text-muted-foreground">
                      Last saved by {lastNotesLog.actorName || lastNotesLog.actor?.name || 'System'} ·{' '}
                      {new Date(lastNotesLog.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {!hasDocuments ? (
                <EmptyState
                  icon={<FileText className="h-5 w-5" />}
                  title="No documents uploaded"
                  description="Ask the applicant to upload salary slips or supporting documents."
                />
              ) : (
                application.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium">{doc.fileName}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.fileType} • Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={doc.fileUrl} target="_blank" rel="noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        View
                      </a>
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {!hasPayments ? (
                <EmptyState
                  icon={<Wallet2 className="h-5 w-5" />}
                  title="No payments recorded"
                  description="Track deposits or service fees once the client confirms."
                />
              ) : (
                application.payments.map((payment) => (
                  <div key={payment.id} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                      <Badge variant="outline">{payment.status}</Badge>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      <p>Method: {payment.paymentMethod || '—'}</p>
                      {payment.paidAt && <p>Paid: {new Date(payment.paidAt).toLocaleDateString()}</p>}
                      {!payment.paidAt && <p>Created: {new Date(payment.createdAt).toLocaleDateString()}</p>}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
