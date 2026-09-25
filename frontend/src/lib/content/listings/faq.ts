import { PATHS } from '@/lib/i18n/routes';

export type FaqCategoryId = 'eligibility' | 'documents' | 'fees' | 'credit' | 'process' | 'repayment' | 'security';

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
    lede: 'Find answers to common questions about eligibility, documents, fees, credit, the application process, repayment, and account security for borrowers across Malaysia.',
    highlights: [
      { title: 'Fast answers', description: 'Most topics covered in under 2 minutes.' },
      { title: 'Nationwide support', description: 'Guidance tailored to Malaysian borrowers, including Sabah, Sarawak, and Labuan.' },
      { title: 'PDPA compliant', description: 'We follow strict data protection practices.' },
    ],
    searchPlaceholder: 'Search for answers...',
    noResults: {
      title: 'No results found',
      description: "Try adjusting your search or filter to find what you're looking for.",
    },
    categories: {
      all: 'All Questions',
      eligibility: 'Eligibility',
      documents: 'Documents',
      fees: 'Fees & Rates',
      credit: 'Credit & CCRIS/CTOS',
      process: 'Application Process',
      repayment: 'Repayment',
      security: 'Security & Trust',
    },
    quickLinks: [
      { href: PATHS.services, title: 'Apply for a Loan', description: 'Quick and easy online application. Get a written review within 24 hours.', cta: 'Apply Now' },
      { href: PATHS.services, title: 'Loan Products', description: 'View our range of loan products with competitive rates.', cta: 'View Products' },
      { href: PATHS.about, title: 'About Us', description: 'Learn more about GURU Credits and our mission.', cta: 'Learn More' },
    ],
  },
  ms: {
    breadcrumbHome: 'Utama',
    breadcrumbFaq: 'Soalan Lazim',
    eyebrow: 'Pusat Bantuan',
    title: 'Soalan Lazim',
    lede: 'Cari jawapan tentang kelayakan, dokumen, yuran, kredit, proses permohonan, pembayaran balik, dan keselamatan akaun untuk peminjam di seluruh Malaysia.',
    highlights: [
      { title: 'Jawapan pantas', description: 'Kebanyakan topik selesai dalam masa 2 minit.' },
      { title: 'Sokongan seluruh negara', description: 'Panduan untuk peminjam Malaysia, termasuk Sabah, Sarawak, dan Labuan.' },
      { title: 'Patuh PDPA', description: 'Kami mematuhi amalan perlindungan data yang ketat.' },
    ],
    searchPlaceholder: 'Cari jawapan...',
    noResults: {
      title: 'Tiada hasil dijumpai',
      description: 'Cuba laraskan carian atau penapis anda untuk mencari apa yang anda cari.',
    },
    categories: {
      all: 'Semua Soalan',
      eligibility: 'Kelayakan',
      documents: 'Dokumen',
      fees: 'Yuran & Kadar',
      credit: 'Kredit & CCRIS/CTOS',
      process: 'Proses Permohonan',
      repayment: 'Pembayaran Balik',
      security: 'Keselamatan & Kepercayaan',
    },
    quickLinks: [
      { href: PATHS.services, title: 'Mohon Pinjaman', description: 'Permohonan dalam talian yang cepat dan mudah. Dapatkan ulasan bertulis dalam 24 jam.', cta: 'Mohon Sekarang' },
      { href: PATHS.services, title: 'Produk Pinjaman', description: 'Lihat rangkaian produk pinjaman kami dengan kadar kompetitif.', cta: 'Lihat Produk' },
      { href: PATHS.about, title: 'Tentang Kami', description: 'Ketahui lebih lanjut tentang GURU Credits dan misi kami.', cta: 'Ketahui Lebih Lanjut' },
    ],
  },
} as const;

