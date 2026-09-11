export type FaqCategoryId = 'services' | 'process' | 'payment' | 'security';

export interface FaqItem {
  category: FaqCategoryId;
  question: string;
  questionMs: string;
  answer: string;
  answerMs: string;
}

export const faqUi = {
  en: {
    breadcrumbHome: 'Home',
    breadcrumbFaq: 'FAQ',
    eyebrow: 'Help Center',
    title: 'Frequently Asked Questions',
    lede: 'Find answers to common questions about our loan products, application process, and repayment terms for borrowers across Malaysia.',
    highlights: [
      { title: 'Fast answers', description: 'Most topics covered in under 2 minutes.' },
      { title: 'Nationwide support', description: 'Guidance tailored to Malaysian borrowers.' },
      { title: 'PDPA compliant', description: 'We follow strict data protection practices.' },
    ],
    searchPlaceholder: 'Search for answers...',
    noResults: {
      title: 'No results found',
      description: "Try adjusting your search or filter to find what you're looking for.",
    },
    categories: {
      all: 'All Questions',
      services: 'Loan Products',
      process: 'Application',
      payment: 'Repayment',
      security: 'Security',
    },
    quickLinks: [
      { href: '/services', title: 'Apply for a Loan', description: 'Quick and easy online application. Get analysis within 24 hours.', cta: 'Apply Now' },
      { href: '/services', title: 'Loan Products', description: 'View our range of loan products with competitive rates.', cta: 'View Products' },
      { href: '/about', title: 'About Us', description: 'Learn more about GURU Credits and our mission.', cta: 'Learn More' },
    ],
  },
  ms: {
    breadcrumbHome: 'Utama',
    breadcrumbFaq: 'Soalan Lazim',
    eyebrow: 'Pusat Bantuan',
    title: 'Soalan Lazim',
    lede: 'Cari jawapan tentang produk pinjaman, proses permohonan dan terma pembayaran untuk peminjam di seluruh Malaysia.',
    highlights: [
      { title: 'Jawapan pantas', description: 'Kebanyakan topik selesai dalam 2 minit.' },
      { title: 'Sokongan seluruh negara', description: 'Panduan untuk peminjam Malaysia.' },
      { title: 'Patuh PDPA', description: 'Perlindungan data yang ketat.' },
    ],
    searchPlaceholder: 'Cari jawapan...',
    noResults: {
      title: 'Tiada hasil dijumpai',
      description: 'Cuba laraskan carian atau penapis anda untuk mencari apa yang anda cari.',
    },
    categories: {
      all: 'Semua Soalan',
      services: 'Produk Pinjaman',
      process: 'Permohonan',
      payment: 'Pembayaran',
      security: 'Keselamatan',
    },
    quickLinks: [
      { href: '/services', title: 'Mohon Pinjaman', description: 'Permohonan dalam talian yang cepat dan mudah. Diluluskan dalam 24 jam.', cta: 'Mohon Sekarang' },
      { href: '/services', title: 'Produk Pinjaman', description: 'Lihat rangkaian produk pinjaman kami dengan kadar kompetitif.', cta: 'Lihat Produk' },
      { href: '/about', title: 'Tentang Kami', description: 'Ketahui lebih lanjut tentang GURU Credits dan misi kami.', cta: 'Ketahui Lebih Lanjut' },
    ],
  },
} as const;

