'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { LocaleLink } from '@/components/LocaleLink';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  MessageCircle,
  ArrowRight,
  FileSearch,
  Calculator,
  CreditCard,
  Shield,
  Clock,
  DollarSign,
} from 'lucide-react';
import type { Language } from '@/lib/i18n/translations';
import { COMPANY, SEO } from '@/lib/constants';
import { WebPageJsonLd } from '@/components/JsonLd';

// Bilingual page content
const pageContent = {
  en: {
    header: {
      badge: 'Help Center',
      title: 'Frequently Asked',
      titleHighlight: 'Questions',
      description: 'Find answers to common questions about our loan products, application process, and repayment terms for borrowers across Malaysia.',
      highlights: [
        { title: 'Fast answers', description: 'Most topics covered in under 2 minutes.' },
        { title: 'Nationwide support', description: 'Guidance tailored to Malaysian borrowers.' },
        { title: 'PDPA compliant', description: 'We follow strict data protection practices.' },
      ],
    },
    search: {
      placeholder: 'Search for answers...',
      noResults: {
        title: 'No results found',
        description: 'Try adjusting your search or filter to find what you\'re looking for.',
      },
    },
    categories: {
      all: 'All Questions',
      services: 'Loan Products',
      process: 'Application',
      payment: 'Repayment',
      security: 'Security',
    },
    cta: {
      title: 'Still Have Questions?',
      description: 'Can\'t find the answer you\'re looking for? Our team is ready to help you with any questions about our loans.',
      whatsapp: 'Chat on WhatsApp',
      contact: 'Contact Us',
    },
    quickLinks: {
      eligibility: {
        title: 'Apply for a Loan',
        description: 'Quick and easy online application. Get analysis within 24 hours.',
        button: 'Apply Now',
      },
      calculator: {
        title: 'Loan Products',
        description: 'View our range of loan products with competitive rates.',
        button: 'View Products',
      },
      about: {
        title: 'About Us',
        description: 'Learn more about GURU Credits and our mission.',
        button: 'Learn More',
      },
    },
    faqs: [
      // Loan Products
      {
        category: 'services',
        question: 'What types of loans do you consult on?',
        answer: 'We consult on four loan categories: Personal Loans (up to RM100,000 from 4.88% p.a.), Business Loans (for SMEs from 5.5% p.a.), Debt Consolidation (6–9% p.a.), and Emergency Loans (fast-turnaround personal financing). We match each applicant to Bank Negara-licensed lenders based on their CCRIS, income, and DSR profile.',
      },
      {
        category: 'services',
        question: 'What is the maximum loan amount I can borrow?',
        answer: 'The maximum amount depends on the product and your profile: Personal Loans up to RM100,000, Business Loans based on cash-flow and collateral, Debt Consolidation typically up to RM200,000. Final approval is subject to each bank\u2019s credit evaluation.',
      },
      {
        category: 'services',
        question: 'What are your interest rates?',
        answer: 'Indicative rates we commonly see in approvals: Personal Loans from 4.88% p.a., Business Loans from 5.5% p.a., Debt Consolidation 6–9% p.a. Actual rates depend on your credit profile, bank selected, and prevailing BNM Reference Rate.',
      },
      {
        category: 'services',
        question: 'What is the loan tenure available?',
        answer: 'Tenure varies by product: Personal Loans 1–7 years, Debt Consolidation 1–7 years, Business Loans flexible based on need, Emergency Loans 1–7 years. Longer tenure lowers monthly payment but increases total interest.',
      },
      // Application Process
      {
        category: 'process',
        question: 'How long does the analysis take?',
        answer: 'Most analyses are completed within 24 hours after we receive complete documents. Bank approval timelines vary by lender and profile.',
      },
      {
        category: 'process',
        question: 'What documents do I need to apply?',
        answer: 'Basic documents include: copy of IC (front and back), latest 3 months salary slips, latest 3 months bank statements, and employment confirmation letter. Self-employed applicants need business registration documents and business bank statements.',
      },
      {
        category: 'process',
        question: 'How do I apply for a loan?',
        answer: 'Applying is easy: 1) Fill out our simple online form (takes 5 minutes), 2) Upload supporting documents, 3) We complete the analysis within 24 hours, 4) We guide you on submission and next steps.',
      },
      {
        category: 'process',
        question: 'Who is eligible to apply?',
        answer: 'Basic eligibility: Malaysian citizen or PR, age 21-60 years, employed for at least 6 months or self-employed for at least 2 years, minimum monthly income of RM2,000. Each loan type may have additional requirements.',
      },
      {
        category: 'process',
        question: 'Can I apply if I have bad credit history?',
        answer: 'We evaluate each application on its merits. While credit history is considered, we also look at your current income, employment stability, and ability to repay. Contact us to discuss your situation - we may still be able to help.',
      },
      // Repayment
      {
        category: 'payment',
        question: 'What are the repayment options?',
        answer: 'Repayment terms are set by the bank and typically use fixed monthly instalments. We explain the available options and what to expect before you sign.',
      },
      {
        category: 'payment',
        question: 'Can I make early repayment?',
        answer: 'Early or full settlement depends on the lender’s policy and may involve fees. We can guide you on what to check before committing.',
      },
      {
        category: 'payment',
        question: 'What happens if I miss a payment?',
        answer: 'Late payment charges follow your bank’s loan agreement. If you’re struggling, contact the lender quickly and we can advise on next steps.',
      },
      {
        category: 'payment',
        question: 'Are there any hidden fees?',
        answer: 'We disclose our service fees clearly. Bank fees and terms are provided by the lender before you sign, and we help you review them.',
      },
      // Security
      {
        category: 'security',
        question: 'Is my personal information secure?',
        answer: 'Yes, we take data security seriously. All data is encrypted using industry-standard SSL encryption, handled according to PDPA (Personal Data Protection Act) guidelines, and stored securely. We never share your information with third parties without your consent.',
      },
      {
        category: 'security',
        question: 'How do I know this is a legitimate lending company?',
        answer: 'GURU Credits operates under a Moneylenders Act 1951 license issued by KPKT. All our fees are clearly disclosed — the RM30 you see mentioned is a pass-through charge for pulling your CTOS credit report and is collected only via our official WhatsApp after we confirm your details. Licensing details and our registered business address are available on request through any official channel.',
      },
      {
        category: 'security',
        question: 'What happens to my data after the loan is settled?',
        answer: 'We retain your data as required by regulatory guidelines. After your loan is fully settled, you can request deletion of your data by contacting us. We will process your request in accordance with PDPA requirements.',
      },
    ],
  },
  ms: {
    header: {
      badge: 'Pusat Bantuan',
      title: 'Soalan',
      titleHighlight: 'Lazim',
      description: 'Cari jawapan tentang produk pinjaman, proses permohonan dan terma pembayaran untuk peminjam di seluruh Malaysia.',
      highlights: [
        { title: 'Jawapan pantas', description: 'Kebanyakan topik selesai dalam 2 minit.' },
        { title: 'Sokongan seluruh negara', description: 'Panduan untuk peminjam Malaysia.' },
        { title: 'Patuh PDPA', description: 'Perlindungan data yang ketat.' },
      ],
    },
    search: {
      placeholder: 'Cari jawapan...',
      noResults: {
        title: 'Tiada hasil dijumpai',
        description: 'Cuba laraskan carian atau penapis anda untuk mencari apa yang anda cari.',
      },
    },
    categories: {
      all: 'Semua Soalan',
      services: 'Produk Pinjaman',
      process: 'Permohonan',
      payment: 'Pembayaran',
      security: 'Keselamatan',
    },
    cta: {
      title: 'Masih Ada Soalan?',
      description: 'Tidak dapat menemui jawapan yang anda cari? Pasukan kami sedia membantu anda dengan sebarang soalan tentang pinjaman kami.',
      whatsapp: 'Berbual di WhatsApp',
      contact: 'Hubungi Kami',
    },
    quickLinks: {
      eligibility: {
        title: 'Mohon Pinjaman',
        description: 'Permohonan dalam talian yang cepat dan mudah. Diluluskan dalam 24 jam.',
        button: 'Mohon Sekarang',
      },
      calculator: {
        title: 'Produk Pinjaman',
        description: 'Lihat rangkaian produk pinjaman kami dengan kadar kompetitif.',
        button: 'Lihat Produk',
      },
      about: {
        title: 'Tentang Kami',
        description: 'Ketahui lebih lanjut tentang GURU Credits dan misi kami.',
        button: 'Ketahui Lebih Lanjut',
      },
    },
    faqs: [
      // Loan Products
      {
        category: 'services',
        question: 'Apakah jenis pinjaman yang anda tawarkan?',
        answer: 'Kami menawarkan empat kategori: Pinjaman Peribadi (sehingga RM100,000 dari 4.88% setahun), Pinjaman Perniagaan (untuk PKS dari 5.5% setahun), Penyatuan Hutang (6–9% setahun), dan Pinjaman Kecemasan (pembiayaan peribadi pantas). Kami dilesenkan di bawah Akta Pemberi Pinjam Wang 1951.',
      },
      {
        category: 'services',
        question: 'Berapakah jumlah pinjaman maksimum yang boleh saya pinjam?',
        answer: 'Jumlah maksimum bergantung pada produk dan profil anda: Pinjaman Peribadi sehingga RM100,000, Pinjaman Perniagaan berdasarkan aliran tunai dan cagaran, Penyatuan Hutang biasanya sehingga RM200,000. Kelulusan akhir tertakluk kepada penilaian kredit.',
      },
      {
        category: 'services',
        question: 'Apakah kadar faedah anda?',
        answer: 'Kadar indikatif: Pinjaman Peribadi dari 4.88% setahun, Pinjaman Perniagaan dari 5.5% setahun, Penyatuan Hutang 6–9% setahun. Kadar sebenar bergantung pada profil kredit, produk dipilih, dan mematuhi had berkanun di bawah Peraturan Pemberi Pinjam Wang.',
      },
      {
        category: 'services',
        question: 'Apakah tempoh pinjaman yang tersedia?',
        answer: 'Tempoh ikut produk: Pinjaman Peribadi 1–7 tahun, Penyatuan Hutang 1–7 tahun, Pinjaman Perniagaan fleksibel ikut keperluan, Pinjaman Kecemasan 1–7 tahun. Tempoh lebih panjang mengurangkan bayaran bulanan tetapi meningkatkan jumlah faedah.',
      },
      // Application Process
      {
        category: 'process',
        question: 'Berapa lama analisis kelayakan mengambil masa?',
        answer: 'Kebanyakan analisis siap dalam 24 jam selepas dokumen lengkap diterima. Tempoh kelulusan bank berbeza mengikut bank dan profil pemohon.',
      },
      {
        category: 'process',
        question: 'Apakah dokumen yang diperlukan untuk memohon?',
        answer: 'Dokumen asas termasuk: salinan IC (depan dan belakang), slip gaji 3 bulan terkini, penyata bank 3 bulan terkini, dan surat pengesahan majikan. Pemohon yang bekerja sendiri memerlukan dokumen pendaftaran perniagaan dan penyata bank perniagaan.',
      },
      {
        category: 'process',
        question: 'Bagaimana cara memohon pinjaman?',
        answer: 'Proses mudah: 1) Isi borang dalam talian kami (5 minit), 2) Muat naik dokumen sokongan, 3) Kami siapkan analisis dalam 24 jam, 4) Kami bantu anda hantar ke bank yang sesuai dan terangkan langkah seterusnya.',
      },
      {
        category: 'process',
        question: 'Siapa yang layak memohon?',
        answer: 'Kelayakan asas: Warganegara Malaysia atau PR, umur 21-60 tahun, bekerja sekurang-kurangnya 6 bulan atau bekerja sendiri sekurang-kurangnya 2 tahun, pendapatan bulanan minimum RM2,000. Setiap jenis pinjaman mungkin mempunyai keperluan tambahan.',
      },
      {
        category: 'process',
        question: 'Bolehkah saya memohon jika mempunyai sejarah kredit yang buruk?',
        answer: 'Kami menilai setiap permohonan berdasarkan merit. Walaupun sejarah kredit dipertimbangkan, kami juga melihat pendapatan semasa anda, kestabilan pekerjaan, dan keupayaan membayar balik. Hubungi kami untuk membincangkan situasi anda - kami mungkin masih boleh membantu.',
      },
      // Repayment
      {
        category: 'payment',
        question: 'Apakah pilihan pembayaran balik?',
        answer: 'Pembayaran balik ditetapkan oleh bank dan biasanya menggunakan ansuran bulanan tetap. Kami akan jelaskan pilihan pembayaran yang ditawarkan oleh bank sebelum anda menandatangani.',
      },
      {
        category: 'payment',
        question: 'Bolehkah saya membuat pembayaran awal?',
        answer: 'Ia bergantung pada polisi bank dan mungkin melibatkan yuran penyelesaian awal. Kami boleh bantu anda semak terma yang berkaitan.',
      },
      {
        category: 'payment',
        question: 'Apa yang berlaku jika saya terlepas bayaran?',
        answer: 'Caj lewat tertakluk kepada perjanjian pinjaman bank. Jika anda menghadapi kesukaran, hubungi bank segera dan kami boleh beri panduan tindakan seterusnya.',
      },
      {
        category: 'payment',
        question: 'Adakah terdapat caj tersembunyi?',
        answer: 'Tiada caj tersembunyi untuk perkhidmatan kami. Caj bank dan terma pinjaman akan dinyatakan oleh bank sebelum anda menandatangani, dan kami bantu semak.',
      },
      // Security
      {
        category: 'security',
        question: 'Adakah maklumat peribadi saya selamat?',
        answer: 'Ya, kami mengambil serius keselamatan data. Semua data dienkripsi menggunakan penyulitan SSL standard industri, dikendalikan mengikut garis panduan PDPA (Akta Perlindungan Data Peribadi), dan disimpan dengan selamat. Kami tidak pernah berkongsi maklumat anda dengan pihak ketiga tanpa kebenaran anda.',
      },
      {
        category: 'security',
        question: 'Bagaimana saya tahu ini adalah syarikat pinjaman yang sah?',
        answer: 'GURU Credits beroperasi di bawah lesen Akta Pemberi Pinjam Wang 1951 yang dikeluarkan oleh KPKT. Semua yuran dinyatakan dengan jelas — RM30 yang disebut ialah caj salur lalu untuk mengambil laporan kredit CTOS anda dan dikutip hanya melalui WhatsApp rasmi selepas pengesahan butiran. Butiran lesen dan alamat perniagaan berdaftar boleh didapati atas permintaan melalui saluran rasmi.',
      },
      {
        category: 'security',
        question: 'Apa yang berlaku kepada data saya selepas pinjaman selesai?',
        answer: 'Kami mengekalkan data anda seperti yang diperlukan oleh garis panduan peraturan. Selepas pinjaman anda diselesaikan sepenuhnya, anda boleh meminta penghapusan data anda dengan menghubungi kami. Kami akan memproses permintaan anda mengikut keperluan PDPA.',
      },
    ],
  },
};

