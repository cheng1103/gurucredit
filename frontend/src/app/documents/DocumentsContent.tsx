'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText,
  User,
  Car,
  Home,
  Briefcase,
  Check,
  ArrowRight,
  Info,
  AlertCircle,
  CheckCircle2,
  Clock,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Language } from '@/lib/i18n/translations';

interface DocumentsContentProps {
  language: Language;
}

const content = {
  en: {
    title: 'Document Checklist',
    subtitle: 'Prepare your documents for a faster loan approval process',
    description: 'Having all required documents ready can speed up your loan application by up to 50%. Use our interactive checklists to ensure you have everything prepared.',
    downloadChecklist: 'Download Checklist',
    applyNow: 'Apply Now',
    required: 'Required',
    optional: 'Optional',
    ifApplicable: 'If Applicable',
    tipsLabel: 'Pro Tips',
    commonMistakes: 'Common Mistakes to Avoid',
    loanTypes: {
      personal: 'Personal Loan',
      car: 'Car Loan',
      home: 'Home Loan',
      business: 'Business Loan',
    },
    categories: {
      identity: 'Identity Documents',
      income: 'Income Documents',
      employment: 'Employment Documents',
      financial: 'Financial Documents',
      property: 'Property Documents',
      vehicle: 'Vehicle Documents',
      registration: 'Business Registration',
    },
    documents: {
      personal: {
        identity: [
          { name: 'MyKad (IC) - Front & Back', required: true, note: 'Clear, colored copy' },
          { name: 'Passport (for foreigners)', required: false, note: 'If applicable' },
          { name: 'Work Permit / Employment Pass', required: false, note: 'For non-citizens' },
        ],
        income: [
          { name: 'Latest 3 months payslips', required: true, note: 'Must show basic salary & deductions' },
          { name: 'Latest EPF Statement', required: true, note: 'From i-Akaun or printed statement' },
          { name: 'EA Form / Tax Filing (BE Form)', required: false, note: 'Latest year' },
          { name: 'Commission/bonus letters', required: false, note: 'If claiming additional income' },
        ],
        employment: [
          { name: 'Employment confirmation letter', required: true, note: 'Dated within 3 months' },
          { name: 'Offer letter (new employees)', required: false, note: 'If employed less than 3 months' },
        ],
        financial: [
          { name: 'Latest 3 months bank statements', required: true, note: 'Salary crediting account' },
          { name: 'Existing loan statements', required: false, note: 'If consolidating debt' },
          { name: 'Credit card statements', required: false, note: 'Latest 1 month' },
        ],
      },
      car: {
        identity: [
          { name: 'MyKad (IC) - Front & Back', required: true, note: 'Clear, colored copy' },
          { name: 'Driving License', required: true, note: 'Valid and not expired' },
        ],
        income: [
          { name: 'Latest 3 months payslips', required: true, note: 'Must show basic salary' },
          { name: 'Latest EPF Statement', required: true, note: 'From i-Akaun' },
          { name: 'EA Form', required: false, note: 'Latest year' },
        ],
        employment: [
          { name: 'Employment confirmation letter', required: true, note: 'Company letterhead' },
        ],
        vehicle: [
          { name: 'Vehicle quotation/invoice', required: true, note: 'From authorized dealer' },
          { name: 'Vehicle registration card (for used)', required: false, note: 'JPJ registration' },
          { name: 'Insurance quotation', required: true, note: 'Comprehensive coverage' },
          { name: 'PUSPAKOM report (for used)', required: false, note: 'Vehicle inspection' },
        ],
      },
      home: {
        identity: [
          { name: 'MyKad (IC) - Front & Back', required: true, note: 'Both applicant and co-borrower' },
          { name: 'Marriage certificate', required: false, note: 'If joint application with spouse' },
        ],
        income: [
          { name: 'Latest 3 months payslips', required: true, note: 'For all borrowers' },
          { name: 'Latest 6 months EPF Statement', required: true, note: 'Higher requirement for home loans' },
          { name: 'Latest 2 years EA Form / BE Form', required: true, note: 'Tax filing documents' },
          { name: 'Latest 6 months bank statements', required: true, note: 'All income sources' },
        ],
        employment: [
          { name: 'Employment confirmation letter', required: true, note: 'Stating salary and tenure' },
          { name: 'HR contact details', required: false, note: 'For verification' },
        ],
        property: [
          { name: 'Sale & Purchase Agreement (SPA)', required: true, note: 'Signed and stamped' },
          { name: 'Booking receipt', required: true, note: 'Proof of booking fee paid' },
          { name: 'Property brochure/details', required: true, note: 'Floor plan and specifications' },
          { name: 'Land title / Strata title', required: false, note: 'For sub-sale properties' },
          { name: 'Valuation report', required: false, note: 'Bank may arrange this' },
          { name: 'Developer license', required: true, note: 'For new projects' },
        ],
      },
      business: {
        identity: [
          { name: 'MyKad (IC) - All directors', required: true, note: 'Front & back copies' },
        ],
        registration: [
          { name: 'SSM Company Registration (Form 9/13)', required: true, note: 'Within 3 months' },
          { name: 'Business Profile (Form 24/49)', required: true, note: 'Company secretary certified' },
          { name: 'Memorandum & Articles (M&A)', required: true, note: 'For Sdn Bhd' },
          { name: 'Business license', required: false, note: 'Industry specific' },
        ],
        financial: [
          { name: 'Latest 2 years audited accounts', required: true, note: 'For Sdn Bhd companies' },
          { name: 'Latest 6 months bank statements', required: true, note: 'Business account' },
          { name: 'Latest 6 months aged debtors/creditors', required: false, note: 'Trade references' },
          { name: 'Latest EPF/SOCSO statements', required: true, note: 'Proof of employee contributions' },
          { name: 'Tax returns (Form B/C)', required: true, note: 'Latest 2 years' },
        ],
        income: [
          { name: 'Management accounts (YTD)', required: true, note: 'Current financial position' },
          { name: 'Sales contracts/invoices', required: false, note: 'Proof of revenue' },
          { name: 'Business plan', required: false, note: 'For new businesses' },
        ],
      },
    },
    tips: {
      personal: [
        'Ensure all documents are clear and legible',
        'Payslips should show your name, company name, and breakdown',
        'Bank statements should show salary credits highlighted',
        'Keep documents within 3 months validity',
      ],
      car: [
        'Get multiple quotations for better negotiation',
        'Check vehicle insurance requirements beforehand',
        'For used cars, ensure PUSPAKOM inspection is recent',
        'Verify dealer is authorized for better loan rates',
      ],
      home: [
        'Start gathering documents before property booking',
        'Joint applications can increase approval chances',
        'Keep all property documents organized by date',
        'Understand the SPA terms before signing',
      ],
      business: [
        'Ensure all SSM documents are up to date',
        'Maintain clean and organized financial records',
        'Prepare a clear business justification for the loan',
        'Have latest management accounts ready',
      ],
    },
    mistakes: {
      personal: [
        'Submitting blurry or incomplete documents',
        'Payslips without company stamp or signature',
        'Bank statements with missing pages',
        'Expired employment letters',
      ],
      car: [
        'Not including all required vehicle documents',
        'Outdated insurance quotations',
        'Missing vehicle inspection reports',
        'Incomplete dealer information',
      ],
      home: [
        'Incomplete SPA without all signatures',
        'Missing developer license verification',
        'Outdated property valuation',
        'Incorrect property specifications',
      ],
      business: [
        'Unaudited financial statements when required',
        'Expired SSM documents',
        'Inconsistent figures across documents',
        'Missing director signatures',
      ],
    },
    selfEmployed: {
      title: 'Self-Employed? Additional Documents Needed',
      description: 'If you are self-employed or a business owner in Damansara Heights, Petaling Jaya, Shah Alam, or Klang, please prepare the following supporting items.',
      items: [
        'Business registration (SSM)',
        'Latest 6 months business bank statements',
        'Latest 2 years tax returns (Form B)',
        'Latest 2 years audited/management accounts',
        'Business contracts or invoices',
      ],
    },
    cta: {
      title: 'Ready to Apply?',
      description: 'Have all your documents ready? Start your loan application now.',
      button: 'Start Application',
    },
  },
  ms: {
    title: 'Senarai Semak Dokumen',
    subtitle: 'Sediakan dokumen anda untuk proses kelulusan pinjaman yang lebih cepat',
    description: 'Mempunyai semua dokumen yang diperlukan boleh mempercepatkan permohonan pinjaman anda sehingga 50%. Gunakan senarai semak interaktif kami untuk memastikan anda telah menyediakan semuanya.',
    downloadChecklist: 'Muat Turun Senarai',
    applyNow: 'Mohon Sekarang',
    required: 'Diperlukan',
    optional: 'Pilihan',
    ifApplicable: 'Jika Berkenaan',
    tipsLabel: 'Tips Pro',
    commonMistakes: 'Kesilapan Biasa Yang Perlu Dielakkan',
    loanTypes: {
      personal: 'Pinjaman Peribadi',
      car: 'Pinjaman Kereta',
      home: 'Pinjaman Rumah',
      business: 'Pinjaman Perniagaan',
    },
    categories: {
      identity: 'Dokumen Pengenalan',
      income: 'Dokumen Pendapatan',
      employment: 'Dokumen Pekerjaan',
      financial: 'Dokumen Kewangan',
      property: 'Dokumen Hartanah',
      vehicle: 'Dokumen Kenderaan',
      registration: 'Pendaftaran Perniagaan',
    },
    documents: {
      personal: {
        identity: [
          { name: 'MyKad (IC) - Depan & Belakang', required: true, note: 'Salinan jelas, berwarna' },
          { name: 'Pasport (untuk warga asing)', required: false, note: 'Jika berkenaan' },
          { name: 'Permit Kerja / Pas Pekerjaan', required: false, note: 'Untuk bukan warganegara' },
        ],
        income: [
          { name: 'Slip gaji 3 bulan terkini', required: true, note: 'Mesti menunjukkan gaji asas & potongan' },
          { name: 'Penyata EPF Terkini', required: true, note: 'Dari i-Akaun atau penyata bercetak' },
          { name: 'Borang EA / Pemfailan Cukai (Borang BE)', required: false, note: 'Tahun terkini' },
          { name: 'Surat komisen/bonus', required: false, note: 'Jika menuntut pendapatan tambahan' },
        ],
        employment: [
          { name: 'Surat pengesahan pekerjaan', required: true, note: 'Bertarikh dalam 3 bulan' },
          { name: 'Surat tawaran (pekerja baru)', required: false, note: 'Jika bekerja kurang dari 3 bulan' },
        ],
        financial: [
          { name: 'Penyata bank 3 bulan terkini', required: true, note: 'Akaun kredit gaji' },
          { name: 'Penyata pinjaman sedia ada', required: false, note: 'Jika menggabungkan hutang' },
          { name: 'Penyata kad kredit', required: false, note: '1 bulan terkini' },
        ],
      },
      car: {
        identity: [
          { name: 'MyKad (IC) - Depan & Belakang', required: true, note: 'Salinan jelas, berwarna' },
          { name: 'Lesen Memandu', required: true, note: 'Sah dan tidak tamat tempoh' },
        ],
        income: [
          { name: 'Slip gaji 3 bulan terkini', required: true, note: 'Mesti menunjukkan gaji asas' },
          { name: 'Penyata EPF Terkini', required: true, note: 'Dari i-Akaun' },
          { name: 'Borang EA', required: false, note: 'Tahun terkini' },
        ],
        employment: [
          { name: 'Surat pengesahan pekerjaan', required: true, note: 'Kepala surat syarikat' },
        ],
        vehicle: [
          { name: 'Sebut harga/invois kenderaan', required: true, note: 'Dari pengedar sah' },
          { name: 'Kad pendaftaran kenderaan (terpakai)', required: false, note: 'Pendaftaran JPJ' },
          { name: 'Sebut harga insurans', required: true, note: 'Perlindungan komprehensif' },
          { name: 'Laporan PUSPAKOM (terpakai)', required: false, note: 'Pemeriksaan kenderaan' },
        ],
      },
      home: {
        identity: [
          { name: 'MyKad (IC) - Depan & Belakang', required: true, note: 'Pemohon dan peminjam bersama' },
          { name: 'Sijil perkahwinan', required: false, note: 'Jika permohonan bersama dengan pasangan' },
        ],
        income: [
          { name: 'Slip gaji 3 bulan terkini', required: true, note: 'Untuk semua peminjam' },
          { name: 'Penyata EPF 6 bulan terkini', required: true, note: 'Keperluan lebih tinggi untuk pinjaman rumah' },
          { name: 'Borang EA / Borang BE 2 tahun terkini', required: true, note: 'Dokumen pemfailan cukai' },
          { name: 'Penyata bank 6 bulan terkini', required: true, note: 'Semua sumber pendapatan' },
        ],
        employment: [
          { name: 'Surat pengesahan pekerjaan', required: true, note: 'Menyatakan gaji dan tempoh' },
          { name: 'Butiran hubungan HR', required: false, note: 'Untuk pengesahan' },
        ],
        property: [
          { name: 'Perjanjian Jual Beli (SPA)', required: true, note: 'Ditandatangani dan disetem' },
          { name: 'Resit tempahan', required: true, note: 'Bukti bayaran yuran tempahan' },
          { name: 'Risalah/butiran hartanah', required: true, note: 'Pelan lantai dan spesifikasi' },
          { name: 'Hakmilik tanah / Hakmilik strata', required: false, note: 'Untuk hartanah sub-jual' },
          { name: 'Laporan penilaian', required: false, note: 'Bank mungkin aturkan ini' },
          { name: 'Lesen pemaju', required: true, note: 'Untuk projek baru' },
        ],
      },
      business: {
        identity: [
          { name: 'MyKad (IC) - Semua pengarah', required: true, note: 'Salinan depan & belakang' },
        ],
        registration: [
          { name: 'Pendaftaran Syarikat SSM (Borang 9/13)', required: true, note: 'Dalam 3 bulan' },
          { name: 'Profil Perniagaan (Borang 24/49)', required: true, note: 'Disahkan setiausaha syarikat' },
          { name: 'Memorandum & Artikel (M&A)', required: true, note: 'Untuk Sdn Bhd' },
          { name: 'Lesen perniagaan', required: false, note: 'Khusus industri' },
        ],
        financial: [
          { name: 'Akaun teraudit 2 tahun terkini', required: true, note: 'Untuk syarikat Sdn Bhd' },
          { name: 'Penyata bank 6 bulan terkini', required: true, note: 'Akaun perniagaan' },
          { name: 'Penghutang/pemiutang 6 bulan terkini', required: false, note: 'Rujukan perdagangan' },
          { name: 'Penyata EPF/PERKESO terkini', required: true, note: 'Bukti caruman pekerja' },
          { name: 'Penyata cukai (Borang B/C)', required: true, note: '2 tahun terkini' },
        ],
        income: [
          { name: 'Akaun pengurusan (YTD)', required: true, note: 'Kedudukan kewangan semasa' },
          { name: 'Kontrak/invois jualan', required: false, note: 'Bukti pendapatan' },
          { name: 'Rancangan perniagaan', required: false, note: 'Untuk perniagaan baru' },
        ],
      },
    },
    tips: {
      personal: [
        'Pastikan semua dokumen jelas dan boleh dibaca',
        'Slip gaji perlu menunjukkan nama, nama syarikat, dan pecahan',
        'Penyata bank perlu menunjukkan kredit gaji ditandakan',
        'Pastikan dokumen dalam tempoh sah 3 bulan',
      ],
      car: [
        'Dapatkan beberapa sebut harga untuk rundingan lebih baik',
        'Semak keperluan insurans kenderaan terlebih dahulu',
        'Untuk kereta terpakai, pastikan pemeriksaan PUSPAKOM terkini',
        'Sahkan pengedar adalah sah untuk kadar pinjaman lebih baik',
      ],
      home: [
        'Mulakan mengumpul dokumen sebelum tempahan hartanah',
        'Permohonan bersama boleh meningkatkan peluang kelulusan',
        'Simpan semua dokumen hartanah tersusun mengikut tarikh',
        'Fahami terma SPA sebelum menandatangani',
      ],
      business: [
        'Pastikan semua dokumen SSM dikemas kini',
        'Kekalkan rekod kewangan yang kemas dan tersusun',
        'Sediakan justifikasi perniagaan yang jelas untuk pinjaman',
        'Sediakan akaun pengurusan terkini',
      ],
    },
    mistakes: {
      personal: [
        'Menghantar dokumen kabur atau tidak lengkap',
        'Slip gaji tanpa cop atau tandatangan syarikat',
        'Penyata bank dengan halaman hilang',
        'Surat pekerjaan tamat tempoh',
      ],
      car: [
        'Tidak memasukkan semua dokumen kenderaan yang diperlukan',
        'Sebut harga insurans yang lapuk',
        'Laporan pemeriksaan kenderaan yang hilang',
        'Maklumat pengedar yang tidak lengkap',
      ],
      home: [
        'SPA tidak lengkap tanpa semua tandatangan',
        'Pengesahan lesen pemaju yang hilang',
        'Penilaian hartanah yang lapuk',
        'Spesifikasi hartanah yang salah',
      ],
      business: [
        'Penyata kewangan tidak teraudit apabila diperlukan',
        'Dokumen SSM tamat tempoh',
        'Angka tidak konsisten antara dokumen',
        'Tandatangan pengarah yang hilang',
      ],
    },
    selfEmployed: {
      title: 'Bekerja Sendiri? Dokumen Tambahan Diperlukan',
      description: 'Jika anda bekerja sendiri atau pemilik perniagaan di Damansara Heights, Petaling Jaya, Shah Alam, atau Klang, sila sediakan dokumen sokongan berikut.',
      items: [
        'Pendaftaran perniagaan (SSM)',
        'Penyata bank perniagaan 6 bulan terkini',
        'Penyata cukai 2 tahun terkini (Borang B)',
        'Akaun teraudit/pengurusan 2 tahun terkini',
        'Kontrak atau invois perniagaan',
      ],
    },
    cta: {
      title: 'Bersedia Untuk Memohon?',
      description: 'Semua dokumen sudah siap? Mulakan permohonan pinjaman anda sekarang.',
      button: 'Mulakan Permohonan',
    },
  },
};

