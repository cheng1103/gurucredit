'use client';

import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { auditLogsAPI } from '@/lib/api';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { Pagination } from '@/components/Pagination';
import { Loader2, ShieldCheck, Search } from 'lucide-react';
import { toast } from 'sonner';

interface AuditLog {
  id: string;
  action: string;
  targetType: string;
  targetId?: string | null;
  actorName?: string | null;
  actor?: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
}

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [targetFilter, setTargetFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalLogs, setTotalLogs] = useState(0);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await auditLogsAPI.getAll({
        action: actionFilter !== 'all' ? actionFilter : undefined,
        targetType: targetFilter !== 'all' ? targetFilter : undefined,
        search: search || undefined,
        page,
        pageSize,
      });
      const payload = response.data;
      setLogs(payload.data ?? payload);
      setTotalLogs(payload.total ?? payload.length ?? 0);
    } catch {
      toast.error('Failed to load audit logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [actionFilter, targetFilter, search, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [search, actionFilter, targetFilter]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title="Audit Logs"
          description="Track every admin action across applications and users."
          actions={(
            <Button variant="outline" onClick={fetchLogs} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Refresh
            </Button>
          )}
        />

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <ShieldCheck className="h-4 w-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex flex-1 items-center gap-2">
              <Input
                placeholder="Search action, user, or target"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && fetchLogs()}
              />
              <Button variant="outline" onClick={fetchLogs}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col gap-2 md:w-[220px]">
              <Label className="text-xs uppercase text-muted-foreground">Action</Label>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All actions</SelectItem>
                  <SelectItem value="application.status_updated">Status updated</SelectItem>
                  <SelectItem value="application.analysis_submitted">Analysis submitted</SelectItem>
                  <SelectItem value="application.follow_up_updated">Follow-up updated</SelectItem>
                  <SelectItem value="application.contact_logged">Contact logged</SelectItem>
                  <SelectItem value="user.created">User created</SelectItem>
                  <SelectItem value="user.role_updated">Role updated</SelectItem>
                  <SelectItem value="user.status_toggled">User status toggled</SelectItem>
                  <SelectItem value="service.created">Service created</SelectItem>
                  <SelectItem value="service.updated">Service updated</SelectItem>
                  <SelectItem value="service.deactivated">Service deactivated</SelectItem>
                  <SelectItem value="lead.status_updated">Lead status updated</SelectItem>
                  <SelectItem value="lead.distributed">Lead distributed</SelectItem>
                  <SelectItem value="lead.deleted">Lead deleted</SelectItem>
                  <SelectItem value="message.status_updated">Message status updated</SelectItem>
                  <SelectItem value="message.deleted">Message deleted</SelectItem>
                  <SelectItem value="newsletter.deleted">Newsletter deleted</SelectItem>
                  <SelectItem value="team.created">Team member created</SelectItem>
                  <SelectItem value="team.updated">Team member updated</SelectItem>
                  <SelectItem value="team.status_toggled">Team member toggled</SelectItem>
                  <SelectItem value="team.deleted">Team member deleted</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 md:w-[200px]">
              <Label className="text-xs uppercase text-muted-foreground">Target</Label>
              <Select value={targetFilter} onValueChange={setTargetFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Target" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All targets</SelectItem>
                  <SelectItem value="Application">Application</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                  <SelectItem value="Service">Service</SelectItem>
                  <SelectItem value="Lead">Lead</SelectItem>
                  <SelectItem value="ContactMessage">Contact Message</SelectItem>
                  <SelectItem value="NewsletterSubscriber">Newsletter Subscriber</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Actor</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Metadata</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : logs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <EmptyState
                        icon={<ShieldCheck className="h-5 w-5" />}
                        title="No audit logs found"
                        description="Try changing filters or searching for an action."
                        action={{
                          label: 'Reset filters',
                          variant: 'outline',
                          onClick: () => {
                            setSearch('');
                            setActionFilter('all');
                            setTargetFilter('all');
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                      <TableCell className="font-medium">{log.action}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{log.actorName || log.actor?.name || 'System'}</p>
                          <p className="text-xs text-muted-foreground">{log.actor?.email || ''}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{log.targetType}</p>
                          <p className="text-xs text-muted-foreground">{log.targetId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <pre className="max-w-[260px] whitespace-pre-wrap text-xs text-muted-foreground">
                          {log.metadata ? JSON.stringify(log.metadata, null, 2) : '—'}
                        </pre>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <Pagination
              page={page}
              pageSize={pageSize}
              total={totalLogs}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(1);
              }}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
