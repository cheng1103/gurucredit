import type { Language } from '@/lib/i18n/translations';

export type HomeContent = {
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    titleEnd: string;
    subtitle: string;
    cta: string;
    secondary: string;
    whatsapp: string;
    paymentNotice: string;
    coverageNotice: string;
    statusLink: string;
    highlights: { title: string; description: string }[];
    steps: { title: string; description: string }[];
  };
  stats: { value: string; label: string }[];
  mainService: {
    badge: string;
    title: string;
    description: string;
    price: string;
    priceNote: string;
    features: string[];
    cta: string;
    note: string;
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    items: { name: string; location: string; text: string }[];
  };
  whyUs: {
    badge: string;
    title: string;
    items: string[];
    stats: { value: string; label: string }[];
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: { question: string; answer: string }[];
    viewAll: string;
  };
  blog: {
    badge: string;
    title: string;
    cta: string;
    readArticle: string;
  };
  resources: {
    badge: string;
    title: string;
    openTool: string;
    items: {
      tool: string;
      description: string;
      toolLink: string;
      guide: string;
      guideLink: string;
    }[];
  };
  cta: {
    badge: string;
    title: string;
    subtitle: string;
    primary: string;
    secondary: string;
  };
  risk: {
    title: string;
    body: string;
  };
  disclosure: {
    title: string;
    items: string[];
  };
};

