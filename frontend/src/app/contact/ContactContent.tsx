'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Link from 'next/link';
import {
  contactFormSchema,
  validateForm,
  getFieldError,
  type ContactFormData,
} from '@/lib/validation';
import { contactAPI } from '@/lib/api';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Loader2,
  CheckCircle,
  ArrowRight,
  HelpCircle,
  Globe,
  Facebook,
  Instagram,
} from 'lucide-react';
import type { Language } from '@/lib/i18n/translations';
import { COMPANY, SERVICE_AREAS, SERVICE_AREA_LABEL } from '@/lib/constants';

// Bilingual page content
const pageContent = {
  en: {
    header: {
      badge: 'Get In Touch',
      title: 'Contact',
      titleHighlight: 'Us',
      description:
        'Serving Kuala Lumpur & Selangor (Klang Valley) only. Have questions about our services or need help with a KL/Selangor loan application? Reach out via any channel below.',
      highlights: [
        { title: '24h response time', description: 'Fast answers from our consultants.' },
        { title: 'Klang Valley focus', description: 'KL & Selangor support specialists.' },
        { title: 'WhatsApp-first support', description: 'Quick updates after you submit.' },
      ],
    },
    form: {
      title: 'Send Us a Message',
      description: 'Fill out the form below and we\'ll get back to you as soon as possible.',
      fields: {
        name: 'Full Name',
        namePlaceholder: 'Your name',
        email: 'Email Address',
        emailPlaceholder: 'your@email.com',
        phone: 'Phone Number',
        phonePlaceholder: '+60 12-345 6789',
        serviceArea: {
          label: 'Where do you live?',
          helper: 'We currently assist Kuala Lumpur & Selangor (Klang Valley) residents only.',
        },
        subject: 'Subject',
        subjectPlaceholder: 'How can we help?',
        message: 'Message',
        messagePlaceholder: 'Tell us more about your inquiry...',
      },
      submit: 'Send Message',
      success: {
        title: 'Message Sent!',
        description: 'Thank you for reaching out. We\'ll respond within 24 hours.',
        button: 'Send Another Message',
      },
      toast: 'Message sent successfully! We will get back to you soon.',
      errorToast: 'Failed to send message. Please try again.',
    },
    contactInfo: {
      title: 'Contact Information',
      mapTitle: 'Our Location',
      items: [
        {
          title: 'Phone',
          value: COMPANY.phone,
          href: COMPANY.phoneLink,
          description: 'Mon-Fri, 9am-6pm',
        },
        {
          title: 'WhatsApp',
          value: COMPANY.phone,
          href: COMPANY.whatsappLink,
          description: 'Quick response guaranteed',
        },
        {
          title: 'Email',
          value: COMPANY.email,
          href: `mailto:${COMPANY.email}`,
          description: 'We reply within 24 hours',
        },
        {
          title: 'Service Coverage',
          value: SERVICE_AREA_LABEL,
          description: 'We currently accept applicants in Kuala Lumpur & Selangor only (no Sabah/Sarawak).',
        },
        {
          title: 'Location',
          value: COMPANY.location,
          href: 'https://g.co/kgs/BXpEnEx',
          description: 'Damansara Heights, Kuala Lumpur',
        },
      ],
    },
    businessHours: {
      title: 'Business Hours',
      items: [
        { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
        { day: 'Saturday', hours: '10:00 AM - 2:00 PM' },
        { day: 'Sunday', hours: 'Closed' },
      ],
      note: '* WhatsApp support available outside business hours',
    },
    social: {
      title: 'Follow Us',
    },
    quickLinks: {
      badge: 'Quick Links',
      title: 'Looking for Something Else?',
      items: [
        { label: 'Check Our Services', href: '/services', description: 'View pricing and packages' },
        { label: 'Try DSR Calculator', href: '/calculator', description: 'Free debt ratio calculator' },
        { label: 'Read FAQs', href: '/faq', description: 'Common questions answered' },
      ],
      button: 'Learn More',
    },
    cta: {
      title: 'Prefer to Chat Directly?',
      description: 'Get instant answers via WhatsApp. Our team is ready to assist you with any questions about loan eligibility and our services.',
      button: 'Chat on WhatsApp',
    },
    notices: {
      payment: 'Reminder: RM30 eligibility fee is only collected by our consultant via WhatsApp after you submit the form. We never accept payments on this website.',
    },
  },
  ms: {
    header: {
      badge: 'Hubungi Kami',
      title: 'Hubungi',
      titleHighlight: 'Kami',
      description: 'Kami hanya beroperasi di Kuala Lumpur & Selangor (Lembah Klang). Ada soalan tentang perkhidmatan kami di kawasan ini? Hubungi kami melalui saluran di bawah.',
      highlights: [
        { title: 'Respons dalam 24 jam', description: 'Jawapan pantas daripada konsultan.' },
        { title: 'Fokus Lembah Klang', description: 'Pakar KL & Selangor.' },
        { title: 'Sokongan WhatsApp', description: 'Kemas kini pantas selepas hantar borang.' },
      ],
    },
    form: {
      title: 'Hantar Mesej Kepada Kami',
      description: 'Isi borang di bawah dan kami akan menghubungi anda secepat mungkin.',
      fields: {
        name: 'Nama Penuh',
        namePlaceholder: 'Nama anda',
        email: 'Alamat E-mel',
        emailPlaceholder: 'anda@email.com',
        phone: 'Nombor Telefon',
        phonePlaceholder: '+60 12-345 6789',
        serviceArea: {
          label: 'Anda tinggal di mana?',
          helper: 'Kami hanya membantu peminjam Kuala Lumpur & Selangor (Lembah Klang).',
        },
        subject: 'Subjek',
        subjectPlaceholder: 'Bagaimana kami boleh bantu?',
        message: 'Mesej',
        messagePlaceholder: 'Beritahu kami lebih lanjut tentang pertanyaan anda...',
      },
      submit: 'Hantar Mesej',
      success: {
        title: 'Mesej Dihantar!',
        description: 'Terima kasih kerana menghubungi kami. Kami akan membalas dalam 24 jam.',
        button: 'Hantar Mesej Lain',
      },
      toast: 'Mesej berjaya dihantar! Kami akan menghubungi anda tidak lama lagi.',
      errorToast: 'Gagal menghantar mesej. Sila cuba lagi.',
    },
    contactInfo: {
      title: 'Maklumat Hubungan',
      mapTitle: 'Lokasi Kami',
      items: [
        {
          title: 'Telefon',
          value: COMPANY.phone,
          href: COMPANY.phoneLink,
          description: 'Isn-Jum, 9pg-6ptg',
        },
        {
          title: 'WhatsApp',
          value: COMPANY.phone,
          href: COMPANY.whatsappLink,
          description: 'Respons pantas dijamin',
        },
        {
          title: 'E-mel',
          value: COMPANY.email,
          href: `mailto:${COMPANY.email}`,
          description: 'Kami balas dalam 24 jam',
        },
        {
          title: 'Liputan Perkhidmatan',
          value: SERVICE_AREA_LABEL,
          description: 'Permohonan dari Sabah/Sarawak tidak diterima buat masa ini.',
        },
        {
          title: 'Lokasi',
          value: COMPANY.location,
          href: 'https://g.co/kgs/BXpEnEx',
          description: 'Damansara Heights, Kuala Lumpur',
        },
      ],
    },
    businessHours: {
      title: 'Waktu Perniagaan',
      items: [
        { day: 'Isnin - Jumaat', hours: '9:00 PG - 6:00 PTG' },
        { day: 'Sabtu', hours: '10:00 PG - 2:00 PTG' },
        { day: 'Ahad', hours: 'Tutup' },
      ],
      note: '* Sokongan WhatsApp tersedia di luar waktu perniagaan',
    },
    social: {
      title: 'Ikuti Kami',
    },
    quickLinks: {
      badge: 'Pautan Pantas',
      title: 'Mencari Sesuatu Yang Lain?',
      items: [
        { label: 'Semak Perkhidmatan Kami', href: '/services', description: 'Lihat harga dan pakej' },
        { label: 'Cuba Kalkulator DSR', href: '/calculator', description: 'Kalkulator nisbah hutang percuma' },
        { label: 'Baca Soalan Lazim', href: '/faq', description: 'Soalan biasa dijawab' },
      ],
      button: 'Ketahui Lebih Lanjut',
    },
    cta: {
      title: 'Lebih Suka Berbual Secara Langsung?',
      description: 'Dapatkan jawapan segera melalui WhatsApp. Pasukan kami sedia membantu anda dengan sebarang soalan tentang kelayakan pinjaman dan perkhidmatan kami.',
      button: 'Berbual di WhatsApp',
    },
    notices: {
      payment: 'Peringatan: Yuran kelayakan RM30 hanya dikutip oleh perunding kami melalui WhatsApp selepas borang dihantar. Tiada bayaran diterima dalam laman web ini.',
    },
  },
};

const contactIcons = [Phone, MessageCircle, Mail, Globe, MapPin];

type ContactContentProps = {
  language: Language;
};

export default function ContactContent({ language }: ContactContentProps) {
  const t = pageContent[language] ?? pageContent.en;

  const initialFormState: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceArea: SERVICE_AREAS[0].regionCode,
  };

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<ContactFormData>(initialFormState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data before submission
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
    <div className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-35" aria-hidden="true" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            <MessageCircle className="h-3 w-3 mr-1" />
            {t.header.badge}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {t.header.title} <span className="gradient-text">{t.header.titleHighlight}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.header.description}
          </p>
          <p className="mt-4 text-sm text-primary font-medium bg-primary/5 inline-flex px-4 py-2 rounded-full">
            {t.notices.payment}
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {t.header.highlights.map((highlight) => (
              <Card key={highlight.title} className="p-4 text-left surface-card">
                <div className="text-sm font-semibold text-foreground">{highlight.title}</div>
                <p className="text-xs text-muted-foreground mt-1">{highlight.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-2 surface-card">
              <CardHeader className="bg-gradient-to-br from-primary/5 to-primary/10 border-b">
                <CardTitle>{t.form.title}</CardTitle>
                <CardDescription>
                  {t.form.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{t.form.success.title}</h3>
                    <p className="text-muted-foreground mb-6">
                      {t.form.success.description}
                    </p>
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
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t.form.fields.name} *</Label>
                        <Input
                          id="name"
                          placeholder={t.form.fields.namePlaceholder}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={getFieldError(errors, 'name') ? 'border-red-500 focus-visible:ring-red-500' : ''}
                          aria-invalid={!!getFieldError(errors, 'name')}
                          aria-describedby={getFieldError(errors, 'name') ? 'name-error' : undefined}
                          required
                        />
                        {getFieldError(errors, 'name') && (
                          <p id="name-error" className="text-sm text-red-500" role="alert">{getFieldError(errors, 'name')}</p>
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
                          className={getFieldError(errors, 'email') ? 'border-red-500 focus-visible:ring-red-500' : ''}
                          aria-invalid={!!getFieldError(errors, 'email')}
                          aria-describedby={getFieldError(errors, 'email') ? 'email-error' : undefined}
                          required
                        />
                        {getFieldError(errors, 'email') && (
                          <p id="email-error" className="text-sm text-red-500" role="alert">{getFieldError(errors, 'email')}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t.form.fields.phone}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder={t.form.fields.phonePlaceholder}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={getFieldError(errors, 'phone') ? 'border-red-500 focus-visible:ring-red-500' : ''}
                          aria-invalid={!!getFieldError(errors, 'phone')}
                          aria-describedby={getFieldError(errors, 'phone') ? 'phone-error' : undefined}
                        />
                        {getFieldError(errors, 'phone') && (
                          <p id="phone-error" className="text-sm text-red-500" role="alert">{getFieldError(errors, 'phone')}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="serviceArea">{t.form.fields.serviceArea.label} *</Label>
                        <select
                          id="serviceArea"
                          value={formData.serviceArea}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              serviceArea: e.target.value as ContactFormData['serviceArea'],
                            })
                          }
                          className={`h-12 w-full rounded-md border border-input bg-background px-3 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 ${
                            getFieldError(errors, 'serviceArea')
                              ? 'border-red-500 focus-visible:ring-red-500/40'
                              : ''
                          }`}
                          aria-invalid={!!getFieldError(errors, 'serviceArea')}
                          aria-describedby={getFieldError(errors, 'serviceArea') ? 'serviceArea-error' : undefined}
                          required
                        >
                          {SERVICE_AREAS.map((area) => (
                            <option key={area.regionCode} value={area.regionCode}>
                              {area.name}
                            </option>
                          ))}
                        </select>
                        <p className="text-xs text-muted-foreground">
                          {t.form.fields.serviceArea.helper}
                        </p>
                        {getFieldError(errors, 'serviceArea') && (
                          <p id="serviceArea-error" className="text-sm text-red-500" role="alert">
                            {getFieldError(errors, 'serviceArea')}
                          </p>
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
                        className={getFieldError(errors, 'subject') ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        aria-invalid={!!getFieldError(errors, 'subject')}
                        aria-describedby={getFieldError(errors, 'subject') ? 'subject-error' : undefined}
                        required
                      />
                      {getFieldError(errors, 'subject') && (
                        <p id="subject-error" className="text-sm text-red-500" role="alert">{getFieldError(errors, 'subject')}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t.form.fields.message} *</Label>
                      <Textarea
                        id="message"
                        placeholder={t.form.fields.messagePlaceholder}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={getFieldError(errors, 'message') ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        aria-invalid={!!getFieldError(errors, 'message')}
                        aria-describedby={getFieldError(errors, 'message') ? 'message-error' : undefined}
                        rows={5}
                        required
                      />
                      {getFieldError(errors, 'message') && (
                        <p id="message-error" className="text-sm text-red-500" role="alert">{getFieldError(errors, 'message')}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto btn-gradient text-primary-foreground shadow-lg shadow-primary/25"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="mr-2 h-4 w-4" />
                      )}
                      {t.form.submit}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info Cards */}
            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-lg">{t.contactInfo.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {t.contactInfo.items.map((item, index) => {
                  const Icon = contactIcons[index];
                  const content = (
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-sm text-primary">{item.value}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  );

                  if (item.href) {
                    const isExternal = item.href.startsWith('http');
                    return (
                      <a
                        key={index}
                        href={item.href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <div key={index}>
                      {content}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  {t.businessHours.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {t.businessHours.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.day}</span>
                      <span className="font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  {t.businessHours.note}
                </p>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-lg">{t.social.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <a
                    href={COMPANY.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href={COMPANY.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                    href={COMPANY.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4 px-4 py-1.5">
              <HelpCircle className="h-3 w-3 mr-1" />
              {t.quickLinks.badge}
            </Badge>
            <h2 className="text-2xl font-bold">{t.quickLinks.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.quickLinks.items.map((link, index) => (
              <Card key={index} className="card-hover surface-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-1">{link.label}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={link.href}>
                      {t.quickLinks.button}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-16">
          <Card className="overflow-hidden surface-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {t.contactInfo.mapTitle}
              </CardTitle>
              <CardDescription>
                {COMPANY.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative w-full h-[400px]">
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
        </div>

        {/* CTA */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
            <CardContent className="py-12 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                {t.cta.title}
              </h2>
              <p className="opacity-90 mb-6 max-w-xl mx-auto">
                {t.cta.description}
              </p>
              <Button size="lg" className="btn-gradient text-primary-foreground" asChild>
                <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t.cta.button}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
