import type { RegionData } from './regions';

const productLabels: Record<RegionData['metrics']['primaryLoanProducts'][number], { en: string; ms: string }> = {
  home: { en: 'Home Loan', ms: 'Pinjaman Rumah' },
  car: { en: 'Car Loan', ms: 'Pinjaman Kereta' },
  personal: { en: 'Personal Loan', ms: 'Pinjaman Peribadi' },
  business: { en: 'Business Loan', ms: 'Pinjaman Perniagaan' },
  refinance: { en: 'Refinance', ms: 'Pembiayaan Semula' },
};

export function regionProductLabel(product: RegionData['metrics']['primaryLoanProducts'][number], language: 'en' | 'ms') {
  return productLabels[product][language];
}

export const regionUi = {
  en: {
    breadcrumbHome: 'Home',
    breadcrumbLoans: 'Loans',
    eyebrow: 'Regional Loan Guide',
    heroTitle: (name: string) => `Personal Loan in ${name}`,
    ctaPrimary: 'Start Analysis',
    ctaSecondary: 'WhatsApp Us',
    benchmarks: {
      income: 'Median Household Income',
      property: 'Median Property Price',
      dsr: 'Median DSR',
      source: 'Compiled from DOSM, Bank Negara, and our internal benchmarks.',
    },
    affordability: {
      eyebrow: 'Affordability',
      title: (name: string) => `What this means for ${name} buyers.`,
    },
    marketTrends: { eyebrow: 'Market Snapshot' },
    bankSpecialisation: { eyebrow: 'Lender Specialisation', caveat: 'Caveat: ' },
    lenders: {
      eyebrow: 'Active Lenders',
      title: (name: string) => `Lenders active in ${name}.`,
    },
    neighbourhoodGuide: { eyebrow: 'Neighbourhood Guide' },
    localCases: {
      eyebrow: 'Local Cases',
      title: (name: string) => `Real borrowers in ${name}.`,
      disclaimer: 'Names changed. Numbers and outcomes are real, drawn from our client records in the last 12 months.',
      profile: 'Profile',
      challenge: 'Challenge',
      outcome: 'Outcome',
    },
    faq: {
      eyebrow: 'Local Questions',
      title: (name: string) => `Asked by ${name} borrowers`,
    },
    sources: {
      eyebrow: 'Sources & References',
      reviewedBy: 'Reviewed by',
      lastReviewed: 'Last reviewed',
    },
    closing: {
      title: (name: string) => `Ready for a ${name} DSR & lender-match report?`,
      lede: 'RM30 flat fee. Written analysis in 24 hours. Fee is collected only through official WhatsApp after submission.',
    },
  },
  ms: {
    breadcrumbHome: 'Utama',
    breadcrumbLoans: 'Pinjaman',
    eyebrow: 'Panduan Pinjaman Wilayah',
    heroTitle: (name: string) => `Pinjaman Peribadi di ${name}`,
    ctaPrimary: 'Mulakan Analisis',
    ctaSecondary: 'WhatsApp Kami',
    benchmarks: {
      income: 'Pendapatan Isi Rumah Median',
      property: 'Harga Hartanah Median',
      dsr: 'DSR Median',
      source: 'Data disusun daripada DOSM, Bank Negara dan data dalaman kami.',
    },
    affordability: {
      eyebrow: 'Kemampuan',
      title: (name: string) => `Apa yang bermakna untuk pembeli ${name}.`,
    },
    marketTrends: { eyebrow: 'Tinjauan Pasaran' },
    bankSpecialisation: { eyebrow: 'Pengkhususan Bank', caveat: 'Amaran: ' },
    lenders: {
      eyebrow: 'Pemberi Pinjaman Aktif',
      title: (name: string) => `Bank yang aktif di ${name}.`,
    },
    neighbourhoodGuide: { eyebrow: 'Panduan Kejiranan' },
    localCases: {
      eyebrow: 'Kes Tempatan',
      title: (name: string) => `Peminjam sebenar di ${name}.`,
      disclaimer: 'Nama disamar. Nombor dan hasil adalah sebenar, daripada rekod klien kami dalam 12 bulan lepas.',
      profile: 'Profil',
      challenge: 'Cabaran',
      outcome: 'Hasil',
    },
    faq: {
      eyebrow: 'Soalan Tempatan',
      title: (name: string) => `Diminta oleh peminjam ${name}`,
    },
    sources: {
      eyebrow: 'Sumber & Rujukan',
      reviewedBy: 'Disemak oleh',
      lastReviewed: 'Kemaskini terakhir',
    },
    closing: {
      title: (name: string) => `Sedia untuk laporan DSR & struktur pinjaman ${name}?`,
      lede: 'Yuran RM30. Analisis bertulis dalam 24 jam. Yuran hanya diterima melalui WhatsApp rasmi selepas penghantaran.',
    },
  },
} as const;
