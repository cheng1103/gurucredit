import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Mail,
  Clock,
  MessageCircle,
  Home,
  FileText,
  Sparkles,
  Download,
  Calculator,
} from 'lucide-react';
import { COMPANY, SERVICES } from '@/lib/constants';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { ReferenceDetailsClient } from './ReferenceDetailsClient';

const pageContent = {
  en: {
    success: 'Success',
    title: 'Application Submitted!',
    thankYou: 'Thank you for choosing GURU Credits',
    reference: {
      title: 'Your Reference Number',
      saveNote: 'Please save this number for your reference',
    },
    service: {
      title: 'Service Requested',
    },
    whatsNext: {
      title: 'What happens next?',
      steps: [
        {
          title: 'Check your email & WhatsApp',
          description:
            "We've emailed your reference number and will share the RM30 analysis fee instructions directly over WhatsApp. Only pay once our consultant confirms your details in the chat.",
          time: 'Immediately',
        },
        {
          title: 'We analyze your information',
          description: 'Our expert team will review your credit profile and financial details.',
          time: 'Within 24 hours',
        },
        {
          title: 'Receive your detailed report',
          description: 'Get your comprehensive analysis with recommendations via email and WhatsApp.',
          time: 'Within 24-48 hours',
        },
      ],
    },
    timeline: {
      title: 'Timeline overview',
      statuses: [
        { label: 'Application received', eta: 'Now' },
        { label: 'Consultant assigned', eta: '< 2 hours' },
        { label: 'Analysis in progress', eta: 'Within 24 hours' },
        { label: 'Report + WhatsApp follow-up', eta: 'Within 48 hours' },
      ],
    },
    checklist: {
      title: 'Document checklist',
      description:
        'Prepare these items so you can share them quickly over WhatsApp when our consultant reaches out.',
      button: 'Download checklist (PDF)',
    },
    payment: {
      title: 'RM30 analysis fee via WhatsApp',
      description: 'We only collect payments through our verified WhatsApp line—never on the website.',
      bullets: [
        'Wait for our consultant to greet you on WhatsApp before paying.',
        'You will receive the official payment link/QR directly in the chat.',
        'Keep the WhatsApp receipt as part of your case record.',
      ],
      note: 'If anyone asks you to pay elsewhere, verify with us on WhatsApp before sending money.',
    },
    contact: {
      title: "Questions? We're here to help!",
      description:
        'All document sharing and payments continue through WhatsApp. Tap below to resume the conversation with our consultant.',
      whatsapp: 'Continue on WhatsApp',
      responseTime: 'Average reply time: under 10 minutes during business hours.',
      scan: 'On desktop? Scan to open WhatsApp Web.',
    },
    buttons: {
      backHome: 'Back to Home',
      tryCalculator: 'Try DSR Calculator',
    },
    proTip:
      "Pro tip: Make sure to check your spam/junk folder if you don't see our email within 30 minutes.",
  },
  ms: {
    success: 'Berjaya',
    title: 'Permohonan Dihantar!',
    thankYou: 'Terima kasih kerana memilih GURU Credits',
    reference: {
      title: 'Nombor Rujukan Anda',
      saveNote: 'Sila simpan nombor ini untuk rujukan anda',
    },
    service: {
      title: 'Perkhidmatan Dimohon',
    },
    whatsNext: {
      title: 'Apa yang berlaku seterusnya?',
      steps: [
        {
          title: 'Semak e-mel & WhatsApp anda',
          description:
            'Kami telah menghantar e-mel rujukan dan akan berkongsi arahan pembayaran RM30 secara terus melalui WhatsApp. Hanya buat bayaran selepas perunding kami mengesahkan maklumat anda dalam chat.',
          time: 'Serta-merta',
        },
        {
          title: 'Kami menganalisis maklumat anda',
          description: 'Pasukan pakar kami akan menyemak profil kredit dan butiran kewangan anda.',
          time: 'Dalam 24 jam',
        },
        {
          title: 'Terima laporan terperinci anda',
          description: 'Dapatkan analisis komprehensif dengan cadangan melalui e-mel dan WhatsApp.',
          time: 'Dalam 24-48 jam',
        },
      ],
    },
    timeline: {
      title: 'Garis masa proses',
      statuses: [
        { label: 'Permohonan diterima', eta: 'Sekarang' },
        { label: 'Perunding ditugaskan', eta: '< 2 jam' },
        { label: 'Analisis sedang berjalan', eta: 'Dalam 24 jam' },
        { label: 'Laporan + WhatsApp susulan', eta: 'Dalam 48 jam' },
      ],
    },
    checklist: {
      title: 'Senarai semak dokumen',
      description:
        'Sediakan senarai ini supaya anda boleh kongsikan dengan pantas melalui WhatsApp apabila perunding menghubungi anda.',
      button: 'Muat turun senarai (PDF)',
    },
    payment: {
      title: 'Yuran analisis RM30 melalui WhatsApp',
      description: 'Kami hanya mengutip bayaran melalui nombor WhatsApp rasmi—tiada bayaran dalam laman web.',
      bullets: [
        'Tunggu perunding kami menyapa anda di WhatsApp sebelum membuat bayaran.',
        'Anda akan menerima pautan/QR rasmi terus di dalam chat.',
        'Simpan resit WhatsApp sebagai rekod permohonan anda.',
      ],
      note: 'Jika ada pihak lain meminta bayaran di tempat lain, sahkan dengan kami di WhatsApp sebelum membuat pembayaran.',
    },
    contact: {
      title: 'Soalan? Kami sedia membantu!',
      description:
        'Segala perkongsian dokumen dan pembayaran diteruskan melalui WhatsApp. Tekan butang di bawah untuk sambung perbualan dengan perunding kami.',
      whatsapp: 'Teruskan di WhatsApp',
      responseTime: 'Masa balas purata: kurang 10 minit pada waktu pejabat.',
      scan: 'Guna komputer? Imbas untuk buka WhatsApp Web.',
    },
    buttons: {
      backHome: 'Kembali ke Laman Utama',
      tryCalculator: 'Cuba Kalkulator DSR',
    },
    proTip:
      'Petua: Pastikan anda menyemak folder spam/junk jika anda tidak melihat e-mel kami dalam masa 30 minit.',
  },
} as const;

