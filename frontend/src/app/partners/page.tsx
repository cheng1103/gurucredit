import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Building2,
  ArrowRight,
  Shield,
  TrendingUp,
  Users,
  Award,
  Handshake,
} from 'lucide-react';
import { resolveRequestLanguage } from '@/lib/i18n/server';
import { WebPageJsonLd } from '@/components/JsonLd';
import { SEO } from '@/lib/constants';

// Bank partners data
const bankPartners = [
  {
    name: 'Maybank',
    logo: '/images/banks/maybank.svg',
    description: 'Malaysia\'s largest bank',
    descriptionMs: 'Bank terbesar Malaysia',
    products: ['Personal Loan', 'Home Loan', 'Car Loan'],
    productsMs: ['Pinjaman Peribadi', 'Pinjaman Rumah', 'Pinjaman Kereta'],
    rating: 4.5,
    minRate: '5.5%',
  },
  {
    name: 'CIMB Bank',
    logo: '/images/banks/cimb.svg',
    description: 'Leading ASEAN universal bank',
    descriptionMs: 'Bank universal ASEAN terkemuka',
    products: ['Personal Loan', 'Home Loan', 'SME Financing'],
    productsMs: ['Pinjaman Peribadi', 'Pinjaman Rumah', 'Pembiayaan PKS'],
    rating: 4.4,
    minRate: '5.8%',
  },
  {
    name: 'Public Bank',
    logo: '/images/banks/publicbank.svg',
    description: 'Premier domestic bank',
    descriptionMs: 'Bank domestik utama',
    products: ['Personal Loan', 'Home Loan', 'Car Loan'],
    productsMs: ['Pinjaman Peribadi', 'Pinjaman Rumah', 'Pinjaman Kereta'],
    rating: 4.6,
    minRate: '5.2%',
  },
  {
    name: 'RHB Bank',
    logo: '/images/banks/rhb.svg',
    description: 'Your personal financial partner',
    descriptionMs: 'Rakan kewangan peribadi anda',
    products: ['Personal Loan', 'Home Loan', 'Business Loan'],
    productsMs: ['Pinjaman Peribadi', 'Pinjaman Rumah', 'Pinjaman Perniagaan'],
    rating: 4.3,
    minRate: '5.6%',
  },
  {
    name: 'Hong Leong Bank',
    logo: '/images/banks/hongleong.svg',
    description: 'Digital-first banking',
    descriptionMs: 'Perbankan digital pertama',
    products: ['Personal Loan', 'Home Loan', 'Car Loan'],
    productsMs: ['Pinjaman Peribadi', 'Pinjaman Rumah', 'Pinjaman Kereta'],
    rating: 4.4,
    minRate: '5.4%',
  },
  {
    name: 'AmBank',
    logo: '/images/banks/ambank.svg',
    description: 'Growing with you',
    descriptionMs: 'Berkembang bersama anda',
    products: ['Personal Loan', 'Home Loan', 'SME Financing'],
    productsMs: ['Pinjaman Peribadi', 'Pinjaman Rumah', 'Pembiayaan PKS'],
    rating: 4.2,
    minRate: '5.9%',
  },
  {
    name: 'Bank Rakyat',
    logo: '/images/banks/bankrakyat.svg',
    description: 'Cooperative bank for all',
    descriptionMs: 'Bank koperasi untuk semua',
    products: ['Personal Loan', 'Islamic Financing'],
    productsMs: ['Pinjaman Peribadi', 'Pembiayaan Islam'],
    rating: 4.3,
    minRate: '4.8%',
  },
  {
    name: 'BSN',
    logo: '/images/banks/bsn.svg',
    description: 'National savings bank',
    descriptionMs: 'Bank simpanan nasional',
    products: ['Personal Loan', 'Home Loan'],
    productsMs: ['Pinjaman Peribadi', 'Pinjaman Rumah'],
    rating: 4.1,
    minRate: '5.0%',
  },
  {
    name: 'Alliance Bank',
    logo: '/images/banks/alliance.svg',
    description: 'Smart banking solutions',
    descriptionMs: 'Penyelesaian perbankan pintar',
    products: ['Personal Loan', 'Home Loan', 'Car Loan'],
    productsMs: ['Pinjaman Peribadi', 'Pinjaman Rumah', 'Pinjaman Kereta'],
    rating: 4.2,
    minRate: '5.7%',
  },
  {
    name: 'Affin Bank',
    logo: '/images/banks/affin.svg',
    description: 'Your trusted partner',
    descriptionMs: 'Rakan dipercayai anda',
    products: ['Personal Loan', 'Home Loan', 'SME Financing'],
    productsMs: ['Pinjaman Peribadi', 'Pinjaman Rumah', 'Pembiayaan PKS'],
    rating: 4.1,
    minRate: '5.8%',
  },
  {
    name: 'Bank Islam',
    logo: '/images/banks/bankislam.svg',
    description: 'Islamic banking leader',
    descriptionMs: 'Peneraju perbankan Islam',
    products: ['Islamic Personal Financing', 'Home Financing'],
    productsMs: ['Pembiayaan Peribadi Islam', 'Pembiayaan Rumah'],
    rating: 4.4,
    minRate: '5.3%',
  },
  {
    name: 'MBSB Bank',
    logo: '/images/banks/mbsb.svg',
    description: 'Value-based banking',
    descriptionMs: 'Perbankan berasaskan nilai',
    products: ['Personal Financing', 'Home Financing'],
    productsMs: ['Pembiayaan Peribadi', 'Pembiayaan Rumah'],
    rating: 4.0,
    minRate: '5.5%',
  },
];