export const faqItems: FaqItem[] = [
  {
    category: 'services',
    question: 'What types of loans do you consult on?',
    questionMs: 'Apakah jenis pinjaman yang anda tawarkan?',
    answer: 'We consult on four loan categories: Personal Loans (up to RM100,000 from 4.88% p.a.), Business Loans (for SMEs from 5.5% p.a.), Debt Consolidation (6–9% p.a.), and Emergency Loans (fast-turnaround personal financing). We match each applicant to Bank Negara-licensed lenders based on their CCRIS, income, and DSR profile.',
    answerMs: 'Kami menawarkan empat kategori: Pinjaman Peribadi (sehingga RM100,000 dari 4.88% setahun), Pinjaman Perniagaan (untuk PKS dari 5.5% setahun), Penyatuan Hutang (6–9% setahun), dan Pinjaman Kecemasan (pembiayaan peribadi pantas). Kami dilesenkan di bawah Akta Pemberi Pinjam Wang 1951.',
  },
  {
    category: 'services',
    question: 'What is the maximum loan amount I can borrow?',
    questionMs: 'Berapakah jumlah pinjaman maksimum yang boleh saya pinjam?',
    answer: "The maximum amount depends on the product and your profile: Personal Loans up to RM100,000, Business Loans based on cash-flow and collateral, Debt Consolidation typically up to RM200,000. Final approval is subject to each bank's credit evaluation.",
    answerMs: 'Jumlah maksimum bergantung pada produk dan profil anda: Pinjaman Peribadi sehingga RM100,000, Pinjaman Perniagaan berdasarkan aliran tunai dan cagaran, Penyatuan Hutang biasanya sehingga RM200,000. Kelulusan akhir tertakluk kepada penilaian kredit.',
  },
  {
    category: 'services',
    question: 'What are your interest rates?',
    questionMs: 'Apakah kadar faedah anda?',
    answer: 'Indicative rates we commonly see in approvals: Personal Loans from 4.88% p.a., Business Loans from 5.5% p.a., Debt Consolidation 6–9% p.a. Actual rates depend on your credit profile, bank selected, and prevailing BNM Reference Rate.',
    answerMs: 'Kadar indikatif: Pinjaman Peribadi dari 4.88% setahun, Pinjaman Perniagaan dari 5.5% setahun, Penyatuan Hutang 6–9% setahun. Kadar sebenar bergantung pada profil kredit, produk dipilih, dan mematuhi had berkanun di bawah Peraturan Pemberi Pinjam Wang.',
  },
  {
    category: 'services',
    question: 'What is the loan tenure available?',
    questionMs: 'Apakah tempoh pinjaman yang tersedia?',
    answer: 'Tenure varies by product: Personal Loans 1–7 years, Debt Consolidation 1–7 years, Business Loans flexible based on need, Emergency Loans 1–7 years. Longer tenure lowers monthly payment but increases total interest.',
    answerMs: 'Tempoh ikut produk: Pinjaman Peribadi 1–7 tahun, Penyatuan Hutang 1–7 tahun, Pinjaman Perniagaan fleksibel ikut keperluan, Pinjaman Kecemasan 1–7 tahun. Tempoh lebih panjang mengurangkan bayaran bulanan tetapi meningkatkan jumlah faedah.',
  },
  {
    category: 'process',
    question: 'How long does the analysis take?',
    questionMs: 'Berapa lama analisis kelayakan mengambil masa?',
    answer: 'Most analyses are completed within 24 hours after we receive complete documents. Bank approval timelines vary by lender and profile.',
    answerMs: 'Kebanyakan analisis siap dalam 24 jam selepas dokumen lengkap diterima. Tempoh kelulusan bank berbeza mengikut bank dan profil pemohon.',
  },
  {
    category: 'process',
    question: 'What documents do I need to apply?',
    questionMs: 'Apakah dokumen yang diperlukan untuk memohon?',
    answer: 'Basic documents include: copy of IC (front and back), latest 3 months salary slips, latest 3 months bank statements, and employment confirmation letter. Self-employed applicants need business registration documents and business bank statements.',
    answerMs: 'Dokumen asas termasuk: salinan IC (depan dan belakang), slip gaji 3 bulan terkini, penyata bank 3 bulan terkini, dan surat pengesahan majikan. Pemohon yang bekerja sendiri memerlukan dokumen pendaftaran perniagaan dan penyata bank perniagaan.',
  },
  {
    category: 'process',
    question: 'How do I apply for a loan?',
    questionMs: 'Bagaimana cara memohon pinjaman?',
    answer: 'Applying is easy: 1) Fill out our simple online form (takes 5 minutes), 2) Upload supporting documents, 3) We complete the analysis within 24 hours, 4) We guide you on submission and next steps.',
    answerMs: 'Proses mudah: 1) Isi borang dalam talian kami (5 minit), 2) Muat naik dokumen sokongan, 3) Kami siapkan analisis dalam 24 jam, 4) Kami bantu anda hantar ke bank yang sesuai dan terangkan langkah seterusnya.',
  },
  {
    category: 'process',
    question: 'Who is eligible to apply?',
    questionMs: 'Siapa yang layak memohon?',
    answer: 'Basic eligibility: Malaysian citizen or PR, age 21-60 years, employed for at least 6 months or self-employed for at least 2 years, minimum monthly income of RM2,000. Each loan type may have additional requirements.',
    answerMs: 'Kelayakan asas: Warganegara Malaysia atau PR, umur 21-60 tahun, bekerja sekurang-kurangnya 6 bulan atau bekerja sendiri sekurang-kurangnya 2 tahun, pendapatan bulanan minimum RM2,000. Setiap jenis pinjaman mungkin mempunyai keperluan tambahan.',
  },
  {
    category: 'process',
    question: 'Can I apply if I have bad credit history?',
    questionMs: 'Bolehkah saya memohon jika mempunyai sejarah kredit yang buruk?',
    answer: 'We evaluate each application on its merits. While credit history is considered, we also look at your current income, employment stability, and ability to repay. Contact us to discuss your situation - we may still be able to help.',
    answerMs: 'Kami menilai setiap permohonan berdasarkan merit. Walaupun sejarah kredit dipertimbangkan, kami juga melihat pendapatan semasa anda, kestabilan pekerjaan, dan keupayaan membayar balik. Hubungi kami untuk membincangkan situasi anda - kami mungkin masih boleh membantu.',
  },
  {
    category: 'payment',
    question: 'What are the repayment options?',
    questionMs: 'Apakah pilihan pembayaran balik?',
    answer: 'Repayment terms are set by the bank and typically use fixed monthly instalments. We explain the available options and what to expect before you sign.',
    answerMs: 'Pembayaran balik ditetapkan oleh bank dan biasanya menggunakan ansuran bulanan tetap. Kami akan jelaskan pilihan pembayaran yang ditawarkan oleh bank sebelum anda menandatangani.',
  },
  {
    category: 'payment',
    question: 'Can I make early repayment?',
    questionMs: 'Bolehkah saya membuat pembayaran awal?',
    answer: "Early or full settlement depends on the lender's policy and may involve fees. We can guide you on what to check before committing.",
    answerMs: 'Ia bergantung pada polisi bank dan mungkin melibatkan yuran penyelesaian awal. Kami boleh bantu anda semak terma yang berkaitan.',
  },
  {
    category: 'payment',
    question: 'What happens if I miss a payment?',
    questionMs: 'Apa yang berlaku jika saya terlepas bayaran?',
    answer: "Late payment charges follow your bank's loan agreement. If you're struggling, contact the lender quickly and we can advise on next steps.",
    answerMs: 'Caj lewat tertakluk kepada perjanjian pinjaman bank. Jika anda menghadapi kesukaran, hubungi bank segera dan kami boleh beri panduan tindakan seterusnya.',
  },
  {
    category: 'payment',
    question: 'Are there any hidden fees?',
    questionMs: 'Adakah terdapat caj tersembunyi?',
    answer: 'We disclose our service fees clearly. Bank fees and terms are provided by the lender before you sign, and we help you review them.',
    answerMs: 'Tiada caj tersembunyi untuk perkhidmatan kami. Caj bank dan terma pinjaman akan dinyatakan oleh bank sebelum anda menandatangani, dan kami bantu semak.',
  },
  {
    category: 'security',
    question: 'Is my personal information secure?',
    questionMs: 'Adakah maklumat peribadi saya selamat?',
    answer: 'Yes, we take data security seriously. All data is encrypted using industry-standard SSL encryption, handled according to PDPA (Personal Data Protection Act) guidelines, and stored securely. We never share your information with third parties without your consent.',
    answerMs: 'Ya, kami mengambil serius keselamatan data. Semua data dienkripsi menggunakan penyulitan SSL standard industri, dikendalikan mengikut garis panduan PDPA (Akta Perlindungan Data Peribadi), dan disimpan dengan selamat. Kami tidak pernah berkongsi maklumat anda dengan pihak ketiga tanpa kebenaran anda.',
  },
  {
    category: 'security',
    question: 'How do I know this is a legitimate lending company?',
    questionMs: 'Bagaimana saya tahu ini adalah syarikat pinjaman yang sah?',
    answer: 'GURU Credits operates under a Moneylenders Act 1951 license issued by KPKT. All our fees are clearly disclosed — the RM30 you see mentioned is a pass-through charge for pulling your CTOS credit report and is collected only via our official WhatsApp after we confirm your details. Licensing details and our registered business address are available on request through any official channel.',
    answerMs: 'GURU Credits beroperasi di bawah lesen Akta Pemberi Pinjam Wang 1951 yang dikeluarkan oleh KPKT. Semua yuran dinyatakan dengan jelas — RM30 yang disebut ialah caj salur lalu untuk mengambil laporan kredit CTOS anda dan dikutip hanya melalui WhatsApp rasmi selepas pengesahan butiran. Butiran lesen dan alamat perniagaan berdaftar boleh didapati atas permintaan melalui saluran rasmi.',
  },
  {
    category: 'security',
    question: 'What happens to my data after the loan is settled?',
    questionMs: 'Apa yang berlaku kepada data saya selepas pinjaman selesai?',
    answer: 'We retain your data as required by regulatory guidelines. After your loan is fully settled, you can request deletion of your data by contacting us. We will process your request in accordance with PDPA requirements.',
    answerMs: 'Kami mengekalkan data anda seperti yang diperlukan oleh garis panduan peraturan. Selepas pinjaman anda diselesaikan sepenuhnya, anda boleh meminta penghapusan data anda dengan menghubungi kami. Kami akan memproses permintaan anda mengikut keperluan PDPA.',
  },
];
