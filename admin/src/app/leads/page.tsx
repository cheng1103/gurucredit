'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { leadsAPI, auditLogsAPI, teamMembersAPI } from '@/lib/api';
import { SERVICE_AREA_FILTERS, formatServiceArea } from '@/lib/serviceAreas';
import { maskPhone } from '@/lib/utils';
import { toast } from 'sonner';
import { Loader2, Trash2, Edit, Phone, PhoneCall, Users, CheckCircle, AlertTriangle, Search, Download, History, MessageCircle, UserCheck } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { Pagination } from '@/components/Pagination';
import { HistoryDialog } from '@/components/HistoryDialog';

interface Lead {
  id: string;
  phone: string;
  serviceArea: string;
  source: string;
  pageUrl?: string;
  language?: string;
  status: string;
  notes?: string;
  createdAt: string;
  distributions?: LeadDistribution[];
}

interface LeadDistribution {
  id: string;
  createdAt: string;
  note?: string | null;
  teamMember: TeamMember;
  sentBy?: { id: string; name?: string | null } | null;
}

interface TeamMember {
  id: string;
  name: string;
  phone: string;
  role?: string | null;
  isActive: boolean;
}

interface AuditLogEntry {
  id: string;
  action: string;
  actorName?: string | null;
  actor?: { name?: string | null } | null;
  createdAt: string;
}

interface Stats {
  total: number;
  new: number;
  contacted: number;
  converted: number;
}

const statusColors: Record<string, string> = {
  NEW: 'bg-yellow-100 text-yellow-800',
  CONTACTED: 'bg-blue-100 text-blue-800',
  CONVERTED: 'bg-green-100 text-green-800',
  NOT_INTERESTED: 'bg-gray-100 text-gray-800',
};

