'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Search,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { Language } from '@/lib/i18n/translations';

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  related?: string[];
  example?: string;
}

interface GlossaryContentProps {
  language: Language;
}

const content = {
  en: {
    title: 'Financial Glossary',
    subtitle: 'Understanding loan and credit terminology',
    description: 'A comprehensive guide to financial terms commonly used in Malaysia. Search or browse by category to understand the language of loans and credit.',
    searchPlaceholder: 'Search terms...',
    allCategories: 'All',
    categories: {
      credit: 'Credit & Scoring',
      loans: 'Loan Types',
      rates: 'Rates & Fees',
      documents: 'Documents',
      banking: 'Banking Terms',
      legal: 'Legal Terms',
    },
    showMore: 'Show More',
    showLess: 'Show Less',
    relatedTerms: 'Related Terms',
    example: 'Example',
    quickNav: {
      title: 'Quick Navigation',
      subtitle: 'Jump to a section',
    },
    noResults: 'No terms found. Try a different search.',
    terms: [
      // Credit & Scoring
      {
        term: 'CCRIS',
        definition: 'Central Credit Reference Information System - A system maintained by Bank Negara Malaysia that contains credit information of borrowers from financial institutions. It shows your credit history, outstanding loans, and payment behavior for the past 12 months.',
        category: 'credit',
        related: ['CTOS', 'Credit Score', 'Credit Report'],
        example: 'When you apply for a loan, banks check your CCRIS report to see if you have any outstanding loans or late payments.',
      },
      {
        term: 'CTOS',
        definition: 'Credit Tip-Off Service - A private credit reporting agency in Malaysia that provides credit reports and scores. Unlike CCRIS, CTOS also includes non-banking information such as legal cases, directorship information, and trade references.',
        category: 'credit',
        related: ['CCRIS', 'Credit Score', 'Credit Report'],
        example: 'A CTOS report might show if you have any pending legal cases or have been a director of a company that was wound up.',
      },
      {
        term: 'Credit Score',
        definition: 'A numerical representation of your creditworthiness based on your credit history. In Malaysia, CTOS scores range from 300-850, with higher scores indicating better credit. Banks use this to assess your loan eligibility.',
        category: 'credit',
        related: ['CCRIS', 'CTOS', 'Credit Report'],
        example: 'A credit score of 750 or above is generally considered excellent and gives you access to the best loan rates.',
      },
      {
        term: 'Credit Report',
        definition: 'A detailed document showing your credit history, including all loans, credit cards, payment history, and any legal issues. This is what banks review when processing your loan application.',
        category: 'credit',
        related: ['CCRIS', 'CTOS', 'Credit Score'],
      },
      {
        term: 'DSR',
        definition: 'Debt Service Ratio - The percentage of your monthly income used to pay debts. Calculated by dividing your total monthly debt payments by your gross monthly income. Most banks require DSR below 60-70%.',
        category: 'credit',
        related: ['Net Income', 'Gross Income'],
        example: 'If your monthly income is RM5,000 and your total debt payments are RM2,000, your DSR is 40%.',
      },
      {
        term: 'Default',
        definition: 'Failure to repay a loan according to the agreed terms. This negatively impacts your credit score and may result in legal action. A default record stays on your credit report for years.',
        category: 'credit',
        related: ['NPL', 'Credit Score'],
      },
      {
        term: 'NPL',
        definition: 'Non-Performing Loan - A loan where the borrower has failed to make payments for 90 days or more. This is a serious mark on your credit record.',
        category: 'credit',
        related: ['Default', 'Credit Score'],
      },
      // Loan Types
      {
        term: 'Personal Loan',
        definition: 'An unsecured loan for personal use such as emergencies, medical bills, or debt consolidation. No collateral required, but interest rates are typically higher than secured loans.',
        category: 'loans',
        related: ['Secured Loan', 'Unsecured Loan'],
        example: 'You can get a personal loan of up to RM100,000 without pledging any assets.',
      },
      {
        term: 'Hire Purchase',
        definition: 'A financing arrangement commonly used for vehicles where you pay in installments while using the asset. The ownership transfers to you only after all payments are completed.',
        category: 'loans',
        related: ['Car Loan', 'Collateral'],
        example: 'When you buy a car through hire purchase, the bank technically owns the car until you make the final payment.',
      },
      {
        term: 'Home Loan / Mortgage',
        definition: 'A secured loan specifically for purchasing property. The property serves as collateral. These loans typically have the longest tenure (up to 35 years) and lowest interest rates.',
        category: 'loans',
        related: ['Collateral', 'Secured Loan', 'MRTA'],
      },
      {
        term: 'Refinancing',
        definition: 'Replacing an existing loan with a new one, usually to get better terms such as lower interest rates or longer tenure. Common for home loans and car loans.',
        category: 'loans',
        related: ['Home Loan', 'Interest Rate'],
        example: 'If interest rates drop, you might refinance your home loan to reduce your monthly payments.',
      },
      {
        term: 'Debt Consolidation',
        definition: 'Combining multiple debts into a single loan with one monthly payment. This can simplify debt management and potentially reduce overall interest costs.',
        category: 'loans',
        related: ['Personal Loan', 'DSR'],
      },
      {
        term: 'Secured Loan',
        definition: 'A loan backed by collateral (an asset). If you fail to repay, the lender can seize the collateral. These loans typically have lower interest rates.',
        category: 'loans',
        related: ['Collateral', 'Unsecured Loan', 'Home Loan'],
      },
      {
        term: 'Unsecured Loan',
        definition: 'A loan not backed by any collateral. The lender relies solely on your creditworthiness. Personal loans are typically unsecured.',
        category: 'loans',
        related: ['Personal Loan', 'Secured Loan'],
      },
      // Rates & Fees
      {
        term: 'Flat Rate',
        definition: 'An interest calculation method where interest is calculated on the original principal throughout the loan tenure, regardless of how much has been repaid.',
        category: 'rates',
        related: ['Reducing Balance', 'EIR'],
        example: 'A 5% flat rate on a RM10,000 loan means you pay RM500 interest per year for the entire tenure.',
      },
      {
        term: 'Reducing Balance / Effective Rate',
        definition: 'An interest calculation method where interest is calculated on the remaining principal balance. As you pay down the loan, your interest portion decreases.',
        category: 'rates',
        related: ['Flat Rate', 'EIR'],
        example: 'Home loans typically use reducing balance, so your interest charges decrease as you pay down the principal.',
      },
      {
        term: 'EIR',
        definition: 'Effective Interest Rate - The true cost of borrowing that accounts for compounding and all fees. This allows you to compare loans with different rate structures.',
        category: 'rates',
        related: ['Flat Rate', 'Reducing Balance', 'APR'],
      },
      {
        term: 'BLR / BR',
        definition: 'Base Lending Rate / Base Rate - The reference rate set by banks for pricing loans. Your actual rate is typically BLR/BR plus a margin.',
        category: 'rates',
        related: ['OPR', 'Interest Rate'],
      },
      {
        term: 'OPR',
        definition: 'Overnight Policy Rate - The interest rate set by Bank Negara Malaysia that influences all lending rates in the economy. Changes to OPR affect variable-rate loans.',
        category: 'rates',
        related: ['BLR', 'Interest Rate'],
      },
      {
        term: 'Processing Fee',
        definition: 'A one-time fee charged by lenders to cover the administrative costs of processing your loan application. Usually 1-2% of the loan amount.',
        category: 'rates',
        related: ['Stamp Duty', 'Legal Fees'],
      },
      {
        term: 'Stamp Duty',
        definition: 'A government tax on loan documents. For loans, it\'s typically 0.5% of the loan amount. This is a mandatory cost when taking any loan.',
        category: 'rates',
        related: ['Processing Fee', 'Legal Fees'],
      },
      {
        term: 'Early Settlement Penalty',
        definition: 'A fee charged if you pay off your loan before the agreed tenure. Usually applies to the first few years of the loan. Check your loan agreement for specific terms.',
        category: 'rates',
        related: ['Refinancing', 'Lock-in Period'],
      },
      {
        term: 'Lock-in Period',
        definition: 'A period during which you cannot refinance or fully settle the loan without incurring a penalty. Common in home loans, typically 3-5 years.',
        category: 'rates',
        related: ['Early Settlement Penalty', 'Refinancing'],
      },
      // Documents
      {
        term: 'EPF Statement',
        definition: 'A statement from the Employees Provident Fund showing your monthly contributions. Banks use this to verify your employment and income.',
        category: 'documents',
        related: ['Payslip', 'EA Form'],
      },
      {
        term: 'EA Form',
        definition: 'A yearly statement from your employer showing your total earnings and tax deductions for the year. Required for income verification.',
        category: 'documents',
        related: ['EPF Statement', 'BE Form'],
      },
      {
        term: 'BE Form',
        definition: 'The income tax return form for individuals with employment income in Malaysia. Used by banks to verify your declared income.',
        category: 'documents',
        related: ['EA Form', 'Tax Return'],
      },
      {
        term: 'SPA',
        definition: 'Sale and Purchase Agreement - A legal contract between buyer and seller for property transactions. Required when applying for a home loan.',
        category: 'documents',
        related: ['Home Loan', 'Strata Title'],
      },
      {
        term: 'SSM Registration',
        definition: 'Companies Commission of Malaysia (Suruhanjaya Syarikat Malaysia) registration documents proving your business is legally registered.',
        category: 'documents',
        related: ['Business Loan', 'Form 9'],
      },
      // Banking Terms
      {
        term: 'Principal',
        definition: 'The original amount borrowed, excluding interest and fees. Your monthly payments consist of principal repayment plus interest.',
        category: 'banking',
        related: ['Interest', 'Installment'],
      },
      {
        term: 'Tenure',
        definition: 'The length of time you have to repay the loan. Longer tenures mean lower monthly payments but higher total interest paid.',
        category: 'banking',
        related: ['Installment', 'Interest'],
        example: 'A home loan might have a tenure of 30 years, while a personal loan typically has 1-7 years.',
      },
      {
        term: 'Collateral',
        definition: 'An asset pledged as security for a loan. If you default, the lender can seize the collateral. Common collateral includes property and vehicles.',
        category: 'banking',
        related: ['Secured Loan', 'Default'],
      },
      {
        term: 'Guarantor',
        definition: 'A person who agrees to repay your loan if you cannot. Having a guarantor can help you get approved for loans you might not qualify for alone.',
        category: 'banking',
        related: ['Joint Application', 'Credit Score'],
      },
      {
        term: 'Disbursement',
        definition: 'The release of loan funds to you or directly to the seller/dealer. For property, disbursement follows the construction progress.',
        category: 'banking',
        related: ['Principal', 'Settlement'],
      },
      {
        term: 'Amortization',
        definition: 'The process of spreading loan payments over time. An amortization schedule shows how each payment is split between principal and interest.',
        category: 'banking',
        related: ['Principal', 'Interest', 'Tenure'],
      },
      // Legal Terms
      {
        term: 'MRTA',
        definition: 'Mortgage Reducing Term Assurance - A decreasing term insurance that covers your outstanding home loan if you pass away or become permanently disabled.',
        category: 'legal',
        related: ['MLTA', 'Home Loan'],
      },
      {
        term: 'MLTA',
        definition: 'Mortgage Level Term Assurance - Unlike MRTA, this maintains a fixed coverage amount throughout the loan tenure. More expensive but provides consistent protection.',
        category: 'legal',
        related: ['MRTA', 'Home Loan'],
      },
      {
        term: 'Letter of Offer',
        definition: 'A formal document from the bank stating the approved loan amount, interest rate, tenure, and all terms and conditions. Signing this commits you to the loan.',
        category: 'legal',
        related: ['Loan Agreement', 'Disbursement'],
      },
      {
        term: 'Bankruptcy',
        definition: 'A legal status where a person is declared unable to pay their debts. In Malaysia, bankruptcy affects your ability to get credit, be a company director, and more.',
        category: 'legal',
        related: ['Default', 'NPL'],
      },
      {
        term: 'Foreclosure',
        definition: 'The legal process where a lender takes possession of a property when the borrower fails to make payments. This is a last resort for secured loans.',
        category: 'legal',
        related: ['Default', 'Collateral', 'Home Loan'],
      },
    ] as GlossaryTerm[],
    cta: {
      title: 'Still Have Questions?',
      description: 'Contact our team for personalized guidance on your loan journey.',
      button: 'Contact Us',
    },
  },
  ms: {
    title: 'Glosari Kewangan',
    subtitle: 'Memahami terminologi pinjaman dan kredit',
    description: 'Panduan komprehensif istilah kewangan yang biasa digunakan di Malaysia. Cari atau layari mengikut kategori untuk memahami bahasa pinjaman dan kredit.',
    searchPlaceholder: 'Cari istilah...',
    allCategories: 'Semua',
    categories: {
      credit: 'Kredit & Skor',
      loans: 'Jenis Pinjaman',
      rates: 'Kadar & Caj',
      documents: 'Dokumen',
      banking: 'Istilah Perbankan',
      legal: 'Istilah Undang-undang',
    },
    showMore: 'Tunjuk Lagi',
    showLess: 'Tunjuk Kurang',
    relatedTerms: 'Istilah Berkaitan',
    example: 'Contoh',
    quickNav: {
      title: 'Navigasi Pantas',
      subtitle: 'Lompat ke bahagian',
    },
    noResults: 'Tiada istilah dijumpai. Cuba carian lain.',
    terms: [
      // Credit & Scoring
      {
        term: 'CCRIS',
        definition: 'Central Credit Reference Information System - Sistem yang diselenggarakan oleh Bank Negara Malaysia yang mengandungi maklumat kredit peminjam dari institusi kewangan. Ia menunjukkan sejarah kredit, pinjaman tertunggak, dan tingkah laku pembayaran untuk 12 bulan lepas.',
        category: 'credit',
        related: ['CTOS', 'Skor Kredit', 'Laporan Kredit'],
        example: 'Apabila anda memohon pinjaman, bank menyemak laporan CCRIS anda untuk melihat jika ada pinjaman tertunggak atau pembayaran lewat.',
      },
      {
        term: 'CTOS',
        definition: 'Credit Tip-Off Service - Agensi pelaporan kredit swasta di Malaysia yang menyediakan laporan dan skor kredit. Tidak seperti CCRIS, CTOS juga merangkumi maklumat bukan perbankan seperti kes undang-undang dan maklumat pengarah.',
        category: 'credit',
        related: ['CCRIS', 'Skor Kredit', 'Laporan Kredit'],
        example: 'Laporan CTOS mungkin menunjukkan jika anda mempunyai kes undang-undang yang belum selesai.',
      },
      {
        term: 'Skor Kredit',
        definition: 'Perwakilan numerik kelayakan kredit anda berdasarkan sejarah kredit. Di Malaysia, skor CTOS berkisar 300-850, dengan skor lebih tinggi menunjukkan kredit lebih baik.',
        category: 'credit',
        related: ['CCRIS', 'CTOS', 'Laporan Kredit'],
        example: 'Skor kredit 750 atau lebih dianggap cemerlang dan memberi akses kepada kadar pinjaman terbaik.',
      },
      {
        term: 'DSR',
        definition: 'Nisbah Khidmat Hutang - Peratusan pendapatan bulanan yang digunakan untuk membayar hutang. Dikira dengan membahagikan jumlah bayaran hutang bulanan dengan pendapatan kasar bulanan.',
        category: 'credit',
        related: ['Pendapatan Bersih', 'Pendapatan Kasar'],
        example: 'Jika pendapatan bulanan anda RM5,000 dan jumlah bayaran hutang RM2,000, DSR anda adalah 40%.',
      },
      {
        term: 'Pinjaman Peribadi',
        definition: 'Pinjaman tanpa cagaran untuk kegunaan peribadi seperti kecemasan, bil perubatan, atau penggabungan hutang. Tiada cagaran diperlukan.',
        category: 'loans',
        related: ['Pinjaman Bercagar', 'Pinjaman Tanpa Cagaran'],
        example: 'Anda boleh mendapat pinjaman peribadi sehingga RM100,000 tanpa mencagarkan sebarang aset.',
      },
      {
        term: 'Sewa Beli',
        definition: 'Pengaturan pembiayaan yang biasa digunakan untuk kenderaan di mana anda membayar secara ansuran sambil menggunakan aset. Pemilikan dipindahkan kepada anda hanya selepas semua bayaran selesai.',
        category: 'loans',
        related: ['Pinjaman Kereta', 'Cagaran'],
        example: 'Apabila anda membeli kereta melalui sewa beli, bank secara teknikal memiliki kereta sehingga anda membuat bayaran terakhir.',
      },
      {
        term: 'Pinjaman Rumah / Gadai Janji',
        definition: 'Pinjaman bercagar khusus untuk membeli hartanah. Hartanah berfungsi sebagai cagaran. Pinjaman ini biasanya mempunyai tempoh terpanjang dan kadar faedah terendah.',
        category: 'loans',
        related: ['Cagaran', 'Pinjaman Bercagar', 'MRTA'],
      },
      {
        term: 'Pembiayaan Semula',
        definition: 'Menggantikan pinjaman sedia ada dengan yang baru, biasanya untuk mendapat terma lebih baik seperti kadar faedah lebih rendah atau tempoh lebih panjang.',
        category: 'loans',
        related: ['Pinjaman Rumah', 'Kadar Faedah'],
        example: 'Jika kadar faedah turun, anda mungkin membiayai semula pinjaman rumah untuk mengurangkan bayaran bulanan.',
      },
      {
        term: 'Kadar Rata',
        definition: 'Kaedah pengiraan faedah di mana faedah dikira pada prinsipal asal sepanjang tempoh pinjaman, tanpa mengira berapa banyak telah dibayar.',
        category: 'rates',
        related: ['Baki Berkurangan', 'EIR'],
        example: 'Kadar rata 5% pada pinjaman RM10,000 bermaksud anda membayar faedah RM500 setahun untuk keseluruhan tempoh.',
      },
      {
        term: 'Baki Berkurangan',
        definition: 'Kaedah pengiraan faedah di mana faedah dikira pada baki prinsipal yang tinggal. Apabila anda membayar pinjaman, bahagian faedah anda berkurangan.',
        category: 'rates',
        related: ['Kadar Rata', 'EIR'],
        example: 'Pinjaman rumah biasanya menggunakan baki berkurangan, jadi caj faedah anda berkurangan apabila anda membayar prinsipal.',
      },
      {
        term: 'OPR',
        definition: 'Kadar Dasar Semalaman - Kadar faedah yang ditetapkan oleh Bank Negara Malaysia yang mempengaruhi semua kadar pinjaman dalam ekonomi.',
        category: 'rates',
        related: ['BLR', 'Kadar Faedah'],
      },
      {
        term: 'Caj Pemprosesan',
        definition: 'Caj sekali yang dikenakan oleh pemberi pinjaman untuk menampung kos pentadbiran memproses permohonan pinjaman anda. Biasanya 1-2% daripada jumlah pinjaman.',
        category: 'rates',
        related: ['Duti Setem', 'Yuran Guaman'],
      },
      {
        term: 'Duti Setem',
        definition: 'Cukai kerajaan ke atas dokumen pinjaman. Untuk pinjaman, biasanya 0.5% daripada jumlah pinjaman. Ini adalah kos wajib apabila mengambil sebarang pinjaman.',
        category: 'rates',
        related: ['Caj Pemprosesan', 'Yuran Guaman'],
      },
      {
        term: 'Penyata EPF',
        definition: 'Penyata dari Kumpulan Wang Simpanan Pekerja yang menunjukkan caruman bulanan anda. Bank menggunakan ini untuk mengesahkan pekerjaan dan pendapatan anda.',
        category: 'documents',
        related: ['Slip Gaji', 'Borang EA'],
      },
      {
        term: 'Borang EA',
        definition: 'Penyata tahunan dari majikan menunjukkan jumlah pendapatan dan potongan cukai untuk tahun tersebut. Diperlukan untuk pengesahan pendapatan.',
        category: 'documents',
        related: ['Penyata EPF', 'Borang BE'],
      },
      {
        term: 'SPA',
        definition: 'Perjanjian Jual Beli - Kontrak undang-undang antara pembeli dan penjual untuk transaksi hartanah. Diperlukan apabila memohon pinjaman rumah.',
        category: 'documents',
        related: ['Pinjaman Rumah', 'Hakmilik Strata'],
      },
      {
        term: 'Prinsipal',
        definition: 'Jumlah asal yang dipinjam, tidak termasuk faedah dan caj. Bayaran bulanan anda terdiri daripada bayaran balik prinsipal ditambah faedah.',
        category: 'banking',
        related: ['Faedah', 'Ansuran'],
      },
      {
        term: 'Tempoh',
        definition: 'Jangka masa anda perlu membayar balik pinjaman. Tempoh lebih panjang bermaksud bayaran bulanan lebih rendah tetapi jumlah faedah lebih tinggi.',
        category: 'banking',
        related: ['Ansuran', 'Faedah'],
        example: 'Pinjaman rumah mungkin mempunyai tempoh 30 tahun, manakala pinjaman peribadi biasanya 1-7 tahun.',
      },
      {
        term: 'Cagaran',
        definition: 'Aset yang dicagarkan sebagai jaminan untuk pinjaman. Jika anda gagal bayar, pemberi pinjaman boleh merampas cagaran.',
        category: 'banking',
        related: ['Pinjaman Bercagar', 'Gagal Bayar'],
      },
      {
        term: 'Penjamin',
        definition: 'Seseorang yang bersetuju membayar pinjaman anda jika anda tidak dapat. Mempunyai penjamin boleh membantu anda diluluskan untuk pinjaman.',
        category: 'banking',
        related: ['Permohonan Bersama', 'Skor Kredit'],
      },
      {
        term: 'MRTA',
        definition: 'Mortgage Reducing Term Assurance - Insurans berjangka berkurangan yang melindungi pinjaman rumah tertunggak anda jika anda meninggal dunia atau hilang upaya kekal.',
        category: 'legal',
        related: ['MLTA', 'Pinjaman Rumah'],
      },
      {
        term: 'Surat Tawaran',
        definition: 'Dokumen rasmi dari bank menyatakan jumlah pinjaman yang diluluskan, kadar faedah, tempoh, dan semua terma dan syarat.',
        category: 'legal',
        related: ['Perjanjian Pinjaman', 'Pengeluaran'],
      },
      {
        term: 'Kebankrapan',
        definition: 'Status undang-undang di mana seseorang diisytiharkan tidak mampu membayar hutang mereka. Di Malaysia, kebankrapan menjejaskan keupayaan anda mendapat kredit.',
        category: 'legal',
        related: ['Gagal Bayar', 'NPL'],
      },
    ] as GlossaryTerm[],
    cta: {
      title: 'Masih Ada Soalan?',
      description: 'Hubungi pasukan kami untuk panduan peribadi dalam perjalanan pinjaman anda.',
      button: 'Hubungi Kami',
    },
  },
};

