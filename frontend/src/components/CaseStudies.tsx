import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Language } from '@/lib/i18n/translations';
import {
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Quote,
  MapPin,
  Briefcase,
} from 'lucide-react';

// Customer photo paths - replace with real customer photos
const customerPhotos = [
  '/images/customer-1.jpg',
  '/images/customer-2.jpg',
  '/images/customer-3.jpg',
];

const content = {
  en: {
    badge: 'Success Stories',
    title: 'Real Results from',
    titleHighlight: 'Real Clients',
    subtitle: 'See how we helped Malaysians get the loans they needed',
    cases: [
      {
        name: 'Ahmad Rizal',
        location: 'Kuala Lumpur',
        occupation: 'IT Professional',
        avatar: 'AR',
        before: {
          label: 'Needed',
          dsr: 'RM30,000',
          status: 'Urgent cash needed',
          issue: 'Emergency medical expenses',
        },
        after: {
          label: 'Result',
          dsr: '24 hours',
          status: 'Approved!',
          result: 'RM30,000 personal loan at 4.88%',
        },
        quote: 'I needed urgent cash for medical bills. GURU Credits approved my loan within 24 hours. The process was simple and the rate was very competitive!',
        rating: 5,
      },
      {
        name: 'Siti Nurhaliza',
        location: 'Penang',
        occupation: 'Business Owner',
        avatar: 'SN',
        before: {
          label: 'Needed',
          dsr: 'RM50,000',
          status: 'Business expansion',
          issue: 'Capital for new inventory',
        },
        after: {
          label: 'Result',
          dsr: '48 hours',
          status: 'Approved!',
          result: 'RM50,000 business loan approved',
        },
        quote: 'As a business owner, I needed quick capital. GURU Credits understood my needs and approved my loan fast. Now my business is growing!',
        rating: 5,
      },
      {
        name: 'Raj Kumar',
        location: 'Johor Bahru',
        occupation: 'Sales Executive',
        avatar: 'RK',
        before: {
          label: 'Needed',
          dsr: 'RM85,000',
          status: 'Debt consolidation',
          issue: 'Multiple high-interest loans',
        },
        after: {
          label: 'Result',
          dsr: 'RM400/mo saved',
          status: 'Consolidated!',
          result: 'RM85,000 consolidation loan',
        },
        quote: 'I had 5 different loans with high interest. GURU Credits helped me consolidate into one low-interest loan. Saved RM400 per month!',
        rating: 5,
      },
    ],
    improvement: 'Fast Approval',
    viewMore: 'Apply Now',
  },
  ms: {
    badge: 'Kisah Kejayaan',
    title: 'Hasil Sebenar dari',
    titleHighlight: 'Pelanggan Sebenar',
    subtitle: 'Lihat bagaimana kami membantu rakyat Malaysia mendapatkan pinjaman yang diperlukan',
    cases: [
      {
        name: 'Ahmad Rizal',
        location: 'Kuala Lumpur',
        occupation: 'Profesional IT',
        avatar: 'AR',
        before: {
          label: 'Diperlukan',
          dsr: 'RM30,000',
          status: 'Wang tunai segera',
          issue: 'Perbelanjaan perubatan kecemasan',
        },
        after: {
          label: 'Hasil',
          dsr: '24 jam',
          status: 'Diluluskan!',
          result: 'Pinjaman peribadi RM30,000 pada 4.88%',
        },
        quote: 'Saya perlukan wang tunai segera untuk bil perubatan. GURU Credits meluluskan pinjaman saya dalam 24 jam. Proses mudah dan kadar sangat kompetitif!',
        rating: 5,
      },
      {
        name: 'Siti Nurhaliza',
        location: 'Pulau Pinang',
        occupation: 'Pemilik Perniagaan',
        avatar: 'SN',
        before: {
          label: 'Diperlukan',
          dsr: 'RM50,000',
          status: 'Pengembangan perniagaan',
          issue: 'Modal untuk inventori baru',
        },
        after: {
          label: 'Hasil',
          dsr: '48 jam',
          status: 'Diluluskan!',
          result: 'Pinjaman perniagaan RM50,000 diluluskan',
        },
        quote: 'Sebagai pemilik perniagaan, saya perlukan modal cepat. GURU Credits faham keperluan saya dan meluluskan pinjaman dengan pantas. Kini perniagaan saya berkembang!',
        rating: 5,
      },
      {
        name: 'Raj Kumar',
        location: 'Johor Bahru',
        occupation: 'Eksekutif Jualan',
        avatar: 'RK',
        before: {
          label: 'Diperlukan',
          dsr: 'RM85,000',
          status: 'Penyatuan hutang',
          issue: 'Pelbagai pinjaman faedah tinggi',
        },
        after: {
          label: 'Hasil',
          dsr: 'Jimat RM400/bln',
          status: 'Disatukan!',
          result: 'Pinjaman penyatuan RM85,000',
        },
        quote: 'Saya mempunyai 5 pinjaman berbeza dengan faedah tinggi. GURU Credits membantu saya menyatukan menjadi satu pinjaman faedah rendah. Jimat RM400 sebulan!',
        rating: 5,
      },
    ],
    improvement: 'Kelulusan Cepat',
    viewMore: 'Mohon Sekarang',
  },
} as const;

export function CaseStudies({ language }: { language: Language }) {
  const t = content[language] ?? content.en;

  return (
    <section className="py-20 lg:py-24 bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            <TrendingUp className="h-3 w-3 mr-1.5" />
            {t.badge}
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t.title} <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {t.cases.map((caseStudy, index) => (
            <Card key={index} className="overflow-hidden border-2 hover:border-primary/20 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                {/* Header with Customer Photo */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b">
                  <div className="flex items-center gap-4">
                    {/* Customer photo - replace with real photo */}
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-primary relative">
                      <Image
                        src={customerPhotos[index]}
                        alt={caseStudy.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{caseStudy.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {caseStudy.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {caseStudy.occupation}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Before/After Comparison */}
                <div className="grid grid-cols-2 divide-x">
                  {/* Before */}
                  <div className="p-4 bg-red-50 dark:bg-red-950/20">
                    <span className="text-xs font-semibold text-red-700 dark:text-red-300 uppercase tracking-wide">
                      {caseStudy.before.label}
                    </span>
                    <div className="mt-2">
                      <div className="text-2xl font-bold text-red-700 dark:text-red-300">
                        {caseStudy.before.dsr}
                      </div>
                      <div className="text-xs text-muted-foreground">DSR</div>
                    </div>
                    <div className="mt-2 text-xs text-red-700 dark:text-red-300">
                      {caseStudy.before.status}
                    </div>
                  </div>

                  {/* After */}
                  <div className="p-4 bg-green-50 dark:bg-green-950/20">
                    <span className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide">
                      {caseStudy.after.label}
                    </span>
                    <div className="mt-2">
                      <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                        {caseStudy.after.dsr}
                      </div>
                      <div className="text-xs text-muted-foreground">DSR</div>
                    </div>
                    <div className="mt-2 text-xs text-green-700 dark:text-green-300 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      {caseStudy.after.status}
                    </div>
                  </div>
                </div>

                {/* Result Badge */}
                <div className="px-6 py-3 bg-primary/5 border-y">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">
                      {caseStudy.after.result}
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                </div>

                {/* Quote */}
                <div className="p-6">
                  <Quote className="h-6 w-6 text-primary/30 mb-2" />
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    &ldquo;{caseStudy.quote}&rdquo;
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-4">
                    {Array.from({ length: caseStudy.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
