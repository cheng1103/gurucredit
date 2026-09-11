'use client';

import { useState } from 'react';
import { FormLayout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Hourglass, Send, SearchX, MessageCircle, RefreshCw } from 'lucide-react';
import { applicationsAPI } from '@/lib/api';
import { toast } from 'sonner';
import { COMPANY } from '@/lib/constants';
import { PATHS } from '@/lib/i18n/routes';
import type { Language } from '@/lib/i18n/translations';
import { useTranslation } from '@/lib/i18n';
import { statusContent } from '@/lib/content/status';

interface StatusResult {
  id: string;
  applicantName: string;
  status: string;
  createdAt: string;
  contactPreference?: string | null;
  referralSource?: string | null;
  serviceName?: string | null;
  loanAmount?: number | null;
}

export default function StatusContent({ language }: { language: Language }) {
  const t = statusContent[language] ?? statusContent.en;
  const { t: translate } = useTranslation();
  const [form, setForm] = useState({ referenceId: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [result, setResult] = useState<StatusResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotFound(false);
    if (!form.referenceId || !form.email) {
      toast.error(translate('toast.statusMissingFields'));
      return;
    }

    setLoading(true);
    try {
      const response = await applicationsAPI.getStatusByReference({
        referenceId: form.referenceId.trim(),
        email: form.email.trim(),
      });
      setResult(response.data);
    } catch (error: unknown) {
      const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setNotFound(true);
      setResult(null);
      if (message) toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setForm({ referenceId: '', email: '' });
    setNotFound(false);
    setResult(null);
  };

  const formatDate = (value?: string) => {
    if (!value) return '-';
    return new Date(value).toLocaleString(language === 'ms' ? 'ms-MY' : 'en-MY', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
  };

  const statusLabel = result?.status
    ? t.statusLabels[result.status as keyof typeof t.statusLabels] || result.status
    : null;

  return (
    <FormLayout
      breadcrumbs={[{ label: t.breadcrumbHome, href: PATHS.home }, { label: t.breadcrumbLabel }]}
      eyebrow={t.eyebrow}
      title={t.title}
      meta={t.meta}
      sidebar={
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t.help.title}</CardTitle>
            <CardDescription>{t.help.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-foreground-subtle">
              {t.notFound.hints.prefix} <code className="font-mono font-semibold">GC</code>{' '}
              {t.notFound.hints.example} <code className="font-mono font-semibold">GC20260418ABC123</code>)
            </p>
            <Button asChild className="w-full gap-2">
              <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" />
                {t.help.button}
              </a>
            </Button>
          </CardContent>
        </Card>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>{t.formTitle}</CardTitle>
          <CardDescription>{t.formDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="reference">{t.referenceLabel}</Label>
              <Input
                id="reference"
                placeholder={t.referencePlaceholder}
                value={form.referenceId}
                onChange={(e) => setForm({ ...form, referenceId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t.emailLabel}</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Hourglass className="size-4 animate-spin" /> : <Send className="size-4" />}
              {t.button}
            </Button>
          </form>
        </CardContent>
      </Card>

      {notFound && !result && (
        <Card className="mt-6 border-warning/30 bg-warning-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <SearchX className="size-5" />
              {t.notFound.title}
            </CardTitle>
            <CardDescription className="text-foreground-muted">{t.notFound.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex gap-2">
                <span aria-hidden="true">·</span>
                <span>
                  {t.notFound.hints.prefix} <code className="font-mono font-semibold">GC</code>{' '}
                  {t.notFound.hints.example} <code className="font-mono font-semibold">GC20260418ABC123</code>)
                </span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">·</span>
                <span>{t.notFound.hints.email}</span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden="true">·</span>
                <span>{t.notFound.hints.delay}</span>
              </li>
            </ul>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button type="button" variant="outline" onClick={clearSearch}>
                <RefreshCw className="size-4" />
                {t.notFound.retry}
              </Button>
              <Button asChild>
                <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" />
                  {t.notFound.whatsapp}
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="size-5 text-primary" />
              {t.resultTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              {statusLabel && <Badge variant="secondary">{statusLabel}</Badge>}
              {result.serviceName && <Badge variant="outline">{result.serviceName}</Badge>}
              {typeof result.loanAmount === 'number' && (
                <span className="text-sm text-foreground-muted">RM{Intl.NumberFormat().format(result.loanAmount)}</span>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs text-foreground-subtle">{t.createdAt}</p>
                <p className="font-medium text-foreground">{formatDate(result.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs text-foreground-subtle">{t.contactPref}</p>
                <p className="font-medium capitalize text-foreground">{result.contactPreference || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-foreground-subtle">{t.referral}</p>
                <p className="font-medium text-foreground">{result.referralSource || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-foreground-subtle">{t.referenceWord}</p>
                <p className="break-all font-mono text-sm text-foreground">{result.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!result && !loading && <p className="mt-6 text-center text-sm text-foreground-muted">{t.empty}</p>}
    </FormLayout>
  );
}
