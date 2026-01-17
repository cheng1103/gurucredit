'use client';

import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { servicesAPI, auditLogsAPI } from '@/lib/api';
import { toast } from 'sonner';
import { Loader2, Plus, Edit, Trash2, Sparkles, History } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination } from '@/components/Pagination';
import { HistoryDialog } from '@/components/HistoryDialog';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  features: string[];
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

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [totalServices, setTotalServices] = useState(0);
  const [stats, setStats] = useState({ total: 0, active: 0, avgPrice: 0 });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [lastServiceLog, setLastServiceLog] = useState<AuditLogEntry | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyLogs, setHistoryLogs] = useState<AuditLogEntry[]>([]);
  const [historyTitle, setHistoryTitle] = useState('Service history');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    type: 'ELIGIBILITY_ANALYSIS',
    features: '',
  });

  const fetchServices = async () => {
    try {
      const [servicesRes, statsRes] = await Promise.all([
        servicesAPI.getAll({
          search: search || undefined,
          type: typeFilter !== 'all' ? typeFilter : undefined,
          status: statusFilter !== 'all' ? statusFilter : undefined,
          page,
          pageSize,
        }),
        servicesAPI.getStats(),
      ]);
      const payload = servicesRes.data;
      setServices(payload.data ?? payload);
      setTotalServices(payload.total ?? payload.length ?? 0);
      setStats(statsRes.data);
    } catch {
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [search, typeFilter, statusFilter, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [search, typeFilter, statusFilter]);

  const openCreateDialog = () => {
    setEditingService(null);
    setLastServiceLog(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      type: 'ELIGIBILITY_ANALYSIS',
      features: '',
    });
    setShowDialog(true);
  };

  const openEditDialog = async (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      type: service.type,
      features: service.features.join('\n'),
    });
    setShowDialog(true);
    try {
      const response = await auditLogsAPI.getAll({
        targetType: 'Service',
        targetId: service.id,
        page: 1,
        pageSize: 1,
      });
      const payload = response.data;
      const logs = payload.data ?? payload;
      setLastServiceLog(logs[0] ?? null);
    } catch {
      setLastServiceLog(null);
    }
  };

  const openHistory = async (service: Service) => {
    setHistoryOpen(true);
    setHistoryTitle(`History · ${service.name}`);
    try {
      const response = await auditLogsAPI.getAll({
        targetType: 'Service',
        targetId: service.id,
        page: 1,
        pageSize: 20,
      });
      const payload = response.data;
      setHistoryLogs(payload.data ?? payload);
    } catch {
      setHistoryLogs([]);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const data = {
        ...formData,
        features: formData.features.split('\n').filter(Boolean),
      };

      if (editingService) {
        await servicesAPI.update(editingService.id, data);
        toast.success('Service updated');
      } else {
        await servicesAPI.create(data);
        toast.success('Service created');
      }
      setShowDialog(false);
      fetchServices();
    } catch {
      toast.error('Failed to save service');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await servicesAPI.delete(id);
      toast.success('Service deleted');
      fetchServices();
    } catch {
      toast.error('Failed to delete service');
    }
  };

  const handleSeed = async () => {
    try {
      await servicesAPI.seed();
      toast.success('Default services created');
      fetchServices();
    } catch {
      toast.error('Failed to seed services');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title="Services"
          description="Maintain loan packages, pricing, and service content."
          actions={(
            <>
              <Button variant="outline" onClick={handleSeed}>
                Seed Defaults
              </Button>
              <Button onClick={openCreateDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </>
          )}
        />

        {!loading && totalServices > 0 && (
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: 'Total services', value: stats.total },
              { label: 'Active services', value: stats.active },
              { label: 'Avg price', value: `RM ${stats.avgPrice}` },
            ].map((metric) => (
              <Card key={metric.label} className="bg-gradient-to-br from-white to-indigo-50/60 shadow-sm dark:from-slate-900 dark:to-indigo-950/20">
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
              <Sparkles className="h-4 w-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex flex-1 items-center gap-2">
              <Input
                placeholder="Search by service name or description"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 md:w-[220px]">
              <Label className="text-xs uppercase text-muted-foreground">Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="ELIGIBILITY_ANALYSIS">Eligibility Analysis</SelectItem>
                  <SelectItem value="DSR_CONSULTATION">DSR Consultation</SelectItem>
                  <SelectItem value="LOAN_APPLICATION">Loan Application</SelectItem>
                  <SelectItem value="CREDIT_REPAIR">Credit Repair</SelectItem>
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
                  <TableHead>Service</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, idx) => (
                    <TableRow key={`loading-${idx}`}>
                      <TableCell colSpan={6}>
                        <Skeleton className="h-8 w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : services.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <EmptyState
                        icon={<Sparkles className="h-5 w-5" />}
                        title="No services match your filters"
                        description="Try changing the search, type, or status filters."
                        action={{
                          label: 'Reset filters',
                          variant: 'outline',
                          onClick: () => {
                            setSearch('');
                            setTypeFilter('all');
                            setStatusFilter('all');
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ) : (
                  services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {service.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{service.type.replace('_', ' ')}</Badge>
                      </TableCell>
                      <TableCell>RM {service.price}</TableCell>
                      <TableCell>{service.features.length} features</TableCell>
                      <TableCell>
                        <Badge className={service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {service.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(service)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openHistory(service)}
                          >
                            <History className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(service.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <Pagination
              page={page}
              pageSize={pageSize}
              total={totalServices}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(1);
              }}
            />
          </CardContent>
        </Card>

        {/* Create/Edit Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingService ? 'Edit Service' : 'Create Service'}</DialogTitle>
              <DialogDescription>
                {editingService ? 'Update service details' : 'Add a new loan consultation service'}
              </DialogDescription>
            </DialogHeader>
            {editingService && lastServiceLog && (
              <p className="text-xs text-muted-foreground">
                Last updated by {lastServiceLog.actorName || lastServiceLog.actor?.name || 'System'} ·{' '}
                {new Date(lastServiceLog.createdAt).toLocaleString()}
              </p>
            )}
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Eligibility Analysis Package"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Complete credit and loan eligibility analysis"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price (RM)</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(v) => setFormData({ ...formData, type: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ELIGIBILITY_ANALYSIS">Eligibility Analysis</SelectItem>
                      <SelectItem value="DSR_CONSULTATION">DSR Consultation</SelectItem>
                      <SelectItem value="LOAN_APPLICATION">Loan Application</SelectItem>
                      <SelectItem value="CREDIT_REPAIR">Credit Repair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Features (one per line)</Label>
                <Textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Credit report analysis&#10;DSR calculation&#10;Bank recommendations"
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingService ? 'Update' : 'Create'}
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