export const faqItems: FaqItem[] = [
  // ── Eligibility ────────────────────────────────────────────────────────
  {
    category: 'eligibility',
    question: 'Who is eligible to apply for a loan through GURU Credits?',
    questionMs: 'Siapa yang layak memohon pinjaman melalui GURU Credits?',
    answer: 'You typically need to be a Malaysian citizen or permanent resident, aged 21–60, with a regular income. Requirements vary slightly by loan product and lender. We review your CCRIS/CTOS profile, income, and DSR before matching you to a licensed lender — meeting these basics does not guarantee approval, as each bank makes its own final decision.',
    answerMs: 'Anda biasanya perlu warganegara Malaysia atau pemastautin tetap, berumur 21–60 tahun, dan berpendapatan tetap. Keperluan berbeza sedikit mengikut produk dan pemberi pinjaman. Kami menyemak profil CCRIS/CTOS, pendapatan, dan DSR anda sebelum memadankan anda dengan pemberi pinjaman berlesen — memenuhi asas ini tidak menjamin kelulusan kerana keputusan akhir terletak pada bank.',
  },
  {
    category: 'eligibility',
    question: 'What is the minimum monthly salary required?',
    questionMs: 'Berapakah gaji bulanan minimum yang diperlukan?',
    answer: 'Minimum income requirements vary by product and lender, and are usually a few thousand ringgit a month for personal financing. Rather than quote one fixed figure that may not apply to your situation, we check your latest payslips or bank statements and tell you which lenders are a realistic fit for your income level.',
    answerMs: 'Keperluan pendapatan minimum berbeza mengikut produk dan pemberi pinjaman, biasanya beberapa ribu ringgit sebulan untuk pembiayaan peribadi. Daripada menyatakan satu angka tetap yang mungkin tidak sesuai untuk keadaan anda, kami menyemak slip gaji atau penyata bank terkini anda dan memberitahu pemberi pinjaman mana yang sesuai dengan tahap pendapatan anda.',
  },
  {
    category: 'eligibility',
    question: 'Is there an age limit to apply?',
    questionMs: 'Adakah terdapat had umur untuk memohon?',
    answer: 'Applicants are typically expected to be between 21 and 60 years old, though this can vary by lender and by product — some allow slightly older applicants if the loan matures before retirement age. We phrase this as "typically" because individual bank policies differ, and we will confirm the exact range for the product you are interested in.',
    answerMs: 'Pemohon biasanya perlu berumur antara 21 hingga 60 tahun, walaupun ini boleh berbeza mengikut pemberi pinjaman dan produk — sesetengah membenarkan pemohon lebih tua jika tempoh pinjaman tamat sebelum umur persaraan. Kami sebut "biasanya" kerana dasar setiap bank berbeza, dan kami akan sahkan julat tepat untuk produk yang anda minati.',
  },
  {
    category: 'eligibility',
    question: 'Can self-employed individuals apply?',
    questionMs: 'Bolehkah individu yang bekerja sendiri memohon?',
    answer: 'Yes. Self-employed applicants are welcome to apply nationwide. Because you do not have a salary slip, lenders instead rely on your recent bank statements and tax filings (such as your income tax return) to verify income. Having at least a year or two of consistent business banking activity generally strengthens your application.',
    answerMs: 'Ya. Pemohon yang bekerja sendiri dialu-alukan memohon di seluruh negara. Oleh kerana anda tiada slip gaji, pemberi pinjaman bergantung kepada penyata bank terkini dan penyata cukai (seperti penyata pemulangan cukai pendapatan) untuk mengesahkan pendapatan. Aktiviti perbankan perniagaan yang konsisten selama setahun dua umumnya menguatkan permohonan anda.',
  },
  {
    category: 'eligibility',
    question: 'Does commission or gig-economy income count?',
    questionMs: 'Adakah pendapatan komisen atau ekonomi gig dikira?',
    answer: 'Yes, commission-based and gig-economy income (such as e-hailing, delivery, or freelance work) can be considered, but it is generally treated like self-employed income — lenders will want to see consistent bank statements or platform payout records over a reasonable period, since this income can fluctuate more than a fixed salary.',
    answerMs: 'Ya, pendapatan berasaskan komisen dan ekonomi gig (seperti e-hailing, penghantaran, atau kerja bebas) boleh dipertimbangkan, tetapi biasanya dilayan seperti pendapatan bekerja sendiri — pemberi pinjaman mahukan penyata bank atau rekod bayaran platform yang konsisten dalam tempoh yang munasabah, kerana pendapatan ini boleh turun naik berbanding gaji tetap.',
  },
  {
    category: 'eligibility',
    question: 'Do you serve applicants in Sabah, Sarawak, and Labuan?',
    questionMs: 'Adakah anda melayani pemohon di Sabah, Sarawak, dan Labuan?',
    answer: 'Yes. Our service covers borrowers nationwide, including Sabah, Sarawak, and the Federal Territory of Labuan, in addition to Peninsular Malaysia. The application process is entirely online, so your location does not limit which lenders we can help you reach, subject to each lender\'s own coverage.',
    answerMs: 'Ya. Perkhidmatan kami meliputi peminjam di seluruh negara, termasuk Sabah, Sarawak, dan Wilayah Persekutuan Labuan, selain Semenanjung Malaysia. Proses permohonan sepenuhnya dalam talian, jadi lokasi anda tidak menghadkan pemberi pinjaman yang boleh kami bantu anda hubungi, tertakluk kepada liputan setiap pemberi pinjaman.',
  },

  // ── Documents ─────────────────────────────────────────────────────────
  {
    category: 'documents',
    question: 'What documents do I need to apply?',
    questionMs: 'Apakah dokumen yang diperlukan untuk memohon?',
    answer: 'Basic documents usually include a copy of your IC (front and back), recent salary slips, and recent bank statements. Exact requirements depend on the product and lender, and self-employed applicants need a different set. We will confirm the full checklist for your situation before you start uploading anything.',
    answerMs: 'Dokumen asas biasanya termasuk salinan IC (depan dan belakang), slip gaji terkini, dan penyata bank terkini. Keperluan tepat bergantung pada produk dan pemberi pinjaman, dan pemohon bekerja sendiri memerlukan set dokumen berbeza. Kami akan sahkan senarai semak penuh untuk keadaan anda sebelum anda mula memuat naik apa-apa.',
  },
  {
    category: 'documents',
    question: 'What extra documents do self-employed applicants need?',
    questionMs: 'Apakah dokumen tambahan yang diperlukan oleh pemohon bekerja sendiri?',
    answer: 'Self-employed applicants typically provide business registration documents, recent business or personal bank statements, and tax filings such as a Borang B or income tax return, in place of salary slips. These help lenders verify that your income is stable enough to support the loan you are requesting.',
    answerMs: 'Pemohon bekerja sendiri biasanya menyediakan dokumen pendaftaran perniagaan, penyata bank perniagaan atau peribadi terkini, dan penyata cukai seperti Borang B atau penyata pemulangan cukai pendapatan, sebagai ganti slip gaji. Ini membantu pemberi pinjaman mengesahkan pendapatan anda cukup stabil untuk menampung pinjaman yang dipohon.',
  },
  {
    category: 'documents',
    question: 'Can I apply with a joint applicant or guarantor?',
    questionMs: 'Bolehkah saya memohon dengan pemohon bersama atau penjamin?',
    answer: 'Some lenders allow a joint applicant or guarantor to strengthen an application, particularly where income alone may not fully meet DSR requirements. The guarantor or joint applicant will usually need to submit their own IC, income proof, and consent, and both parties should understand they share responsibility for repayment.',
    answerMs: 'Sesetengah pemberi pinjaman membenarkan pemohon bersama atau penjamin untuk menguatkan permohonan, terutamanya jika pendapatan sahaja tidak memenuhi keperluan DSR sepenuhnya. Penjamin atau pemohon bersama biasanya perlu mengemukakan IC, bukti pendapatan, dan persetujuan sendiri, dan kedua-dua pihak perlu faham mereka berkongsi tanggungjawab pembayaran balik.',
  },
  {
    category: 'documents',
    question: 'Do I need to submit my own CCRIS or CTOS report?',
    questionMs: 'Perlukah saya mengemukakan laporan CCRIS atau CTOS sendiri?',
    answer: 'You do not need to source your own CCRIS report — banks pull this directly during their assessment. We do, however, obtain a CTOS report as part of our review process, which carries a separate RM30 fee collected only via our official WhatsApp, never through the website, and only after we confirm your details with you.',
    answerMs: 'Anda tidak perlu mendapatkan laporan CCRIS sendiri — bank menariknya terus semasa penilaian mereka. Walau bagaimanapun, kami memperoleh laporan CTOS sebagai sebahagian daripada proses semakan kami, yang dikenakan yuran berasingan RM30 dan dikutip hanya melalui WhatsApp rasmi kami, tidak pernah melalui laman web, dan hanya selepas kami sahkan butiran anda.',
  },
  {
    category: 'documents',
    question: 'How recent do my bank statements need to be?',
    questionMs: 'Berapa terkinikah penyata bank saya perlu?',
    answer: 'Lenders generally want your most recent bank statements to confirm your current income and spending pattern, typically covering the last few months rather than a single month. We will tell you the exact window each lender wants once we know which product you are being matched to.',
    answerMs: 'Pemberi pinjaman umumnya mahukan penyata bank paling terkini untuk mengesahkan corak pendapatan dan perbelanjaan semasa anda, biasanya meliputi beberapa bulan terkini dan bukan sebulan sahaja. Kami akan beritahu anda tempoh tepat yang dikehendaki setiap pemberi pinjaman sebaik sahaja kami tahu produk yang dipadankan untuk anda.',
  },
  {
    category: 'documents',
    question: 'What if I don\'t have all the documents ready yet?',
    questionMs: 'Bagaimana jika saya belum mempunyai semua dokumen yang diperlukan?',
    answer: 'You can still start your application with what you have. Our team will let you know exactly what is missing and can guide you on where to obtain it, such as requesting an EA form from your employer or an EPF/KWSP statement online, so you are not left guessing.',
    answerMs: 'Anda masih boleh memulakan permohonan dengan apa yang anda ada. Pasukan kami akan memberitahu anda dengan tepat dokumen yang tiada dan boleh membimbing anda cara mendapatkannya, seperti memohon Borang EA daripada majikan atau penyata EPF/KWSP dalam talian, supaya anda tidak keliru.',
  },

  // ── Credit (CCRIS/CTOS/DSR) ───────────────────────────────────────────
  {
    category: 'credit',
    question: 'What is the difference between CCRIS and CTOS?',
    questionMs: 'Apakah perbezaan antara CCRIS dan CTOS?',
    answer: 'CCRIS is maintained by Bank Negara Malaysia and shows your credit facilities and repayment conduct as reported by banks. CTOS is a private credit reporting agency that can also include non-banking information such as legal records. Banks typically rely on CCRIS for lending decisions, while CTOS is used more broadly, including by us during review.',
    answerMs: 'CCRIS diselenggarakan oleh Bank Negara Malaysia dan menunjukkan kemudahan kredit serta tingkah laku pembayaran anda seperti dilaporkan oleh bank. CTOS pula agensi pelaporan kredit swasta yang turut merangkumi maklumat bukan perbankan seperti rekod undang-undang. Bank biasanya bergantung pada CCRIS untuk keputusan pinjaman, manakala CTOS digunakan lebih luas, termasuk oleh kami semasa semakan.',
  },
  {
    category: 'credit',
    question: 'How long do negative records stay on my CCRIS report?',
    questionMs: 'Berapa lamakah rekod negatif kekal dalam laporan CCRIS saya?',
    answer: 'Your CCRIS report shows the last 12 months of repayment conduct, so late payments generally roll off this rolling window over time as you keep paying on schedule. This does not mean older issues are irrelevant to every lender, but the CCRIS conduct grid itself reflects a 12-month history rather than your entire lifetime record.',
    answerMs: 'Laporan CCRIS anda menunjukkan tingkah laku pembayaran 12 bulan yang lalu, jadi pembayaran lewat secara amnya akan hilang daripada tetingkap bergerak ini apabila anda terus membayar mengikut jadual. Ini tidak bermakna isu lama tidak relevan kepada semua pemberi pinjaman, tetapi grid tingkah laku CCRIS itu sendiri mencerminkan sejarah 12 bulan, bukan keseluruhan rekod sepanjang hayat.',
  },
  {
    category: 'credit',
    question: 'Why might my loan application be rejected?',
    questionMs: 'Mengapa permohonan pinjaman saya mungkin ditolak?',
    answer: 'Common reasons include a high DSR relative to the bank\'s guideline (commonly around 60%, though this varies by bank), recent late payments on CCRIS, incomplete documentation, or an unstable income pattern. Every application is assessed individually, and we cannot guarantee approval, but we can usually explain the likely reason after a rejection.',
    answerMs: 'Sebab biasa termasuk DSR yang tinggi berbanding garis panduan bank (biasanya sekitar 60%, walaupun ini berbeza mengikut bank), pembayaran lewat terkini dalam CCRIS, dokumentasi tidak lengkap, atau corak pendapatan tidak stabil. Setiap permohonan dinilai secara individu, dan kami tidak boleh menjamin kelulusan, tetapi kami biasanya boleh terangkan sebab kemungkinan selepas penolakan.',
  },
  {
    category: 'credit',
    question: 'Can I re-apply after a rejection?',
    questionMs: 'Bolehkah saya memohon semula selepas ditolak?',
    answer: 'Yes, you can re-apply, and many applicants are eventually approved after addressing the issue that caused the earlier rejection — for example, lowering your DSR, correcting a CCRIS discrepancy, or waiting until recent late payments age out of the 12-month history. We can advise on timing based on your specific situation.',
    answerMs: 'Ya, anda boleh memohon semula, dan ramai pemohon akhirnya diluluskan selepas menangani isu yang menyebabkan penolakan sebelum ini — contohnya, menurunkan DSR, membetulkan percanggahan CCRIS, atau menunggu pembayaran lewat terkini keluar daripada sejarah 12 bulan. Kami boleh menasihati tentang masa yang sesuai berdasarkan keadaan khusus anda.',
  },
  {
    category: 'credit',
    question: 'What is DSR and why does it matter?',
    questionMs: 'Apakah DSR dan mengapa ia penting?',
    answer: 'DSR (Debt Service Ratio) is the percentage of your gross monthly income committed to debt repayments. Most banks use a guideline of around 60%, though this varies by bank and by your overall profile. A lower DSR generally improves your chances, since it shows more room in your income to service a new loan.',
    answerMs: 'DSR (Nisbah Khidmat Hutang) ialah peratusan pendapatan kasar bulanan anda yang digunakan untuk pembayaran hutang. Kebanyakan bank menggunakan garis panduan sekitar 60%, walaupun ini berbeza mengikut bank dan profil keseluruhan anda. DSR yang lebih rendah umumnya meningkatkan peluang anda, kerana ia menunjukkan lebih ruang dalam pendapatan untuk menampung pinjaman baharu.',
  },
  {
    category: 'credit',
    question: 'I have bad credit history — can AKPK help me?',
    questionMs: 'Saya mempunyai sejarah kredit yang buruk — bolehkah AKPK membantu saya?',
    answer: 'AKPK (Agensi Kaunseling dan Pengurusan Kredit) is a government-backed agency that provides free debt counselling and can help set up a structured repayment plan if you are struggling with multiple debts. It exists specifically for this purpose, and speaking with them alongside us can help you understand your options before or instead of taking on new credit.',
    answerMs: 'AKPK (Agensi Kaunseling dan Pengurusan Kredit) ialah agensi disokong kerajaan yang menyediakan kaunseling hutang percuma dan boleh membantu menyusun pelan pembayaran balik berstruktur jika anda menghadapi pelbagai hutang. Ia wujud khusus untuk tujuan ini, dan berbincang dengan mereka bersama kami boleh membantu anda memahami pilihan sebelum atau sebagai ganti mengambil kredit baharu.',
  },

  // ── Fees & Rates ──────────────────────────────────────────────────────
  {
    category: 'fees',
    question: 'What interest rate can I expect on a personal loan?',
    questionMs: 'Apakah kadar faedah yang boleh saya jangkakan untuk pinjaman peribadi?',
    answer: 'Personal loans we help arrange go up to RM100,000, over tenures of 1 to 7 years, from 4.88% flat per annum. Your actual rate depends on your credit profile, income, and the lender selected, and approval — including the exact rate offered — is never guaranteed until the bank confirms it in writing.',
    answerMs: 'Pinjaman peribadi yang kami bantu uruskan sehingga RM100,000, dengan tempoh 1 hingga 7 tahun, dari 4.88% rata setahun. Kadar sebenar anda bergantung pada profil kredit, pendapatan, dan pemberi pinjaman yang dipilih, dan kelulusan — termasuk kadar tepat yang ditawarkan — tidak pernah dijamin sehingga bank mengesahkannya secara bertulis.',
  },
  {
    category: 'fees',
    question: 'What is the difference between flat rate and effective rate?',
    questionMs: 'Apakah perbezaan antara kadar rata dan kadar efektif?',
    answer: 'A flat rate is calculated on the original loan amount for the full tenure, so the interest amount looks the same every year. An effective rate accounts for the fact that your outstanding balance shrinks as you repay, so it more accurately reflects the true cost of borrowing than the flat rate alone.',
    answerMs: 'Kadar rata dikira berdasarkan jumlah pinjaman asal sepanjang tempoh, jadi jumlah faedah kelihatan sama setiap tahun. Kadar efektif pula mengambil kira baki tertunggak yang mengecil apabila anda membayar balik, jadi ia mencerminkan kos sebenar pinjaman dengan lebih tepat berbanding kadar rata sahaja.',
  },
  {
    category: 'fees',
    question: 'Are there processing fees or stamp duty on top of the loan?',
    questionMs: 'Adakah terdapat yuran pemprosesan atau duti setem selain pinjaman?',
    answer: 'Processing fees and stamp duty may apply depending on the lender and product. Rather than quote a figure that could be wrong for your specific offer, we make sure any such fee is clearly disclosed in the written offer from the bank before you sign anything, so there are no surprises.',
    answerMs: 'Yuran pemprosesan dan duti setem mungkin dikenakan bergantung pada pemberi pinjaman dan produk. Daripada menyatakan angka yang mungkin tidak tepat untuk tawaran khusus anda, kami memastikan sebarang yuran sedemikian dinyatakan dengan jelas dalam surat tawaran bertulis bank sebelum anda menandatangani apa-apa.',
  },
  {
    category: 'fees',
    question: 'What is the RM30 fee for, and how do I pay it?',
    questionMs: 'Untuk apakah yuran RM30 itu, dan bagaimana saya membayarnya?',
    answer: 'The RM30 fee covers the cost of pulling your CTOS credit report as part of our eligibility review. It is collected only via our official WhatsApp number, after we have confirmed your details with you — we never collect this fee, or any fee, directly on the website.',
    answerMs: 'Yuran RM30 menampung kos mendapatkan laporan kredit CTOS anda sebagai sebahagian daripada semakan kelayakan kami. Ia dikutip hanya melalui nombor WhatsApp rasmi kami, selepas kami mengesahkan butiran anda — kami tidak pernah mengutip yuran ini, atau sebarang yuran, terus di laman web.',
  },
  {
    category: 'fees',
    question: 'Do you charge an upfront fee to "unlock" my results or guarantee approval?',
    questionMs: 'Adakah anda mengenakan yuran pendahuluan untuk "membuka kunci" keputusan atau menjamin kelulusan?',
    answer: 'No. We never ask for an upfront "unlock", "processing guarantee", or approval fee before any review has taken place. The only fee we collect before a bank decision is the RM30 CTOS report fee described above, and it is always through our official WhatsApp — treat any other request as a red flag.',
    answerMs: 'Tiada. Kami tidak pernah meminta yuran "buka kunci", "jaminan pemprosesan", atau yuran kelulusan sebelum sebarang semakan dijalankan. Satu-satunya yuran yang kami kutip sebelum keputusan bank ialah yuran laporan CTOS RM30 yang diterangkan di atas, dan ia sentiasa melalui WhatsApp rasmi kami — anggap sebarang permintaan lain sebagai tanda amaran.',
  },
  {
    category: 'fees',
    question: 'Do you offer Islamic (Shariah-compliant) financing?',
    questionMs: 'Adakah anda menawarkan pembiayaan Islam (patuh Shariah)?',
    answer: 'Ask us — availability depends on the specific product and lender at the time you apply. Where a Shariah-compliant option exists, it is structured around a profit rate rather than interest, and we will point you to the right lender and explain the structure before you commit.',
    answerMs: 'Tanya kami — ketersediaan bergantung pada produk dan pemberi pinjaman tertentu pada masa anda memohon. Jika pilihan patuh Shariah wujud, ia distruktur berdasarkan kadar keuntungan dan bukan faedah, dan kami akan tunjukkan pemberi pinjaman yang sesuai serta terangkan strukturnya sebelum anda membuat komitmen.',
  },

  // ── Process ───────────────────────────────────────────────────────────
  {
    category: 'process',
    question: 'How do I apply for a loan?',
    questionMs: 'Bagaimana cara memohon pinjaman?',
    answer: 'Applying is simple: fill out our online form, upload your supporting documents, and our team completes a written review within 24 hours. We then guide you through submission to a suitable licensed lender and explain the next steps, including what the bank itself will ask for.',
    answerMs: 'Memohon adalah mudah: isi borang dalam talian kami, muat naik dokumen sokongan, dan pasukan kami menyiapkan ulasan bertulis dalam 24 jam. Kami kemudian membimbing anda melalui penghantaran kepada pemberi pinjaman berlesen yang sesuai dan menerangkan langkah seterusnya, termasuk apa yang bank akan minta.',
  },
  {
    category: 'process',
    question: 'How long does the written review take?',
    questionMs: 'Berapa lamakah ulasan bertulis mengambil masa?',
    answer: 'Our written review is completed within 24 hours of receiving your complete documents. This is our internal review timeline, not the bank\'s own approval timeline — final approval and disbursement timing depend entirely on the lender you are matched with.',
    answerMs: 'Ulasan bertulis kami disiapkan dalam masa 24 jam selepas dokumen lengkap anda diterima. Ini ialah garis masa semakan dalaman kami, bukan garis masa kelulusan bank — kelulusan akhir dan masa pengeluaran dana bergantung sepenuhnya pada pemberi pinjaman yang dipadankan dengan anda.',
  },
  {
    category: 'process',
    question: 'What does the written review actually contain?',
    questionMs: 'Apakah sebenarnya kandungan ulasan bertulis itu?',
    answer: 'It summarizes your eligibility profile based on your CCRIS/CTOS records, income documents, and DSR, and recommends which licensed lenders and products are a realistic fit for you. It is an eligibility assessment to guide your application, not a loan offer or a guarantee of bank approval.',
    answerMs: 'Ia meringkaskan profil kelayakan anda berdasarkan rekod CCRIS/CTOS, dokumen pendapatan, dan DSR, serta mencadangkan pemberi pinjaman dan produk berlesen yang realistik untuk anda. Ia adalah penilaian kelayakan untuk membimbing permohonan anda, bukan tawaran pinjaman atau jaminan kelulusan bank.',
  },
  {
    category: 'process',
    question: 'How does loan disbursement work?',
    questionMs: 'Bagaimana proses pengeluaran dana pinjaman berfungsi?',
    answer: 'Once the bank approves your application and you accept the written offer, the bank disburses the loan funds, typically directly into your bank account. Timing varies by lender, and any product-specific disbursement steps (such as for secured loans) will be explained in your offer letter.',
    answerMs: 'Setelah bank meluluskan permohonan anda dan anda menerima surat tawaran bertulis, bank mengeluarkan dana pinjaman, biasanya terus ke akaun bank anda. Masa berbeza mengikut pemberi pinjaman, dan sebarang langkah pengeluaran khusus produk (seperti pinjaman bercagar) akan diterangkan dalam surat tawaran anda.',
  },
  {
    category: 'process',
    question: 'What happens after I submit my application?',
    questionMs: 'Apa yang berlaku selepas saya menghantar permohonan?',
    answer: 'We review your documents, complete our written review within 24 hours, and then help you submit to a suitable lender. From there, the bank conducts its own assessment, which may include requesting additional documents or clarification before reaching a decision.',
    answerMs: 'Kami menyemak dokumen anda, menyiapkan ulasan bertulis dalam 24 jam, dan kemudian membantu anda menghantar permohonan kepada pemberi pinjaman yang sesuai. Dari situ, bank menjalankan penilaian sendiri, yang mungkin termasuk meminta dokumen tambahan atau penjelasan sebelum membuat keputusan.',
  },
  {
    category: 'process',
    question: 'Is approval guaranteed once I apply?',
    questionMs: 'Adakah kelulusan dijamin setelah saya memohon?',
    answer: 'No — approval is never guaranteed. We help match you to suitable licensed lenders and prepare your application, but the final credit decision always rests with the bank, based on its own underwriting criteria at the time you apply.',
    answerMs: 'Tidak — kelulusan tidak pernah dijamin. Kami membantu memadankan anda dengan pemberi pinjaman berlesen yang sesuai dan menyediakan permohonan anda, tetapi keputusan kredit akhir sentiasa terletak pada bank, berdasarkan kriteria penilaian kredit mereka sendiri pada masa anda memohon.',
  },

  // ── Repayment ─────────────────────────────────────────────────────────
  {
    category: 'repayment',
    question: 'What repayment options are available?',
    questionMs: 'Apakah pilihan pembayaran balik yang tersedia?',
    answer: 'Repayment terms are set by the bank in your loan agreement, typically as fixed monthly instalments over the agreed tenure (for personal loans, 1 to 7 years). We walk you through what to expect before you sign, so the monthly commitment is clear upfront.',
    answerMs: 'Terma pembayaran balik ditetapkan oleh bank dalam perjanjian pinjaman anda, biasanya sebagai ansuran bulanan tetap sepanjang tempoh yang dipersetujui (untuk pinjaman peribadi, 1 hingga 7 tahun). Kami terangkan apa yang perlu dijangka sebelum anda menandatangani, supaya komitmen bulanan jelas sejak awal.',
  },
  {
    category: 'repayment',
    question: 'Can I make an early settlement, and are there fees?',
    questionMs: 'Bolehkah saya membuat penyelesaian awal, dan adakah dikenakan yuran?',
    answer: 'Early or full settlement is usually allowed, but whether a rebate or fee applies depends on the lender\'s specific policy and how the loan agreement calculates it. Check the settlement terms in your written offer, or ask us to review them with you before you commit to paying it off early.',
    answerMs: 'Penyelesaian awal atau penuh biasanya dibenarkan, tetapi sama ada rebet atau yuran dikenakan bergantung pada dasar khusus pemberi pinjaman dan cara perjanjian pinjaman mengiranya. Semak terma penyelesaian dalam surat tawaran bertulis anda, atau minta kami menyemaknya bersama anda sebelum anda membuat keputusan membayar awal.',
  },
  {
    category: 'repayment',
    question: 'What happens if I miss a payment or pay late?',
    questionMs: 'Apa yang berlaku jika saya terlepas bayaran atau membayar lewat?',
    answer: 'Late payment charges follow the terms in your specific loan agreement with the bank, and a late payment will also be reflected in your CCRIS record. If you think you will miss a payment, contact your lender as early as possible — we can also advise on the general options available.',
    answerMs: 'Caj pembayaran lewat mengikut terma dalam perjanjian pinjaman khusus anda dengan bank, dan pembayaran lewat juga akan direkodkan dalam CCRIS anda. Jika anda fikir akan terlepas bayaran, hubungi pemberi pinjaman anda seawal mungkin — kami juga boleh menasihati tentang pilihan umum yang tersedia.',
  },
  {
    category: 'repayment',
    question: 'I\'m struggling to keep up with repayments — what should I do?',
    questionMs: 'Saya menghadapi kesukaran untuk membayar balik — apa yang perlu saya lakukan?',
    answer: 'Contact your lender as soon as you anticipate difficulty, since banks are generally more flexible before an account falls into arrears than after. AKPK also offers free, government-backed debt counselling and can help you set up a structured repayment plan across multiple debts if needed.',
    answerMs: 'Hubungi pemberi pinjaman anda sebaik sahaja anda menjangka kesukaran, kerana bank umumnya lebih fleksibel sebelum akaun tertunggak berbanding selepasnya. AKPK turut menawarkan kaunseling hutang percuma disokong kerajaan dan boleh membantu anda menyusun pelan pembayaran balik berstruktur merentasi pelbagai hutang jika perlu.',
  },
  {
    category: 'repayment',
    question: 'Can my bank restructure or reschedule my loan if I face financial difficulty?',
    questionMs: 'Bolehkah bank menstruktur semula atau menjadualkan semula pinjaman saya jika saya menghadapi kesukaran kewangan?',
    answer: 'Some banks offer restructuring or rescheduling options, such as adjusting the tenure or monthly instalment, for borrowers facing genuine financial hardship. Availability and terms are decided entirely by each bank on a case-by-case basis, so speak to your lender directly and consider looping in AKPK for guidance too.',
    answerMs: 'Sesetengah bank menawarkan pilihan penstrukturan semula atau penjadualan semula, seperti melaraskan tempoh atau ansuran bulanan, untuk peminjam yang menghadapi kesukaran kewangan sebenar. Ketersediaan dan terma ditentukan sepenuhnya oleh setiap bank mengikut kes, jadi hubungi pemberi pinjaman anda terus dan pertimbangkan mendapatkan panduan daripada AKPK juga.',
  },
  {
    category: 'repayment',
    question: 'Does debt consolidation change my monthly repayment amount?',
    questionMs: 'Adakah penyatuan hutang mengubah jumlah pembayaran balik bulanan saya?',
    answer: 'Debt consolidation combines several existing debts into a single new loan with one monthly instalment, which can simplify your repayments and, depending on the new rate and tenure, may lower or raise your total monthly outlay. We can help you compare your current commitments against a consolidation offer before you decide.',
    answerMs: 'Penyatuan hutang menggabungkan beberapa hutang sedia ada menjadi satu pinjaman baharu dengan satu ansuran bulanan, yang boleh memudahkan pembayaran balik anda dan, bergantung pada kadar serta tempoh baharu, mungkin menurunkan atau menaikkan jumlah perbelanjaan bulanan keseluruhan anda. Kami boleh bantu anda bandingkan komitmen semasa dengan tawaran penyatuan sebelum anda membuat keputusan.',
  },

  // ── Security & Trust ──────────────────────────────────────────────────
  {
    category: 'security',
    question: 'Is my personal information secure?',
    questionMs: 'Adakah maklumat peribadi saya selamat?',
    answer: 'Yes. We handle your data in line with the Personal Data Protection Act 2010 (PDPA), use encryption for data in transit, and store information securely. We do not share your information with third parties beyond what is necessary to process your loan application without your knowledge.',
    answerMs: 'Ya. Kami mengendalikan data anda selaras dengan Akta Perlindungan Data Peribadi 2010 (PDPA), menggunakan penyulitan untuk data dalam transit, dan menyimpan maklumat dengan selamat. Kami tidak berkongsi maklumat anda dengan pihak ketiga melebihi apa yang perlu untuk memproses permohonan pinjaman anda tanpa pengetahuan anda.',
  },
  {
    category: 'security',
    question: 'Is GURU Credits a legitimate, licensed company?',
    questionMs: 'Adakah GURU Credits syarikat yang sah dan berlesen?',
    answer: 'Yes. We operate under a licence issued under the Moneylenders Act 1951, regulated by KPKT. Every fee we charge is disclosed clearly, and the RM30 CTOS fee mentioned elsewhere in this FAQ is collected only via our official WhatsApp, never directly on this website.',
    answerMs: 'Ya. Kami beroperasi di bawah lesen yang dikeluarkan mengikut Akta Pemberi Pinjam Wang 1951, dikawal selia oleh KPKT. Setiap yuran yang kami kenakan dinyatakan dengan jelas, dan yuran CTOS RM30 yang disebut di tempat lain dalam Soalan Lazim ini dikutip hanya melalui WhatsApp rasmi kami, tidak pernah terus di laman web ini.',
  },
  {
    category: 'security',
    question: 'What happens to my data after my loan is settled?',
    questionMs: 'Apa yang berlaku kepada data saya selepas pinjaman saya diselesaikan?',
    answer: 'We retain your data only as long as required for regulatory and record-keeping purposes. Once your loan is fully settled, you can request deletion of your personal data, and we will process that request in accordance with the PDPA.',
    answerMs: 'Kami menyimpan data anda hanya selama yang diperlukan untuk tujuan peraturan dan penyimpanan rekod. Setelah pinjaman anda diselesaikan sepenuhnya, anda boleh meminta penghapusan data peribadi anda, dan kami akan memproses permintaan itu selaras dengan PDPA.',
  },
  {
    category: 'security',
    question: 'Are you only reachable via WhatsApp, and how do I verify it\'s really you?',
    questionMs: 'Adakah anda hanya boleh dihubungi melalui WhatsApp, dan bagaimana saya sahkan ia benar-benar anda?',
    answer: 'We use WhatsApp for certain steps such as collecting the RM30 CTOS fee, but you can also reach us through our website and official channels. If you are ever unsure whether a WhatsApp number is genuinely ours, cross-check it against the number listed on our official site before sharing any payment details.',
    answerMs: 'Kami menggunakan WhatsApp untuk langkah tertentu seperti mengutip yuran CTOS RM30, tetapi anda juga boleh menghubungi kami melalui laman web dan saluran rasmi kami. Jika anda tidak pasti sama ada satu nombor WhatsApp benar-benar milik kami, semak silang dengan nombor yang tersenarai di laman rasmi kami sebelum berkongsi sebarang butiran pembayaran.',
  },
  {
    category: 'security',
    question: 'What are common loan scam red flags I should watch for?',
    questionMs: 'Apakah tanda amaran penipuan pinjaman yang biasa perlu saya perhatikan?',
    answer: 'Be wary of anyone asking for an upfront "unlock" or guarantee-of-approval fee before any review, requests to pay into a personal (not company) bank account, promises of guaranteed approval regardless of your credit profile, or contact only through unofficial, unverifiable channels. Legitimate licensed lenders disclose fees in writing.',
    answerMs: 'Berhati-hati dengan sesiapa yang meminta yuran "buka kunci" atau jaminan kelulusan sebelum sebarang semakan, permintaan membayar ke akaun bank peribadi (bukan syarikat), janji kelulusan terjamin tanpa mengira profil kredit anda, atau hubungan hanya melalui saluran tidak rasmi yang tidak dapat disahkan. Pemberi pinjaman berlesen yang sah menyatakan yuran secara bertulis.',
  },
  {
    category: 'security',
    question: 'Do you share my information with third parties?',
    questionMs: 'Adakah anda berkongsi maklumat saya dengan pihak ketiga?',
    answer: 'We only share what is necessary with the licensed lenders you are being matched to, so they can assess your application, and with credit reporting bodies such as CTOS as part of that review. We do not sell your data or pass it to unrelated third parties, in line with the PDPA.',
    answerMs: 'Kami hanya berkongsi apa yang perlu dengan pemberi pinjaman berlesen yang dipadankan dengan anda, supaya mereka boleh menilai permohonan anda, dan dengan badan pelaporan kredit seperti CTOS sebagai sebahagian daripada semakan itu. Kami tidak menjual data anda atau menyerahkannya kepada pihak ketiga yang tidak berkaitan, selaras dengan PDPA.',
  },
];

/**
 * Small cross-section of FAQ items for "more questions" blocks on guide and
 * tool pages — filtered by category and capped at `limit`. Callers pick the
 * display language themselves (question/questionMs, answer/answerMs) since
 * these blocks render as plain `<details>`, not another FAQPage node.
 */
export function faqsFor(categories: FaqCategoryId[], limit = 5): FaqItem[] {
  return faqItems.filter((item) => categories.includes(item.category)).slice(0, limit);
}
