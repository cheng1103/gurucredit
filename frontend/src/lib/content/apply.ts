import type { Language } from '@/lib/i18n/translations';

export interface ApplyServiceSpotlight {
  quote: string;
  author: string;
  faq: { question: string; answer: string };
}

export interface ApplyServiceContent {
  name: string;
  description: string;
  features: string[];
  spotlight?: ApplyServiceSpotlight;
}

export interface ApplyPageContent {
  backToServices: string;
  notFound: { title: string; description: string };
  steps: { personalInfo: string; employment: string; review: string };
  stepTitles: { personalInfo: string; employment: string; review: string };
  stepDescriptions: { personalInfo: string; employment: string; review: string };
  stepIntro: string;
  progress: { step: string; of: string };
  a11y: { stepsList: string; validPhone: string; validEmail: string };
  form: {
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    emailNote: string;
    phone: string;
    serviceArea: { label: string; helper: string };
    employmentType: string;
    employed: string;
    selfEmployed: string;
    business: string;
    freelance: string;
    companyName: string;
    companyPlaceholder: string;
    jobTitle: string;
    jobPlaceholder: string;
    monthlyIncome: string;
    incomeNote: string;
    validIncome: string;
    desiredAmount: string;
    desiredAmountNote: string;
    validLoanAmount: string;
  };
  reviewSection: {
    personalInfo: string;
    employmentDetails: string;
    name: string;
    email: string;
    phone: string;
    serviceArea: string;
    type: string;
    company: string;
    income: string;
    desiredAmount: string;
  };
  security: { title: string; description: string };
  navigation: { back: string; next: string; submit: string };
  sidebar: {
    selectedService: string;
    analysisFee: string;
    oneTime: string;
    loanRate: string;
    rateNote: string;
    paymentNote: string;
    turnaround: string;
    turnaroundDesc: string;
    confidential: string;
    confidentialDesc: string;
    needHelp: string;
    chatWhatsApp: string;
  };
  quickQuestions: {
    contactPreference: string;
    contactNote: string;
    options: { value: string; label: string }[];
  };
  assurance: { title: string; description: string; bullets: string[] };
  insights: {
    title: string;
    income: string;
    loanAsk: string;
    dsr: string;
    placeholder: string;
    ctosNote: string;
    status: { approved: string; conditional: string; declined: string };
  };
  whatsappHelper: {
    title: string;
    description: string;
    responseTime: string;
    button: string;
    subtext: string;
  };
  toast: {
    fillRequired: string;
    enterIncome: string;
    success: string;
    error: string;
  };
  services: Record<string, ApplyServiceContent>;
}

export const APPLY_LOAN_RATES: Record<string, number> = {
  '1': 4.88,
  '2': 3.5,
  '3': 4.0,
  '4': 5.5,
};

export const APPLY_ANALYSIS_FEE = 30;

