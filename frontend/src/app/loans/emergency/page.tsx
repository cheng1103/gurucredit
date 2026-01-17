import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  ArrowRight,
  Zap,
  Clock,
  Shield,
  FileText,
  Phone,
  MessageCircle,
  AlertCircle,
  Timer,
  CheckCheck,
} from 'lucide-react';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { COMPANY, SEO, TRUST_BLOCK } from '@/lib/constants';
import { buildMetadata } from '@/lib/seo';
import { LoanProductJsonLd, WebPageJsonLd } from '@/components/JsonLd';
import { TrustPanel } from '@/components/TrustPanel';

export const metadata = buildMetadata({
  title: 'Emergency Loan Guidance',
  description:
    'Emergency loan support for Malaysians. Get fast eligibility checks, DSR planning, and lender matching for urgent funding needs.',
  path: '/loans/emergency',
  image: '/images/optimized/personal-loan.jpg',
  keywords:
    'emergency loan Malaysia, urgent cash loan, fast analysis, DSR analysis, loan guidance',
});

const pageContent = {
  en: {
    header: {
      badge: 'Urgent Financial Help',
      title: 'Emergency',
      titleHighlight: 'Loans',
      subtitle: 'Fast guidance when you need it most. Same-day analysis for urgent financial needs.',
    },
    urgentBanner: {
      title: 'Need Cash Today?',
      description: 'Call us now for priority processing',
      cta: 'Call Now',
    },
    stats: [
      { value: '2-4hrs', label: 'Express Analysis' },
      { value: 'RM50K', label: 'Up to Amount' },
      { value: '24/7', label: 'Application' },
      { value: '4.88%', label: 'From Rate' },
    ],
    situations: {
      title: 'Common Emergency Situations We Help With',
      items: [
        { icon: 'medical', title: 'Medical Emergencies', description: 'Hospital bills, surgery costs, or unexpected medical expenses' },
        { icon: 'car', title: 'Car Repairs', description: 'Urgent vehicle repairs needed to get back to work' },
        { icon: 'home', title: 'Home Repairs', description: 'Leaking roof, broken pipes, or essential home fixes' },
        { icon: 'family', title: 'Family Emergencies', description: 'Funeral costs, urgent travel, or family support' },
        { icon: 'business', title: 'Business Cash Flow', description: 'Cover payroll, suppliers, or urgent business needs' },
        { icon: 'bills', title: 'Overdue Bills', description: 'Prevent utility cutoffs or late payment penalties' },
      ],
    },
    features: {
      title: 'Why Choose Our Emergency Loans?',
      items: [
        {
          icon: 'Zap',
          title: 'Express Processing',
          description: 'Priority handling for urgent cases. Get analysis within 2-4 hours when documents are complete.',
        },
        {
          icon: 'FileText',
          title: 'Minimal Documents',
          description: 'Just IC, salary slip, and bank statement. We keep paperwork to a minimum.',
        },
        {
          icon: 'Shield',
          title: 'No Collateral',
          description: 'Unsecured personal loans. No need to put up your assets as security.',
        },
        {
          icon: 'Clock',
          title: 'Flexible Repayment',
          description: 'Choose tenure from 1-7 years. Adjust payments to fit your budget.',
        },
      ],
    },
    process: {
      title: 'Emergency Loan Process',
      subtitle: 'Get lender-ready in 3 simple steps',
      steps: [
        {
          step: '1',
          title: 'Apply Online or Call',
          description: 'Submit your application online or call us directly for faster processing',
          time: '5 mins',
        },
        {
          step: '2',
          title: 'Quick Verification',
          description: 'Our team verifies your documents and completes your eligibility analysis',
          time: '2-4 hours',
        },
        {
          step: '3',
          title: 'Submit to Bank',
          description: 'We help submit to the right lenders and guide your follow-up',
          time: 'Same day (if docs complete)',
        },
      ],
    },
    requirements: {
      title: 'Basic Requirements',
      items: [
        'Malaysian citizen or PR',
        'Age 21-60 years old',
        'Minimum income RM2,000/month',
        'Working for at least 6 months',
        'Valid bank account',
      ],
    },
    documents: {
      title: 'Documents Needed',
      items: [
        'IC (MyKad) - front and back',
        'Latest 3 months salary slip',
        'Latest 3 months bank statement',
        'Employment confirmation letter (if available)',
      ],
    },
    tips: {
      title: 'Tips for Faster Processing',
      items: [
        'Have all documents ready before applying',
        'Ensure salary slip matches bank statement deposits',
        'Apply during business hours (9am-6pm) for same-day analysis',
        'Call ahead if your case is extremely urgent',
      ],
    },
    faq: {
      title: 'Emergency Loan FAQ',
      items: [
        {
          question: 'How fast can my application be submitted?',
          answer: 'With complete documents, analysis can happen within 2-4 hours and submission can be done the same day. Approval timelines depend on the bank.',
        },
        {
          question: 'What documents are required?',
          answer: 'Typically IC, latest salary slips, and recent bank statements.',
        },
        {
          question: 'Is collateral needed?',
          answer: 'No. Emergency loans are unsecured personal loans.',
        },
      ],
    },
    cta: {
      title: 'Need Emergency Cash Now?',
      description: 'Apply now or contact us directly for priority processing. We understand urgency.',
      primary: 'Apply Now',
      secondary: 'Call Us Now',
      whatsapp: 'WhatsApp Us',
    },
  },
  ms: {
    header: {
      badge: 'Bantuan Kewangan Segera',
      title: 'Pinjaman',
      titleHighlight: 'Kecemasan',
      subtitle: 'Panduan pantas bila anda perlukan. Analisis hari yang sama untuk keperluan kewangan segera.',
    },
    urgentBanner: {
      title: 'Perlukan Wang Hari Ini?',
      description: 'Hubungi kami sekarang untuk pemprosesan keutamaan',
      cta: 'Hubungi Sekarang',
    },
    stats: [
      { value: '2-4jam', label: 'Analisis Ekspres' },
      { value: 'RM50K', label: 'Sehingga Jumlah' },
      { value: '24/7', label: 'Permohonan' },
      { value: '4.88%', label: 'Dari Kadar' },
    ],
    situations: {
      title: 'Situasi Kecemasan Yang Kami Bantu',
      items: [
        { icon: 'medical', title: 'Kecemasan Perubatan', description: 'Bil hospital, kos pembedahan, atau perbelanjaan perubatan tidak dijangka' },
        { icon: 'car', title: 'Pembaikan Kereta', description: 'Pembaikan kenderaan segera diperlukan untuk kembali bekerja' },
        { icon: 'home', title: 'Pembaikan Rumah', description: 'Bumbung bocor, paip pecah, atau pembaikan rumah penting' },
        { icon: 'family', title: 'Kecemasan Keluarga', description: 'Kos pengebumian, perjalanan segera, atau sokongan keluarga' },
        { icon: 'business', title: 'Aliran Tunai Perniagaan', description: 'Cover gaji, pembekal, atau keperluan perniagaan segera' },
        { icon: 'bills', title: 'Bil Tertunggak', description: 'Elak pemutusan utiliti atau penalti pembayaran lewat' },
      ],
    },
    features: {
      title: 'Mengapa Pilih Pinjaman Kecemasan Kami?',
      items: [
        {
          icon: 'Zap',
          title: 'Pemprosesan Ekspres',
          description: 'Pengendalian keutamaan untuk kes segera. Analisis siap dalam 2-4 jam jika dokumen lengkap.',
        },
        {
          icon: 'FileText',
          title: 'Dokumen Minimum',
          description: 'Hanya IC, slip gaji, dan penyata bank. Kami minimumkan kertas kerja.',
        },
        {
          icon: 'Shield',
          title: 'Tiada Cagaran',
          description: 'Pinjaman peribadi tanpa cagaran. Tiada perlu letakkan aset sebagai jaminan.',
        },
        {
          icon: 'Clock',
          title: 'Bayaran Balik Fleksibel',
          description: 'Pilih tempoh dari 1-7 tahun. Sesuaikan bayaran mengikut bajet anda.',
        },
      ],
    },
    process: {
      title: 'Proses Pinjaman Kecemasan',
      subtitle: 'Sedia untuk bank dalam 3 langkah mudah',
      steps: [
        {
          step: '1',
          title: 'Mohon Online atau Hubungi',
          description: 'Hantar permohonan anda dalam talian atau hubungi kami terus untuk pemprosesan lebih cepat',
          time: '5 min',
        },
        {
          step: '2',
          title: 'Pengesahan Cepat',
          description: 'Pasukan kami sahkan dokumen anda dan siapkan analisis kelayakan',
          time: '2-4 jam',
        },
        {
          step: '3',
          title: 'Hantar ke Bank',
          description: 'Kami bantu hantar ke bank yang sesuai dan pandu susulan',
          time: 'Hari sama (jika dokumen lengkap)',
        },
      ],
    },
    requirements: {
      title: 'Syarat Asas',
      items: [
        'Warganegara Malaysia atau PR',
        'Umur 21-60 tahun',
        'Pendapatan minimum RM2,000/bulan',
        'Bekerja sekurang-kurangnya 6 bulan',
        'Akaun bank yang sah',
      ],
    },
    documents: {
      title: 'Dokumen Diperlukan',
      items: [
        'IC (MyKad) - depan dan belakang',
        'Slip gaji 3 bulan terkini',
        'Penyata bank 3 bulan terkini',
        'Surat pengesahan majikan (jika ada)',
      ],
    },
    tips: {
      title: 'Tip untuk Proses Lebih Cepat',
      items: [
        'Sediakan semua dokumen sebelum memohon',
        'Pastikan slip gaji sepadan dengan deposit penyata bank',
        'Mohon semasa waktu perniagaan (9pg-6ptg) untuk analisis hari sama',
        'Hubungi terlebih dahulu jika kes anda sangat segera',
      ],
    },
    faq: {
      title: 'Soalan Lazim Pinjaman Kecemasan',
      items: [
        {
          question: 'Berapa cepat permohonan boleh dihantar?',
          answer: 'Jika dokumen lengkap, analisis siap dalam 2-4 jam dan penghantaran boleh dibuat hari yang sama. Tempoh kelulusan bergantung pada bank.',
        },
        {
          question: 'Dokumen apa diperlukan?',
          answer: 'Kebiasaannya IC, slip gaji terkini, dan penyata bank.',
        },
        {
          question: 'Perlu cagaran?',
          answer: 'Tidak. Pinjaman kecemasan adalah pinjaman peribadi tanpa cagaran.',
        },
      ],
    },
    cta: {
      title: 'Perlukan Wang Tunai Kecemasan Sekarang?',
      description: 'Mohon sekarang atau hubungi kami terus untuk pemprosesan keutamaan. Kami faham kesegeraan.',
      primary: 'Mohon Sekarang',
      secondary: 'Hubungi Kami',
      whatsapp: 'WhatsApp Kami',
    },
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  FileText,
  Shield,
  Clock,
};

export default async function EmergencyLoanPage() {
  const language = await resolveRequestLanguage();
  const t = pageContent[language] ?? pageContent.en;
  const trust = TRUST_BLOCK[language] ?? TRUST_BLOCK.en;

  return (
    <>
      <LoanProductJsonLd
        name="Emergency Personal Loan"
        description="Fast eligibility analysis for urgent financial needs"
        interestRate="4.88% p.a."
        loanTerm="1-7 years"
        minAmount={5000}
        maxAmount={50000}
      />
      <WebPageJsonLd
        url={`${SEO.url}/loans/emergency`}
        title={`${t.header.title} ${t.header.titleHighlight}`}
        description={t.header.subtitle}
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: `${t.header.title} ${t.header.titleHighlight}`, url: `${SEO.url}/loans/emergency` },
        ]}
        faqItems={t.faq.items}
      />
      <div className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-25" aria-hidden="true" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
        <div className="container relative">
          {/* Urgent Banner */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{t.urgentBanner.title}</h2>
                <p className="text-white/80">{t.urgentBanner.description}</p>
              </div>
            </div>
            <Button asChild size="lg" className="bg-white text-red-600 hover:bg-white/90">
              <Link href={COMPANY.phoneLink}>
                <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                {t.urgentBanner.cta}
              </Link>
            </Button>
          </div>

          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 border-red-200 text-red-600">
              <Zap className="h-3 w-3 mr-1" aria-hidden="true" />
              {t.header.badge}
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {t.header.title} <span className="gradient-text">{t.header.titleHighlight}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.header.subtitle}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {t.stats.map((stat, index) => (
              <Card key={index} className="text-center border-2 hover:border-primary/50 transition-colors surface-card">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Situations */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">{t.situations.title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.situations.items.map((situation, index) => (
                <Card key={index} className="border hover:shadow-lg transition-shadow surface-card">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">{situation.title}</h3>
                    <p className="text-sm text-muted-foreground">{situation.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">{t.features.title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.features.items.map((feature, index) => {
                const Icon = iconMap[feature.icon];
                return (
                  <Card key={index} className="border-2 border-primary/20 bg-primary/5 surface-card">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Process */}
          <section className="mb-16 bg-muted/50 rounded-2xl p-8 lg:p-12 surface-card">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">{t.process.title}</h2>
              <p className="text-muted-foreground">{t.process.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {t.process.steps.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4">
                      {step.step}
                    </div>
                    <Badge variant="secondary" className="mb-3">
                      <Timer className="h-3 w-3 mr-1" aria-hidden="true" />
                      {step.time}
                    </Badge>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Requirements & Documents */}
          <section className="mb-16 grid md:grid-cols-2 gap-8">
            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                  {t.requirements.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {t.requirements.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
                  {t.documents.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {t.documents.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Tips */}
          <section className="mb-16">
            <Card className="max-w-3xl mx-auto bg-blue-50/50 border-blue-200 surface-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Zap className="h-5 w-5" aria-hidden="true" />
                  {t.tips.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {t.tips.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-blue-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">{t.faq.title}</h2>
              <div className="grid gap-4">
                {t.faq.items.map((item) => (
                  <Card key={item.question} className="surface-card border-primary/10">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{item.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <TrustPanel
                title={trust.title}
                description={trust.description}
                items={trust.items}
              />
            </div>
          </section>

          {/* CTA */}
          <section>
            <Card className="bg-gradient-to-br from-primary/5 via-background to-primary/10 border-2 border-primary/20 surface-card">
              <CardContent className="py-12 text-center">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">{t.cta.title}</h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  {t.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="btn-gradient text-primary-foreground shadow-lg shadow-primary/25">
                    <Link href="/services/1/apply">
                      {t.cta.primary}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href={COMPANY.phoneLink}>
                      <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                      {t.cta.secondary}
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                      {t.cta.whatsapp}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </>
  );
}
