'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Hourglass, Send } from 'lucide-react';
import { applicationsAPI } from '@/lib/api';
import { toast } from 'sonner';
import type { Language } from '@/lib/i18n/translations';
import { useTranslation } from '@/lib/i18n';
import { COMPANY } from '@/lib/constants';

const content = {
  en: {
    badge: 'Status Tracker',
    title: 'Check Application Status',
    subtitle: 'Use your reference ID and email to view the latest update from our consultants.',
    referenceLabel: 'Reference ID',
    referencePlaceholder: 'e.g. b0c2a52e-1234-4dd9-92cc-ff9f41a1bcde',
    emailLabel: 'Email used in application',
    button: 'Check status',
    resultTitle: 'Status overview',
    createdAt: 'Submitted on',
    contactPref: 'Preferred WhatsApp time',
    referral: 'Referral source',
    empty: 'Enter your reference ID and email to see updates. Our consultant will follow up via WhatsApp.',
    formTitle: 'Find my application',
    formDescription: 'Enter both fields to continue',
    highlights: [
      { title: 'Live updates', description: 'See the latest status in seconds.' },
      { title: 'WhatsApp follow-up', description: 'Our team responds within working hours.' },
      { title: 'Secure lookup', description: 'We only use your reference and email.' },
    ],
    help: {
      title: 'Need help?',
      description: 'Share your reference ID with our consultant for faster support.',
      button: 'Chat on WhatsApp',
    },
  },
  ms: {
    badge: 'Penjejak Status',
    title: 'Semak Status Permohonan',
    subtitle: 'Masukkan ID rujukan dan e-mel untuk melihat kemaskini terkini.',
    referenceLabel: 'ID Rujukan',
    referencePlaceholder: 'cth. b0c2a52e-1234-4dd9-92cc-ff9f41a1bcde',
    emailLabel: 'E-mel yang digunakan',
    button: 'Semak status',
    resultTitle: 'Ringkasan status',
    createdAt: 'Dihantar pada',
    contactPref: 'Masa WhatsApp pilihan',
    referral: 'Sumber rujukan',
    empty: 'Masukkan ID rujukan & e-mel anda untuk melihat kemaskini. Perunding kami akan menghubungi melalui WhatsApp.',
    formTitle: 'Cari permohonan saya',
    formDescription: 'Masukkan kedua-dua maklumat untuk meneruskan',
    highlights: [
      { title: 'Kemaskini segera', description: 'Lihat status terkini dalam beberapa saat.' },
      { title: 'Susulan WhatsApp', description: 'Pasukan kami membalas pada waktu pejabat.' },
      { title: 'Semakan selamat', description: 'Hanya gunakan ID rujukan dan e-mel.' },
    ],
    help: {
      title: 'Perlukan bantuan?',
      description: 'Kongsi ID rujukan dengan perunding untuk bantuan pantas.',
      button: 'Sembang di WhatsApp',
    },
  },
};

const statusCopy = {
  PENDING: { en: 'Pending review', ms: 'Menunggu semakan' },
  IN_REVIEW: { en: 'In review', ms: 'Sedang disemak' },
  APPROVED: { en: 'Approved', ms: 'Diluluskan' },
  REJECTED: { en: 'Not suitable', ms: 'Tidak sesuai' },
  COMPLETED: { en: 'Completed', ms: 'Selesai' },
};

interface StatusContentProps {
  language: Language;
}

export default function StatusContent({ language }: StatusContentProps) {
  const t = content[language];
  const { t: translate } = useTranslation();
  const [form, setForm] = useState({ referenceId: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    id: string;
    applicantName: string;
    status: string;
    createdAt: string;
    contactPreference?: string | null;
    referralSource?: string | null;
    serviceName?: string | null;
    loanAmount?: number | null;
  }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message;
      toast.error(message || translate('toast.statusLookup'));
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (value?: string) => {
    if (!value) return '-';
    return new Date(value).toLocaleString(language === 'ms' ? 'ms-MY' : 'en-MY', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
  };

  const statusLabel = result?.status
    ? statusCopy[result.status as keyof typeof statusCopy]?.[language] || result.status
    : null;

  return (
    <div className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="container max-w-3xl relative">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3">
            <Hourglass className="h-3 w-3 mr-1" />
            {t.badge}
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">{t.title}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {t.highlights.map((item) => (
              <Card key={item.title} className="p-4 text-left surface-card">
                <div className="text-sm font-semibold text-foreground">{item.title}</div>
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <Card className="mb-8 surface-card">
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
              <Button type="submit" className="w-full btn-gradient text-primary-foreground" disabled={loading}>
                {loading ? <Hourglass className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                {t.button}
              </Button>
            </form>
          </CardContent>
        </Card>

        {result && (
          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                {t.resultTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {statusLabel && <Badge variant="secondary">{statusLabel}</Badge>}
                {result.serviceName && (
                  <Badge variant="outline">{result.serviceName}</Badge>
                )}
                {typeof result.loanAmount === 'number' && (
                  <span className="text-sm text-muted-foreground">
                    RM{Intl.NumberFormat().format(result.loanAmount)}
                  </span>
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">{t.createdAt}</p>
                  <p className="font-medium">{formatDate(result.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t.contactPref}</p>
                  <p className="font-medium capitalize">{result.contactPreference || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t.referral}</p>
                  <p className="font-medium">{result.referralSource || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Reference</p>
                  <p className="font-mono text-sm break-all">{result.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!result && !loading && (
          <p className="text-center text-sm text-muted-foreground mt-6">{t.empty}</p>
        )}

        <div className="mt-10">
          <Card className="bg-gradient-to-br from-primary/5 via-background to-primary/10 border border-primary/20 surface-card">
            <CardContent className="py-8 text-center">
              <h2 className="text-xl font-bold mb-2">{t.help.title}</h2>
              <p className="text-muted-foreground mb-6">{t.help.description}</p>
              <Button className="btn-gradient text-primary-foreground" asChild>
                <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                  {t.help.button}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
