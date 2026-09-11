export type LoanType = 'personal' | 'car' | 'home' | 'business';
export type DocumentCategory = 'identity' | 'income' | 'employment' | 'financial' | 'property' | 'vehicle' | 'registration';

export interface DocumentItem {
  name: string;
  required: boolean;
  note: string;
}

export const documentsUi = {
  en: {
    breadcrumbHome: 'Home',
    breadcrumbDocuments: 'Documents',
    title: 'Document Checklist',
    subtitle: 'Prepare your documents for a faster bank decision process',
    lede: 'Having all required documents ready can speed up your loan application by up to 50%. Use our interactive checklists to ensure you have everything prepared.',
    applyNow: 'Apply Now',
    required: 'Required',
    optional: 'Optional',
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
    selfEmployed: {
      title: 'Self-Employed? Additional Documents Needed',
      description: 'If you are self-employed or a business owner in Malaysia, please prepare the following supporting items.',
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
    breadcrumbHome: 'Utama',
    breadcrumbDocuments: 'Dokumen',
    title: 'Senarai Semak Dokumen',
    subtitle: 'Sediakan dokumen anda untuk proses keputusan bank yang lebih cepat',
    lede: 'Mempunyai semua dokumen yang diperlukan boleh mempercepatkan permohonan pinjaman anda sehingga 50%. Gunakan senarai semak interaktif kami untuk memastikan anda telah menyediakan semuanya.',
    applyNow: 'Mohon Sekarang',
    required: 'Diperlukan',
    optional: 'Pilihan',
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
    selfEmployed: {
      title: 'Bekerja Sendiri? Dokumen Tambahan Diperlukan',
      description: 'Jika anda bekerja sendiri atau pemilik perniagaan di Malaysia, sila sediakan dokumen sokongan berikut.',
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
} as const;

export const documentsData: Record<LoanType, { en: Partial<Record<DocumentCategory, DocumentItem[]>>; ms: Partial<Record<DocumentCategory, DocumentItem[]>> }> = {
  personal: {
    en: {
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
    ms: {
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
  },
  car: {
    en: {
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
    ms: {
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
  },
  home: {
    en: {
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
    ms: {
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
  },
  business: {
    en: {
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
    ms: {
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
};

export const documentsTips: Record<LoanType, { en: string[]; ms: string[] }> = {
  personal: {
    en: [
      'Ensure all documents are clear and legible',
      'Payslips should show your name, company name, and breakdown',
      'Bank statements should show salary credits highlighted',
      'Keep documents within 3 months validity',
    ],
    ms: [
      'Pastikan semua dokumen jelas dan boleh dibaca',
      'Slip gaji perlu menunjukkan nama, nama syarikat, dan pecahan',
      'Penyata bank perlu menunjukkan kredit gaji ditandakan',
      'Pastikan dokumen dalam tempoh sah 3 bulan',
    ],
  },
  car: {
    en: [
      'Get multiple quotations for better negotiation',
      'Check vehicle insurance requirements beforehand',
      'For used cars, ensure PUSPAKOM inspection is recent',
      'Verify dealer is authorized for better loan rates',
    ],
    ms: [
      'Dapatkan beberapa sebut harga untuk rundingan lebih baik',
      'Semak keperluan insurans kenderaan terlebih dahulu',
      'Untuk kereta terpakai, pastikan pemeriksaan PUSPAKOM terkini',
      'Sahkan pengedar adalah sah untuk kadar pinjaman lebih baik',
    ],
  },
  home: {
    en: [
      'Start gathering documents before property booking',
      'Joint applications can increase approval chances',
      'Keep all property documents organized by date',
      'Understand the SPA terms before signing',
    ],
    ms: [
      'Mulakan mengumpul dokumen sebelum tempahan hartanah',
      'Permohonan bersama boleh meningkatkan peluang kelulusan',
      'Simpan semua dokumen hartanah tersusun mengikut tarikh',
      'Fahami terma SPA sebelum menandatangani',
    ],
  },
  business: {
    en: [
      'Ensure all SSM documents are up to date',
      'Maintain clean and organized financial records',
      'Prepare a clear business justification for the loan',
      'Have latest management accounts ready',
    ],
    ms: [
      'Pastikan semua dokumen SSM dikemas kini',
      'Kekalkan rekod kewangan yang kemas dan tersusun',
      'Sediakan justifikasi perniagaan yang jelas untuk pinjaman',
      'Sediakan akaun pengurusan terkini',
    ],
  },
};

export const documentsMistakes: Record<LoanType, { en: string[]; ms: string[] }> = {
  personal: {
    en: [
      'Submitting blurry or incomplete documents',
      'Payslips without company stamp or signature',
      'Bank statements with missing pages',
      'Expired employment letters',
    ],
    ms: [
      'Menghantar dokumen kabur atau tidak lengkap',
      'Slip gaji tanpa cop atau tandatangan syarikat',
      'Penyata bank dengan halaman hilang',
      'Surat pekerjaan tamat tempoh',
    ],
  },
  car: {
    en: [
      'Not including all required vehicle documents',
      'Outdated insurance quotations',
      'Missing vehicle inspection reports',
      'Incomplete dealer information',
    ],
    ms: [
      'Tidak memasukkan semua dokumen kenderaan yang diperlukan',
      'Sebut harga insurans yang lapuk',
      'Laporan pemeriksaan kenderaan yang hilang',
      'Maklumat pengedar yang tidak lengkap',
    ],
  },
  home: {
    en: [
      'Incomplete SPA without all signatures',
      'Missing developer license verification',
      'Outdated property valuation',
      'Incorrect property specifications',
    ],
    ms: [
      'SPA tidak lengkap tanpa semua tandatangan',
      'Pengesahan lesen pemaju yang hilang',
      'Penilaian hartanah yang lapuk',
      'Spesifikasi hartanah yang salah',
    ],
  },
  business: {
    en: [
      'Unaudited financial statements when required',
      'Expired SSM documents',
      'Inconsistent figures across documents',
      'Missing director signatures',
    ],
    ms: [
      'Penyata kewangan tidak teraudit apabila diperlukan',
      'Dokumen SSM tamat tempoh',
      'Angka tidak konsisten antara dokumen',
      'Tandatangan pengarah yang hilang',
    ],
  },
};