const OVERDUE_THRESHOLD_HOURS = 12;

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [areaFilter, setAreaFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editData, setEditData] = useState({ status: '', notes: '' });
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalLeads, setTotalLeads] = useState(0);
  const [lastLeadLog, setLastLeadLog] = useState<AuditLogEntry | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyLogs, setHistoryLogs] = useState<AuditLogEntry[]>([]);
  const [historyTitle, setHistoryTitle] = useState('Lead history');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamMembersLoading, setTeamMembersLoading] = useState(false);
  const [showDistributeDialog, setShowDistributeDialog] = useState(false);
  const [selectedTeamMemberId, setSelectedTeamMemberId] = useState('');
  const [distributionNote, setDistributionNote] = useState('');
  const [selectedDistributionLead, setSelectedDistributionLead] = useState<Lead | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const [leadsRes, statsRes] = await Promise.all([
        leadsAPI.getAll({
          status: statusFilter !== 'all' ? statusFilter : undefined,
          search: appliedSearch || undefined,
          serviceArea: areaFilter !== 'all' ? areaFilter : undefined,
          page,
          pageSize,
        }),
        leadsAPI.getStats(),
      ]);
      const payload = leadsRes.data;
      setLeads(payload.data ?? payload);
      setTotalLeads(payload.total ?? payload.length ?? 0);
      setStats(statsRes.data);
    } catch {
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, areaFilter, appliedSearch, page, pageSize]);

  const fetchTeamMembers = useCallback(async () => {
    setTeamMembersLoading(true);
    try {
      const response = await teamMembersAPI.getAll({ activeOnly: 'true' });
      const payload = response.data;
      setTeamMembers(payload.data ?? payload);
    } catch {
      toast.error('Failed to load team members');
      setTeamMembers([]);
    } finally {
      setTeamMembersLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    if (showDistributeDialog) {
      fetchTeamMembers();
    }
  }, [showDistributeDialog, fetchTeamMembers]);

  const buildWhatsAppMessage = useCallback((lead: Lead, member: TeamMember) => {
    const lines = [
      `New lead assigned to you: ${member.name}`,
      `Phone: ${lead.phone}`,
      `Service area: ${formatServiceArea(lead.serviceArea)}`,
      `Source: ${lead.source}`,
      `Page: ${lead.pageUrl || '-'}`,
      `Language: ${lead.language?.toUpperCase() || '-'}`,
    ];
    return lines.join('\n');
  }, []);

  const openDistributeDialog = (lead: Lead) => {
    setSelectedDistributionLead(lead);
    setSelectedTeamMemberId('');
    setDistributionNote('');
    setShowDistributeDialog(true);
  };

  const handleDistribute = async () => {
    if (!selectedDistributionLead) return;
    if (!selectedTeamMemberId) {
      toast.error('Select a team member');
      return;
    }
    const member = teamMembers.find((entry) => entry.id === selectedTeamMemberId);
    if (!member) {
      toast.error('Selected team member not found');
      return;
    }
    setSubmitting(true);
    try {
      await leadsAPI.distribute(selectedDistributionLead.id, {
        teamMemberId: selectedTeamMemberId,
        note: distributionNote.trim() || undefined,
      });
      const message = buildWhatsAppMessage(selectedDistributionLead, member);
      const normalizedPhone = member.phone.replace(/[^\d]/g, '');
      const url = `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      toast.success(`Sent to ${member.name}`);
      setShowDistributeDialog(false);
      fetchLeads();
    } catch {
      toast.error('Failed to distribute lead');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedLead) return;

    setSubmitting(true);
    try {
      await leadsAPI.updateStatus(selectedLead.id, editData);
      toast.success('Lead updated');
      setShowEditDialog(false);
      fetchLeads();
    } catch {
      toast.error('Failed to update lead');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;

    try {
      await leadsAPI.delete(id);
      toast.success('Lead deleted');
      fetchLeads();
    } catch {
      toast.error('Failed to delete lead');
    }
  };

  const openEditDialog = async (lead: Lead) => {
    setSelectedLead(lead);
    setEditData({ status: lead.status, notes: lead.notes || '' });
    setShowEditDialog(true);
    try {
      const response = await auditLogsAPI.getAll({
        targetType: 'Lead',
        targetId: lead.id,
        page: 1,
        pageSize: 1,
      });
      const payload = response.data;
      const logs = payload.data ?? payload;
      setLastLeadLog(logs[0] ?? null);
    } catch {
      setLastLeadLog(null);
    }
  };

  const openHistory = async (lead: Lead) => {
    setHistoryOpen(true);
    setHistoryTitle(`History · ${maskPhone(lead.phone)}`);
    try {
      const response = await auditLogsAPI.getAll({
        targetType: 'Lead',
        targetId: lead.id,
        page: 1,
        pageSize: 20,
      });
      const payload = response.data;
      setHistoryLogs(payload.data ?? payload);
    } catch {
      setHistoryLogs([]);
    }
  };

  const isOverdue = useCallback((lead: Lead, now: number) => {
    if (lead.status !== 'NEW') return false;
    const created = new Date(lead.createdAt).getTime();
    return now - created > OVERDUE_THRESHOLD_HOURS * 60 * 60 * 1000;
  }, []);

  const sortedLeads = useMemo(() => {
    const now = Date.now();
    return [...leads].sort((a, b) => {
      const overdueA = isOverdue(a, now);
      const overdueB = isOverdue(b, now);
      if (overdueA !== overdueB) return overdueA ? -1 : 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [leads, isOverdue]);

  const handleSearch = () => {
    setAppliedSearch(search.trim());
  };

  useEffect(() => {
    setSelectedLeadIds([]);
    setPage(1);
  }, [statusFilter, areaFilter, appliedSearch]);

  const allSelected = leads.length > 0 && selectedLeadIds.length === leads.length;
  const toggleSelectAll = (checked: boolean) => {
    setSelectedLeadIds(checked ? leads.map((lead) => lead.id) : []);
  };
  const toggleSelection = (id: string) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id],
    );
  };

  const handleBulkStatus = async (status: string) => {
    if (selectedLeadIds.length === 0) {
      toast.error('Select at least one lead');
      return;
    }
    if (!confirm(`Update ${selectedLeadIds.length} lead(s) to ${status}?`)) {
      return;
    }
    setBulkLoading(true);
    try {
      const results = await Promise.allSettled(
        selectedLeadIds.map((id) => leadsAPI.updateStatus(id, { status })),
      );
      const failures = results.filter((result) => result.status === 'rejected').length;
      if (failures > 0) {
        toast.error(`${failures} lead(s) failed to update`);
      } else {
        toast.success('Leads updated');
      }
      fetchLeads();
    } finally {
      setBulkLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedLeadIds.length === 0) {
      toast.error('Select at least one lead');
      return;
    }
    if (!confirm(`Delete ${selectedLeadIds.length} selected leads?`)) return;
    setBulkLoading(true);
    try {
      const results = await Promise.allSettled(selectedLeadIds.map((id) => leadsAPI.delete(id)));
      const failures = results.filter((result) => result.status === 'rejected').length;
      if (failures > 0) {
        toast.error(`${failures} lead(s) failed to delete`);
      } else {
        toast.success('Leads deleted');
      }
      fetchLeads();
    } finally {
      setBulkLoading(false);
    }
  };

  const exportCsv = () => {
    const rows = selectedLeadIds.length > 0
      ? sortedLeads.filter((lead) => selectedLeadIds.includes(lead.id))
      : sortedLeads;
    if (rows.length === 0) {
      toast.error('No leads to export');
      return;
    }
    const headers = [
      'Phone',
      'Service Area',
      'Source',
      'Page URL',
      'Language',
      'Status',
      'Notes',
      'Created At',
    ];
    const toCsvValue = (value: unknown) => {
      const text = String(value ?? '');
      return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
    };
    const csv = [
      headers.join(','),
      ...rows.map((lead) => [
        lead.phone,
        formatServiceArea(lead.serviceArea),
        lead.source,
        lead.pageUrl || '',
        lead.language || '',
        lead.status,
        lead.notes || '',
        new Date(lead.createdAt).toISOString(),
      ].map(toCsvValue).join(',')),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title="Leads"
          description="Manage phone leads captured from exit intent and campaign widgets."
          actions={(
            <Button variant="outline" onClick={fetchLeads} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Refresh
            </Button>
          )}
        />

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold">{stats.total}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">New</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <PhoneCall className="h-5 w-5 text-yellow-500" />
                  <span className="text-2xl font-bold">{stats.new}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Contacted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span className="text-2xl font-bold">{stats.contacted}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Converted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-2xl font-bold">{stats.converted}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Overdue follow-ups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <span className="text-2xl font-bold">
                    {leads.filter((lead) => {
                      if (lead.status !== 'NEW') return false;
                      const created = new Date(lead.createdAt).getTime();
                      return Date.now() - created > OVERDUE_THRESHOLD_HOURS * 60 * 60 * 1000;
                    }).length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Search className="h-4 w-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex flex-1 items-center gap-2">
              <Input
                placeholder="Search phone, source, page, or notes"
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
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="NEW">New</SelectItem>
                  <SelectItem value="CONTACTED">Contacted</SelectItem>
                  <SelectItem value="CONVERTED">Converted</SelectItem>
                  <SelectItem value="NOT_INTERESTED">Not Interested</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 md:w-[220px]">
              <Label className="text-xs uppercase text-muted-foreground">Service area</Label>
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
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-base font-semibold">Bulk actions</CardTitle>
            <p className="text-xs text-muted-foreground">
              {selectedLeadIds.length} selected in current view
            </p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => handleBulkStatus('CONTACTED')}
              disabled={bulkLoading}
            >
              Mark Contacted
            </Button>
            <Button
              variant="outline"
              onClick={() => handleBulkStatus('CONVERTED')}
              disabled={bulkLoading}
            >
              Mark Converted
            </Button>
            <Button
              variant="outline"
              onClick={() => handleBulkStatus('NOT_INTERESTED')}
              disabled={bulkLoading}
            >
              Mark Not Interested
            </Button>
            <Button variant="outline" onClick={exportCsv} disabled={bulkLoading}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={handleBulkDelete} disabled={bulkLoading}>
              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
              Delete Selected
            </Button>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={(e) => toggleSelectAll(e.target.checked)}
                      aria-label="Select all leads"
                    />
                  </TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Page</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : leads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10}>
                      <EmptyState
                        icon={<PhoneCall className="h-5 w-5" />}
                        title="No leads match your filters"
                        description="Try adjusting the status, area, or search query."
                        action={{
                          label: 'Reset filters',
                          variant: 'outline',
                          onClick: () => {
                            setStatusFilter('all');
                            setAreaFilter('all');
                            setSearch('');
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedLeads.map((lead) => {
                    const overdue = isOverdue(lead, Date.now());
                    return (
                      <TableRow
                        key={lead.id}
                        className={overdue ? 'bg-amber-50/70 dark:bg-amber-900/10' : undefined}
                      >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedLeadIds.includes(lead.id)}
                          onChange={() => toggleSelection(lead.id)}
                          aria-label={`Select lead ${lead.phone}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{maskPhone(lead.phone)}</TableCell>
                      <TableCell>{formatServiceArea(lead.serviceArea)}</TableCell>
                      <TableCell>{lead.source}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{lead.pageUrl || '-'}</TableCell>
                      <TableCell>{lead.language?.toUpperCase() || '-'}</TableCell>
                      <TableCell className="space-y-1">
                        <Badge className={statusColors[lead.status]}>{lead.status}</Badge>
                        {lead.status === 'NEW' && !overdue && (
                          <p className="text-[11px] text-emerald-700">
                            SLA on track
                          </p>
                        )}
                        {overdue && (
                          <p className="text-[11px] font-semibold text-amber-700 flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Follow up now
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        {lead.distributions?.[0] ? (
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              {lead.distributions[0].teamMember.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(lead.distributions[0].createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">Unassigned</span>
                        )}
                      </TableCell>
                      <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => openDistributeDialog(lead)}>
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(lead)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => openHistory(lead)}>
                            <History className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(lead.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
            <Pagination
              page={page}
              pageSize={pageSize}
              total={totalLeads}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(1);
              }}
            />
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Lead</DialogTitle>
              <DialogDescription>
                Update status for {maskPhone(selectedLead?.phone)}
              </DialogDescription>
            </DialogHeader>
            {lastLeadLog && (
              <p className="text-xs text-muted-foreground">
                Last updated by {lastLeadLog.actorName || lastLeadLog.actor?.name || 'System'} ·{' '}
                {new Date(lastLeadLog.createdAt).toLocaleString()}
              </p>
            )}
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={editData.status} onValueChange={(v) => setEditData({ ...editData, status: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEW">New</SelectItem>
                    <SelectItem value="CONTACTED">Contacted</SelectItem>
                    <SelectItem value="CONVERTED">Converted</SelectItem>
                    <SelectItem value="NOT_INTERESTED">Not Interested</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  value={editData.notes}
                  onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                  placeholder="Add notes about this lead..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
              <Button onClick={handleUpdateStatus} disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showDistributeDialog} onOpenChange={setShowDistributeDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Distribute via WhatsApp</DialogTitle>
              <DialogDescription>
                Send this lead to a teammate and log the assignment.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              {teamMembersLoading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : teamMembers.length === 0 ? (
                <EmptyState
                  icon={<UserCheck className="h-5 w-5" />}
                  title="No active teammates"
                  description="Add teammates first to distribute leads."
                  action={{ label: 'Manage team', onClick: () => window.location.assign('/team') }}
                />
              ) : (
                <>
                  <div className="space-y-2">
                    <Label>Teammate</Label>
                    <Select value={selectedTeamMemberId} onValueChange={setSelectedTeamMemberId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select teammate" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamMembers.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name} · {maskPhone(member.phone)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Note (optional)</Label>
                    <Textarea
                      value={distributionNote}
                      onChange={(e) => setDistributionNote(e.target.value)}
                      placeholder="Add context for your teammate..."
                      rows={3}
                    />
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDistributeDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleDistribute}
                disabled={submitting || teamMembers.length === 0}
              >
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send WhatsApp
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <HistoryDialog
          open={historyOpen}
          onOpenChange={setHistoryOpen}
          title={historyTitle}
          logs={historyLogs}
        />
      </div>
    </AdminLayout>
  );
}
