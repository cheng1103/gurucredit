'use client';

import { useMemo } from 'react';
import { Shield, Clock, MessageCircle, CheckCircle2, AlertCircle, XCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Stat } from '@/components/layout';
import { COMPANY } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { calculateDsrOutcome, type DsrStatus } from '@/lib/dsr';
import { cn } from '@/lib/utils';
import type { Language } from '@/lib/i18n/translations';
import { APPLY_ANALYSIS_FEE, APPLY_LOAN_RATES, type ApplyPageContent, type ApplyServiceContent } from '@/lib/content/apply';
import type { ApplyFormData } from './ApplyWizard';

const DSR_TENURE_YEARS = 5;

const statusTone: Record<DsrStatus, { icon: typeof CheckCircle2; text: string }> = {
  approved: { icon: CheckCircle2, text: 'text-success' },
  conditional: { icon: AlertCircle, text: 'text-warning' },
  declined: { icon: XCircle, text: 'text-destructive' },
};

const dsrStatTone: Record<DsrStatus, 'default' | 'success' | 'primary'> = {
  approved: 'success',
  conditional: 'primary',
  declined: 'default',
};

export function ApplySidebar({
  serviceId,
  service,
  formData,
  t,
  language,
}: {
  serviceId: string;
  service: ApplyServiceContent;
  formData: ApplyFormData;
  t: ApplyPageContent;
  language: Language;
}) {
  const rate = APPLY_LOAN_RATES[serviceId] ?? APPLY_LOAN_RATES['1'];

  const openWhatsApp = () => {
    if (typeof window === 'undefined') return;
    trackEvent('apply_whatsapp_click', { service_id: serviceId, language });
    const popup = window.open(COMPANY.whatsappLink, '_blank', 'noopener,noreferrer');
    if (!popup) {
      window.location.href = COMPANY.whatsappLink;
    }
  };

  const income = parseFloat(formData.monthlyIncome) || 0;
  const loanAmount = parseFloat(formData.loanAmount) || 0;

  const dsr = useMemo(
    () =>
      calculateDsrOutcome({
        income,
        commitments: 0,
        loanAmount,
        tenureYears: DSR_TENURE_YEARS,
        interestRate: rate / 100,
      }),
    [income, loanAmount, rate],
  );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR', maximumFractionDigits: 0 }).format(value);

  const tone = dsr ? statusTone[dsr.status] : null;
  const StatusIcon = tone?.icon ?? ShieldCheck;

  return (
    <>
      <Card className="border-border/70">
        <CardContent className="space-y-3 p-4">
          <div className="text-xs text-foreground-subtle">{t.sidebar.analysisFee}</div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">RM{APPLY_ANALYSIS_FEE}</span>
            <span className="text-sm text-foreground-subtle">{t.sidebar.oneTime}</span>
          </div>
          <p className="text-sm text-foreground-muted">{service.description}</p>
          <div className="text-sm text-foreground-muted">
            <span>{t.sidebar.loanRate}: </span>
            <span className="font-semibold text-foreground">{rate}% </span>
            <span className="text-xs">{t.sidebar.rateNote}</span>
          </div>
          <div className="rounded-lg border border-primary/10 bg-primary/5 p-3 text-xs text-foreground-muted">
            {t.sidebar.paymentNote}
          </div>
          <Separator />
          <ul className="space-y-1.5 text-xs text-foreground-muted">
            {t.assurance.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2">
                <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                {bullet}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {service.spotlight && (
        <Card className="border-amber-200/70">
          <CardContent className="space-y-3 p-4">
            <p className="text-sm italic text-foreground-muted">{service.spotlight.quote}</p>
            <p className="text-xs text-foreground-subtle">— {service.spotlight.author}</p>
            <Separator />
            <p className="text-sm font-semibold text-foreground">{service.spotlight.faq.question}</p>
            <p className="text-sm text-foreground-muted">{service.spotlight.faq.answer}</p>
          </CardContent>
        </Card>
      )}

      <Card className="border-primary/20">
        <CardContent className="space-y-4 p-4">
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="size-5 text-primary" />
            </div>
            <p className="text-sm font-semibold text-foreground">{t.insights.title}</p>
          </div>

          {dsr && tone ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <StatusIcon className={cn('size-4', tone.text)} aria-hidden="true" />
                <span className={tone.text}>{t.insights.status[dsr.status]}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Stat
                  className="rounded-lg border border-border p-2"
                  value={formatCurrency(income)}
                  label={t.insights.income}
                />
                <Stat
                  className="rounded-lg border border-border p-2"
                  value={formatCurrency(loanAmount)}
                  label={t.insights.loanAsk}
                />
              </div>
              <Stat
                className="rounded-lg border border-border p-2"
                tone={dsrStatTone[dsr.status]}
                value={`${dsr.dsr.toFixed(1)}%`}
                label={t.insights.dsr}
              />
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-alt">
                <div
                  className={cn('h-full rounded-full', {
                    'bg-success': dsr.status === 'approved',
                    'bg-warning': dsr.status === 'conditional',
                    'bg-destructive': dsr.status === 'declined',
                  })}
                  style={{ width: `${Math.min(100, dsr.dsr)}%` }}
                />
              </div>
              <p className="text-xs leading-relaxed text-foreground-subtle">{t.insights.ctosNote}</p>
            </div>
          ) : (
            <p className="text-xs leading-relaxed text-foreground-subtle">{t.insights.placeholder}</p>
          )}
        </CardContent>
      </Card>

      <Card className="border-success/30">
        <CardContent className="space-y-4 p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-success-soft">
              <MessageCircle className="size-5 text-success" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{t.whatsappHelper.title}</p>
              <p className="text-sm text-foreground-muted">{t.whatsappHelper.description}</p>
            </div>
          </div>
          <p className="text-xs text-foreground-subtle">{t.whatsappHelper.responseTime}</p>
          <Button onClick={openWhatsApp} className="w-full gap-2">
            <MessageCircle className="size-4" />
            {t.whatsappHelper.button}
          </Button>
          <p className="text-center text-xs text-foreground-subtle">{t.whatsappHelper.subtext}</p>
        </CardContent>
      </Card>

      <Card className="border-border/70">
        <CardContent className="space-y-3 p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{t.sidebar.turnaround}</p>
              <p className="text-xs text-foreground-subtle">{t.sidebar.turnaroundDesc}</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{t.sidebar.confidential}</p>
              <p className="text-xs text-foreground-subtle">{t.sidebar.confidentialDesc}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-foreground-muted">
        <p>{t.sidebar.needHelp}</p>
        <button onClick={openWhatsApp} className="font-medium text-primary hover:underline">
          {COMPANY.whatsapp}
        </button>
        <p className="mt-1 text-xs">{t.whatsappHelper.responseTime}</p>
      </div>
    </>
  );
}
