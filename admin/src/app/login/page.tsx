'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/Logo';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { DEMO_EMAIL, DEMO_PASSWORD, OFFLINE_MODE } from '@/lib/config';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const loginOffline = () => {
    const trimmedEmail = formData.email.trim().toLowerCase();
    const trimmedPassword = formData.password.trim();
    if (
      trimmedEmail !== DEMO_EMAIL.toLowerCase() ||
      trimmedPassword !== DEMO_PASSWORD
    ) {
      toast.error('Demo credentials do not match');
      return false;
    }

    setAuth(
      {
        id: 'offline-admin',
        email: trimmedEmail,
        name: 'Offline Admin',
        role: 'SUPER_ADMIN',
      },
      'offline-token',
    );
    toast.success('Offline mode activated');
    router.push('/');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };
      const response = await authAPI.login(payload);
      const { user, accessToken } = response.data;

      if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
        toast.error('Admin access required');
        setLoading(false);
        return;
      }

      setAuth(user, accessToken);
      toast.success('Welcome back!');
      router.push('/');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; code?: string };
      if (OFFLINE_MODE && (!err.response || err.code === 'ERR_NETWORK')) {
        const success = loginOffline();
        if (success) return;
      }

      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo size="md" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Sign in to access the admin dashboard</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@gurucredits.my"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {OFFLINE_MODE ? 'Sign In / Demo' : 'Sign In'}
            </Button>
            {OFFLINE_MODE && (
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Offline demo enabled — use {DEMO_EMAIL} / {DEMO_PASSWORD}
              </p>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
