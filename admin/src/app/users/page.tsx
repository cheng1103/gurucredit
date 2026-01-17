'use client';

import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auditLogsAPI, usersAPI } from '@/lib/api';
import { toast } from 'sonner';
import { History, Loader2, UserCheck, UserCog, UserX } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { maskPhone } from '@/lib/utils';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination } from '@/components/Pagination';
import { HistoryDialog } from '@/components/HistoryDialog';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  _count: {
    applications: number;
  };
}

interface AuditLogEntry {
  id: string;
  action: string;
  actorName?: string | null;
  actor?: { name?: string | null } | null;
  createdAt: string;
}

interface NewUserForm {
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  phone: string;
}

const initialForm: NewUserForm = {
  name: '',
  email: '',
  password: '',
  role: 'ADMIN',
  phone: '',
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [newUser, setNewUser] = useState<NewUserForm>(initialForm);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [totalUsers, setTotalUsers] = useState(0);
  const [stats, setStats] = useState({ total: 0, active: 0, admins: 0 });
  const [lastUserLogs, setLastUserLogs] = useState<Record<string, AuditLogEntry | null>>({});
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyLogs, setHistoryLogs] = useState<Array<{
    id: string;
    action: string;
    actorName?: string | null;
    actor?: { name?: string | null; email?: string | null } | null;
    metadata?: Record<string, unknown> | null;
    createdAt: string;
  }>>([]);
  const [historyTitle, setHistoryTitle] = useState('User history');
  const { user } = useAuthStore();
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const loadLatestUserLogs = async (list: User[]) => {
    try {
      const logEntries = await Promise.all(
        list.map(async (user) => {
          try {
            const response = await auditLogsAPI.getAll({
              targetType: 'User',
              targetId: user.id,
              page: 1,
              pageSize: 1,
            });
            const payload = response.data;
            const logs = payload.data ?? payload;
            return { id: user.id, log: logs[0] ?? null };
          } catch {
            return { id: user.id, log: null };
          }
        }),
      );
      setLastUserLogs((prev) => {
        const next = { ...prev };
        logEntries.forEach(({ id, log }) => {
          next[id] = log;
        });
        return next;
      });
    } catch {
      // ignore log fetch failures
    }
  };

  const fetchUsers = async () => {
    try {
      const [usersRes, statsRes] = await Promise.all([
        usersAPI.getAll({
          search: search || undefined,
          role: roleFilter !== 'all' ? roleFilter : undefined,
          status: statusFilter !== 'all' ? statusFilter : undefined,
          page,
          pageSize,
        }),
        usersAPI.getStats(),
      ]);
      const payload = usersRes.data;
      const list = payload.data ?? payload;
      setUsers(list);
      setTotalUsers(payload.total ?? list.length ?? 0);
      setStats(statsRes.data);
      loadLatestUserLogs(list);
    } catch {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, roleFilter, statusFilter, page, pageSize]);

  const handleRoleChange = async (id: string, role: string) => {
    if (!isSuperAdmin) return;
    if (!confirm(`Change role to ${role}?`)) return;
    try {
      await usersAPI.updateRole(id, role);
      toast.success('Role updated');
      fetchUsers();
    } catch {
      toast.error('Failed to update role');
    }
  };

  const handleToggleActive = async (id: string) => {
    const target = users.find((entry) => entry.id === id);
    const actionLabel = target?.isActive ? 'Deactivate' : 'Activate';
    if (!confirm(`${actionLabel} ${target?.name ?? 'this user'}?`)) return;
    try {
      await usersAPI.toggleActive(id);
      toast.success('Status updated');
      fetchUsers();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error('Name, email, and password are required');
      return;
    }

    setCreatingUser(true);
    try {
      await usersAPI.create({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
        phone: newUser.phone || undefined,
      });
      toast.success('User created');
      setShowCreateDialog(false);
      setNewUser(initialForm);
      fetchUsers();
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string | string[] } } })?.response?.data
          ?.message || 'Failed to create user';
      toast.error(Array.isArray(message) ? message[0] : message);
    } finally {
      setCreatingUser(false);
    }
  };

  const handleDialogChange = (open: boolean) => {
    setShowCreateDialog(open);
    if (!open) {
      setNewUser(initialForm);
      setCreatingUser(false);
    }
  };

  const openHistory = async (targetId: string, name: string) => {
    setHistoryOpen(true);
    setHistoryTitle(`History · ${name}`);
    try {
      const response = await auditLogsAPI.getAll({
        targetType: 'User',
        targetId,
        page: 1,
        pageSize: 20,
      });
      const payload = response.data;
      setHistoryLogs(payload.data ?? payload);
    } catch {
      setHistoryLogs([]);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search, roleFilter, statusFilter]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title="Users"
          description="Manage user accounts, access roles, and activity status."
          actions={
            isSuperAdmin ? (
              <Button onClick={() => setShowCreateDialog(true)}>
                Add User
              </Button>
            ) : null
          }
        />

        {!loading && users.length > 0 && (
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: 'Total users', value: stats.total },
              { label: 'Active users', value: stats.active },
              { label: 'Admin accounts', value: stats.admins },
            ].map((metric) => (
              <Card key={metric.label} className="bg-gradient-to-br from-white to-slate-50 shadow-sm dark:from-slate-900 dark:to-slate-950/40">
                <CardContent className="pt-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{metric.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <UserCog className="h-4 w-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex flex-1 items-center gap-2">
              <Input
                placeholder="Search by name, email, or phone"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 md:w-[200px]">
              <Label className="text-xs uppercase text-muted-foreground">Role</Label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All roles</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 md:w-[200px]">
              <Label className="text-xs uppercase text-muted-foreground">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
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
                  <TableHead>User</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 6 }).map((_, idx) => (
                    <TableRow key={`loading-${idx}`}>
                      <TableCell colSpan={7}>
                        <Skeleton className="h-8 w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <EmptyState
                        icon={<UserCheck className="h-5 w-5" />}
                        title="No users match your filters"
                        description="Try changing the role or status filters, or clear the search."
                        action={{
                          label: 'Reset filters',
                          variant: 'outline',
                          onClick: () => {
                            setSearch('');
                            setRoleFilter('all');
                            setStatusFilter('all');
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          {lastUserLogs[user.id] && (
                            <p className="text-[11px] text-muted-foreground">
                              Last updated by {lastUserLogs[user.id]?.actorName || lastUserLogs[user.id]?.actor?.name || 'System'} ·{' '}
                              {new Date(lastUserLogs[user.id]!.createdAt).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{maskPhone(user.phone)}</TableCell>
                      <TableCell>
                        <Select
                          value={user.role}
                          onValueChange={(v) => handleRoleChange(user.id, v)}
                          disabled={!isSuperAdmin || user.role === 'SUPER_ADMIN'}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USER">User</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                            <SelectItem value="SUPER_ADMIN" disabled>
                              Super Admin (locked)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user._count.applications}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleActive(user.id)}
                        >
                          {user.isActive ? (
                            <><UserX className="h-4 w-4 mr-1" /> Deactivate</>
                          ) : (
                            <><UserCheck className="h-4 w-4 mr-1" /> Activate</>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-2"
                          onClick={() => openHistory(user.id, user.name)}
                        >
                          <History className="h-4 w-4 mr-1" />
                          History
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <Pagination
              page={page}
              pageSize={pageSize}
              total={totalUsers}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(1);
              }}
            />
          </CardContent>
        </Card>

        {isSuperAdmin && (
          <Dialog open={showCreateDialog} onOpenChange={handleDialogChange}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>
                  Invite a new teammate and assign the right level of access.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Jane Lee"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="name@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    value={newUser.phone}
                    onChange={(e) => setNewUser((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="011-xxxx xxxx"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Temporary Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))}
                    placeholder="At least 8 characters"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Role</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value) => setNewUser((prev) => ({ ...prev, role: value as 'USER' | 'ADMIN' | 'SUPER_ADMIN' }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Super Admin access cannot be assigned here.</p>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => handleDialogChange(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateUser} disabled={creatingUser}>
                  {creatingUser ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create User'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

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
