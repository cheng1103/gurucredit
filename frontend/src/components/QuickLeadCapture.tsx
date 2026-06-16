'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, MessageCircle, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { leadsAPI } from '@/lib/api';
import { trackEvent } from '@/lib/analytics';
import { COMPANY, SERVICE_AREAS, type ServiceAreaCode } from '@/lib/constants';
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
    title: 'Check your approval fit before you apply',
    description:
      'Share four quick details. We will review the right route for your profile and WhatsApp you before you commit to a full application.',
    phoneLabel: 'WhatsApp number',
    phonePlaceholder: '01X-XXXX XXX',
    stateLabel: 'State',
    loanTypeLabel: 'What do you need?',
    incomeLabel: 'Income range',
    submit: 'Get My Quick Review',
    success: 'Thanks. Our consultant will WhatsApp you shortly.',
    helper: 'No documents needed for this first review.',
    benefits: [
      'See whether your profile looks workable first',
      'Get a faster WhatsApp follow-up with the right context',
      'Avoid submitting the wrong application path',
    ],
    whatsappButton: 'Chat on WhatsApp',
    errorPhone: 'Please enter a valid Malaysian phone number',
    genericError: 'Something went wrong. Please try again.',
  },
  ms: {
    badge: 'Semakan pantas 2 minit',
    title: 'Semak potensi kelulusan sebelum mohon',
    description:
      'Kongsi empat butiran ringkas. Kami akan semak laluan yang lebih sesuai untuk profil anda dan balas melalui WhatsApp sebelum anda hantar permohonan penuh.',
    phoneLabel: 'Nombor WhatsApp',
    phonePlaceholder: '01X-XXXX XXX',
    stateLabel: 'Negeri',
    loanTypeLabel: 'Apa yang anda perlukan?',
    incomeLabel: 'Julat pendapatan',
    submit: 'Dapatkan Semakan Pantas',
    success: 'Terima kasih. Perunding kami akan hubungi anda melalui WhatsApp sebentar lagi.',
    helper: 'Tiada dokumen diperlukan untuk semakan awal ini.',
    benefits: [
      'Lihat dulu sama ada profil anda nampak sesuai',
      'Dapat susulan WhatsApp yang lebih cepat dan tepat',
      'Elak hantar permohonan ke laluan yang salah',
    ],
    whatsappButton: 'Sembang di WhatsApp',
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
        className={cn(
          'rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900 shadow-sm',
          className,
        )}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold">{t.success}</p>
            <p className="text-emerald-800/80">{t.helper}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id={variant === 'hero' ? 'hero-quick-check' : undefined}
      className={cn(
        'rounded-3xl border border-border/70 bg-card/95 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.3)] backdrop-blur',
        variant === 'hero' ? 'p-5 sm:p-6' : 'border-0 bg-background p-0 shadow-none',
        className,
      )}
    >
      <div className={cn('space-y-5', variant === 'hero' ? '' : 'p-1')}>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            {t.badge}
          </div>
          <div className="space-y-1">
            <h2 className={cn('font-semibold text-foreground', variant === 'hero' ? 'text-xl' : 'text-lg')}>
              {t.title}
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{t.description}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={cn('grid gap-4', variant === 'hero' ? 'lg:grid-cols-2 xl:grid-cols-4' : 'grid-cols-1')}>
            <div className="space-y-2 xl:col-span-1">
              <Label htmlFor={`${source}-phone`}>{t.phoneLabel}</Label>
              <Input
                id={`${source}-phone`}
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder={t.phonePlaceholder}
                autoComplete="tel"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${source}-service-area`}>{t.stateLabel}</Label>
              <select
                id={`${source}-service-area`}
                value={serviceArea}
                onChange={(event) => setServiceArea(event.target.value as ServiceAreaCode)}
                className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                {SERVICE_AREAS.map((area) => (
                  <option key={area.regionCode} value={area.regionCode}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${source}-loan-type`}>{t.loanTypeLabel}</Label>
              <select
                id={`${source}-loan-type`}
                value={loanType}
                onChange={(event) => setLoanType(event.target.value)}
                className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                {loanTypeOptions[language].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${source}-income-band`}>{t.incomeLabel}</Label>
              <select
                id={`${source}-income-band`}
                value={incomeBand}
                onChange={(event) => setIncomeBand(event.target.value)}
                className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                {incomeBandOptions[language].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={cn('flex gap-3', variant === 'hero' ? 'flex-col xl:flex-row xl:items-center' : 'flex-col')}>
            <Button type="submit" className="h-11 px-6 text-sm font-semibold" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {t.submit}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground xl:flex-1 xl:flex-row xl:items-center xl:justify-between">
              <span>{t.helper}</span>
              <a
                href={COMPANY.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('quick_lead_whatsapp_click', { source, placement: variant })}
                className="inline-flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{t.whatsappButton}</span>
              </a>
            </div>
          </div>
        </form>

        {variant === 'hero' && (
          <div className="grid gap-3 border-t border-border/70 pt-4 text-sm text-muted-foreground sm:grid-cols-3">
            {t.benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