const content = {
  en: {
    badge: 'Our Partners',
    title: 'Bank Partners',
    subtitle: 'We work with Malaysia\'s leading banks to get you the best loan rates and highest approval chances.',
    stats: [
      { value: '15+', label: 'Bank Partners' },
      { value: '85%', label: 'Approval Rate' },
      { value: '24h', label: 'Processing Time' },
      { value: '4.88%', label: 'From Rate' },
    ],
    benefits: {
      title: 'Why Partner With Multiple Banks?',
      items: [
        { icon: TrendingUp, title: 'Best Rates', description: 'Compare rates from multiple banks to get the lowest interest' },
        { icon: Users, title: 'Higher Approval', description: 'Different banks have different criteria - we find your match' },
        { icon: Shield, title: 'One Application', description: 'Submit once, apply to multiple banks simultaneously' },
        { icon: Award, title: 'Expert Guidance', description: 'We know which banks approve which profiles' },
      ],
    },
    howItWorks: {
      title: 'How We Work With Banks',
      steps: [
        { step: '1', title: 'Analyze Your Profile', description: 'We review your income, credit, and requirements' },
        { step: '2', title: 'Match With Banks', description: 'We identify banks most likely to approve you' },
        { step: '3', title: 'Submit Applications', description: 'We handle all paperwork and submissions' },
        { step: '4', title: 'Get Approved', description: 'Receive offers and choose the best one' },
      ],
    },
    cta: {
      title: 'Get Matched With The Right Bank',
      subtitle: 'Let us find the best bank for your loan needs. Free consultation.',
      button: 'Start Your Application',
    },
    viewProducts: 'View Products',
    fromRate: 'From',
    products: 'Products:',
  },
  ms: {
    badge: 'Rakan Kami',
    title: 'Rakan Bank',
    subtitle: 'Kami bekerjasama dengan bank-bank terkemuka Malaysia untuk mendapatkan kadar terbaik dan peluang kelulusan tertinggi.',
    stats: [
      { value: '15+', label: 'Rakan Bank' },
      { value: '85%', label: 'Kadar Kelulusan' },
      { value: '24j', label: 'Masa Pemprosesan' },
      { value: '4.88%', label: 'Dari Kadar' },
    ],
    benefits: {
      title: 'Mengapa Bekerjasama Dengan Pelbagai Bank?',
      items: [
        { icon: TrendingUp, title: 'Kadar Terbaik', description: 'Bandingkan kadar dari pelbagai bank untuk faedah terendah' },
        { icon: Users, title: 'Kelulusan Tinggi', description: 'Bank berbeza mempunyai kriteria berbeza - kami cari padanan anda' },
        { icon: Shield, title: 'Satu Permohonan', description: 'Hantar sekali, mohon ke beberapa bank serentak' },
        { icon: Award, title: 'Panduan Pakar', description: 'Kami tahu bank mana yang luluskan profil mana' },
      ],
    },
    howItWorks: {
      title: 'Bagaimana Kami Bekerjasama Dengan Bank',
      steps: [
        { step: '1', title: 'Analisis Profil Anda', description: 'Kami semak pendapatan, kredit, dan keperluan anda' },
        { step: '2', title: 'Padankan Dengan Bank', description: 'Kami kenal pasti bank yang mungkin meluluskan anda' },
        { step: '3', title: 'Hantar Permohonan', description: 'Kami uruskan semua kertas kerja dan penghantaran' },
        { step: '4', title: 'Dapatkan Kelulusan', description: 'Terima tawaran dan pilih yang terbaik' },
      ],
    },
    cta: {
      title: 'Dipadankan Dengan Bank Yang Betul',
      subtitle: 'Biarkan kami cari bank terbaik untuk keperluan pinjaman anda. Konsultasi percuma.',
      button: 'Mulakan Permohonan Anda',
    },
    viewProducts: 'Lihat Produk',
    fromRate: 'Dari',
    products: 'Produk:',
  },
};

