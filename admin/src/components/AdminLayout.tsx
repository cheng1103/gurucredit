'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '@/lib/store';
import { TopBar } from './TopBar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [ready, setReady] = useState(useAuthStore.persist.hasHydrated());

  useEffect(() => {
    if (ready) return;
    const unsub = useAuthStore.persist.onFinishHydration?.(() => {
      setReady(true);
    });
    return () => {
      unsub?.();
    };
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user && user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router, ready]);

  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="relative flex h-screen bg-gradient-to-br from-[#eef2ff] via-[#f6f7fb] to-[#e3ecff] dark:from-[#050713] dark:via-[#0c1024] dark:to-[#050713]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(132,100,255,0.15),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(94,86,255,0.25),_transparent_55%)]" />
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="relative flex-1 overflow-auto px-6 py-6">
          <div className="mx-auto max-w-6xl space-y-6 rounded-3xl bg-white/70 p-6 shadow-xl ring-1 ring-black/[0.03] backdrop-blur dark:bg-slate-950/60 dark:ring-white/10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
