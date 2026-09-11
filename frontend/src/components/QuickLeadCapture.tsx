'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { leadsAPI } from '@/lib/api';
import { trackEvent } from '@/lib/analytics';
import { SERVICE_AREAS, type ServiceAreaCode } from '@/lib/constants';
import type { Language } from '@/lib/i18n/translations';
import { cn } from '@/lib/utils';

type QuickLeadVariant = 'hero' | 'sheet';

type QuickLeadCaptureProps = {
  language: Language;
  source: string;
  variant?: QuickLeadVariant;
  className?: string;
  onSuccess?: () => void;
};

const copy = {
  en: {
    badge: '2-minute quick check',
    title: 'Check your approval fit in 2 minutes',
    phoneLabel: 'WhatsApp number',
    phonePlaceholder: '01X-XXXX XXX',
    stateLabel: 'State',
    loanTypeLabel: 'What do you need?',
    incomeLabel: 'Income range',
    submit: 'Get My Quick Review',
    success: 'Thanks. Our consultant will WhatsApp you shortly.',
    helper: 'No documents needed for this first review.',
    errorPhone: 'Please enter a valid Malaysian phone number',
    genericError: 'Something went wrong. Please try again.',
  },
  ms: {
    badge: 'Semakan pantas 2 minit',
    title: 'Semak potensi kelulusan dalam 2 minit',
    phoneLabel: 'Nombor WhatsApp',
    phonePlaceholder: '01X-XXXX XXX',
    stateLabel: 'Negeri',
    loanTypeLabel: 'Apa yang anda perlukan?',
    incomeLabel: 'Julat pendapatan',
    submit: 'Dapatkan Semakan Pantas',
    success: 'Terima kasih. Perunding kami akan hubungi anda melalui WhatsApp sebentar lagi.',
    helper: 'Tiada dokumen diperlukan untuk semakan awal ini.',
    errorPhone: 'Sila masukkan nombor telefon Malaysia yang sah',
    genericError: 'Ada masalah semasa menghantar. Sila cuba lagi.',
  },
} as const;

const loanTypeOptions = {
  en: [
    { value: 'personal-loan', label: 'Personal loan' },
    { value: 'debt-consolidation', label: 'Debt consolidation' },
    { value: 'emergency-loan', label: 'Emergency loan' },
    { value: 'business-loan', label: 'Business loan' },
    { value: 'home-loan', label: 'Home loan' },
    { value: 'car-loan', label: 'Car loan' },
  ],
  ms: [
    { value: 'personal-loan', label: 'Pinjaman peribadi' },
    { value: 'debt-consolidation', label: 'Penyatuan hutang' },
    { value: 'emergency-loan', label: 'Pinjaman kecemasan' },
    { value: 'business-loan', label: 'Pinjaman perniagaan' },
    { value: 'home-loan', label: 'Pinjaman rumah' },
    { value: 'car-loan', label: 'Pinjaman kereta' },
  ],
} as const;

const incomeBandOptions = {
  en: [
    { value: 'below-rm3000', label: 'Below RM3,000' },
    { value: 'rm3000-rm5000', label: 'RM3,000 - RM5,000' },
    { value: 'rm5000-rm8000', label: 'RM5,000 - RM8,000' },
    { value: 'above-rm8000', label: 'Above RM8,000' },
  ],
  ms: [
    { value: 'below-rm3000', label: 'Bawah RM3,000' },
    { value: 'rm3000-rm5000', label: 'RM3,000 - RM5,000' },
    { value: 'rm5000-rm8000', label: 'RM5,000 - RM8,000' },
    { value: 'above-rm8000', label: 'Lebih RM8,000' },
  ],
} as const;

const phonePattern = /^(\+?6?0)[0-9]{1,2}[-\s]?[0-9]{3,4}[-\s]?[0-9]{4}$/;