export default async function PartnersPage() {
  const language = await resolveRequestLanguage();
  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <WebPageJsonLd
        url={`${SEO.url}/partners`}
        title="Bank Partners"
        description="Partner banks across Malaysia offering personal, car, home, and SME financing options."
        image="/images/hero-bg.jpg"
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'Partners', url: `${SEO.url}/partners` },
        ]}
      />
      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 bg-white/70">
              <Handshake className="h-3 w-3 mr-1" />
              {t.badge}
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">{t.title}</h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t.subtitle}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.stats.map((stat, index) => (
                <div key={index} className="surface-card rounded-2xl p-4 shadow-sm">
                  <div className="text-2xl lg:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-12">{t.benefits.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.benefits.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="text-center surface-card card-hover border-primary/10">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bank Partners Grid */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bankPartners.map((bank, index) => (
              <Card key={index} className="group surface-card card-hover border-primary/10 overflow-hidden">
                <CardContent className="p-6">
                  {/* Bank Logo */}
                  <div className="h-16 flex items-center justify-center mb-4 bg-white/70 rounded-lg border border-primary/10 overflow-hidden">
                    <Image
                      src={bank.logo}
                      alt={bank.name}
                      width={120}
                      height={64}
                      className="object-contain w-auto h-12"
                      loading="lazy"
                      unoptimized
                    />
                  </div>

                  <h3 className="font-semibold text-lg mb-1">{bank.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {language === 'en' ? bank.description : bank.descriptionMs}
                  </p>

                  {/* Rate Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                      {t.fromRate} {bank.minRate}
                    </Badge>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(bank.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Products */}
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">{t.products}</span>{' '}
                    {(language === 'en' ? bank.products : bank.productsMs).join(', ')}
                  </div>
                  <div className="mt-4">
                    <Button asChild size="sm" variant="ghost" className="px-0 text-primary">
                      <Link href="/services">
                        {t.viewProducts}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-12">{t.howItWorks.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.howItWorks.steps.map((step, index) => (
              <div key={index} className="relative">
                {index < t.howItWorks.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary/20 -translate-x-1/2" />
                )}
                <div className="text-center surface-card rounded-2xl p-5">
                  <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="surface-card rounded-3xl p-8 md:p-12 text-center">
            <div className="flex items-center justify-center gap-3 text-primary mb-4">
              <Shield className="h-5 w-5" />
              <Award className="h-5 w-5" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">{t.cta.title}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">{t.cta.subtitle}</p>
            <Button size="lg" asChild className="btn-gradient text-white shadow-md">
              <Link href="/services">
                {t.cta.button}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
