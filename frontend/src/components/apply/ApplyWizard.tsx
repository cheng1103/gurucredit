'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { FormLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { applicationsAPI } from '@/lib/api';
import { trackEvent } from '@/lib/analytics';
import { useLanguage } from '@/lib/i18n';
import { PATHS, localeHref } from '@/lib/i18n/routes';
import { SERVICE_AREAS } from '@/lib/constants';
import { loanApplicationSchema, validateForm } from '@/lib/validation';
import { applyContent, type ApplyServiceContent } from '@/lib/content/apply';
import { getIncomeBand } from './analytics';
import { Stepper } from './Stepper';
import { ApplySidebar } from './ApplySidebar';
import { Step1Eligibility } from './steps/Step1Eligibility';
import { Step2Contact } from './steps/Step2Contact';
import { Step3Review } from './steps/Step3Review';

interface ApiError {
  response?: { data?: { message?: string } };
}

export interface ApplyFormData {
  name: string;
  email: string;
  phone: string;
  serviceArea: string;
  employmentType: string;
  employerName: string;
  jobTitle: string;
  monthlyIncome: string;
  loanAmount: string;
  contactPreference: string;
}

const TOTAL_STEPS = 3;

export function ApplyWizard({ serviceId, service }: { serviceId: string; service: ApplyServiceContent }) {
  const { language } = useLanguage();
  const t = applyContent[language];
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<ApplyFormData>({
    name: '',
    email: '',
    phone: '',
    serviceArea: SERVICE_AREAS[0].regionCode as string,
    employmentType: 'employed',
    employerName: '',
    jobTitle: '',
    monthlyIncome: '',
    loanAmount: '',
    contactPreference: 'any',
  });

  useEffect(() => {
    trackEvent('service_apply_start', { service_id: serviceId, service_name: service.name, language });
  }, [language, service.name, serviceId]);

  const parseAmount = (value: string) => {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const setFieldError = (field: string, message?: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  };

  const validateSingleField = (field: keyof ApplyFormData, value?: string) => {
    const fieldValue = value ?? formData[field];
    if (field === 'monthlyIncome' && !fieldValue.trim()) {
      setFieldError('monthlyIncome', t.toast.enterIncome);
      return false;
    }
    const fieldSchema = loanApplicationSchema.shape[field as keyof typeof loanApplicationSchema.shape];
    if (!fieldSchema) return true;
    const result = fieldSchema.safeParse(fieldValue);
    if (result.success) {
      setFieldError(field, undefined);
      return true;
    }
    setFieldError(field, result.error.issues[0]?.message);
    return false;
  };

  const handleFieldChange = (field: keyof ApplyFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) validateSingleField(field, value);
  };

  const handleFieldBlur = (field: keyof ApplyFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateSingleField(field);
  };

  const handleEmploymentTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, employmentType: value }));
  };

  const nextStep = () => {
    if (step === 1) {
      const nextErrors: Record<string, string> = {};
      if (!formData.monthlyIncome.trim()) {
        nextErrors.monthlyIncome = t.toast.enterIncome;
      } else if (!loanApplicationSchema.shape.monthlyIncome.safeParse(formData.monthlyIncome).success) {
        nextErrors.monthlyIncome = t.form.validIncome;
      }
      if (!loanApplicationSchema.shape.loanAmount.safeParse(formData.loanAmount).success) {
        nextErrors.loanAmount = t.form.validLoanAmount;
      }
      if (Object.keys(nextErrors).length > 0) {
        setErrors((prev) => ({ ...prev, ...nextErrors }));
        setTouched((prev) => ({ ...prev, serviceArea: true, monthlyIncome: true, loanAmount: true, contactPreference: true }));
        toast.error(t.toast.fillRequired);
        return;
      }
      trackEvent('apply_step_1_complete', {
        service_id: serviceId,
        service_area: formData.serviceArea,
        income_band: getIncomeBand(parseAmount(formData.monthlyIncome)),
        loan_amount: parseAmount(formData.loanAmount),
        language,
      });
    }

    if (step === 2) {
      const stepSchema = loanApplicationSchema.pick({ name: true, email: true, phone: true, employmentType: true });
      const result = validateForm(stepSchema, formData);
      if (!result.success) {
        setErrors((prev) => ({ ...prev, ...result.errors }));
        setTouched((prev) => ({ ...prev, name: true, email: true, phone: true, employmentType: true }));
        toast.error(t.toast.fillRequired);
        return;
      }
      trackEvent('apply_step_2_complete', { service_id: serviceId, employment_type: formData.employmentType, language });
    }

    setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.monthlyIncome.trim()) {
      setErrors((prev) => ({ ...prev, monthlyIncome: t.toast.enterIncome }));
      toast.error(t.toast.fillRequired);
      return;
    }

    const validation = validateForm(loanApplicationSchema, formData);
    if (!validation.success) {
      setErrors(validation.errors);
      toast.error(t.toast.fillRequired);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const data = validation.data;
      const response = await applicationsAPI.createPublic({
        serviceId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        serviceArea: data.serviceArea,
        employmentType: data.employmentType || 'employed',
        employerName: data.employerName || undefined,
        jobTitle: data.jobTitle || undefined,
        monthlyIncome: data.monthlyIncome ? parseFloat(data.monthlyIncome) || 0 : 0,
        loanAmount: parseFloat(data.loanAmount),
        contactPreference: data.contactPreference || undefined,
      });

      trackEvent('apply_submit_success', {
        service_id: serviceId,
        employment_type: formData.employmentType,
        income_band: getIncomeBand(parseAmount(formData.monthlyIncome)),
        language,
      });
      toast.success(t.toast.success);
      const referenceId = response.data?.id;
      const successPath = referenceId
        ? `${PATHS.servicesSuccess}?service=${serviceId}&ref=${referenceId}`
        : `${PATHS.servicesSuccess}?service=${serviceId}`;
      router.push(localeHref(language, successPath));
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || t.toast.error);
    } finally {
      setLoading(false);
    }
  };

  const stepItems = [
    { label: t.steps.personalInfo },
    { label: t.steps.employment },
    { label: t.steps.review },
  ];
  const stepTitle = [t.stepTitles.personalInfo, t.stepTitles.employment, t.stepTitles.review][step - 1];
  const stepDescription = [t.stepDescriptions.personalInfo, t.stepDescriptions.employment, t.stepDescriptions.review][step - 1];

  return (
    <FormLayout
      breadcrumbs={[{ label: t.backToServices, href: PATHS.services }, { label: service.name }]}
      eyebrow={t.sidebar.selectedService}
      title={service.name}
      sidebar={<ApplySidebar serviceId={serviceId} service={service} formData={formData} t={t} language={language} />}
    >
      <Card>
        <CardHeader className="border-b border-border">
          <Stepper items={stepItems} current={step} stepWord={t.progress.step} ofWord={t.progress.of} ariaLabel={t.a11y.stepsList} />
          <CardTitle className="text-xl">{stepTitle}</CardTitle>
          <CardDescription>{stepDescription}</CardDescription>
          {/* Decorative: the Stepper above already conveys progress accessibly. */}
          <Progress value={(step / TOTAL_STEPS) * 100} className="mt-4" aria-hidden="true" />
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 p-6">
            {step === 1 && (
              <Step1Eligibility t={t} formData={formData} errors={errors} onChange={handleFieldChange} onBlur={handleFieldBlur} />
            )}
            {step === 2 && (
              <Step2Contact
                t={t}
                formData={formData}
                errors={errors}
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
                onEmploymentTypeChange={handleEmploymentTypeChange}
              />
            )}
            {step === 3 && <Step3Review t={t} formData={formData} />}

            <div className="flex gap-3 pt-4">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                  <ArrowLeft className="size-4" />
                  {t.navigation.back}
                </Button>
              )}
              {step < TOTAL_STEPS ? (
                <Button type="button" onClick={nextStep} className="flex-1">
                  {t.navigation.next}
                  <ArrowRight className="size-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={loading} className="h-12 flex-1 font-semibold">
                  {loading ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle className="size-4" />}
                  {t.navigation.submit}
                </Button>
              )}
            </div>
          </CardContent>
        </form>
      </Card>
    </FormLayout>
  );
}