type LoanType = 'personal' | 'car' | 'home' | 'business';
type Category = 'identity' | 'income' | 'employment' | 'financial' | 'property' | 'vehicle' | 'registration';

const iconMap = {
  personal: User,
  car: Car,
  home: Home,
  business: Briefcase,
};

const categoryIconMap: Record<Category, typeof User> = {
  identity: User,
  income: FileText,
  employment: Briefcase,
  financial: FileText,
  property: Home,
  vehicle: Car,
  registration: Briefcase,
};

export default function DocumentsContent({ language }: DocumentsContentProps) {
  const t = content[language];
  const [activeTab, setActiveTab] = useState<LoanType>('personal');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const getCategories = (loanType: LoanType): Category[] => {
    const docs = t.documents[loanType];
    return Object.keys(docs) as Category[];
  };

  const toggleItem = (category: string, index: number) => {
    const key = `${activeTab}-${category}-${index}`;
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isChecked = (category: string, index: number) => {
    const key = `${activeTab}-${category}-${index}`;
    return checkedItems[key] || false;
  };

  const getProgress = (loanType: LoanType) => {
    const docs = t.documents[loanType];
    let total = 0;
    let checked = 0;
    Object.keys(docs).forEach((category) => {
      const items = docs[category as keyof typeof docs];
      items.forEach((_, index) => {
        total++;
        const key = `${loanType}-${category}-${index}`;
        if (checkedItems[key]) checked++;
      });
    });
    return { total, checked, percentage: total > 0 ? Math.round((checked / total) * 100) : 0 };
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" />
        <div className="container relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <FileText className="h-4 w-4" />
              {t.title}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              {t.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {t.subtitle}
            </p>
            <p className="text-muted-foreground">
              {t.description}
            </p>
          </div>
        </div>
      </section>

      {/* Document Checklists */}
      <section className="py-12 md:py-16">
        <div className="container">
          <Tabs value={activeTab} onValueChange={(v: string) => setActiveTab(v as LoanType)} className="space-y-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl mx-auto h-auto surface-card rounded-2xl">
              {(Object.keys(t.loanTypes) as LoanType[]).map((type) => {
                const Icon = iconMap[type];
                const progress = getProgress(type);
                return (
                  <TabsTrigger
                    key={type}
                    value={type}
                    className="flex flex-col items-center gap-2 py-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs md:text-sm">{t.loanTypes[type]}</span>
                    {progress.checked > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {progress.percentage}%
                      </Badge>
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {(Object.keys(t.loanTypes) as LoanType[]).map((loanType) => {
              const progress = getProgress(loanType);
              const productId = ['personal', 'car', 'home', 'business'].indexOf(loanType) + 1;

              return (
                <TabsContent key={loanType} value={loanType} className="space-y-8">
                  {/* Progress Bar */}
                  <Card className="surface-card border-primary/15">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                          <span className="font-medium">
                            {progress.checked} / {progress.total} {t.required}
                          </span>
                        </div>
                        <Badge variant={progress.percentage === 100 ? 'default' : 'secondary'}>
                          {progress.percentage}%
                        </Badge>
                      </div>
                      <Progress value={progress.percentage} className="text-primary" />
                    </CardContent>
                  </Card>

                  {/* Document Categories */}
                  <div className="grid gap-6 md:grid-cols-2">
                    {getCategories(loanType).map((category) => {
                      const CategoryIcon = categoryIconMap[category];
                      const items = t.documents[loanType][category as keyof (typeof t.documents)[typeof loanType]];

                      return (
                        <Card key={category} className="surface-card card-hover border-primary/10">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <CategoryIcon className="h-5 w-5 text-primary" />
                              {t.categories[category]}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {items.map((item, index) => (
                              <label
                                key={index}
                                className={cn(
                                  'flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all',
                                  isChecked(category, index)
                                    ? 'bg-primary/5 border-primary/30'
                                    : 'hover:bg-muted/50'
                                )}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked(category, index)}
                                  onChange={() => toggleItem(category, index)}
                                  className="mt-1 h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className={cn(
                                      'font-medium',
                                      isChecked(category, index) && 'line-through text-muted-foreground'
                                    )}>
                                      {item.name}
                                    </span>
                                    <Badge
                                      variant={item.required ? 'default' : 'outline'}
                                      className="text-xs"
                                    >
                                      {item.required ? t.required : t.optional}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {item.note}
                                  </p>
                                </div>
                                {isChecked(category, index) && (
                                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                                )}
                              </label>
                            ))}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Tips and Mistakes */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="surface-card border-emerald-200/60 bg-emerald-50/50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-emerald-800">
                          <Info className="h-5 w-5" />
                          {t.tipsLabel}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {t.tips[loanType].map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <Check className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="surface-card border-amber-200/70 bg-amber-50/60">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-800">
                          <AlertCircle className="h-5 w-5" />
                          {t.commonMistakes}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {t.mistakes[loanType].map((mistake, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                              <span>{mistake}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Apply Button */}
                  <div className="text-center">
                    <Button size="lg" asChild className="btn-gradient text-white shadow-md font-semibold">
                      <Link href={`/services/${productId}/apply`}>
                        {t.applyNow}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* Self-Employed Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <Card className="max-w-3xl mx-auto surface-card border-primary/15">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                {t.selfEmployed.title}
              </CardTitle>
              <CardDescription>{t.selfEmployed.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3 md:grid-cols-2">
                {t.selfEmployed.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <div className="surface-card rounded-3xl p-8 md:p-12">
            <div className="flex items-center justify-center gap-2 mb-4 text-primary">
              <Clock className="h-6 w-6" />
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">{t.cta.title}</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t.cta.description}
            </p>
            <Button size="lg" className="btn-gradient text-white shadow-md font-semibold" asChild>
              <Link href="/services">
                {t.cta.button}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
