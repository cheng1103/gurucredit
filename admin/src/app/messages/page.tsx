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
import { contactAPI, auditLogsAPI } from '@/lib/api';
import { SERVICE_AREA_FILTERS, formatServiceArea } from '@/lib/serviceAreas';
import { maskPhone } from '@/lib/utils';
import { toast } from 'sonner';
import { Loader2, Trash2, Eye, MessageSquare, Inbox, CheckCircle, Clock, AlertTriangle, Search, Download, History } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { Pagination } from '@/components/Pagination';
import { HistoryDialog } from '@/components/HistoryDialog';

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  serviceArea: string;
  subject: string;
  message: string;
  status: string;
  adminNote?: string;
  createdAt: string;
  repliedAt?: string;
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
  read: number;
  replied: number;
}

const statusColors: Record<string, string> = {
  NEW: 'bg-yellow-100 text-yellow-800',
  READ: 'bg-blue-100 text-blue-800',
  REPLIED: 'bg-green-100 text-green-800',
};

const OVERDUE_THRESHOLD_HOURS = 24;

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [areaFilter, setAreaFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editData, setEditData] = useState({ status: '', adminNote: '' });
  const [selectedMessageIds, setSelectedMessageIds] = useState<string[]>([]);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalMessages, setTotalMessages] = useState(0);
  const [lastMessageLog, setLastMessageLog] = useState<AuditLogEntry | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyLogs, setHistoryLogs] = useState<AuditLogEntry[]>([]);
  const [historyTitle, setHistoryTitle] = useState('Message history');

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const [messagesRes, statsRes] = await Promise.all([
        contactAPI.getAll({
          status: statusFilter !== 'all' ? statusFilter : undefined,
          serviceArea: areaFilter !== 'all' ? areaFilter : undefined,
          search: search || undefined,
          page,
          pageSize,
        }),
        contactAPI.getStats(),
      ]);
      const payload = messagesRes.data;
      setMessages(payload.data ?? payload);
      setTotalMessages(payload.total ?? payload.length ?? 0);
      setStats(statsRes.data);
    } catch {
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, areaFilter, search, page, pageSize]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleUpdateStatus = async () => {
    if (!selectedMessage) return;

    setSubmitting(true);
    try {
      await contactAPI.updateStatus(selectedMessage.id, editData);
      toast.success('Message updated');
      setShowDetailDialog(false);
      fetchMessages();
    } catch {
      toast.error('Failed to update message');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      await contactAPI.delete(id);
      toast.success('Message deleted');
      fetchMessages();
    } catch {
      toast.error('Failed to delete message');
    }
  };

  const openDetailDialog = async (message: Message) => {
    setSelectedMessage(message);
    setEditData({ status: message.status, adminNote: message.adminNote || '' });
    setShowDetailDialog(true);
    try {
      const response = await auditLogsAPI.getAll({
        targetType: 'ContactMessage',
        targetId: message.id,
        page: 1,
        pageSize: 1,
      });
      const payload = response.data;
      const logs = payload.data ?? payload;
      setLastMessageLog(logs[0] ?? null);
    } catch {
      setLastMessageLog(null);
    }
  };

  const openHistory = async (message: Message) => {
    setHistoryOpen(true);
    setHistoryTitle(`History · ${message.subject}`);
    try {
      const response = await auditLogsAPI.getAll({
        targetType: 'ContactMessage',
        targetId: message.id,
        page: 1,
        pageSize: 20,
      });
      const payload = response.data;
      setHistoryLogs(payload.data ?? payload);
    } catch {
      setHistoryLogs([]);
    }
  };

  const isOverdue = useCallback((msg: Message, now: number) => {
    if (msg.status !== 'NEW') return false;
    const created = new Date(msg.createdAt).getTime();
    return now - created > OVERDUE_THRESHOLD_HOURS * 60 * 60 * 1000;
  }, []);

  const sortedMessages = useMemo(() => {
    const now = Date.now();
    return [...messages].sort((a, b) => {
      const overdueA = isOverdue(a, now);
      const overdueB = isOverdue(b, now);
      if (overdueA !== overdueB) return overdueA ? -1 : 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [messages, isOverdue]);

  useEffect(() => {
    setSelectedMessageIds([]);
    setPage(1);
  }, [statusFilter, areaFilter, search]);

  const allSelected = messages.length > 0 && selectedMessageIds.length === messages.length;
  const toggleSelectAll = (checked: boolean) => {
    setSelectedMessageIds(checked ? messages.map((msg) => msg.id) : []);
  };
  const toggleSelection = (id: string) => {
    setSelectedMessageIds((prev) =>
      prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id],
    );
  };

  const handleBulkStatus = async (status: string) => {
    if (selectedMessageIds.length === 0) {
      toast.error('Select at least one message');
      return;
    }
    if (!confirm(`Update ${selectedMessageIds.length} message(s) to ${status}?`)) {
      return;
    }
    setBulkLoading(true);
    try {
      const results = await Promise.allSettled(
        selectedMessageIds.map((id) => contactAPI.updateStatus(id, { status })),
      );
      const failures = results.filter((result) => result.status === 'rejected').length;
      if (failures > 0) {
        toast.error(`${failures} message(s) failed to update`);
      } else {
        toast.success('Messages updated');
      }
      fetchMessages();
    } finally {
      setBulkLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedMessageIds.length === 0) {
      toast.error('Select at least one message');
      return;
    }
    if (!confirm(`Delete ${selectedMessageIds.length} selected messages?`)) return;
    setBulkLoading(true);
    try {
      const results = await Promise.allSettled(
        selectedMessageIds.map((id) => contactAPI.delete(id)),
      );
      const failures = results.filter((result) => result.status === 'rejected').length;
      if (failures > 0) {
        toast.error(`${failures} message(s) failed to delete`);
      } else {
        toast.success('Messages deleted');
      }
      fetchMessages();
    } finally {
      setBulkLoading(false);
    }
  };

  const exportCsv = () => {
    const rows = selectedMessageIds.length > 0
      ? sortedMessages.filter((msg) => selectedMessageIds.includes(msg.id))
      : sortedMessages;
    if (rows.length === 0) {
      toast.error('No messages to export');
      return;
    }
    const headers = [
      'Name',
      'Email',
      'Phone',
      'Service Area',
      'Subject',
      'Message',
      'Status',
      'Created At',
      'Replied At',
    ];
    const toCsvValue = (value: unknown) => {
      const text = String(value ?? '');
      return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
    };
    const csv = [
      headers.join(','),
      ...rows.map((msg) => [
        msg.name,
        msg.email,
        msg.phone || '',
        formatServiceArea(msg.serviceArea),
        msg.subject,
        msg.message,
        msg.status,
        new Date(msg.createdAt).toISOString(),
        msg.repliedAt ? new Date(msg.repliedAt).toISOString() : '',
      ].map(toCsvValue).join(',')),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `messages-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title="Contact Messages"
          description="Review and respond to messages sent from the public site."
          actions={(
            <Button variant="outline" onClick={fetchMessages} disabled={loading}>
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
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
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
                  <Inbox className="h-5 w-5 text-yellow-500" />
                  <span className="text-2xl font-bold">{stats.new}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Read</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span className="text-2xl font-bold">{stats.read}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Replied</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-2xl font-bold">{stats.replied}</span>
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
                    {messages.filter((msg) => {
                      if (msg.status !== 'NEW') return false;
                      const created = new Date(msg.createdAt).getTime();
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
                placeholder="Search name, subject, or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
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
                  <SelectItem value="READ">Read</SelectItem>
                  <SelectItem value="REPLIED">Replied</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 md:w-[220px]">
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
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-base font-semibold">Bulk actions</CardTitle>
            <p className="text-xs text-muted-foreground">
              {selectedMessageIds.length} selected in current view
            </p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => handleBulkStatus('READ')}
              disabled={bulkLoading}
            >
              Mark Read
            </Button>
            <Button
              variant="outline"
              onClick={() => handleBulkStatus('REPLIED')}
              disabled={bulkLoading}
            >
              Mark Replied
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
                      aria-label="Select all messages"
                    />
                  </TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : messages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <EmptyState
                        icon={<MessageSquare className="h-5 w-5" />}
                        title="No messages match your filters"
                        description="Try changing the status, area, or search keywords."
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
                  sortedMessages.map((msg) => {
                    const overdue = isOverdue(msg, Date.now());
                    return (
                      <TableRow
                        key={msg.id}
                        className={overdue ? 'bg-amber-50/70 dark:bg-amber-900/10' : undefined}
                      >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedMessageIds.includes(msg.id)}
                          onChange={() => toggleSelection(msg.id)}
                          aria-label={`Select message from ${msg.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{msg.name}</p>
                          <p className="text-sm text-muted-foreground">{msg.email}</p>
                          {overdue && (
                            <p className="text-[11px] font-semibold text-amber-700 flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              Needs reply
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{msg.subject}</TableCell>
                      <TableCell>{maskPhone(msg.phone)}</TableCell>
                      <TableCell>{formatServiceArea(msg.serviceArea)}</TableCell>
                      <TableCell className="space-y-1">
                        <Badge className={statusColors[msg.status]}>{msg.status}</Badge>
                        {msg.status === 'NEW' && !overdue && (
                          <p className="text-[11px] text-emerald-700">
                            SLA on track
                          </p>
                        )}
                        {msg.repliedAt && (
                          <p className="text-[11px] text-muted-foreground">
                            Replied {new Date(msg.repliedAt).toLocaleDateString()}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>{new Date(msg.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => openDetailDialog(msg)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => openHistory(msg)}>
                            <History className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(msg.id)}>
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
              total={totalMessages}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(1);
              }}
            />
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Message Details</DialogTitle>
              <DialogDescription>
                From {selectedMessage?.name} ({selectedMessage?.email})
              </DialogDescription>
            </DialogHeader>
            {lastMessageLog && (
              <p className="text-xs text-muted-foreground">
                Last updated by {lastMessageLog.actorName || lastMessageLog.actor?.name || 'System'} ·{' '}
                {new Date(lastMessageLog.createdAt).toLocaleString()}
              </p>
            )}
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Subject</Label>
                <p className="font-medium">{selectedMessage?.subject}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Message</Label>
                <p className="p-3 bg-muted rounded-lg whitespace-pre-wrap">{selectedMessage?.message}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={editData.status} onValueChange={(v) => setEditData({ ...editData, status: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEW">New</SelectItem>
                      <SelectItem value="READ">Read</SelectItem>
                      <SelectItem value="REPLIED">Replied</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Phone</Label>
                  <p>{maskPhone(selectedMessage?.phone)}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Service Area</Label>
                  <p>{formatServiceArea(selectedMessage?.serviceArea)}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Admin Note</Label>
                <Textarea
                  value={editData.adminNote}
                  onChange={(e) => setEditData({ ...editData, adminNote: e.target.value })}
                  placeholder="Add internal notes..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDetailDialog(false)}>Cancel</Button>
              <Button onClick={handleUpdateStatus} disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update
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
