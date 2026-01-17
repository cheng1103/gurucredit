'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Users,
  Package,
  Settings,
  LogOut,
  MessageSquare,
  Mail,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OFFLINE_MODE } from '@/lib/config';

const menuSections = [
  {
    title: 'Overview',
    items: [{ href: '/', icon: LayoutDashboard, label: 'Dashboard' }],
  },
  {
    title: 'Operations',
    items: [
      { href: '/applications', icon: FileText, label: 'Applications' },
      { href: '/leads', icon: PhoneCall, label: 'Leads' },
      { href: '/messages', icon: MessageSquare, label: 'Messages' },
      { href: '/newsletter', icon: Mail, label: 'Newsletter' },
    ],
  },
  {
    title: 'Management',
    items: [
      { href: '/users', icon: Users, label: 'Users' },
      { href: '/team', icon: UserCheck, label: 'Team' },
      { href: '/services', icon: Package, label: 'Services' },
      { href: '/audit', icon: ShieldCheck, label: 'Audit Logs' },
      { href: '/settings', icon: Settings, label: 'Settings' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuthStore();

  return (
    <div className="flex h-full w-72 flex-col border-r bg-gradient-to-b from-white to-muted/40 dark:from-slate-950 dark:to-slate-900/60">
      <div className="flex flex-col gap-4 border-b px-6 py-5">
        <Logo size="sm" />
        <div className="rounded-2xl border bg-card/70 p-3 text-sm text-muted-foreground shadow-sm">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
            <Sparkles className="h-3 w-3" /> Productivity Tip
          </p>
          <p className="mt-1 text-sm">
            Review pending applications twice daily to keep approvals flowing.
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
        {menuSections.map((section) => (
          <div key={section.title} className="space-y-2">
            <p className="px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {section.title}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="flex-1">{item.label}</span>
                    {item.href === '/applications' && (
                      <Badge variant="outline" className="text-xs">
                        Live
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t px-5 py-4">
        <div className="mb-4 flex items-center gap-3 rounded-2xl border bg-card/70 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold uppercase text-primary">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user?.name}</p>
            <p className="truncate text-xs text-muted-foreground capitalize">
              {user?.role?.toLowerCase()}
            </p>
          </div>
        </div>
        {OFFLINE_MODE && (
          <div className="mb-3 rounded-xl border border-dashed bg-amber-50/80 p-3 text-xs text-amber-700 dark:bg-amber-500/10 dark:text-amber-100">
            Offline demo mode enabled
          </div>
        )}
        <Button variant="outline" className="w-full justify-start" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
