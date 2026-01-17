'use client';

import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { teamMembersAPI, auditLogsAPI } from '@/lib/api';
import { maskPhone } from '@/lib/utils';
import { Loader2, Plus, UserCheck, UserX } from 'lucide-react';
import { toast } from 'sonner';
import { Pagination } from '@/components/Pagination';

interface TeamMember {
  id: string;
  name: string;
  phone: string;
  role?: string | null;
  isActive: boolean;
  createdAt: string;
}

interface AuditLogEntry {
  id: string;
  action: string;
  actorName?: string | null;
  actor?: { name?: string | null } | null;
  createdAt: string;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', role: '' });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalMembers, setTotalMembers] = useState(0);
  const [lastTeamLog, setLastTeamLog] = useState<AuditLogEntry | null>(null);

  const fetchMembers = async () => {
    try {
      const response = await teamMembersAPI.getAll({
        activeOnly: 'false',
        page,
        pageSize,
      });
      const payload = response.data;
      setMembers(payload.data ?? payload);
      setTotalMembers(payload.total ?? payload.length ?? 0);
    } catch {
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [page, pageSize]);

  const openCreate = () => {
    setEditingMember(null);
    setLastTeamLog(null);
    setFormData({ name: '', phone: '', role: '' });
    setShowDialog(true);
  };

  const openEdit = async (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      phone: member.phone,
      role: member.role ?? '',
    });
    setShowDialog(true);
    try {
      const response = await auditLogsAPI.getAll({
        targetType: 'TeamMember',
        targetId: member.id,
        page: 1,
        pageSize: 1,
      });
      const payload = response.data;
      const logs = payload.data ?? payload;
      setLastTeamLog(logs[0] ?? null);
    } catch {
      setLastTeamLog(null);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.phone) {
      toast.error('Name and phone are required');
      return;
    }

    setSubmitting(true);
    try {
      if (editingMember) {
        await teamMembersAPI.update(editingMember.id, {
          name: formData.name,
          phone: formData.phone,
          role: formData.role || undefined,
        });
        toast.success('Team member updated');
      } else {
        await teamMembersAPI.create({
          name: formData.name,
          phone: formData.phone,
          role: formData.role || undefined,
        });
        toast.success('Team member added');
      }
      setShowDialog(false);
      fetchMembers();
    } catch {
      toast.error('Failed to save team member');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (member: TeamMember) => {
    if (!confirm(`Change status for ${member.name}?`)) return;
    try {
      await teamMembersAPI.toggleActive(member.id);
      toast.success('Status updated');
      fetchMembers();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (member: TeamMember) => {
    if (!confirm(`Remove ${member.name}?`)) return;
    try {
      await teamMembersAPI.delete(member.id);
      toast.success('Team member removed');
      fetchMembers();
    } catch {
      toast.error('Failed to remove team member');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title="Team"
          description="Manage the teammates who receive WhatsApp leads."
          actions={(
            <Button onClick={openCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Add teammate
            </Button>
          )}
        />

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : members.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <EmptyState
                        icon={<UserCheck className="h-5 w-5" />}
                        title="No teammates yet"
                        description="Add teammates to distribute WhatsApp leads."
                        action={{ label: 'Add teammate', onClick: openCreate }}
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Added {new Date(member.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{maskPhone(member.phone)}</TableCell>
                      <TableCell>{member.role || '—'}</TableCell>
                      <TableCell>
                        <Badge className={member.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {member.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => openEdit(member)}>
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleToggle(member)}>
                          {member.isActive ? (
                            <><UserX className="mr-1 h-4 w-4" /> Deactivate</>
                          ) : (
                            <><UserCheck className="mr-1 h-4 w-4" /> Activate</>
                          )}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(member)}>
                          Remove
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
              total={totalMembers}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(1);
              }}
            />
          </CardContent>
        </Card>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingMember ? 'Edit teammate' : 'Add teammate'}</DialogTitle>
              <DialogDescription>
                This list powers the WhatsApp distribution options.
              </DialogDescription>
            </DialogHeader>
            {editingMember && lastTeamLog && (
              <p className="text-xs text-muted-foreground">
                Last updated by {lastTeamLog.actorName || lastTeamLog.actor?.name || 'System'} ·{' '}
                {new Date(lastTeamLog.createdAt).toLocaleString()}
              </p>
            )}
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Farah Lee"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+60 12-345 6789"
                />
              </div>
              <div className="space-y-2">
                <Label>Role (optional)</Label>
                <Input
                  value={formData.role}
                  onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                  placeholder="Senior Loan Advisor"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingMember ? 'Save changes' : 'Add teammate'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