export function QuickLeadCapture({
  language,
  source,
  variant = 'hero',
  className,
  onSuccess,
}: QuickLeadCaptureProps) {
  const t = copy[language];
  const [phone, setPhone] = useState('');
  const [serviceArea, setServiceArea] = useState<ServiceAreaCode>(SERVICE_AREAS[0].regionCode as ServiceAreaCode);
  const [loanType, setLoanType] = useState('personal-loan');
  const [incomeBand, setIncomeBand] = useState('rm3000-rm5000');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedLoanLabel = useMemo(
    () => loanTypeOptions[language].find((option) => option.value === loanType)?.label ?? loanType,
    [language, loanType],
  );
  const selectedIncomeLabel = useMemo(
    () => incomeBandOptions[language].find((option) => option.value === incomeBand)?.label ?? incomeBand,
    [language, incomeBand],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!phonePattern.test(phone.trim())) {
      toast.error(t.errorPhone);
      return;
    }

    setIsLoading(true);
    try {
      await leadsAPI.capture({
        phone: phone.trim(),
        serviceArea,
        source,
        language,
        pageUrl: typeof window !== 'undefined' ? window.location.pathname : undefined,
        notes: `loanType=${selectedLoanLabel}; incomeBand=${selectedIncomeLabel}`,
      });

      trackEvent('quick_lead_submit', {
        source,
        service_area: serviceArea,
        loan_type: loanType,
        income_band: incomeBand,
      });

      setIsSubmitted(true);
      toast.success(t.success);
      onSuccess?.();
    } catch (error) {
      console.error('Quick lead capture failed', error);
      trackEvent('quick_lead_submit_error', { source, service_area: serviceArea });
      toast.error(t.genericError);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        id={variant === 'hero' ? 'hero-quick-check' : undefined}
        className={cn('rounded-2xl border border-success/30 bg-success-soft p-5 text-sm text-foreground', className)}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
          <div className="space-y-1">
            <p className="font-semibold">{t.success}</p>
            <p className="text-foreground-muted">{t.helper}</p>
          </div>
        </div>
      </div>
    );
  }

  const selectClass =
    'h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm text-foreground outline-none transition-[border-color,box-shadow] hover:border-border-strong focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/20';

  return (
    <div
      id={variant === 'hero' ? 'hero-quick-check' : undefined}
      className={cn(
        variant === 'hero'
          ? 'rounded-2xl border border-border bg-surface p-5 shadow-float sm:p-6'
          : 'p-0',
        className,
      )}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-base font-semibold text-foreground">{t.title}</p>
          <p className="text-sm text-foreground-muted">{t.helper}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">
          <ShieldCheck className="size-3.5" />
          {t.badge}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={cn('grid gap-3', variant === 'hero' ? 'sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1')}>
          <div className="space-y-1.5">
            <Label htmlFor={`${source}-phone`}>{t.phoneLabel}</Label>
            <Input
              id={`${source}-phone`}
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder={t.phonePlaceholder}
              autoComplete="tel"
              inputMode="tel"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`${source}-service-area`}>{t.stateLabel}</Label>
            <select id={`${source}-service-area`} value={serviceArea} onChange={(event) => setServiceArea(event.target.value as ServiceAreaCode)} className={selectClass}>
              {SERVICE_AREAS.map((area) => (
                <option key={area.regionCode} value={area.regionCode}>{area.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`${source}-loan-type`}>{t.loanTypeLabel}</Label>
            <select id={`${source}-loan-type`} value={loanType} onChange={(event) => setLoanType(event.target.value)} className={selectClass}>
              {loanTypeOptions[language].map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`${source}-income-band`}>{t.incomeLabel}</Label>
            <select id={`${source}-income-band`} value={incomeBand} onChange={(event) => setIncomeBand(event.target.value)} className={selectClass}>
              {incomeBandOptions[language].map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        <Button type="submit" className="w-full sm:w-auto" disabled={isLoading} aria-busy={isLoading}>
          {t.submit}
          {isLoading ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
        </Button>
      </form>
    </div>
  );
}
