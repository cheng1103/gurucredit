import { DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SERVICE_AREAS } from '@/lib/constants';
import { getFieldError } from '@/lib/validation';
import { cn } from '@/lib/utils';
import type { ApplyPageContent } from '@/lib/content/apply';
import type { ApplyFormData } from '../ApplyWizard';

export function Step1Eligibility({
  t,
  formData,
  errors,
  onChange,
  onBlur,
}: {
  t: ApplyPageContent;
  formData: ApplyFormData;
  errors: Record<string, string>;
  onChange: (field: keyof ApplyFormData, value: string) => void;
  onBlur: (field: keyof ApplyFormData) => void;
}) {
  const serviceAreaHasError = !!getFieldError(errors, 'serviceArea');
  const monthlyIncomeHasError = !!getFieldError(errors, 'monthlyIncome');
  const loanAmountHasError = !!getFieldError(errors, 'loanAmount');

  return (
    <>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground-muted">
        {t.stepIntro}
      </div>

      <div className="space-y-2">
        <Label htmlFor="serviceArea">{t.form.serviceArea.label} *</Label>
        <select
          id="serviceArea"
          value={formData.serviceArea}
          onChange={(e) => onChange('serviceArea', e.target.value)}
          onBlur={() => onBlur('serviceArea')}
          className={cn(
            'h-11 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-foreground outline-none transition-[border-color,box-shadow] hover:border-border-strong focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/20',
            serviceAreaHasError && 'border-destructive focus-visible:ring-destructive/20',
          )}
          aria-invalid={serviceAreaHasError}
          aria-describedby={serviceAreaHasError ? 'serviceArea-error' : undefined}
        >
          {SERVICE_AREAS.map((area) => (
            <option key={area.regionCode} value={area.regionCode}>
              {area.name}
            </option>
          ))}
        </select>
        {serviceAreaHasError ? (
          <p id="serviceArea-error" className="text-sm text-destructive">{getFieldError(errors, 'serviceArea')}</p>
        ) : (
          <p className="text-xs text-foreground-subtle">{t.form.serviceArea.helper}</p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="monthlyIncome">{t.form.monthlyIncome} *</Label>
          <div className="relative">
            <DollarSign className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-foreground-subtle" />
            <Input
              id="monthlyIncome"
              type="number"
              placeholder="5000"
              value={formData.monthlyIncome}
              onChange={(e) => onChange('monthlyIncome', e.target.value)}
              onBlur={() => onBlur('monthlyIncome')}
              className="pl-10"
              aria-invalid={monthlyIncomeHasError}
              aria-describedby={monthlyIncomeHasError ? 'monthlyIncome-error' : undefined}
              inputMode="numeric"
              min="0"
              required
            />
          </div>
          {monthlyIncomeHasError ? (
            <p id="monthlyIncome-error" className="text-sm text-destructive">{getFieldError(errors, 'monthlyIncome')}</p>
          ) : (
            <p className="text-xs text-foreground-subtle">{t.form.incomeNote}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="loanAmount">{t.form.desiredAmount} *</Label>
          <div className="relative">
            <DollarSign className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-foreground-subtle" />
            <Input
              id="loanAmount"
              type="number"
              placeholder="50000"
              value={formData.loanAmount}
              onChange={(e) => onChange('loanAmount', e.target.value)}
              onBlur={() => onBlur('loanAmount')}
              className="pl-10"
              aria-invalid={loanAmountHasError}
              aria-describedby={loanAmountHasError ? 'loanAmount-error' : undefined}
              inputMode="numeric"
              min="0"
              required
            />
          </div>
          {loanAmountHasError ? (
            <p id="loanAmount-error" className="text-sm text-destructive">{getFieldError(errors, 'loanAmount')}</p>
          ) : (
            <p className="text-xs text-foreground-subtle">{t.form.desiredAmountNote}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>{t.quickQuestions.contactPreference}</Label>
        <div
          role="group"
          aria-label={t.quickQuestions.contactPreference}
          className="grid grid-cols-2 gap-2"
        >
          {t.quickQuestions.options.map((pref) => {
            const selected = formData.contactPreference === pref.value;
            return (
              <button
                key={pref.value}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange('contactPreference', pref.value)}
                className={cn(
                  'rounded-lg border p-2 text-xs transition-colors sm:text-sm',
                  selected
                    ? 'border-primary bg-primary/5 font-medium text-primary'
                    : 'border-border hover:border-primary/40',
                )}
              >
                {pref.label}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-foreground-subtle">{t.quickQuestions.contactNote}</p>
      </div>
    </>
  );
}