export const homeContent: Record<Language, HomeContent> = {
  en: {
    hero: {
      badge: 'Serving Malaysia Nationwide',
      title: 'Fast, Clear',
      titleHighlight: 'Loan Guidance',
      titleEnd: 'When You Need It',
      subtitle:
        'CCRIS/CTOS review, DSR insights, and a loan plan structured to your profile. Direct from your licensed lender with written guidance as fast as 24 hours.',
      cta: 'Start Eligibility Check',
      secondary: 'Estimate Monthly Payment',
      whatsapp: 'Chat on WhatsApp',
      paymentNotice:
        'The RM30 CTOS report fee is collected ONLY inside our official WhatsApp chat after we confirm your details. No payment happens on this website.',
      coverageNotice:
        'Applications are open across Malaysia, including Sabah and Sarawak.',
      statusLink: 'Track application status',
      highlights: [
        { title: 'DSR + CCRIS/CTOS review', description: 'Know exactly where you stand before we structure an offer.' },
        { title: 'Tailored loan structure', description: 'Rate, tenure, and amount set around your credit profile.' },
        { title: 'No payment on site', description: 'RM30 CTOS fee is collected only via official WhatsApp.' },
        { title: 'Licensed nationwide lender', description: 'Moneylenders Act 1951 licensed, serving all Malaysian states.' },
      ],
      steps: [
        { title: 'Submit in 5 minutes', description: 'Share income, debts, and loan goals.' },
        { title: 'We analyse within 24h', description: 'DSR, CCRIS/CTOS, and our offer structure.' },
        { title: 'Receive your offer', description: 'Written loan terms, repayment plan, and next-step checklist.' },
      ],
    },
    stats: [
      { value: '85%', label: 'Guided Approval Rate' },
      { value: '24h', label: 'Report Turnaround' },
      { value: 'RM30', label: 'Expert Analysis' },
      { value: '1,000+', label: 'Borrowers Nationwide' },
    ],
    mainService: {
      badge: 'Most Popular',
      title: 'Personal Loan',
      description: 'A loan offer structured around your credit file — issued under our Moneylenders Act 1951 license',
      price: 'From 4.88%',
      priceNote: 'flat rate p.a.',
      features: [
        'Loan up to RM100,000 with terms structured to your profile',
        'Flexible tenure 1-7 years with transparent fees',
        'Turnaround as fast as 24 hours when documents are ready',
        'Minimal documentation and clear checklist',
        'No hidden charges or surprise add-ons',
        'Online-first application and status updates',
        'Rate set within statutory caps based on your DSR and profile',
      ],
      cta: 'Get My Plan',
      note: 'Approval guidance within 24 hours',
    },
    features: {
      badge: 'Our Loan Products',
      title: 'Loans We Offer',
      subtitle:
        'Personal and business financing with clear requirements, transparent fees, and a guided submission path.',
      items: [
        { title: 'Personal Loan', description: 'For medical bills, short-term cashflow, or planned household expenses — structured on your income and credit profile' },
        { title: 'Business Loan', description: 'Working capital and expansion financing for SMEs with flexible tenure' },
        { title: 'Debt Consolidation', description: 'Combine multiple high-interest debts into one manageable monthly payment' },
      ],
    },
    testimonials: {
      badge: 'Client Success Stories',
      title: 'What Our Clients Say',
      subtitle:
        'Join over 1,000 Malaysian borrowers who have successfully navigated their loan applications with our help.',
      items: [
        {
          name: 'Ahmad R.',
          location: 'Kuala Lumpur',
          text: 'GURU Credits helped me understand why my previous loan applications were rejected. After following their recommendations, I received bank approval for my home loan!',
        },
        {
          name: 'Sarah L.',
          location: 'Petaling Jaya',
          text: 'The RM30 CTOS report came with a very detailed written analysis, and the loan offer was structured clearly around my profile.',
        },
        {
          name: 'Raj K.',
          location: 'Shah Alam',
          text: 'Professional service with fast turnaround. Got my report within 24 hours as promised. Highly recommend!',
        },
      ],
    },
    whyUs: {
      badge: 'Why us',
      title: 'Four things we do that brokers cannot.',
      items: [
        'You borrow directly from a licensed lender, not through a middleman chasing commission',
        'Every RM30 CTOS report comes with a full written analysis: CCRIS read, DSR recalculated, structured loan offer',
        'We say "no" upfront if we cannot approve you — better than a silent drop-off after 14 days',
        '24-hour written turnaround, tracked by reference number — if we miss it, we flag it to you first',
      ],
      stats: [
        { value: '85%', label: 'Guided Approval' },
        { value: '24h', label: 'Written Turnaround' },
        { value: 'RM30', label: 'Flat Fee, One Time' },
      ],
    },
    faq: {
      badge: 'Common Questions',
      title: 'Frequently Asked Questions',
      subtitle: 'Quick answers to help you understand our loan services better.',
      items: [
        {
          question: 'What types of loans do you offer?',
          answer:
            'We are a licensed money lender under the Moneylenders Act 1951 offering personal loans, business financing for SMEs, and debt consolidation, with approval subject to your credit profile and documentation.',
        },
        {
          question: 'How long does the approval take?',
          answer:
            'Our eligibility analysis is usually completed within 24 hours. Bank approval timelines vary by lender and documentation completeness.',
        },
        {
          question: 'What documents do I need?',
          answer:
            'Basic set: IC copy, latest 3 months salary slips, bank statements, employment letter. We provide a checklist and flag extras by loan type.',
        },
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
      title: 'Plan with Tools & Articles',
      openTool: 'Open Tool',
      items: [
        {
          tool: 'Eligibility Test',
          description: 'Check your profile and borrowing readiness before applying.',
          toolLink: '/eligibility-test',
          guide: 'Understand DSR in plain English',
          guideLink: '/blog/understanding-dsr-debt-service-ratio',
        },
        {
          tool: 'Loan Comparison Tool',
          description: 'Compare bank rates, fees, and eligibility side by side.',
          toolLink: '/tools/compare',
          guide: 'How to read a loan offer',
          guideLink: '/blog/personal-loan-vs-credit-card-which-better',
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
      badge: 'Written review · official WhatsApp follow-up',
      title: 'Get a written eligibility review before you send full documents.',
      subtitle:
        'Start with your profile first. We then explain the likely route, the main blockers, and what to prepare next through our official channels before any formal submission.',
      primary: 'Start Eligibility Review',
      secondary: 'Ask on WhatsApp First',
    },
    risk: {
      title: 'Risk Warning',
      body: 'Loan approvals are subject to bank assessment. Borrow responsibly. Failure to repay on time may affect your credit score and incur late-payment fees. Please review loan terms carefully before committing.',
    },
    disclosure: {
      title: 'Transparency Disclosure',
      items: [
        'GURU Credits operates under a Moneylenders Act 1951 license issued by KPKT.',
        'The RM30 charge covers your CTOS credit report pull — a cost passed through to the credit reporting agency. Our analysis and loan structuring are included.',
        'Advertised rates are indicative and comply with the statutory caps under the Moneylenders (Control and Licensing) Regulations. Actual rates depend on your credit profile.',
        'No payment is collected on this website. The RM30 CTOS fee is settled only through our official WhatsApp after we confirm your details.',
      ],
    },
  },
  ms: {
    hero: {
      badge: 'Beroperasi di Seluruh Malaysia',
      title: 'Pantas & Jelas',
      titleHighlight: 'Panduan Pinjaman',
      titleEnd: 'Saat Anda Perlukan',
      subtitle:
        'Semakan CCRIS/CTOS, analisis DSR, dan pelan pinjaman yang distrukturkan ikut profil anda. Terus daripada pemberi pinjaman berlesen dengan panduan bertulis sepantas 24 jam.',
      cta: 'Mulakan Semakan Kelayakan',
      secondary: 'Anggar Bayaran Bulanan',
      whatsapp: 'Sembang WhatsApp',
      paymentNotice:
        'Yuran laporan CTOS RM30 dikutip hanya melalui WhatsApp rasmi kami selepas kami mengesahkan butiran anda. Tiada bayaran dibuat di laman web ini.',
      coverageNotice: 'Permohonan dibuka untuk seluruh Malaysia termasuk Sabah dan Sarawak.',
      statusLink: 'Semak status permohonan',
      highlights: [
        { title: 'Semakan DSR + CCRIS/CTOS', description: 'Ketahui keadaan anda sebelum kami menstrukturkan tawaran.' },
        { title: 'Struktur pinjaman disesuaikan', description: 'Kadar, tempoh dan jumlah dibentuk mengikut profil kredit anda.' },
        { title: 'Tiada bayaran di laman', description: 'Yuran CTOS RM30 dikutip hanya melalui WhatsApp rasmi.' },
        { title: 'Pemberi pinjaman berlesen kebangsaan', description: 'Berlesen di bawah Akta Pemberi Pinjam Wang 1951, seluruh Malaysia.' },
      ],
      steps: [
        { title: 'Hantar dalam 5 minit', description: 'Kongsi pendapatan, hutang, dan sasaran.' },
        { title: 'Analisis dalam 24 jam', description: 'DSR, CCRIS/CTOS, dan struktur tawaran kami.' },
        { title: 'Terima tawaran anda', description: 'Terma pinjaman bertulis, pelan bayaran, dan senarai dokumen seterusnya.' },
      ],
    },
    stats: [
      { value: '85%', label: 'Kadar Kelulusan Dibimbing' },
      { value: '24j', label: 'Masa Laporan' },
      { value: 'RM30', label: 'Analisis Pakar' },
      { value: '1,000+', label: 'Pemohon Seluruh Negara' },
    ],
    mainService: {
      badge: 'Paling Popular',
      title: 'Pinjaman Peribadi',
      description: 'Tawaran pinjaman distrukturkan ikut fail kredit anda — dikeluarkan di bawah lesen Akta Pemberi Pinjam Wang 1951 kami',
      price: 'Dari 4.88%',
      priceNote: 'kadar rata setahun',
      features: [
        'Pinjaman sehingga RM100,000 dengan tawaran pinjaman ditapis',
        'Tempoh fleksibel 1-7 tahun dengan caj telus',
        'Analisis siap dalam 24 jam selepas dokumen lengkap',
        'Dokumentasi minimum dengan senarai semak jelas',
        'Tiada caj tersembunyi atau tambahan mengejut',
        'Permohonan digital dan kemas kini status',
        'Panduan kadar berdasarkan DSR dan profil',
      ],
      cta: 'Dapatkan Pelan Saya',
      note: 'Panduan analisis dalam 24 jam',
    },
    features: {
      badge: 'Produk Pinjaman Kami',
      title: 'Pinjaman Yang Kami Tawarkan',
      subtitle:
        'Pinjaman peribadi dan perniagaan dengan keperluan yang jelas, yuran telus dan laluan penyerahan yang dipandu.',
      items: [
        { title: 'Pinjaman Peribadi', description: 'Untuk bil perubatan, aliran tunai jangka pendek, atau perbelanjaan terancang — distrukturkan ikut pendapatan dan profil kredit anda' },
        { title: 'Pinjaman Perniagaan', description: 'Pembiayaan modal kerja dan pengembangan untuk PKS dengan tempoh yang fleksibel' },
        { title: 'Penyatuan Hutang', description: 'Gabungkan pelbagai hutang faedah tinggi menjadi satu bayaran bulanan yang terurus' },
      ],
    },
    testimonials: {
      badge: 'Kisah Kejayaan Pelanggan',
      title: 'Apa Kata Pelanggan Kami',
      subtitle:
        'Sertai lebih 1,000 peminjam Malaysia yang berjaya menavigasi permohonan pinjaman dengan bantuan kami.',
      items: [
        {
          name: 'Ahmad R.',
          location: 'Kuala Lumpur',
          text: 'GURU Credits bantu saya faham kenapa permohonan pinjaman dahulu ditolak. Selepas ikut cadangan mereka, permohonan rumah diluluskan!',
        },
        {
          name: 'Sarah L.',
          location: 'Petaling Jaya',
          text: 'Laporan CTOS RM30 sangat berbaloi. Analisis bertulis jelas dan tawaran pinjaman disusun ikut profil saya.',
        },
        {
          name: 'Raj K.',
          location: 'Shah Alam',
          text: 'Servis profesional dengan maklum balas pantas. Pengiraan DSR dan struktur pinjaman yang disyorkan sangat membantu.',
        },
      ],
    },
    whyUs: {
      badge: 'Mengapa kami',
      title: 'Empat perkara yang kami buat, broker tidak boleh.',
      items: [
        'Anda pinjam terus daripada pemberi pinjaman berlesen, bukan melalui orang tengah yang mengejar komisen',
        'Setiap laporan CTOS RM30 dilengkapi analisis bertulis penuh: bacaan CCRIS, DSR dikira semula, tawaran pinjaman distrukturkan',
        'Kami tolak pemohon yang kami rasa tidak akan lulus — "tidak" yang jujur lebih baik daripada penolakan senyap 14 hari kemudian',
        'Masa siap 24 jam, dijejaki dengan nombor rujukan — jika kami terlepas, kami maklumkan anda dulu',
      ],
      stats: [
        { value: '85%', label: 'Kelulusan Dibimbing' },
        { value: '24j', label: 'Siap Bertulis' },
        { value: 'RM30', label: 'Yuran Tetap Sekali' },
      ],
    },
    faq: {
      badge: 'Soalan Lazim',
      title: 'Soalan Lazim',
      subtitle: 'Jawapan pantas tentang perkhidmatan pinjaman kami.',
      items: [
        {
          question: 'Apakah jenis pinjaman yang anda tawarkan?',
          answer:
            'Pinjaman peribadi, kereta, rumah dan perniagaan dengan kadar rata bermula 4.88% setahun.',
        },
        {
          question: 'Berapa lama proses kelulusan?',
          answer:
            'Analisis kami siap dalam 24 jam. Bank biasanya beri keputusan dalam 1-3 hari bergantung pada dokumen.',
        },
        {
          question: 'Apakah dokumen yang diperlukan?',
          answer:
            'Set asas: salinan IC, slip gaji 3 bulan, penyata bank dan surat pengesahan kerja. Kami sediakan senarai semak khusus mengikut jenis pinjaman.',
        },
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
      title: 'Rancang dengan Alat & Artikel',
      openTool: 'Buka Alat',
      items: [
        {
          tool: 'Ujian Kelayakan',
          description: 'Semak profil dan kesediaan pinjaman sebelum memohon.',
          toolLink: '/eligibility-test',
          guide: 'Fahami DSR dengan mudah',
          guideLink: '/blog/understanding-dsr-debt-service-ratio',
        },
        {
          tool: 'Alat Perbandingan Pinjaman',
          description: 'Banding kadar, yuran dan kelayakan bank sebelah-menyebelah.',
          toolLink: '/tools/compare',
          guide: 'Cara membaca tawaran pinjaman',
          guideLink: '/blog/personal-loan-vs-credit-card-which-better',
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
      badge: 'Semakan bertulis · susulan WhatsApp rasmi',
      title: 'Dapatkan semakan kelayakan bertulis sebelum hantar dokumen penuh.',
      subtitle:
        'Mulakan dengan profil anda dahulu. Selepas itu kami terangkan laluan yang lebih sesuai, halangan utama, dan apa yang perlu disediakan melalui saluran rasmi sebelum sebarang penghantaran rasmi.',
      primary: 'Mulakan Semakan Kelayakan',
      secondary: 'Tanya di WhatsApp Dulu',
    },
    risk: {
      title: 'Amaran Risiko',
      body: 'Kelulusan pinjaman tertakluk kepada penilaian bank. Pinjam dengan bertanggungjawab. Kegagalan membayar balik tepat waktu boleh menjejaskan skor kredit dan mengenakan caj lewat bayar. Sila semak terma pinjaman dengan teliti sebelum komited.',
    },
    disclosure: {
      title: 'Pendedahan Ketelusan',
      items: [
        'GURU Credits dilesenkan di bawah Akta Pemberi Pinjam Wang 1951 oleh KPKT.',
        'Caj RM30 adalah untuk pengambilan laporan kredit CTOS — kos yang disalurkan kepada agensi pelaporan kredit. Analisis dan padanan pemberi pinjaman disertakan.',
        'Kadar yang dipaparkan adalah indikatif dan mematuhi had berkanun di bawah Peraturan Pemberi Pinjam Wang (Kawalan dan Pelesenan). Kadar sebenar bergantung pada profil kredit anda.',
        'Tiada bayaran dikutip di laman ini. Yuran CTOS RM30 diselesaikan hanya melalui WhatsApp rasmi selepas kami mengesahkan butiran anda.',
      ],
    },
  },
};