export default function GlossaryContent({ language }: GlossaryContentProps) {
  const t = content[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedTerms, setExpandedTerms] = useState<Record<string, boolean>>({});

  const filteredTerms = useMemo(() => {
    let terms = t.terms;

    if (selectedCategory !== 'all') {
      terms = terms.filter((term) => term.category === selectedCategory);
    }

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      terms = terms.filter(
        (term) =>
          term.term.toLowerCase().includes(search) ||
          term.definition.toLowerCase().includes(search)
      );
    }

    return terms.sort((a, b) => a.term.localeCompare(b.term));
  }, [t.terms, selectedCategory, searchTerm]);

  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach((term) => {
      const letter = term.term[0].toUpperCase();
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  const toggleExpand = (term: string) => {
    setExpandedTerms((prev) => ({
      ...prev,
      [term]: !prev[term],
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" aria-hidden="true" />
        <div className="container relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
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

      {/* Search and Filter */}
      <section className="py-8 border-y bg-background/95 backdrop-blur sticky top-0 z-30">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center surface-card rounded-2xl p-4 md:p-5">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                {t.allCategories}
              </Button>
              {Object.entries(t.categories).map(([key, label]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(key)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="py-12 md:py-16">
        <div className="container">
          {filteredTerms.length === 0 ? (
            <Card className="text-center p-8 surface-card border-primary/10">
              <CardContent>
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t.noResults}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedTerms).map(([letter, terms]) => (
                <div key={letter} id={`letter-${letter}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                      {letter}
                    </div>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <div className="grid gap-4">
                    {terms.map((term) => {
                      const isExpanded = expandedTerms[term.term];
                      const hasExtra = term.related || term.example;

                      return (
                        <Card key={term.term} className="overflow-hidden surface-card border-primary/10">
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <CardTitle className="text-lg flex items-center gap-2">
                                  {term.term}
                                  <Badge variant="outline" className="text-xs font-normal">
                                    {t.categories[term.category as keyof typeof t.categories]}
                                  </Badge>
                                </CardTitle>
                              </div>
                              {hasExtra && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleExpand(term.term)}
                                  className="flex-shrink-0"
                                >
                                  {isExpanded ? (
                                    <>
                                      {t.showLess}
                                      <ChevronUp className="ml-1 h-4 w-4" />
                                    </>
                                  ) : (
                                    <>
                                      {t.showMore}
                                      <ChevronDown className="ml-1 h-4 w-4" />
                                    </>
                                  )}
                                </Button>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{term.definition}</p>

                            {isExpanded && (
                              <div className="mt-4 pt-4 border-t space-y-4">
                                {term.example && (
                                  <div>
                                    <p className="text-sm font-medium text-primary mb-1">
                                      {t.example}:
                                    </p>
                                    <p className="text-sm text-muted-foreground italic">
                                      &quot;{term.example}&quot;
                                    </p>
                                  </div>
                                )}
                                {term.related && term.related.length > 0 && (
                                  <div>
                                    <p className="text-sm font-medium text-primary mb-2">
                                      {t.relatedTerms}:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                      {term.related.map((rel) => (
                                        <Badge
                                          key={rel}
                                          variant="secondary"
                                          className="cursor-pointer hover:bg-secondary/80"
                                          onClick={() => {
                                            setSearchTerm(rel);
                                            setSelectedCategory('all');
                                          }}
                                        >
                                          {rel}
                                          <ExternalLink className="ml-1 h-3 w-3" />
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {t.quickNav.title}
            </h2>
            <p className="text-muted-foreground">
              {t.quickNav.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 surface-card rounded-2xl p-4">
            {Object.keys(groupedTerms).map((letter) => (
              <Button
                key={letter}
                variant="outline"
                size="sm"
                className="w-10 h-10"
                onClick={() => {
                  const element = document.getElementById(`letter-${letter}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {letter}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <div className="surface-card rounded-3xl p-8 md:p-12">
            <BookOpen className="h-12 w-12 mx-auto mb-6 text-primary" />
            <h2 className="text-2xl md:text-4xl font-bold mb-4">{t.cta.title}</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t.cta.description}
            </p>
            <Button size="lg" className="btn-gradient text-white shadow-md font-semibold" asChild>
              <Link href="/contact">
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