export const applyContent: Record<Language, ApplyPageContent> = {
  en: {
    backToServices: 'Back to Services',
    notFound: {
      title: 'Service Not Found',
      description: 'The service you are looking for does not exist.',
    },
    steps: {
      personalInfo: 'Quick Check',
      employment: 'Contact Details',
      review: 'Review',
    },
    stepTitles: {
      personalInfo: 'Quick Approval Check',
      employment: 'Contact & Work Details',
      review: 'Review & Submit',
    },
    stepDescriptions: {
      personalInfo: 'Tell us your state, income, and loan amount first',
      employment: 'Add your contact details so our consultant can reach you',
      review: 'Review your information before submitting',
    },
    stepIntro:
      'Start with the decision-making basics: your state, monthly take-home income, and the amount you need.',
    progress: { step: 'Step', of: 'of' },
    a11y: {
      stepsList: 'Application steps',
      validPhone: 'Valid phone',
      validEmail: 'Valid email',
    },
    form: {
      fullName: 'Full Name (as per IC)',
      fullNamePlaceholder: 'Your full name',
      email: 'Email Address',
      emailPlaceholder: 'your@email.com',
      emailNote: 'We will send your analysis report to this email',
      phone: 'Phone Number',
      serviceArea: {
        label: 'Where do you live?',
        helper: 'We assist borrowers across Malaysia, including Sabah and Sarawak.',
      },
      employmentType: 'Employment Type',
      employed: 'Employed',
      selfEmployed: 'Self-Employed',
      business: 'Business Owner',
      freelance: 'Freelance',
      companyName: 'Company / Business Name',
      companyPlaceholder: 'Company name',
      jobTitle: 'Job Title / Position',
      jobPlaceholder: 'Your position',
      monthlyIncome: 'Monthly Net Income (RM)',
      incomeNote: 'Your take-home pay after all deductions',
      validIncome: 'Please enter a valid monthly income',
      desiredAmount: 'Desired Loan Amount (RM)',
      desiredAmountNote: 'How much do you want to borrow?',
      validLoanAmount: 'Please enter a valid loan amount',
    },
    reviewSection: {
      personalInfo: 'Personal Information',
      employmentDetails: 'Employment & Loan Details',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      serviceArea: 'Service Area',
      type: 'Type',
      company: 'Company',
      income: 'Income',
      desiredAmount: 'Loan Amount',
    },
    security: {
      title: 'Your data is secure',
      description:
        'We protect your information according to PDPA guidelines. Your data will only be used for this analysis.',
    },
    navigation: {
      back: 'Back',
      next: 'Next',
      submit: 'Submit Application',
    },
    sidebar: {
      selectedService: 'Selected Loan',
      analysisFee: 'Eligibility Analysis Fee',
      oneTime: 'one-time',
      loanRate: 'Loan Rate',
      rateNote: 'flat rate p.a.',
      paymentNote:
        'RM30 is collected only after submission via our official WhatsApp chat. Wait for our consultant to share the payment link—no payment happens on this site.',
      turnaround: '24 Hour Turnaround',
      turnaroundDesc: 'Results delivered fast',
      confidential: '100% Confidential',
      confidentialDesc: 'Your data is secure',
      needHelp: 'Need help?',
      chatWhatsApp: 'Chat with us on WhatsApp',
    },
    quickQuestions: {
      contactPreference: 'Preferred WhatsApp time',
      contactNote: 'We will prioritise contacting you within this window.',
      options: [
        { value: 'any', label: 'Anytime' },
        { value: 'morning', label: 'Morning (9am-12pm)' },
        { value: 'afternoon', label: 'Afternoon (12pm-4pm)' },
        { value: 'evening', label: 'Evening (4pm-8pm)' },
      ],
    },
    assurance: {
      title: 'We only collect essentials',
      description:
        'Share just enough information for us to prepare your personalised roadmap. IC copies and supporting documents are only requested later via WhatsApp.',
      bullets: [
        'Contact + income details are stored securely',
        'No sensitive documents uploaded through the site',
        'Full PDPA compliance with encrypted submissions',
      ],
    },
    insights: {
      title: 'Your application snapshot',
      income: 'Monthly income',
      loanAsk: 'Loan amount requested',
      dsr: 'Estimated DSR',
      placeholder: 'Enter your income and loan amount to see a live DSR estimate.',
      ctosNote:
        'We will pull your CTOS & CCRIS reports to calculate your final DSR and approval chances. No need to key in your existing debts here.',
      status: {
        approved: 'Likely approved',
        conditional: 'Possible with adjustments',
        declined: 'DSR too high — consider a smaller amount',
      },
    },
    whatsappHelper: {
      title: 'Prefer WhatsApp?',
      description: 'Share screenshots, voice notes, or follow up questions directly with our consultant.',
      responseTime: 'Average reply < 10 minutes during business hours',
      button: 'Message on WhatsApp',
      subtext: 'We reference your application automatically once you say hello.',
    },
    toast: {
      fillRequired: 'Please fill in all required fields',
      enterIncome: 'Please enter your monthly income',
      success: 'Application submitted successfully!',
      error: 'Failed to submit application. Please try again.',
    },
    services: {
      '1': {
        name: 'Personal Loan',
        description: 'Quick cash for emergencies, medical bills, debt consolidation, or any personal needs',
        features: [
          'Loan up to RM100,000',
          'Flexible tenure 1-7 years',
          'Eligibility analysis within 24 hours',
          'Minimal documentation',
          'No collateral required',
          'Competitive rates from 4.88%',
          'Fixed monthly installments',
        ],
        spotlight: {
          quote: '"Bank approved RM80k in 5 days thanks to the WhatsApp prep list."',
          author: 'Nurul, Penang',
          faq: {
            question: 'How fast can funds be ready?',
            answer:
              'Once your documents are ready we can submit to our partner banks within the same day. Approval timelines depend on the bank and documentation completeness.',
          },
        },
      },
      '2': {
        name: 'Car Loan',
        description: 'Finance your dream car with competitive rates and flexible repayment terms',
        features: ['New & used car financing', 'Up to 90% financing', 'Tenure up to 9 years', 'Competitive rates', 'Fast analysis'],
        spotlight: {
          quote: '"Dealer needed an answer within 2 days — GURU Credits delivered."',
          author: 'Hafiz, Shah Alam',
          faq: {
            question: 'Can you work with dealer promotions?',
            answer:
              'Yes, we coordinate with your salesperson and highlight the banks that match your profile so you can lock in the promotion before it expires.',
          },
        },
      },
      '3': {
        name: 'Home Loan',
        description: 'Make your dream home a reality with our home financing solutions',
        features: ['Up to 90% financing', 'Tenure up to 35 years', 'Competitive rates', 'Flexible repayment', 'Free consultation'],
        spotlight: {
          quote: '"Helped me restructure commitments so the bank approved RM450k."',
          author: 'Melissa, Johor Bahru',
          faq: {
            question: 'Do you assist first-time buyers?',
            answer:
              'Absolutely. We map DSR limits, suggest banks for your income segment, and prep the document checklist so valuation and legal work start quickly.',
          },
        },
      },
      '4': {
        name: 'Business Loan',
        description: 'Grow your business with our flexible financing options for SMEs',
        features: ['Working capital', 'Equipment financing', 'Business expansion', 'Flexible terms', 'Quick processing'],
        spotlight: {
          quote: '"Secured RM300k working capital without leaving the shop."',
          author: 'Jason, Klang',
          faq: {
            question: 'What if my accounts are basic?',
            answer:
              'We guide you on the minimum docs (bank statements, management accounts) and liaise with lenders that support SMEs with simple bookkeeping.',
          },
        },
      },
    },
  },
  ms: {
    backToServices: 'Kembali ke Perkhidmatan',
    notFound: {
      title: 'Perkhidmatan Tidak Dijumpai',
      description: 'Perkhidmatan yang anda cari tidak wujud.',
    },
    steps: {
      personalInfo: 'Semakan Pantas',
      employment: 'Butiran Hubungan',
      review: 'Semakan',
    },
    stepTitles: {
      personalInfo: 'Semakan Kelayakan Pantas',
      employment: 'Butiran Hubungan & Kerja',
      review: 'Semak & Hantar',
    },
    stepDescriptions: {
      personalInfo: 'Berikan negeri, pendapatan, dan jumlah pinjaman dahulu',
      employment: 'Tambah butiran hubungan supaya perunding kami boleh hubungi anda',
      review: 'Semak maklumat anda sebelum menghantar',
    },
    stepIntro:
      'Mula dengan maklumat yang paling penting: negeri, pendapatan bersih bulanan, dan jumlah pinjaman yang anda perlukan.',
    progress: { step: 'Langkah', of: 'daripada' },
    a11y: {
      stepsList: 'Langkah permohonan',
      validPhone: 'Telefon sah',
      validEmail: 'E-mel sah',
    },
    form: {
      fullName: 'Nama Penuh (seperti dalam IC)',
      fullNamePlaceholder: 'Nama penuh anda',
      email: 'Alamat E-mel',
      emailPlaceholder: 'anda@email.com',
      emailNote: 'Kami akan hantar laporan analisis ke e-mel ini',
      phone: 'Nombor Telefon',
      serviceArea: {
        label: 'Anda tinggal di mana?',
        helper: 'Kami membantu peminjam di seluruh Malaysia termasuk Sabah dan Sarawak.',
      },
      employmentType: 'Jenis Pekerjaan',
      employed: 'Bekerja',
      selfEmployed: 'Bekerja Sendiri',
      business: 'Pemilik Perniagaan',
      freelance: 'Bebas',
      companyName: 'Nama Syarikat / Perniagaan',
      companyPlaceholder: 'Nama syarikat',
      jobTitle: 'Jawatan / Posisi',
      jobPlaceholder: 'Posisi anda',
      monthlyIncome: 'Pendapatan Bersih Bulanan (RM)',
      incomeNote: 'Gaji bersih anda selepas semua potongan',
      validIncome: 'Sila masukkan pendapatan bulanan yang sah',
      desiredAmount: 'Jumlah Pinjaman Dikehendaki (RM)',
      desiredAmountNote: 'Berapa jumlah yang anda ingin pinjam?',
      validLoanAmount: 'Sila masukkan jumlah pinjaman yang sah',
    },
    reviewSection: {
      personalInfo: 'Maklumat Peribadi',
      employmentDetails: 'Pekerjaan & Pinjaman',
      name: 'Nama',
      email: 'E-mel',
      phone: 'Telefon',
      serviceArea: 'Kawasan Perkhidmatan',
      type: 'Jenis',
      company: 'Syarikat',
      income: 'Pendapatan',
      desiredAmount: 'Jumlah Pinjaman',
    },
    security: {
      title: 'Data anda selamat',
      description: 'Kami melindungi maklumat anda mengikut garis panduan PDPA. Data anda hanya akan digunakan untuk analisis ini.',
    },
    navigation: {
      back: 'Kembali',
      next: 'Seterusnya',
      submit: 'Hantar Permohonan',
    },
    sidebar: {
      selectedService: 'Pinjaman Dipilih',
      analysisFee: 'Yuran Analisis Kelayakan',
      oneTime: 'sekali',
      loanRate: 'Kadar Pinjaman',
      rateNote: 'kadar rata setahun',
      paymentNote:
        'RM30 hanya dikutip selepas penghantaran melalui chat WhatsApp rasmi kami. Tunggu perunding berkongsi pautan pembayaran – tiada bayaran berlaku di laman web ini.',
      turnaround: 'Pemprosesan 24 Jam',
      turnaroundDesc: 'Keputusan dihantar pantas',
      confidential: '100% Sulit',
      confidentialDesc: 'Data anda selamat',
      needHelp: 'Perlukan bantuan?',
      chatWhatsApp: 'Sembang dengan kami di WhatsApp',
    },
    quickQuestions: {
      contactPreference: 'Masa WhatsApp pilihan anda',
      contactNote: 'Kami akan cuba hubungi anda dalam tempoh ini.',
      options: [
        { value: 'any', label: 'Bila-bila masa' },
        { value: 'morning', label: 'Pagi (9am-12pm)' },
        { value: 'afternoon', label: 'Petang (12pm-4pm)' },
        { value: 'evening', label: 'Malam (4pm-8pm)' },
      ],
    },
    assurance: {
      title: 'Hanya maklumat asas diperlukan',
      description:
        'Kongsi maklumat minimum untuk kami sediakan pelan anda. Salinan IC dan dokumen sokongan hanya diminta kemudian melalui WhatsApp.',
      bullets: [
        'Butiran hubungan + pendapatan disimpan dengan selamat',
        'Tiada dokumen sensitif dimuat naik melalui laman web',
        'Patuh PDPA dengan penghantaran disulitkan',
      ],
    },
    insights: {
      title: 'Ringkasan permohonan anda',
      income: 'Pendapatan bulanan',
      loanAsk: 'Jumlah pinjaman dikehendaki',
      dsr: 'Anggaran DSR',
      placeholder: 'Masukkan pendapatan dan jumlah pinjaman untuk lihat anggaran DSR secara langsung.',
      ctosNote:
        'Kami akan tarik laporan CTOS & CCRIS untuk mengira DSR akhir dan peluang kelulusan anda. Tidak perlu isikan hutang sedia ada di sini.',
      status: {
        approved: 'Berkemungkinan diluluskan',
        conditional: 'Mungkin dengan pelarasan',
        declined: 'DSR terlalu tinggi — pertimbangkan jumlah lebih kecil',
      },
    },
    whatsappHelper: {
      title: 'Lebih suka WhatsApp?',
      description: 'Kongsi tangkapan skrin, nota suara atau soalan susulan terus dengan perunding kami.',
      responseTime: 'Masa balas purata < 10 minit pada waktu pejabat',
      button: 'Hubungi di WhatsApp',
      subtext: 'Sebut sahaja permohonan anda, kami terus jejak secara automatik.',
    },
    toast: {
      fillRequired: 'Sila isi semua ruangan yang diperlukan',
      enterIncome: 'Sila masukkan pendapatan bulanan anda',
      success: 'Permohonan berjaya dihantar!',
      error: 'Gagal menghantar permohonan. Sila cuba lagi.',
    },
    services: {
      '1': {
        name: 'Pinjaman Peribadi',
        description: 'Wang tunai cepat untuk kecemasan, bil perubatan, penyatuan hutang, atau keperluan peribadi',
        features: [
          'Pinjaman sehingga RM100,000',
          'Tempoh fleksibel 1-7 tahun',
          'Kelulusan pantas dalam 24 jam',
          'Dokumentasi minimum',
          'Tiada cagaran diperlukan',
          'Kadar kompetitif dari 4.88%',
          'Ansuran bulanan tetap',
        ],
        spotlight: {
          quote: '"RM80k lulus dalam 5 hari dengan senarai semak WhatsApp mereka."',
          author: 'Nurul, Pulau Pinang',
          faq: {
            question: 'Berapa cepat saya boleh terima wang?',
            answer:
              'Jika dokumen siap, kami hantar kepada bank rakan pada hari yang sama dan kebanyakan kelulusan diterima dalam 24–48 jam.',
          },
        },
      },
      '2': {
        name: 'Pinjaman Kereta',
        description: 'Biayai kereta impian anda dengan kadar kompetitif dan terma pembayaran fleksibel',
        features: ['Pembiayaan kereta baru & terpakai', 'Pembiayaan sehingga 90%', 'Tempoh sehingga 9 tahun', 'Kadar kompetitif', 'Kelulusan pantas'],
        spotlight: {
          quote: '"Perlu jawapan dalam 2 hari — GURU Credits uruskan semuanya."',
          author: 'Hafiz, Shah Alam',
          faq: {
            question: 'Boleh ke kami guna promosi pengedar?',
            answer:
              'Ya, kami selaras dengan jurujual anda dan cadangkan bank yang sesuai supaya promosi kereta boleh dikunci sebelum tamat.',
          },
        },
      },
      '3': {
        name: 'Pinjaman Rumah',
        description: 'Jadikan rumah impian anda kenyataan dengan penyelesaian pembiayaan rumah kami',
        features: ['Pembiayaan sehingga 90%', 'Tempoh sehingga 35 tahun', 'Kadar kompetitif', 'Pembayaran balik fleksibel', 'Konsultasi percuma'],
        spotlight: {
          quote: '"Bantu saya susun semula komitmen sehingga bank lulus RM450k."',
          author: 'Melissa, Johor Bahru',
          faq: {
            question: 'Adakah anda membantu pembeli rumah pertama?',
            answer:
              'Sudah tentu. Kami kira had DSR, cadang bank ikut segmen pendapatan, dan sediakan senarai dokumen supaya proses nilaian & guaman berjalan pantas.',
          },
        },
      },
      '4': {
        name: 'Pinjaman Perniagaan',
        description: 'Kembangkan perniagaan anda dengan pilihan pembiayaan fleksibel untuk PKS',
        features: ['Modal kerja', 'Pembiayaan peralatan', 'Pengembangan perniagaan', 'Terma fleksibel', 'Pemprosesan pantas'],
        spotlight: {
          quote: '"RM300k modal kerja lulus tanpa perlu tinggalkan kedai."',
          author: 'Jason, Klang',
          faq: {
            question: 'Macam mana jika akaun saya ringkas?',
            answer:
              'Kami tunjuk dokumen minimum (penyata bank, akaun pengurusan) dan hubungkan dengan pemberi pinjaman yang mesra PKS.',
          },
        },
      },
    },
  },
};
