import { User, Phone, Mail, Briefcase, Building2, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EMPLOYMENT_TYPES } from '@/lib/form-options';
import { getFieldError } from '@/lib/validation';
import { cn } from '@/lib/utils';
import type { ApplyPageContent } from '@/lib/content/apply';
import type { ApplyFormData } from '../ApplyWizard';

type EmploymentLabelKey = 'employed' | 'selfEmployed' | 'business' | 'freelance';

const EMPLOYMENT_LABEL_KEY: Record<(typeof EMPLOYMENT_TYPES)[number], EmploymentLabelKey> = {
  employed: 'employed',
  'self-employed': 'selfEmployed',
  business: 'business',
  freelance: 'freelance',
};

const isValidEmail = (value: string) => /^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(value.trim());
const isValidPhone = (value: string) => /^(\+?60|0)[0-9\s-]{8,14}$/.test(value.trim());

export function Step2Contact({
  t,
  formData,
  errors,
  onChange,
  onBlur,
  onEmploymentTypeChange,
}: {
  t: ApplyPageContent;
  formData: ApplyFormData;
  errors: Record<string, string>;
  onChange: (field: keyof ApplyFormData, value: string) => void;
  onBlur: (field: keyof ApplyFormData) => void;
  onEmploymentTypeChange: (value: string) => void;
}) {
  const emailValid = isValidEmail(formData.email);
  const phoneValid = isValidPhone(formData.phone);
  const nameHasError = !!getFieldError(errors, 'name');
  const phoneHasError = !!getFieldError(errors, 'phone');
  const emailHasError = !!getFieldError(errors, 'email');

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t.form.fullName} *</Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-foreground-subtle" />
            <Input
              id="name"
              placeholder={t.form.fullNamePlaceholder}
              value={formData.name}
              onChange={(e) => onChange('name', e.target.value)}
              onBlur={() => onBlur('name')}
              className="pl-10"
              aria-invalid={nameHasError}
              aria-describedby={nameHasError ? 'name-error' : undefined}
              autoComplete="name"
              required
            />
          </div>
          {nameHasError && (
            <p id="name-error" className="text-sm text-destructive">{getFieldError(errors, 'name')}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{t.form.phone} *</Label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-foreground-subtle" />
            <Input
              id="phone"
              type="tel"
              placeholder="+60 12-345 6789"
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              onBlur={() => onBlur('phone')}
              className="pl-10 pr-10"
              aria-invalid={phoneHasError}
              aria-describedby={phoneHasError ? 'phone-error' : undefined}
              autoComplete="tel"
              required
            />
            {phoneValid && !phoneHasError && (
              <CheckCircle
                className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-success"
                aria-label={t.a11y.validPhone}
              />
            )}
          </div>
          {phoneHasError && (
            <p id="phone-error" className="text-sm text-destructive">{getFieldError(errors, 'phone')}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t.form.email} *</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-foreground-subtle" />
          <Input
            id="email"
            type="email"
            placeholder={t.form.emailPlaceholder}
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            onBlur={() => onBlur('email')}
            className="pl-10 pr-10"
            aria-invalid={emailHasError}
            aria-describedby={emailHasError ? 'email-error' : undefined}
            autoComplete="email"
            required
          />
          {emailValid && !emailHasError && (
            <CheckCircle
              className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-success"
              aria-label={t.a11y.validEmail}
            />
          )}
        </div>
        {emailHasError ? (
          <p id="email-error" className="text-sm text-destructive">{getFieldError(errors, 'email')}</p>
        ) : (
          <p className="text-xs text-foreground-subtle">{t.form.emailNote}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>{t.form.employmentType} *</Label>
        <div role="group" aria-label={t.form.employmentType} className="grid grid-cols-2 gap-3">
          {EMPLOYMENT_TYPES.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={formData.employmentType === value}
              onClick={() => onEmploymentTypeChange(value)}
              className={cn(
                'rounded-lg border-2 p-3 text-sm font-medium transition-colors',
                formData.employmentType === value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-primary/50',
              )}
            >
              {t.form[EMPLOYMENT_LABEL_KEY[value]]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="employerName">{t.form.companyName}</Label>
          <div className="relative">
            <Building2 className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-foreground-subtle" />
            <Input
              id="employerName"
              placeholder={t.form.companyPlaceholder}
              value={formData.employerName}
              onChange={(e) => onChange('employerName', e.target.value)}
              onBlur={() => onBlur('employerName')}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle">{t.form.jobTitle}</Label>
          <div className="relative">
            <Briefcase className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-foreground-subtle" />
            <Input
              id="jobTitle"
              placeholder={t.form.jobPlaceholder}
              value={formData.jobTitle}
              onChange={(e) => onChange('jobTitle', e.target.value)}
              onBlur={() => onBlur('jobTitle')}
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </>
  );
}
