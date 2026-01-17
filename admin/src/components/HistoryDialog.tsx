'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface HistoryLog {
  id: string;
  action: string;
  actorName?: string | null;
  actor?: { name?: string | null; email?: string | null } | null;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
}

interface HistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  logs: HistoryLog[];
  emptyText?: string;
}

export function HistoryDialog({
  open,
  onOpenChange,
  title,
  logs,
  emptyText = 'No activity recorded yet.',
}: HistoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[420px] space-y-3 overflow-y-auto pr-2 text-sm">
          {logs.length === 0 ? (
            <div className="rounded-lg border border-dashed bg-muted/30 p-4 text-muted-foreground">
              {emptyText}
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="rounded-lg border bg-muted/20 p-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{log.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {log.actorName || log.actor?.name || 'System'}
                      {log.actor?.email ? ` · ${log.actor.email}` : ''}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(log.createdAt).toLocaleString()}
                  </span>
                </div>
                {log.metadata && (
                  <pre className="mt-2 whitespace-pre-wrap text-xs text-muted-foreground">
                    {JSON.stringify(log.metadata, null, 2)}
                  </pre>
                )}
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
