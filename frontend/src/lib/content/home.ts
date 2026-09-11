import type { Language } from '@/lib/i18n/translations';
import { PATHS } from '@/lib/i18n/routes';

export type HomeContent = {
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lede: string;
    primaryCta: string;
    secondaryCta: string;
    trustLine: string;
    logosLabel: string;
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    lede: string;
    steps: { title: string; description: string }[];
    deliverablesTitle: string;
    deliverables: { title: string; description: string }[];
  };
  products: {
    eyebrow: string;
    title: string;
    lede: string;
    cta: string;
    items: { title: string; description: string; href: string }[];
  };
  calculator: {
    eyebrow: string;
    title: string;
    lede: string;
    tabs: { estimate: string; reference: string };
    reference: { title: string; amountHeader: string; yearsAbbr: string; perMonth: string; note: string };
  };
  proof: {
    eyebrow: string;
    title: string;
    points: { title: string; description: string }[];
    casesTitle: string;
    labels: { situation: string; action: string; outcome: string };
    cases: { name: string; location: string; situation: string; action: string; outcome: string; quote: string }[];
    disclaimer: string;
  };
  transparency: {
    eyebrow: string;
    title: string;
    items: { title: string; description: string; href: string; cta: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    viewAll: string;
    items: { question: string; answer: string }[];
  };
  cta: {
    title: string;
    lede: string;
    primary: string;
    secondary: string;
    note: string;
  };
};

