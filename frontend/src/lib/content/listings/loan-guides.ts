export type StaticGuide = {
  href: string;
  title: string;
  titleMs: string;
  description: string;
  descriptionMs: string;
};

export type AuthorityLink = {
  href: string;
  title: string;
  titleMs: string;
  description: string;
  descriptionMs: string;
};

export const loanGuidesUi = {
  en: {
    breadcrumbHome: 'Home',
    breadcrumbLoanGuides: 'Loan Guides',
    eyebrow: 'Loan Knowledge Hub',
    title: 'Loan Guides for Smarter Decisions',
    lede: 'Practical Malaysia-focused playbooks covering CCRIS, CTOS, DSR, rejection recovery, self-employed income proof, debt pressure, and safer borrowing decisions.',
    guidesTitle: 'Priority Guides',
    topicsTitle: 'All Topic Guides',
    readGuide: 'Read guide',
    openLabel: 'Open',
    highlightsTitle: 'What this section is for',
    highlights: [
      'Answer high-intent borrower questions before a formal application is attempted.',
      'Reduce repeated rejections by improving route selection and document readiness.',
      'Connect topic guides, tools, and money pages into one crawlable cluster.',
      'Support people-first finance content with stronger editorial and review pages.',
    ],
    authorityTitle: 'Authority & Trust Pages',
  },
  ms: {
    breadcrumbHome: 'Utama',
    breadcrumbLoanGuides: 'Panduan Pinjaman',
    eyebrow: 'Pusat Pengetahuan Pinjaman',
    title: 'Panduan Pinjaman untuk Keputusan Lebih Bijak',
    lede: 'Playbook praktikal Malaysia yang meliputi CCRIS, CTOS, DSR, pemulihan selepas ditolak, bukti pendapatan bekerja sendiri, tekanan hutang, dan keputusan pinjaman yang lebih selamat.',
    guidesTitle: 'Panduan Keutamaan',
    topicsTitle: 'Semua Panduan Topik',
    readGuide: 'Baca panduan',
    openLabel: 'Buka',
    highlightsTitle: 'Tujuan seksyen ini',
    highlights: [
      'Menjawab soalan peminjam berniat tinggi sebelum penghantaran rasmi dibuat.',
      'Mengurangkan penolakan berulang dengan memperbaiki pemilihan laluan dan kesiapsiagaan dokumen.',
      'Menyambungkan panduan topik, tools, dan money page menjadi satu kluster yang mudah dirayapi.',
      'Menyokong kandungan kewangan people-first dengan halaman editorial dan semakan yang lebih kuat.',
    ],
    authorityTitle: 'Halaman Autoriti & Kepercayaan',
  },
} as const;

export const staticGuides: StaticGuide[] = [
  { href: '/loan-guides/credit-score', title: 'Credit Score & CCRIS Guide', titleMs: 'Panduan Skor Kredit & CCRIS', description: 'Improve CCRIS / CTOS health, fix late markers, and prepare for stronger approvals.', descriptionMs: 'Tingkatkan CCRIS / CTOS, betulkan rekod lewat, dan sedia untuk kelulusan yang lebih kuat.' },
  { href: '/loan-guides/debt-consolidation', title: 'Debt Consolidation Strategy', titleMs: 'Strategi Penyatuan Hutang', description: 'Lower monthly commitments by combining cards and personal loans more deliberately.', descriptionMs: 'Kurangkan komitmen bulanan dengan menggabungkan kad dan pinjaman peribadi secara lebih teratur.' },
  { href: '/loan-guides/ccris-ctos', title: 'CCRIS & CTOS Guide', titleMs: 'Panduan CCRIS & CTOS', description: 'Understand what lenders actually read in your file before you apply again.', descriptionMs: 'Fahami apa yang lender sebenarnya baca dalam fail anda sebelum mohon semula.' },
  { href: '/loan-guides/loan-rejection-recovery', title: 'Loan Rejection Recovery', titleMs: 'Pemulihan Selepas Pinjaman Ditolak', description: 'Diagnose the real blocker and rebuild the file before the next submission.', descriptionMs: 'Kenal pasti halangan sebenar dan bina semula fail sebelum penghantaran seterusnya.' },
  { href: '/loan-guides/self-employed-income-proof', title: 'Self-Employed Income Proof', titleMs: 'Bukti Pendapatan Bekerja Sendiri', description: 'Prepare variable or business income in a way lenders can actually assess.', descriptionMs: 'Sediakan pendapatan berubah atau perniagaan dalam bentuk yang lender benar-benar boleh nilai.' },
];

export const authorityLinks: AuthorityLink[] = [
  { href: '/editorial-policy', title: 'Editorial Policy', titleMs: 'Dasar Editorial', description: 'How we research, review, and maintain borrower-facing finance content.', descriptionMs: 'Bagaimana kami menyelidik, menyemak, dan menyelenggara kandungan kewangan untuk peminjam.' },
  { href: '/review-methodology', title: 'Review Methodology', titleMs: 'Metodologi Semakan', description: 'How we assess CCRIS, CTOS, DSR, income proof, and route fit.', descriptionMs: 'Bagaimana kami menilai CCRIS, CTOS, DSR, bukti pendapatan, dan kesesuaian laluan.' },
  { href: '/verify-us', title: 'Verify Us', titleMs: 'Sahkan Kami', description: 'Official channels, office details, privacy flow, and verification guidance.', descriptionMs: 'Saluran rasmi, butiran pejabat, aliran privasi, dan panduan pengesahan.' },
  { href: '/service-areas', title: 'Service Areas', titleMs: 'Kawasan Perkhidmatan', description: 'Regional guide hub for Kuala Lumpur, Selangor, Johor, Sabah, and more.', descriptionMs: 'Hab panduan serantau untuk Kuala Lumpur, Selangor, Johor, Sabah, dan lain-lain.' },
];
