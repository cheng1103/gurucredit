'use client';

import { useState } from 'react';
import { FormLayout, Section, Container, SectionHeader, ClosingCta } from '@/components/layout';
import { CardGrid, ListingCard } from '@/components/listings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Loader2,
  CheckCircle,
  Globe,
  Facebook,
  Instagram,
} from 'lucide-react';
import { contactFormSchema, validateForm, getFieldError, type ContactFormData } from '@/lib/validation';
import { contactAPI } from '@/lib/api';
import type { Language } from '@/lib/i18n/translations';
import { COMPANY } from '@/lib/constants';
import { SERVICE_AREA_CODES, SERVICE_AREA_LABELS } from '@/lib/form-options';
import { PATHS } from '@/lib/i18n/routes';
import { contactContent } from '@/lib/content/contact';

const contactIcons = [Phone, MessageCircle, Mail, Globe, MapPin];

export default function ContactContent({ language }: { language: Language }) {
  const t = contactContent[language] ?? contactContent.en;

  const initialFormState: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceArea: 'MY-14',
  };

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<ContactFormData>(initialFormState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm(contactFormSchema, formData);
    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await contactAPI.submit(formData);
      setSubmitted(true);
      setFormData(initialFormState);
      toast.success(t.form.toast);
    } catch (err) {
      console.error('Contact form submission failed', err);
      toast.error(t.form.errorToast);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormLayout
        breadcrumbs={[{ label: t.breadcrumbHome, href: PATHS.home }, { label: t.breadcrumbLabel }]}
        eyebrow={t.eyebrow}
        title={t.title}
        meta={t.meta}
        sidebar={
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.contactInfo.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {t.contactInfo.items.map((item, index) => {
                  const Icon = contactIcons[index];
                  const body = (
                    <div className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-surface-alt">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        <p className="text-sm text-primary">{item.value}</p>
                        <p className="text-xs text-foreground-subtle">{item.description}</p>
                      </div>
                    </div>
                  );
                  if (!item.href) return <div key={item.title}>{body}</div>;
                  const isExternal = item.href.startsWith('http');
                  return (
                    <a key={item.title} href={item.href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined}>
                      {body}
                    </a>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="size-5 text-primary" />
                  {t.businessHours.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {t.businessHours.items.map((item) => (
                    <div key={item.day} className="flex justify-between text-sm">
                      <span className="text-foreground-muted">{item.day}</span>
                      <span className="font-medium text-foreground">{item.hours}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-foreground-subtle">{t.businessHours.note}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.social.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <a href={COMPANY.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                    <Facebook className="size-5" aria-hidden="true" />
                  </a>
                  <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                    <Instagram className="size-5" aria-hidden="true" />
                  </a>
                  <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                    <MessageCircle className="size-5" aria-hidden="true" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </>
        }
      >
        <Card>
          <CardHeader className="border-b border-border">
            <CardTitle>{t.form.title}</CardTitle>
            <CardDescription>{t.form.description}</CardDescription>
            <p className="mt-2 rounded-lg bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              {t.paymentNotice}
            </p>
          </CardHeader>
          <CardContent className="p-6">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-success-soft">
                  <CheckCircle className="size-8 text-success" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{t.form.success.title}</h3>
                <p className="mb-6 text-foreground-muted">{t.form.success.description}</p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setErrors({});
                    setFormData(initialFormState);
                  }}
                >
                  {t.form.success.button}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.form.fields.name} *</Label>
                    <Input
                      id="name"
                      placeholder={t.form.fields.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      aria-invalid={!!getFieldError(errors, 'name')}
                      aria-describedby={getFieldError(errors, 'name') ? 'name-error' : undefined}
                      required
                    />
                    {getFieldError(errors, 'name') && (
                      <p id="name-error" className="text-sm text-destructive" role="alert">{getFieldError(errors, 'name')}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.form.fields.email} *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t.form.fields.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      aria-invalid={!!getFieldError(errors, 'email')}
                      aria-describedby={getFieldError(errors, 'email') ? 'email-error' : undefined}
                      required
                    />
                    {getFieldError(errors, 'email') && (
                      <p id="email-error" className="text-sm text-destructive" role="alert">{getFieldError(errors, 'email')}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.form.fields.phone}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={t.form.fields.phonePlaceholder}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      aria-invalid={!!getFieldError(errors, 'phone')}
                      aria-describedby={getFieldError(errors, 'phone') ? 'phone-error' : undefined}
                    />
                    {getFieldError(errors, 'phone') && (
                      <p id="phone-error" className="text-sm text-destructive" role="alert">{getFieldError(errors, 'phone')}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceArea">{t.form.fields.serviceArea.label} *</Label>
                    <select
                      id="serviceArea"
                      value={formData.serviceArea}
                      onChange={(e) => setFormData({ ...formData, serviceArea: e.target.value as ContactFormData['serviceArea'] })}
                      className="h-11 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-foreground outline-none transition-[border-color,box-shadow] hover:border-border-strong focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/20 aria-invalid:border-destructive"
                      aria-invalid={!!getFieldError(errors, 'serviceArea')}
                      aria-describedby={getFieldError(errors, 'serviceArea') ? 'serviceArea-error' : undefined}
                      required
                    >
                      {SERVICE_AREA_CODES.map((code) => (
                        <option key={code} value={code}>{SERVICE_AREA_LABELS[code]}</option>
                      ))}
                    </select>
                    <p className="text-xs text-foreground-subtle">{t.form.fields.serviceArea.helper}</p>
                    {getFieldError(errors, 'serviceArea') && (
                      <p id="serviceArea-error" className="text-sm text-destructive" role="alert">{getFieldError(errors, 'serviceArea')}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">{t.form.fields.subject} *</Label>
                  <Input
                    id="subject"
                    placeholder={t.form.fields.subjectPlaceholder}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    aria-invalid={!!getFieldError(errors, 'subject')}
                    aria-describedby={getFieldError(errors, 'subject') ? 'subject-error' : undefined}
                    required
                  />
                  {getFieldError(errors, 'subject') && (
                    <p id="subject-error" className="text-sm text-destructive" role="alert">{getFieldError(errors, 'subject')}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t.form.fields.message} *</Label>
                  <Textarea
                    id="message"
                    placeholder={t.form.fields.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    aria-invalid={!!getFieldError(errors, 'message')}
                    aria-describedby={getFieldError(errors, 'message') ? 'message-error' : undefined}
                    rows={5}
                    required
                  />
                  {getFieldError(errors, 'message') && (
                    <p id="message-error" className="text-sm text-destructive" role="alert">{getFieldError(errors, 'message')}</p>
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
                  {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                  {t.form.submit}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </FormLayout>

      <Section tone="alt">
        <Container>
          <SectionHeader eyebrow={t.quickLinks.eyebrow} title={t.quickLinks.title} />
          <CardGrid columns={3}>
            {t.quickLinks.items.map((item) => (
              <ListingCard key={item.label} href={item.href} title={item.label} description={item.description} cta={t.quickLinks.cta} />
            ))}
          </CardGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="size-5 text-primary" />
                {t.contactInfo.mapTitle}
              </CardTitle>
              <CardDescription>{COMPANY.location}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-[400px] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.7867548!2d101.6561!3d3.1578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc49c701efeae7%3A0xf4d98e951a678571!2sJalan%20Semantan%2C%20Damansara%20Heights%2C%20Kuala%20Lumpur!5e0!3m2!1sen!2smy!4v1700000000000!5m2!1sen!2smy"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GURU Credits Office Location"
                  className="absolute inset-0 border-0"
                />
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      <ClosingCta language={language} />
    </>
  );
}