const categoryIcons = {
  all: HelpCircle,
  services: FileSearch,
  process: Clock,
  payment: DollarSign,
  security: Shield,
};

type FAQProps = {
  language: Language;
};

export default function FaqContent({ language }: FAQProps) {
  const t = pageContent[language] ?? pageContent.en;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredFaqs = t.faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" aria-hidden="true" />
      <WebPageJsonLd
        url={`${SEO.url}/faq`}
        title="Frequently Asked Questions"
        description={t.header.description}
        image="/images/hero-bg.jpg"
        breadcrumbItems={[
          { name: 'Home', url: SEO.url },
          { name: 'FAQ', url: `${SEO.url}/faq` },
        ]}
        faqItems={t.faqs}
      />
      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            <HelpCircle className="h-3 w-3 mr-1" />
            {t.header.badge}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            {t.header.title} <span className="gradient-text">{t.header.titleHighlight}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.header.description}
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {t.header.highlights.map((item) => (
              <Card key={item.title} className="p-4 text-left surface-card">
                <div className="text-sm font-semibold text-foreground">{item.title}</div>
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t.search.placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {Object.entries(t.categories).map(([id, label]) => {
            const Icon = categoryIcons[id as keyof typeof categoryIcons] || HelpCircle;
            return (
              <Button
                key={id}
                variant={selectedCategory === id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(id)}
                className="gap-2"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            );
          })}
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-200 surface-card ${
                  expandedIndex === index ? 'border-primary/30 shadow-md' : 'hover:border-primary/20'
                }`}
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <HelpCircle className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="font-semibold text-left">{faq.question}</h3>
                    </div>
                    <div className="shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      {expandedIndex === index ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                  {expandedIndex === index && (
                    <div className="mt-4 pl-11">
                      <p className="text-muted-foreground text-sm leading-relaxed animate-in fade-in-0 slide-in-from-top-2 duration-200">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">{t.search.noResults.title}</h3>
              <p className="text-muted-foreground text-sm">
                {t.search.noResults.description}
              </p>
            </div>
          )}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16">
            <Card className="bg-gradient-to-br from-primary/5 via-background to-primary/10 border-2 border-primary/20 surface-card">
              <CardContent className="py-12 lg:py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">{t.cta.title}</h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  {t.cta.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-gradient text-primary-foreground shadow-lg shadow-primary/25" asChild>
                    <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      {t.cta.whatsapp}
                    </a>
                  </Button>
                <Button size="lg" variant="outline" asChild>
                  <LocaleLink href="/contact">
                    {t.cta.contact}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </LocaleLink>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card className="card-hover surface-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                <FileSearch className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">{t.quickLinks.eligibility.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.quickLinks.eligibility.description}
              </p>
              <Button variant="outline" size="sm" asChild>
                <LocaleLink href="/services">{t.quickLinks.eligibility.button}</LocaleLink>
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover surface-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-2">{t.quickLinks.calculator.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.quickLinks.calculator.description}
              </p>
              <Button variant="outline" size="sm" asChild>
                <LocaleLink href="/services">{t.quickLinks.calculator.button}</LocaleLink>
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover surface-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">{t.quickLinks.about.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t.quickLinks.about.description}
              </p>
              <Button variant="outline" size="sm" asChild>
                <LocaleLink href="/about">{t.quickLinks.about.button}</LocaleLink>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