export const homeContent: Record<Language, HomeContent> = {
  en: {
    hero: {
      eyebrow: 'Licensed lender · Moneylenders Act 1951',
      title: 'Know if you will be approved',
      titleAccent: 'before you apply.',
      lede: 'A two-minute check of your income, commitments and CCRIS/CTOS position. We tell you the workable route, in writing, within 24 hours.',
      primaryCta: 'Start the 2-minute check',
      secondaryCta: 'WhatsApp an advisor',
      trustLine: 'No payment on this website. The RM30 CTOS fee is settled only through our official WhatsApp.',
      logosLabel: 'Lenders we work with',
    },
    howItWorks: {
      eyebrow: 'How it works',
      title: 'Three steps. One written answer.',
      lede: 'You share your numbers, we read your file the way a credit officer would, and you get a plan you can act on.',
      steps: [
        { title: 'Share four details', description: 'WhatsApp number, state, loan type and income band. Two minutes, no documents yet.' },
        { title: 'We read your file', description: 'DSR recalculated, CCRIS and CTOS signals interpreted, lender fit assessed. Written up within 24 hours.' },
        { title: 'Get your route', description: 'A suggested amount range, the documents to send first, and next steps on our official WhatsApp.' },
      ],
      deliverablesTitle: 'Within 48 hours you have',
      deliverables: [
        { title: 'Written eligibility review', description: 'Profile snapshot, DSR, and the issues most likely to affect approval.' },
        { title: 'Priority document checklist', description: 'What to send first, what can wait, and what would slow the case down.' },
        { title: 'Suggested route and range', description: 'The product and amount that look workable for your commitment level.' },
      ],
    },
    products: {
      eyebrow: 'Loan products',
      title: 'Structured around your credit file.',
      lede: 'Rates within statutory caps. Tenure from one to seven years. Every offer comes with the reasoning behind it.',
      cta: 'Learn more',
      items: [
        { title: 'Personal Loan', description: 'Medical bills, short-term cash flow, or planned household spending. Up to RM100,000.', href: PATHS.loans.personal },
        { title: 'Business Loan', description: 'Working capital and expansion financing for SMEs. Bank-statement based, no audited accounts needed.', href: PATHS.services },
        { title: 'Debt Consolidation', description: 'Combine high-interest debts into one payment and bring your DSR down before you apply.', href: PATHS.loans.debtConsolidation },
      ],
    },
    calculator: {
      eyebrow: 'Calculator',
      title: 'See your DSR before the bank does.',
      lede: 'Enter income and commitments. Results update live. Nothing is stored.',
      tabs: { estimate: 'Your estimate', reference: 'Payment reference' },
      reference: {
        title: 'Monthly instalment at 4.88% flat p.a.',
        amountHeader: 'Loan amount',
        yearsAbbr: 'yrs',
        perMonth: '/month',
        note: 'Reference only. Figures rounded to the nearest RM; processing, stamp duty and insurance not included. Your actual offer depends on your profile and DSR.',
      },
    },
    proof: {
      eyebrow: 'Why us',
      title: 'Four things we do that brokers cannot.',
      points: [
        { title: 'You borrow from the lender', description: 'Licensed under the Moneylenders Act 1951. No middleman, no commission chasing.' },
        { title: 'Every report comes with analysis', description: 'The RM30 CTOS pull is paired with a written CCRIS read, a DSR recalculation and a structured offer.' },
        { title: 'We say no upfront', description: 'If we cannot approve you, you hear it in writing within 24 hours, not after a silent two-week wait.' },
        { title: 'Tracked by reference number', description: 'Every case has a reference. If we miss the 24-hour mark, we flag it to you first.' },
      ],
      casesTitle: 'Anonymised cases from the past 12 months',
      labels: { situation: 'The problem', action: 'What we changed', outcome: 'Outcome' },
      cases: [
        {
          name: 'Rajesh K.',
          location: 'Shah Alam, Selangor',
          situation: 'Two late markers from 2023. Rejected by two banks for a home loan in the same month.',
          action: 'Matched the file to a lender that scores aged markers differently and rebuilt the submission pack.',
          outcome: 'RM420,000 approved in 11 business days',
          quote: 'I thought I had to wait another year for those markers to age off.',
        },
        {
          name: 'Tan W.M.',
          location: 'George Town, Penang',
          situation: 'Four-year F&B business needing working capital. Three banks asked for audited accounts she did not have.',
          action: 'Reworked the file around bank statements and tax records and dropped audit-heavy lenders.',
          outcome: 'RM180,000 approved in 9 business days',
          quote: 'Nobody had told me some banks do not need audited accounts at my stage.',
        },
        {
          name: 'Nurul H.',
          location: 'Johor Bahru, Johor',
          situation: 'DSR at 74% from three credit cards and a car loan. Personal loan declined twice.',
          action: 'Consolidated the cards into one facility first, bringing DSR to 52%, then applied.',
          outcome: 'RM45,000 approved, monthly commitments down RM610',
          quote: 'The consolidation step was the part I would never have figured out alone.',
        },
      ],
      disclaimer: 'Names changed, numbers kept. Outcomes depend on individual profiles and are not a guarantee.',
    },
    transparency: {
      eyebrow: 'Transparency',
      title: 'Check us before you send anything.',
      items: [
        { title: 'Rate disclosure', description: 'Personal loans from 4.88% flat p.a., business from 5.50% effective. Indicative; your rate depends on your profile.', href: PATHS.loans.personal, cta: 'See rates' },
        { title: 'Risk warning', description: 'Approval is subject to assessment. Late repayment affects your credit score and incurs fees. Borrow only what you can service.', href: PATHS.disclaimer, cta: 'Read disclaimer' },
        { title: 'Verify us', description: 'Registered address, official channels and licensing route. Check them before sharing documents or money.', href: PATHS.verifyUs, cta: 'Verify us' },
        { title: 'PDPA and documents', description: 'Documents are requested only through official WhatsApp, reviewed securely and never shared without consent.', href: PATHS.privacy, cta: 'Privacy policy' },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Common questions',
      viewAll: 'View all questions',
      items: [
        { question: 'What types of loans do you offer?', answer: 'We are a licensed money lender under the Moneylenders Act 1951 offering personal loans, business financing for SMEs, and debt consolidation. Approval depends on your credit profile and documentation.' },
        { question: 'How long does the review take?', answer: 'Your written eligibility review is usually ready within 24 hours. Bank timelines vary by lender and by how complete your documents are.' },
        { question: 'What documents do I need?', answer: 'IC copy, latest three months of salary slips, bank statements, and an employment letter. We send a checklist and flag anything extra for your loan type.' },
        { question: 'What is the RM30 fee for?', answer: 'It covers the CTOS credit report pull, a cost passed through to the agency. Our analysis and loan structuring are included. It is collected only through our official WhatsApp after we confirm your details, never on this website.' },
        { question: 'Does the check affect my credit score?', answer: 'No. The two-minute check uses only the details you type in and does not touch CCRIS or CTOS. A credit report is pulled later, only with your consent.' },
        { question: 'Do you serve Sabah and Sarawak?', answer: 'Yes. Applications are open across all 13 states and 3 federal territories, including Sabah, Sarawak and Labuan.' },
      ],
    },
    cta: {
      title: 'Get a written answer before you send documents.',
      lede: 'Start with four details. We reply on official WhatsApp with the likely route, the blockers, and what to prepare.',
      primary: 'Start the 2-minute check',
      secondary: 'WhatsApp us',
      note: 'No payment on this website. Next steps are explained on official WhatsApp.',
    },
  },
  ms: {
    hero: {
      eyebrow: 'Pemberi pinjaman berlesen · Akta Pemberi Pinjam Wang 1951',
      title: 'Tahu sama ada anda akan diluluskan',
      titleAccent: 'sebelum memohon.',
      lede: 'Semakan dua minit ke atas pendapatan, komitmen dan kedudukan CCRIS/CTOS anda. Kami beritahu laluan yang sesuai, secara bertulis, dalam 24 jam.',
      primaryCta: 'Mula semakan 2 minit',
      secondaryCta: 'WhatsApp perunding',
      trustLine: 'Tiada bayaran di laman web ini. Yuran CTOS RM30 diselesaikan hanya melalui WhatsApp rasmi kami.',
      logosLabel: 'Pemberi pinjaman yang kami kerjasama',
    },
    howItWorks: {
      eyebrow: 'Cara ia berfungsi',
      title: 'Tiga langkah. Satu jawapan bertulis.',
      lede: 'Anda kongsi angka, kami baca fail anda seperti pegawai kredit, dan anda dapat pelan yang boleh diambil tindakan.',
      steps: [
        { title: 'Kongsi empat butiran', description: 'Nombor WhatsApp, negeri, jenis pinjaman dan julat pendapatan. Dua minit, tiada dokumen lagi.' },
        { title: 'Kami baca fail anda', description: 'DSR dikira semula, isyarat CCRIS dan CTOS ditafsir, kesesuaian pemberi pinjaman dinilai. Bertulis dalam 24 jam.' },
        { title: 'Dapatkan laluan anda', description: 'Julat jumlah yang dicadangkan, dokumen untuk dihantar dahulu, dan langkah seterusnya di WhatsApp rasmi kami.' },
      ],
      deliverablesTitle: 'Dalam 48 jam anda ada',
      deliverables: [
        { title: 'Semakan kelayakan bertulis', description: 'Gambaran profil, DSR, dan isu yang paling mungkin menjejaskan kelulusan.' },
        { title: 'Senarai dokumen keutamaan', description: 'Apa yang perlu dihantar dahulu, apa yang boleh tunggu, dan apa yang akan melambatkan kes.' },
        { title: 'Laluan dan julat dicadangkan', description: 'Produk dan jumlah yang nampak sesuai untuk tahap komitmen anda.' },
      ],
    },
    products: {
      eyebrow: 'Produk pinjaman',
      title: 'Distrukturkan ikut fail kredit anda.',
      lede: 'Kadar dalam had berkanun. Tempoh satu hingga tujuh tahun. Setiap tawaran disertakan dengan alasannya.',
      cta: 'Ketahui lebih lanjut',
      items: [
        { title: 'Pinjaman Peribadi', description: 'Bil perubatan, aliran tunai jangka pendek, atau perbelanjaan rumah yang dirancang. Sehingga RM100,000.', href: PATHS.loans.personal },
        { title: 'Pinjaman Perniagaan', description: 'Modal kerja dan pembiayaan pengembangan untuk PKS. Berasaskan penyata bank, tiada akaun beraudit diperlukan.', href: PATHS.services },
        { title: 'Penyatuan Hutang', description: 'Gabungkan hutang faedah tinggi menjadi satu bayaran dan turunkan DSR sebelum memohon.', href: PATHS.loans.debtConsolidation },
      ],
    },
    calculator: {
      eyebrow: 'Kalkulator',
      title: 'Lihat DSR anda sebelum bank melihatnya.',
      lede: 'Masukkan pendapatan dan komitmen. Keputusan dikemas kini serta-merta. Tiada data disimpan.',
      tabs: { estimate: 'Anggaran anda', reference: 'Rujukan bayaran' },
      reference: {
        title: 'Ansuran bulanan pada kadar rata 4.88% setahun',
        amountHeader: 'Jumlah pinjaman',
        yearsAbbr: 'thn',
        perMonth: '/bulan',
        note: 'Rujukan sahaja. Angka dibundarkan ke RM terdekat; yuran pemprosesan, duti setem dan insurans tidak termasuk. Tawaran sebenar bergantung pada profil dan DSR anda.',
      },
    },
    proof: {
      eyebrow: 'Kenapa kami',
      title: 'Empat perkara yang broker tidak boleh buat.',
      points: [
        { title: 'Anda pinjam terus daripada pemberi pinjaman', description: 'Berlesen di bawah Akta Pemberi Pinjam Wang 1951. Tiada orang tengah, tiada kejar komisen.' },
        { title: 'Setiap laporan disertakan analisis', description: 'Tarikan CTOS RM30 digandingkan dengan bacaan CCRIS bertulis, pengiraan semula DSR dan tawaran berstruktur.' },
        { title: 'Kami kata tidak lebih awal', description: 'Jika kami tidak boleh luluskan, anda tahu secara bertulis dalam 24 jam, bukan selepas menunggu dua minggu tanpa jawapan.' },
        { title: 'Dijejak dengan nombor rujukan', description: 'Setiap kes ada rujukan. Jika kami terlepas tempoh 24 jam, kami maklumkan anda dahulu.' },
      ],
      casesTitle: 'Kes tanpa nama dari 12 bulan lepas',
      labels: { situation: 'Masalahnya', action: 'Apa yang kami ubah', outcome: 'Keputusan' },
      cases: [
        {
          name: 'Rajesh K.',
          location: 'Shah Alam, Selangor',
          situation: 'Dua penanda lewat dari 2023. Ditolak oleh dua bank untuk pinjaman rumah pada bulan yang sama.',
          action: 'Padankan fail dengan pemberi pinjaman yang menilai penanda lama secara berbeza dan bina semula pakej penyerahan.',
          outcome: 'RM420,000 diluluskan dalam 11 hari bekerja',
          quote: 'Saya sangka perlu tunggu setahun lagi untuk penanda itu hilang.',
        },
        {
          name: 'Tan W.M.',
          location: 'George Town, Pulau Pinang',
          situation: 'Perniagaan F&B empat tahun perlukan modal kerja. Tiga bank minta akaun beraudit yang beliau belum ada.',
          action: 'Susun semula fail berdasarkan penyata bank dan rekod cukai, gugurkan pemberi pinjaman yang mewajibkan audit.',
          outcome: 'RM180,000 diluluskan dalam 9 hari bekerja',
          quote: 'Tiada siapa beritahu saya sesetengah bank tidak perlukan akaun beraudit pada peringkat saya.',
        },
        {
          name: 'Nurul H.',
          location: 'Johor Bahru, Johor',
          situation: 'DSR pada 74% daripada tiga kad kredit dan pinjaman kereta. Pinjaman peribadi ditolak dua kali.',
          action: 'Satukan kad kredit ke dalam satu kemudahan dahulu, DSR turun ke 52%, kemudian mohon.',
          outcome: 'RM45,000 diluluskan, komitmen bulanan turun RM610',
          quote: 'Langkah penyatuan itu yang saya takkan fikirkan sendiri.',
        },
      ],
      disclaimer: 'Nama ditukar, angka dikekalkan. Keputusan bergantung pada profil individu dan bukan jaminan.',
    },
    transparency: {
      eyebrow: 'Ketelusan',
      title: 'Semak kami sebelum hantar apa-apa.',
      items: [
        { title: 'Pendedahan kadar', description: 'Pinjaman peribadi dari 4.88% rata setahun, perniagaan dari 5.50% efektif. Indikatif; kadar anda bergantung pada profil.', href: PATHS.loans.personal, cta: 'Lihat kadar' },
        { title: 'Amaran risiko', description: 'Kelulusan tertakluk kepada penilaian. Bayaran lewat menjejaskan skor kredit dan dikenakan caj. Pinjam hanya yang anda mampu bayar.', href: PATHS.disclaimer, cta: 'Baca penafian' },
        { title: 'Sahkan kami', description: 'Alamat berdaftar, saluran rasmi dan laluan pelesenan. Semak sebelum berkongsi dokumen atau wang.', href: PATHS.verifyUs, cta: 'Sahkan kami' },
        { title: 'PDPA dan dokumen', description: 'Dokumen diminta hanya melalui WhatsApp rasmi, disemak dengan selamat dan tidak dikongsi tanpa kebenaran.', href: PATHS.privacy, cta: 'Dasar privasi' },
      ],
    },
    faq: {
      eyebrow: 'Soalan lazim',
      title: 'Soalan yang kerap ditanya',
      viewAll: 'Lihat semua soalan',
      items: [
        { question: 'Apakah jenis pinjaman yang anda tawarkan?', answer: 'Kami pemberi pinjam wang berlesen di bawah Akta Pemberi Pinjam Wang 1951 yang menawarkan pinjaman peribadi, pembiayaan perniagaan untuk PKS, dan penyatuan hutang. Kelulusan bergantung pada profil kredit dan dokumen anda.' },
        { question: 'Berapa lama semakan mengambil masa?', answer: 'Semakan kelayakan bertulis anda biasanya siap dalam 24 jam. Tempoh bank berbeza mengikut pemberi pinjaman dan kelengkapan dokumen anda.' },
        { question: 'Apakah dokumen yang saya perlukan?', answer: 'Salinan IC, slip gaji tiga bulan terkini, penyata bank, dan surat pengesahan majikan. Kami hantar senarai semak dan maklumkan jika ada tambahan untuk jenis pinjaman anda.' },
        { question: 'Yuran RM30 itu untuk apa?', answer: 'Ia meliputi tarikan laporan kredit CTOS, kos yang disalurkan kepada agensi. Analisis dan penstrukturan pinjaman kami sudah termasuk. Ia dikutip hanya melalui WhatsApp rasmi selepas kami sahkan butiran anda, bukan di laman web ini.' },
        { question: 'Adakah semakan ini menjejaskan skor kredit saya?', answer: 'Tidak. Semakan dua minit hanya menggunakan butiran yang anda taip dan tidak menyentuh CCRIS atau CTOS. Laporan kredit ditarik kemudian, hanya dengan kebenaran anda.' },
        { question: 'Adakah anda berkhidmat di Sabah dan Sarawak?', answer: 'Ya. Permohonan dibuka di semua 13 negeri dan 3 wilayah persekutuan, termasuk Sabah, Sarawak dan Labuan.' },
      ],
    },
    cta: {
      title: 'Dapatkan jawapan bertulis sebelum hantar dokumen.',
      lede: 'Mula dengan empat butiran. Kami balas di WhatsApp rasmi dengan laluan yang mungkin, halangan, dan apa yang perlu disediakan.',
      primary: 'Mula semakan 2 minit',
      secondary: 'WhatsApp kami',
      note: 'Tiada bayaran di laman web ini. Langkah seterusnya diterangkan di WhatsApp rasmi.',
    },
  },
};
