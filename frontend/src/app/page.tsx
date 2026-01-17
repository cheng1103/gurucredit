import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrustBadges } from '@/components/TrustBadges';
import { LoanPaymentTable } from '@/components/LoanPaymentTable';
import { ProcessTimeline } from '@/components/ProcessTimeline';
import { CaseStudies } from '@/components/CaseStudies';
import { AreasWeServe } from '@/components/AreasWeServe';
import { PreApprovalCalculatorLazy } from '@/components/lazy/PreApprovalCalculatorLazy';
import { TestimonialCarouselLazy } from '@/components/lazy/TestimonialCarouselLazy';
import { TrustSectionLazy } from '@/components/lazy/TrustSectionLazy';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import {
  CheckCircle,
  Calculator,
  FileSearch,
  TrendingUp,
  Building2,
  Shield,
  ArrowRight,
  Star,
  Sparkles,
  Clock,
  Award,
  Zap,
  HelpCircle,
  MessageCircle,
  CalendarDays,
  MapPin,
} from 'lucide-react';
import { COMPANY, SEO } from '@/lib/constants';
import { WebPageJsonLd } from '@/components/JsonLd';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { blogPosts } from '@/lib/blog-data';

// Bilingual content
const content = {
  en: {
    hero: {
      badge: 'Serving Kuala Lumpur & Selangor',
      title: 'Fast, Clear',
      titleHighlight: 'Loan Guidance',
      titleEnd: 'When You Need It',
      subtitle:
        'RM30 eligibility check with DSR insights, CCRIS/CTOS review, and bank recommendations tailored to your profile. Approvals as fast as 24h.',
      cta: 'Start Eligibility Check',
      secondary: 'Estimate Monthly Payment',
      whatsapp: 'Chat on WhatsApp',
      paymentNotice: 'RM30 eligibility fee is collected ONLY inside our official WhatsApp chat after submission. No payment happens on this website.',
      coverageNotice: 'Applicants must reside in Kuala Lumpur or Selangor (Klang Valley). We do not process Sabah/Sarawak cases.',
      statusLink: 'Track application status',
      highlights: [
        {
          title: 'DSR + CCRIS/CTOS review',
          description: 'Know your approval odds before you apply.',
        },
        {
          title: 'Bank shortlisting',
          description: 'Matched to lenders that fit your income profile.',
        },
        {
          title: 'No payment on site',
          description: 'RM30 is collected only via official WhatsApp.',
        },
        {
          title: 'Klang Valley focus',
          description: 'Dedicated support for KL & Selangor applicants.',
        },
      ],
      steps: [
        {
          title: 'Submit in 5 minutes',
          description: 'Share income, debts, and loan goals.',
        },
        {
          title: 'We analyze within 24h',
          description: 'DSR, CCRIS/CTOS, and lender fit review.',
        },
        {
          title: 'Get your action plan',
          description: 'Checklist + next steps to boost approval.',
        },
      ],
    },
    stats: [
      { value: '85%', label: 'Guided Approval Rate' },
      { value: '24h', label: 'Report Turnaround' },
      { value: 'RM30', label: 'Expert Analysis' },
      { value: '1,000+', label: 'Klang Valley Borrowers' },
    ],
    mainService: {
      badge: 'Most Popular',
      title: 'Personal Loan',
      description: 'Action plan + lender shortlist based on your credit file',
      price: 'From 4.88%',
      priceNote: 'flat rate p.a.',
      features: [
        'Loan up to RM100,000 with tailored lender list',
        'Flexible tenure 1-7 years with transparent fees',
        'Turnaround as fast as 24 hours when documents are ready',
        'Minimal documentation and clear checklist',
        'No hidden charges or surprise add-ons',
        'Online-first application and status updates',
        'Rate guidance based on your DSR and profile',
      ],
      cta: 'Get My Plan',
      note: 'Approval guidance within 24 hours',
    },
    features: {
      badge: 'Our Loan Products',
      title: 'Loans We Offer',
      subtitle:
        'Personal, car, home, and business financing with clear requirements, transparent fees, and a guided approval path.',
      items: [
        { title: 'Personal Loan', description: 'For emergencies, medical bills, or cashflow gaps with rapid guidance' },
        { title: 'Car Loan', description: 'Finance a new or used car with a bank shortlist that fits your DSR' },
        { title: 'Home Loan', description: 'Plan your mortgage with tenure/rate options and document checklist' },
        { title: 'Business Loan', description: 'Working capital and expansion with lender pairing and prep' },
      ],
    },
    howItWorks: {
      badge: 'Simple Process',
      title: 'How It Works',
      subtitle: 'Three clear steps from DSR analysis to lender-ready application',
      steps: [
        {
          step: '01',
          title: 'Submit Your Details',
          description:
            '5 minutes to share income, debts, and goals. We use this to calculate DSR and spot red flags.',
        },
        {
          step: '02',
          title: 'We Analyze',
          description:
            'We review CCRIS/CTOS, compute your DSR, and pair you with banks that fit your profile and timeline.',
        },
        {
          step: '03',
          title: 'Get Results',
          description:
            'Receive a report with approval chances, max loan estimate, and a ready-to-use document checklist.',
        },
      ],
    },
    testimonials: {
      badge: 'Client Success Stories',
      title: 'What Our Clients Say',
      subtitle: 'Join over 1,000 Klang Valley borrowers who have successfully navigated their loan applications with our help.',
      items: [
        { name: 'Ahmad R.', location: 'Kuala Lumpur', text: 'GURU Credits helped me understand why my previous loan applications were rejected. Their analysis identified issues with my credit report I never knew about. After following their recommendations, I got approved for my home loan!' },
        { name: 'Sarah L.', location: 'Petaling Jaya', text: 'The RM30 analysis was worth every sen. Very detailed report with clear explanations. They even recommended which banks would be more likely to approve my application based on my profile.' },
        { name: 'Raj K.', location: 'Shah Alam', text: 'Professional service with fast turnaround. Got my report within 24 hours as promised. The DSR calculation and bank recommendations were spot on. Highly recommend!' },
      ],
    },
    whyUs: {
      badge: 'Why Us',
      title: 'Why Choose GURU Credits?',
      items: [
        'Bank pairing based on your DSR and credit file, not generic advice',
        'Transparent fees with a RM30 analysis option before committing',
        'Document checklist and templates to cut approval time',
        'Support for personal, car, home, and business loans across Kuala Lumpur & Selangor',
        '24h turnaround for analysis once docs are complete',
      ],
      stats: [
        { value: '85%', label: 'Guided Success Rate' },
        { value: '24h', label: 'Analysis Speed' },
        { value: 'RM30', label: 'Upfront Fee' },
      ],
    },
    faq: {
      badge: 'Common Questions',
      title: 'Frequently Asked Questions',
      subtitle: 'Quick answers to help you understand our loan services better.',
      items: [
        { question: 'What types of loans do you offer?', answer: 'We offer personal loans, car loans, home loans, and business loans with competitive interest rates starting from 4.88% flat rate per annum.' },
        { question: 'How long does the approval take?', answer: 'Most loan applications are processed within 24 hours. Once approved, funds are disbursed quickly to your account.' },
        { question: 'What documents do I need?', answer: 'Basic set: IC copy, latest 3 months salary slips, bank statements, employment letter. We provide a checklist and flag extras by loan type.' },
      ],
      viewAll: 'View All FAQs',
    },
    blog: {
      badge: 'Latest Insights',
      title: 'From the Blog',
      cta: 'View All Articles',
      readArticle: 'Read Article',
    },
    resources: {
      badge: 'Tools & Guides',
      title: 'Plan with Calculators & Articles',
      openTool: 'Open Tool',
      items: [
        {
          tool: 'Car Loan Calculator',
          description: 'Estimate monthly instalments and ownership cost.',
          toolLink: '/tools/car-loan-calculator',
          guide: 'Read the complete car loan guide',
          guideLink: '/blog/car-loan-guide-malaysia-2024',
        },
        {
          tool: 'Home Loan Calculator',
          description: 'Model your mortgage payments and DSR impact.',
          toolLink: '/tools/home-loan-calculator',
          guide: 'See the first-time buyer roadmap',
          guideLink: '/blog/home-loan-first-time-buyer-guide-2024',
        },
        {
          tool: 'Loan Eligibility Test',
          description: 'Answer 5 questions to rate your approval odds.',
          toolLink: '/eligibility-test',
          guide: 'Fix common rejection reasons',
          guideLink: '/blog/loan-rejection-reasons-solutions',
        },
      ],
    },
    cta: {
      badge: 'Get Started Today',
      title: 'Ready for a clear approval path?',
      subtitle: 'Start with a RM30 eligibility analysis: DSR, CCRIS/CTOS review, lender shortlist, and action plan.',
      primary: 'Start My Analysis',
      secondary: 'Chat on WhatsApp',
    },
  },
  ms: {
    hero: {
      badge: 'Beroperasi di Kuala Lumpur & Selangor',
      title: 'Pantas & Jelas',
      titleHighlight: 'Panduan Pinjaman',
      titleEnd: 'Saat Anda Perlukan',
      subtitle: 'Semakan kelayakan RM30 dengan analisis DSR, semakan CCRIS/CTOS dan cadangan bank mengikut profil anda. Kelulusan sepantas 24 jam.',
      cta: 'Mulakan Semakan Kelayakan',
      secondary: 'Anggar Bayaran Bulanan',
      whatsapp: 'Sembang WhatsApp',
      paymentNotice: 'Yuran semakan RM30 hanya dikutip melalui WhatsApp rasmi kami selepas penghantaran. Tiada bayaran dibuat di laman web ini.',
      coverageNotice: 'Kami hanya menerima pemohon dari Kuala Lumpur atau Selangor (Lembah Klang). Permohonan dari Sabah/Sarawak tidak diterima.',
      statusLink: 'Semak status permohonan',
      highlights: [
        {
          title: 'Semakan DSR + CCRIS/CTOS',
          description: 'Ketahui peluang kelulusan sebelum mohon.',
        },
        {
          title: 'Senarai bank sesuai',
          description: 'Dipadankan dengan profil pendapatan anda.',
        },
        {
          title: 'Tiada bayaran di laman',
          description: 'RM30 dikutip hanya melalui WhatsApp rasmi.',
        },
        {
          title: 'Fokus Lembah Klang',
          description: 'Bantuan khusus untuk KL & Selangor.',
        },
      ],
      steps: [
        {
          title: 'Hantar dalam 5 minit',
          description: 'Kongsi pendapatan, hutang, dan sasaran.',
        },
        {
          title: 'Analisis dalam 24 jam',
          description: 'DSR, CCRIS/CTOS, dan padanan bank.',
        },
        {
          title: 'Terima pelan tindakan',
          description: 'Senarai dokumen + langkah seterusnya.',
        },
      ],
    },
    stats: [
      { value: '85%', label: 'Kadar Kelulusan Dibimbing' },
      { value: '24j', label: 'Masa Laporan' },
      { value: 'RM30', label: 'Analisis Pakar' },
      { value: '1,000+', label: 'Pemohon Lembah Klang' },
    ],
    mainService: {
      badge: 'Paling Popular',
      title: 'Pinjaman Peribadi',
      description: 'Pelan tindakan + senarai bank berdasarkan fail kredit anda',
      price: 'Dari 4.88%',
      priceNote: 'kadar rata setahun',
      features: [
        'Pinjaman sehingga RM100,000 dengan senarai bank ditapis',
        'Tempoh fleksibel 1-7 tahun dengan caj telus',
        'Analisis siap dalam 24 jam selepas dokumen lengkap',
        'Dokumentasi minimum dengan senarai semak jelas',
        'Tiada caj tersembunyi atau tambahan mengejut',
        'Permohonan digital dan kemas kini status',
        'Panduan kadar berdasarkan DSR dan profil',
      ],
      cta: 'Dapatkan Pelan Saya',
      note: 'Panduan kelulusan dalam 24 jam',
    },
    features: {
      badge: 'Produk Pinjaman Kami',
      title: 'Pinjaman Yang Kami Tawarkan',
      subtitle: 'Peribadi, kereta, rumah dan pembiayaan perniagaan dengan keperluan jelas dan yuran telus.',
      items: [
        { title: 'Pinjaman Peribadi', description: 'Untuk kecemasan, bil perubatan atau jurang aliran tunai dengan panduan segera' },
        { title: 'Pinjaman Kereta', description: 'Biayai kereta baharu atau terpakai dengan padanan bank yang sesuai DSR' },
        { title: 'Pinjaman Rumah', description: 'Rancang gadai janji dengan pilihan tempoh/kadar dan senarai semak dokumen' },
        { title: 'Pinjaman Perniagaan', description: 'Modal kerja dan pengembangan dengan padanan pemberi pinjaman dan persediaan' },
      ],
    },
    howItWorks: {
      badge: 'Proses Mudah',
      title: 'Cara Ia Berfungsi',
      subtitle: 'Tiga langkah jelas daripada analisis DSR ke permohonan sedia bank',
      steps: [
        {
          step: '01',
          title: 'Hantar Maklumat',
          description: '5 minit untuk kongsi pendapatan, hutang dan matlamat. Kami kira DSR dan cari bendera merah.',
        },
        {
          step: '02',
          title: 'Kami Analisis',
          description: 'Kami semak CCRIS/CTOS, kira DSR dan padankan bank yang sesuai profil & garis masa anda.',
        },
        {
          step: '03',
          title: 'Terima Hasil',
          description: 'Terima laporan dengan peluang kelulusan, anggaran maks pinjaman dan senarai semak dokumen.',
        },
      ],
    },
    testimonials: {
      badge: 'Kisah Kejayaan Pelanggan',
      title: 'Apa Kata Pelanggan Kami',
      subtitle: 'Sertai lebih 1,000 peminjam Lembah Klang yang berjaya menavigasi permohonan pinjaman dengan bantuan kami.',
      items: [
        { name: 'Ahmad R.', location: 'Kuala Lumpur', text: 'GURU Credits bantu saya faham kenapa permohonan pinjaman dahulu ditolak. Selepas ikut cadangan mereka, permohonan rumah diluluskan!' },
        { name: 'Sarah L.', location: 'Petaling Jaya', text: 'Analisis RM30 sangat berbaloi. Laporan jelas dan cadangan bank tepat dengan profil saya.' },
        { name: 'Raj K.', location: 'Shah Alam', text: 'Servis profesional dengan maklum balas pantas. Pengiraan DSR dan cadangan bank sangat membantu.' },
      ],
    },
    whyUs: {
      badge: 'Mengapa Kami',
      title: 'Mengapa Pilih GURU Credits?',
      items: [
        'Padanan bank berdasarkan DSR & fail kredit anda',
        'Yuran telus dengan pilihan analisis RM30',
        'Senarai semak dokumen & templat untuk percepat kelulusan',
        'Sokong pinjaman peribadi, kereta, rumah & perniagaan di Kuala Lumpur & Selangor',
        'Analisis siap 24 jam selepas dokumen lengkap',
      ],
      stats: [
        { value: '85%', label: 'Kadar Kejayaan Dibimbing' },
        { value: '24j', label: 'Kelajuan Analisis' },
        { value: 'RM30', label: 'Yuran Pendahuluan' },
      ],
    },
    faq: {
      badge: 'Soalan Lazim',
      title: 'Soalan Lazim',
      subtitle: 'Jawapan pantas tentang perkhidmatan pinjaman kami.',
      items: [
        { question: 'Apakah jenis pinjaman yang anda tawarkan?', answer: 'Pinjaman peribadi, kereta, rumah dan perniagaan dengan kadar rata bermula 4.88% setahun.' },
        { question: 'Berapa lama proses kelulusan?', answer: 'Analisis kami siap dalam 24 jam. Bank biasanya beri keputusan dalam 1-3 hari bergantung pada dokumen.' },
        { question: 'Apakah dokumen yang diperlukan?', answer: 'Set asas: salinan IC, slip gaji 3 bulan, penyata bank dan surat pengesahan kerja. Kami sediakan senarai semak khusus mengikut jenis pinjaman.' },
      ],
      viewAll: 'Lihat Semua Soalan Lazim',
    },
    blog: {
      badge: 'Wawasan Terkini',
      title: 'Daripada Blog',
      cta: 'Lihat Semua Artikel',
      readArticle: 'Baca Artikel',
    },
    resources: {
      badge: 'Alat & Panduan',
      title: 'Rancang dengan Kalkulator & Artikel',
      openTool: 'Buka Alat',
      items: [
        {
          tool: 'Kalkulator Pinjaman Kereta',
          description: 'Anggar ansuran dan kos pemilikan kereta.',
          toolLink: '/tools/car-loan-calculator',
          guide: 'Baca panduan pinjaman kereta lengkap',
          guideLink: '/blog/car-loan-guide-malaysia-2024',
        },
        {
          tool: 'Kalkulator Pinjaman Rumah',
          description: 'Simulasi bayaran gadai janji dan kesan DSR.',
          toolLink: '/tools/home-loan-calculator',
          guide: 'Ikuti pelan pembeli rumah pertama',
          guideLink: '/blog/home-loan-first-time-buyer-guide-2024',
        },
        {
          tool: 'Ujian Kelayakan Pinjaman',
          description: 'Jawab 5 soalan untuk menilai peluang kelulusan.',
          toolLink: '/eligibility-test',
          guide: 'Baiki punca penolakan biasa',
          guideLink: '/blog/loan-rejection-reasons-solutions',
        },
      ],
    },
    cta: {
      badge: 'Mulakan Hari Ini',
      title: 'Sedia untuk laluan kelulusan jelas?',
      subtitle: 'Mulakan dengan analisis kelayakan RM30: DSR, semakan CCRIS/CTOS, senarai bank & pelan tindakan.',
      primary: 'Mulakan Analisis Saya',
      secondary: 'Chat di WhatsApp',
    },
  },
};