const stepIcons = [Mail, Clock, CheckCircle];

const CHECKLIST_URL = '/files/loan-document-checklist.pdf';

const generateReference = () => {
  const date = new Date();
  return `GC${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(
    date.getDate(),
  ).padStart(2, '0')}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
};

type SuccessPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const language = await resolveRequestLanguage();
  const t = pageContent[language] ?? pageContent.en;
  const serviceId =
    typeof searchParams.service === 'string' ? searchParams.service : undefined;
  const referenceFromUrl =
    typeof searchParams.ref === 'string' ? searchParams.ref.toUpperCase() : undefined;
  const referenceNumber = referenceFromUrl ?? generateReference();
  const service = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];
  const whatsappLink = COMPANY.whatsappLink;
  const whatsappNumber = COMPANY.whatsapp;
  const whatsappQr = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(
    whatsappLink,
  )}`;

  return (
    <div className="py-16 lg:py-24">
      <div className="container max-w-2xl">
        <Card className="shadow-2xl border-2 overflow-hidden">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.1%22%3E%3Cpath%20d=%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="h-10 w-10" />
              </div>
              <Badge className="bg-white/20 text-white border-0 mb-3">
                <Sparkles className="h-3 w-3 mr-1" />
                {t.success}
              </Badge>
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">{t.title}</h1>
              <p className="opacity-90">{t.thankYou}</p>
            </div>
          </div>

          <CardContent className="p-6 lg:p-8 space-y-6">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">{t.reference.title}</p>
              <ReferenceDetailsClient referenceNumber={referenceNumber} note={t.reference.saveNote} />
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t.service.title}</p>
                  <p className="font-semibold">{service.title}</p>
                </div>
                <Badge variant="outline" className="shrink-0">
                  {service.priceFormatted}
                </Badge>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {t.whatsNext.title}
              </h2>
              <div className="space-y-4">
                {t.whatsNext.steps.map((step, index) => {
                  const StepIcon = stepIcons[index];
                  return (
                    <div key={step.title} className="flex items-start gap-4 relative">
                      {index < 2 && <div className="absolute left-5 top-12 w-0.5 h-8 bg-border" />}
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 relative z-10">
                        <StepIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{step.title}</p>
                          <Badge variant="secondary" className="text-xs">
                            {step.time}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 bg-muted/40 rounded-lg border">
              <h3 className="font-semibold text-sm mb-3">{t.timeline.title}</h3>
              <div className="space-y-2">
                {t.timeline.statuses.map((status) => (
                  <div key={status.label} className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{status.label}</p>
                      <p className="text-xs text-muted-foreground">{status.eta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 space-y-3">
              <p className="font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                {t.checklist.title}
              </p>
              <p className="text-sm text-muted-foreground">{t.checklist.description}</p>
              <Button asChild variant="outline" className="w-full gap-2">
                <a href={CHECKLIST_URL} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" />
                  {t.checklist.button}
                </a>
              </Button>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 space-y-3">
              <p className="font-medium flex items-center gap-2 text-amber-900">
                <Sparkles className="h-4 w-4" />
                {t.payment.title}
              </p>
              <p className="text-sm text-amber-900/80">{t.payment.description}</p>
              <ul className="space-y-2 text-sm text-amber-900/90">
                {t.payment.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-amber-900/70 border-t border-amber-200 pt-2">
                {t.payment.note}
              </p>
            </div>

            <div className="p-4 rounded-lg border bg-muted/50 space-y-4">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-lg">{t.contact.title}</p>
                <p className="text-sm text-muted-foreground">{t.contact.description}</p>
                <p className="text-xs text-muted-foreground">{t.contact.responseTime}</p>
              </div>
              <Button asChild className="w-full gap-2">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  {t.contact.whatsapp}
                </a>
              </Button>
              <div className="flex items-center justify-between gap-4 rounded-lg border bg-background p-3">
                <div>
                  <p className="text-xs text-muted-foreground">{t.contact.scan}</p>
                  <p className="font-semibold">{whatsappNumber}</p>
                </div>
                <div className="w-28 h-28 bg-white p-2 rounded-lg border">
                  <Image src={whatsappQr} alt="WhatsApp QR" width={100} height={100} />
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button asChild variant="outline" className="gap-2">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  {t.buttons.backHome}
                </Link>
              </Button>
              <Button asChild className="gap-2">
                <Link href="/calculator">
                  <Calculator className="h-4 w-4" />
                  {t.buttons.tryCalculator}
                </Link>
              </Button>
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-xs text-muted-foreground">{t.proTip}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
