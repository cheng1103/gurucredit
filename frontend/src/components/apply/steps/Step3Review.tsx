import { User, Briefcase, Shield } from 'lucide-react';
import { SERVICE_AREAS } from '@/lib/constants';
import type { ApplyPageContent } from '@/lib/content/apply';
import type { ApplyFormData } from '../ApplyWizard';

export function Step3Review({
  t,
  formData,
}: {
  t: ApplyPageContent;
  formData: ApplyFormData;
}) {
  const serviceAreaName =
    SERVICE_AREAS.find((area) => area.regionCode === formData.serviceArea)?.name || formData.serviceArea;
  const contactPreferenceLabel = t.quickQuestions.options.find(
    (pref) => pref.value === formData.contactPreference,
  )?.label;

  return (
    <>
      <div className="space-y-4">
        <div className="rounded-lg bg-surface-alt p-4">
          <h4 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
            <User className="size-4 text-primary" />
            {t.reviewSection.personalInfo}
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-foreground-muted">{t.reviewSection.name}:</div>
            <div className="font-medium">{formData.name}</div>
            <div className="text-foreground-muted">{t.reviewSection.email}:</div>
            <div className="font-medium">{formData.email}</div>
            <div className="text-foreground-muted">{t.reviewSection.phone}:</div>
            <div className="font-medium">{formData.phone}</div>
            <div className="text-foreground-muted">{t.reviewSection.serviceArea}:</div>
            <div className="font-medium">{serviceAreaName}</div>
            {formData.contactPreference && (
              <>
                <div className="text-foreground-muted">{t.quickQuestions.contactPreference}:</div>
                <div className="font-medium">{contactPreferenceLabel}</div>
              </>
            )}
          </div>
        </div>

        <div className="rounded-lg bg-surface-alt p-4">
          <h4 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
            <Briefcase className="size-4 text-primary" />
            {t.reviewSection.employmentDetails}
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-foreground-muted">{t.reviewSection.type}:</div>
            <div className="font-medium capitalize">{formData.employmentType}</div>
            {formData.employerName && (
              <>
                <div className="text-foreground-muted">{t.reviewSection.company}:</div>
                <div className="font-medium">{formData.employerName}</div>
              </>
            )}
            <div className="text-foreground-muted">{t.reviewSection.income}:</div>
            <div className="font-medium">RM {parseInt(formData.monthlyIncome || '0', 10).toLocaleString()}</div>
            <div className="text-foreground-muted">{t.reviewSection.desiredAmount}:</div>
            <div className="font-medium">RM {parseInt(formData.loanAmount || '0', 10).toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 size-5 text-primary" />
          <div>
            <p className="text-sm font-medium">{t.security.title}</p>
            <p className="text-xs text-foreground-muted">{t.security.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