const featureIcons = [FileSearch, Calculator, TrendingUp, Building2];
const featureColors = ['from-blue-500 to-blue-600', 'from-emerald-500 to-emerald-600', 'from-amber-500 to-amber-600', 'from-purple-500 to-purple-600'];
const whyUsIcons = [Award, Shield, Clock, Star, Building2];
const heroHighlightIcons = [Shield, FileSearch, MessageCircle, MapPin];

export default async function HomePage() {
  const language = await resolveRequestLanguage();
  const t = content[language] ?? content.en;
  const latestPosts = blogPosts.slice(0, 3);
  const locale = language === 'ms' ? 'ms-MY' : 'en-MY';

  return (
    <div className="flex flex-col">
      <WebPageJsonLd
        url={SEO.url}
        title={SEO.defaultTitle}
        description={SEO.defaultDescription}
        breadcrumbItems={[{ name: 'Home', url: SEO.url }]}
        faqItems={t.faq.items}
      />
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="GURU Credits - Fast & Easy Loans"
            fill
            className="object-cover object-center"
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQVH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAECABEhA//aAAwDAQACEQMRAD8Azq31e9tLCOzhdBHGoCgoCcD+1UdN3ZqlnbJAlxGUQYBMYJ/aKKphWVZc/9k="
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        <div className="absolute inset-0 hero-grid opacity-50" aria-hidden="true" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                <Sparkles className="h-4 w-4" />
                {t.hero.badge}
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  {t.hero.title}{' '}
                  <span className="gradient-text">{t.hero.titleHighlight}</span>{' '}
                  {t.hero.titleEnd}
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed">
                  {t.hero.subtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <Button size="lg" asChild className="h-12 px-8 text-base font-semibold btn-gradient text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                  <Link href="/services">
                    {t.hero.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-12 px-8 text-base font-medium border-2 hover:bg-primary/5">
                  <Link href="/calculator">
                    <Calculator className="mr-2 h-5 w-5" />
                    {t.hero.secondary}
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="h-12 px-8 text-base font-medium bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {t.hero.whatsapp}
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-medium text-primary">{t.hero.paymentNotice}</span>
                <Link href="/status" className="inline-flex items-center text-sm font-semibold text-primary hover:underline">
                  {t.hero.statusLink}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </p>
              {t.hero.coverageNotice && (
                <div className="flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 p-3 text-sm text-muted-foreground surface-card">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{t.hero.coverageNotice}</span>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                {t.hero.highlights.map((highlight, index) => {
                  const Icon = heroHighlightIcons[index] ?? Shield;
                  return (
                    <div key={highlight.title} className="rounded-2xl p-4 shadow-sm surface-card">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{highlight.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{highlight.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <ol className="grid sm:grid-cols-3 gap-4">
                {t.hero.steps.map((step, index) => (
                  <li key={step.title} className="rounded-2xl p-4 border border-primary/10 bg-white/70 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                        {language === 'ms' ? 'Langkah' : 'Step'}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-foreground">{step.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                  </li>
                ))}
              </ol>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
                {t.stats.map((stat, index) => {
                  // Parse stat value on server side to avoid client/server boundary issues
                  const v = String(stat.value ?? '').trim();
                  let parsed: { number: number; suffix: string; prefix: string; decimals: number };
                  
                  if (v.includes('%')) {
                    const num = parseFloat(v.replace('%', '')) || 0;
                    parsed = { number: num, suffix: '%', prefix: '', decimals: 2 };
                  } else if (/\d+[hj]$/i.test(v)) {
                    const num = parseInt(v, 10) || 0;
                    const suffix = v.slice(-1);
                    parsed = { number: num, suffix, prefix: '', decimals: 0 };
                  } else if (v.includes('+')) {
                    const num = parseInt(v.replace(/[,+]/g, ''), 10) || 0;
                    parsed = { number: num, suffix: '+', prefix: '', decimals: 0 };
                  } else if (v.toUpperCase().startsWith('RM')) {
                    // Handle currency prefix like "RM30"
                    const num = parseFloat(v.replace(/RM|,/gi, '')) || 0;
                    parsed = { number: num, suffix: '', prefix: 'RM', decimals: 0 };
                  } else {
                    const num = parseInt(v.replace(/,/g, ''), 10) || 0;
                    parsed = { number: num, suffix: '', prefix: '', decimals: 0 };
                  }
                  
                  return (
                    <div key={index} className="text-center sm:text-left">
                      <div className="text-2xl lg:text-3xl font-bold text-primary">
                        <AnimatedCounter
                          end={parsed.number}
                          suffix={parsed.suffix}
                          prefix={parsed.prefix}
                          decimals={parsed.decimals}
                          duration={2000}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main Service Card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-2xl" />
              <Card className="relative border-2 border-primary/20 shadow-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground p-6 lg:p-8">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <Badge className="bg-white/20 text-white border-0 mb-3">
                        <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {t.mainService.badge}
                      </Badge>
                      <CardTitle className="text-2xl lg:text-3xl font-bold">{t.mainService.title}</CardTitle>
                      <CardDescription className="text-primary-foreground/80 mt-2 text-base">
                        {t.mainService.description}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <span className="text-4xl lg:text-5xl font-bold">{t.mainService.price}</span>
                      <p className="text-sm text-primary-foreground/70">{t.mainService.priceNote}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 lg:p-8">
                  <ul className="space-y-4">
                    {t.mainService.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-8 h-12 text-base font-semibold btn-gradient text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all" size="lg" asChild>
                    <Link href="/services">
                      {t.mainService.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    {t.mainService.note}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges language={language} />

      {/* Features Section - Loan Products with Images */}
      <section className="py-20 lg:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5">
              <Zap className="h-3 w-3 mr-1" />
              {t.features.badge}
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.features.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t.features.subtitle}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {t.features.items.map((feature, index) => {
              const Icon = featureIcons[index];
              const featureImages = [
                '/images/optimized/personal-loan.jpg',
                '/images/optimized/car-loan.jpg',
                '/images/optimized/home-loan.jpg',
                '/images/optimized/business-loan.jpg',
              ];
              return (
                <Card key={index} className="group card-hover border-0 shadow-lg overflow-hidden h-full flex flex-col">
                  {/* Loan product image */}
                  <div className="relative aspect-[4/3] min-h-[160px] overflow-hidden">
                    <Image
                      src={featureImages[index]}
                      alt={feature.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className={`absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-gradient-to-br ${featureColors[index]} flex items-center justify-center shadow-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pre-Approval Calculator */}
      <PreApprovalCalculatorLazy />

      {/* How It Works - Process Timeline */}
      <ProcessTimeline language={language} />

      {/* Case Studies / Success Stories */}
      <CaseStudies language={language} />

      {/* Areas We Serve */}
      <AreasWeServe />

      {/* Testimonial Carousel */}
      <TestimonialCarouselLazy />

      {/* Trust & Certification Section */}
      <TrustSectionLazy />

      {/* Why Choose Us Section */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36%200V4h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Badge className="bg-white/20 text-white border-0 mb-6">
                {t.whyUs.badge}
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold mb-8">
                {t.whyUs.title}
              </h2>
              <ul className="space-y-5">
                {t.whyUs.items.map((item, index) => {
                  const Icon = whyUsIcons[index];
                  return (
                    <li key={index} className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* Team/office image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/2]">
                <Image
                  src="/images/team.jpg"
                  alt="GURU Credits Team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="grid grid-cols-3 gap-4">
                    {t.whyUs.stats.map((stat, index) => (
                      <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3">
                        <div className="text-2xl lg:text-3xl font-bold">{stat.value}</div>
                        <div className="text-xs opacity-80">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Payment Table Section */}
      <section className="py-20 lg:py-24">
        <div className="container">
          <LoanPaymentTable language={language} />
        </div>
      </section>

      {/* Blog Highlights */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">
            <div>
              <Badge variant="outline" className="mb-3 px-4 py-1.5">
                {t.blog.badge}
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold">{t.blog.title}</h2>
            </div>
            <Button variant="outline" asChild>
              <Link href="/blog">
                {t.blog.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {latestPosts.map((post) => {
              const localizedTitle = language === 'ms' ? post.titleMs : post.title;
              const localizedExcerpt = language === 'ms' ? post.excerptMs : post.excerpt;
              const formattedDate = new Date(post.publishedAt).toLocaleDateString(locale, {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              });
              return (
                <Card key={post.slug} className="h-full flex flex-col">
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground mb-4">
                      <CalendarDays className="h-4 w-4" />
                      <span>{formattedDate}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/60" />
                      <span>{post.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{localizedTitle}</h3>
                    <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                      {localizedExcerpt}
                    </p>
                    <div className="mt-auto">
                      <Button variant="link" asChild className="px-0">
                        <Link href={`/blog/${post.slug}`}>
                          {t.blog.readArticle}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-1.5">
              {t.resources.badge}
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold">{t.resources.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.resources.items.map((item, index) => (
              <Card key={index} className="flex flex-col shadow-lg border border-muted">
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold mb-2">{item.tool}</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-1">{item.description}</p>
                  <div className="space-y-3">
                    <Button className="w-full" asChild>
                      <Link href={item.toolLink}>
                        {t.resources.openTool}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-between" asChild>
                      <Link href={item.guideLink}>
                        {item.guide}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 py-1.5 px-4">
              <HelpCircle className="h-3 w-3 mr-1" />
              {t.faq.badge}
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.faq.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t.faq.subtitle}
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {t.faq.items.map((faq, index) => (
              <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <HelpCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/faq">
                {t.faq.viewAll}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section with Background Image */}
      <section className="py-20 lg:py-24 relative overflow-hidden">
        {/* CTA background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/cta-bg.jpg"
            alt="Apply for a loan"
            fill
            sizes="100vw"
            className="object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="bg-white/20 text-white border-0 mb-6 px-4 py-1.5">
              <Sparkles className="h-3 w-3 mr-1" />
              {t.cta.badge}
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t.cta.title}
            </h2>
            <p className="text-white/80 mb-8 text-lg max-w-2xl mx-auto">
              {t.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="h-12 px-8 text-base font-semibold bg-white text-primary hover:bg-white/90 shadow-lg transition-all">
                <Link href="/services">
                  {t.cta.primary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" asChild className="h-12 px-8 text-base font-medium border-2 border-white text-white hover:bg-white/10">
                <Link href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t.cta.secondary}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
