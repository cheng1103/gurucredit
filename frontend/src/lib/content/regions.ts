import type { Language } from '@/lib/i18n/translations';

export type RegionSlug =
  | 'kuala-lumpur'
  | 'selangor'
  | 'putrajaya'
  | 'penang'
  | 'perak'
  | 'kedah'
  | 'perlis'
  | 'kelantan'
  | 'terengganu'
  | 'pahang'
  | 'negeri-sembilan'
  | 'melaka'
  | 'johor'
  | 'sabah'
  | 'sarawak'
  | 'labuan';

export type Bilingual = { en: string; ms: string };

export type BankSpecialisation = {
  bank: string;
  strength: Bilingual;
  caveat?: Bilingual;
};

export type NeighbourhoodNote = {
  name: string;
  note: Bilingual;
};

export type LocalCase = {
  label: string;
  ageRange: string;
  profile: Bilingual;
  challenge: Bilingual;
  outcome: Bilingual;
};

export type SourceLink = {
  label: string;
  url: string;
};

export type RegionData = {
  slug: RegionSlug;
  regionCode: string;
  name: Bilingual;
  shortName: string;
  primaryCity: string;
  coordinates: { latitude: number; longitude: number };
  metrics: {
    medianHouseholdIncomeMYR: number;
    medianPropertyPriceMYR: number;
    dsrMedianPercent: number;
    primaryLoanProducts: ('personal' | 'home' | 'car' | 'business' | 'refinance')[];
  };
  lenders: string[];
  localContext: Bilingual;
  affordabilityNote: Bilingual;
  faqs: {
    q: Bilingual;
    a: Bilingual;
  }[];
  /** Rich content sections (optional) — populate for priority regions to clear "thin content" flags. */
  marketTrends?: {
    title: Bilingual;
    bullets: Bilingual[];
  };
  bankSpecialisation?: {
    title: Bilingual;
    lead: Bilingual;
    items: BankSpecialisation[];
  };
  neighbourhoodGuide?: {
    title: Bilingual;
    notes: NeighbourhoodNote[];
  };
  localCaseStudies?: LocalCase[];
  sources?: SourceLink[];
  lastReviewed?: string;
  reviewedBy?: string;
};

const KL_MARKET_TRENDS = {
  title: {
    en: 'Kuala Lumpur market snapshot — 2026',
    ms: 'Gambaran pasaran Kuala Lumpur — 2026',
  },
  bullets: [
    {
      en: 'Median transacted condominium prices inside the MRT catchment have been trending in the RM 650K–RM 800K band in recent quarters. Primary-market stratified units typically price above comparable secondary stock in the same postcode.',
      ms: 'Harga median urus niaga kondominium dalam kawasan tangkapan MRT kebelakangan ini berada dalam julat RM 650K–RM 800K. Unit berstrata pasaran utama biasanya berharga lebih tinggi daripada stok sekunder setara di poskod sama.',
    },
    {
      en: 'KL mortgage approvals skew heavily toward dual-income applicants. Based on our consulting observations, most approvals above RM 700K have two income contributors; single-applicant loans at that level face noticeably stricter DSR testing.',
      ms: 'Kelulusan gadai janji KL cenderung kuat kepada pemohon dua pendapatan. Berdasarkan pemerhatian perundingan kami, kebanyakan kelulusan melebihi RM 700K mempunyai dua penyumbang pendapatan; pinjaman pemohon tunggal pada tahap itu menghadapi ujian DSR yang ketara lebih ketat.',
    },
    {
      en: 'Refinancing volume in KL has risen sharply as borrowers lock in rates ahead of expected OPR moves. Cash-out refinance appetite has tightened — most lenders now cap meaningfully below the headline LTV ceilings they advertise.',
      ms: 'Volum pembiayaan semula di KL meningkat ketara apabila peminjam mengunci kadar sebelum jangkaan pergerakan OPR. Selera pembiayaan semula tunai semakin diketatkan — kebanyakan pemberi pinjaman kini mengehadkan jauh di bawah had LTV yang diiklankan.',
    },
    {
      en: 'BNM reference rate (BR) used by the major banks currently sits in the 3.00%–3.25% band. Promo margins for first-time buyers can reach BR + 0.75% when the profile fits.',
      ms: 'Kadar rujukan BNM (BR) yang digunakan oleh bank utama kini berada dalam lingkungan 3.00%–3.25%. Margin promosi untuk pembeli rumah pertama boleh mencapai BR + 0.75% apabila profil sesuai.',
    },
  ],
};

const KL_BANK_SPECIALISATION = {
  title: { en: 'Which KL banks approve what', ms: 'Bank KL mana yang meluluskan apa' },
  lead: {
    en: 'Based on our consulting throughput over the last 12 months, these are the consistent patterns we see with KL applications. Individual results vary with your exact profile.',
    ms: 'Berdasarkan perundingan kami dalam 12 bulan lepas, inilah pola yang kami lihat dengan permohonan KL. Keputusan individu berbeza mengikut profil tepat anda.',
  },
  items: [
    {
      bank: 'Maybank',
      strength: {
        en: 'Strongest for employees of GLCs, public sector, and listed companies. Fast approval when the employer is in their preferred-employer list.',
        ms: 'Paling kuat untuk pekerja GLC, sektor awam, dan syarikat tersenarai. Kelulusan pantas apabila majikan dalam senarai majikan pilihan mereka.',
      },
      caveat: {
        en: 'Freelancers and short-tenure employees often face extra documentation requests.',
        ms: 'Pekerja bebas dan pekerja tempoh pendek sering menerima permintaan dokumentasi tambahan.',
      },
    },
    {
      bank: 'CIMB',
      strength: {
        en: 'Competitive rates for tech-sector applicants and dual-income households. Strong online-application flow.',
        ms: 'Kadar kompetitif untuk pemohon sektor teknologi dan isi rumah dua pendapatan. Aliran permohonan dalam talian yang kuat.',
      },
      caveat: {
        en: 'Stricter on late markers from the past 24 months — a single 60-day late can disqualify.',
        ms: 'Lebih ketat terhadap rekod lewat dalam 24 bulan lepas — satu rekod lewat 60 hari boleh melayakkan ditolak.',
      },
    },
    {
      bank: 'Hong Leong Bank',
      strength: {
        en: 'Often approves applicants with cleared-but-recent CCRIS markers when other banks decline. Flexible for self-employed with 2+ years trading history.',
        ms: 'Sering meluluskan pemohon dengan rekod CCRIS yang baru diselesaikan apabila bank lain menolak. Fleksibel untuk bekerja sendiri dengan rekod perdagangan 2+ tahun.',
      },
    },
    {
      bank: 'Public Bank',
      strength: {
        en: 'Typically the tightest on margin but best pricing for borrowers under 40 with A-grade CCRIS and stable salary.',
        ms: 'Biasanya paling ketat pada margin tetapi harga terbaik untuk peminjam bawah 40 tahun dengan CCRIS gred A dan gaji stabil.',
      },
    },
    {
      bank: 'RHB',
      strength: {
        en: 'Strong for SME business loans in KL (Kepong, Cheras industrial corridors). Home loan appetite varies by branch.',
        ms: 'Kuat untuk pinjaman perniagaan PKS di KL (koridor perindustrian Kepong, Cheras). Selera pinjaman rumah berbeza mengikut cawangan.',
      },
    },
  ],
};

const KL_NEIGHBOURHOOD_GUIDE = {
  title: { en: 'KL submarkets — lender perspective', ms: 'Pasaran kecil KL — perspektif pemberi pinjaman' },
  notes: [
    {
      name: 'KLCC / Bukit Bintang',
      note: {
        en: 'Strata stock priced RM 1,200–1,800 psf. Banks apply conservative valuation; expect LTV cap at 80–85% despite advertised 90%. Second-hand units older than 15 years may face condition caveats.',
        ms: 'Stok berstrata pada harga RM 1,200–1,800 psf. Bank menggunakan penilaian konservatif; jangka had LTV pada 80–85% walaupun 90% diiklankan. Unit terpakai lebih 15 tahun mungkin menghadapi kaveat keadaan.',
      },
    },
    {
      name: "Mont'Kiara / Sri Hartamas",
      note: {
        en: 'Expat-heavy rental demand supports lender confidence, but foreign-buyer price floors (RM 1M for stratified) apply. Local buyers in this corridor often secure 85–90% LTV on primary-market units.',
        ms: 'Permintaan sewa ekspatriat yang tinggi menyokong keyakinan pemberi pinjaman, tetapi had harga pembeli asing (RM 1J untuk berstrata) terpakai. Pembeli tempatan di koridor ini sering mendapatkan 85–90% LTV pada unit pasaran utama.',
      },
    },
    {
      name: 'Cheras / Kepong',
      note: {
        en: 'Landed stock with faster bank valuation turnaround. First-time buyer schemes (LPPSA, MyHome) viable for units under RM 500K. Conservative DSR treatment but quicker decisions.',
        ms: 'Stok berkembar dengan pusingan penilaian bank lebih pantas. Skim pembeli rumah pertama (LPPSA, MyHome) berdaya maju untuk unit di bawah RM 500K. Layanan DSR konservatif tetapi keputusan lebih pantas.',
      },
    },
    {
      name: 'Setapak / Wangsa Maju',
      note: {
        en: 'Older leasehold flats see stricter age-vs-tenure checks: total of loan tenure plus property age must be under 85 years for most banks. Plan tenure accordingly.',
        ms: 'Pangsapuri pajakan lebih lama menghadapi semakan usia-lawan-tempoh yang lebih ketat: jumlah tempoh pinjaman ditambah usia hartanah mestilah di bawah 85 tahun bagi kebanyakan bank. Rancang tempoh dengan sewajarnya.',
      },
    },
  ],
};

const KL_CASE_STUDIES: LocalCase[] = [
  {
    label: 'Encik A',
    ageRange: '32',
    profile: {
      en: 'Software engineer, RM 11,500/month, condo in Cheras, looking to upgrade to RM 850K condo in Bangsar.',
      ms: 'Jurutera perisian, RM 11,500/bulan, kondominium di Cheras, ingin menaik taraf ke kondominium RM 850K di Bangsar.',
    },
    challenge: {
      en: 'Existing home loan took DSR to 55%. Wanted to bridge-finance without selling first.',
      ms: 'Pinjaman rumah sedia ada meningkatkan DSR kepada 55%. Ingin pembiayaan jambatan tanpa menjual dahulu.',
    },
    outcome: {
      en: 'Matched to HLB bridging facility at BR + 1.25%, approved in 12 working days. Retained first property as rental.',
      ms: 'Dipadankan ke kemudahan jambatan HLB pada BR + 1.25%, diluluskan dalam 12 hari bekerja. Mengekalkan hartanah pertama sebagai sewaan.',
    },
  },
  {
    label: 'Cik B',
    ageRange: '29',
    profile: {
      en: 'Digital marketer on contract-to-permanent conversion. RM 7,200/month. First home, looking at RM 580K condo in Setapak.',
      ms: 'Pemasar digital dalam penukaran kontrak-ke-tetap. RM 7,200/bulan. Rumah pertama, sedang tinjau kondominium RM 580K di Setapak.',
    },
    challenge: {
      en: 'Contract status caused rejection at two big banks. Property leasehold age was 38 years (age cap risk).',
      ms: 'Status kontrak menyebabkan penolakan di dua bank utama. Usia pajakan hartanah 38 tahun (risiko had usia).',
    },
    outcome: {
      en: 'Converted to permanent on month 6 of GURU engagement, then Public Bank approved 30-year tenure (well under the 85-year combined age cap). Financing margin 90%.',
      ms: 'Ditukar menjadi tetap pada bulan ke-6, kemudian Public Bank meluluskan tempoh 30 tahun (jauh di bawah had usia gabungan 85 tahun). Margin pembiayaan 90%.',
    },
  },
];

const SEL_MARKET_TRENDS = {
  title: { en: 'Selangor market snapshot — 2026', ms: 'Gambaran pasaran Selangor — 2026' },
  bullets: [
    {
      en: 'Selangor is consistently the largest state mortgage market in Malaysia by volume. Subang Jaya, Shah Alam, Puchong and Kajang are the dominant sub-markets by unit count.',
      ms: 'Selangor secara konsisten adalah pasaran gadai janji negeri terbesar di Malaysia dari segi jumlah. Subang Jaya, Shah Alam, Puchong dan Kajang adalah pasaran kecil dominan mengikut bilangan unit.',
    },
    {
      en: 'Transacted prices for landed property in mature Selangor townships (PJ, Subang, Shah Alam) typically sit in the RM 700K–RM 1.1M band. New launches in Cyberjaya and Semenyih are usually materially lower.',
      ms: 'Harga urus niaga hartanah berkembar di bandar matang Selangor (PJ, Subang, Shah Alam) biasanya berada dalam julat RM 700K–RM 1.1J. Pelancaran baru di Cyberjaya dan Semenyih biasanya lebih rendah dengan ketara.',
    },
    {
      en: 'Car commitments are the dominant reason Selangor home-loan applications fail DSR. Most applicants we consult for carry an active hire-purchase that materially compresses borrowing headroom.',
      ms: 'Komitmen kereta adalah sebab dominan permohonan pinjaman rumah Selangor gagal DSR. Kebanyakan pemohon yang kami rundingkan membawa sewa beli aktif yang mengurangkan ruang pinjaman dengan ketara.',
    },
    {
      en: 'Islamic financing uptake in Selangor runs above the national average. Maybank Islamic and CIMB Islamic are the most common lenders we match clients with for Shariah-compliant home and personal financing in the state.',
      ms: 'Pengambilan pembiayaan Islam di Selangor lebih tinggi daripada purata kebangsaan. Maybank Islamic dan CIMB Islamic adalah pemberi pinjaman paling biasa yang kami padankan untuk pembiayaan rumah dan peribadi patuh Syariah dalam negeri.',
    },
  ],
};

const SEL_BANK_SPECIALISATION = {
  title: { en: 'Selangor lender profile', ms: 'Profil pemberi pinjaman Selangor' },
  lead: {
    en: 'Selangor has the broadest lender footprint of any state. Here is how the top banks tend to segment the market.',
    ms: 'Selangor mempunyai jejak pemberi pinjaman terluas di antara negeri. Inilah cara bank teratas cenderung membahagikan pasaran.',
  },
  items: [
    {
      bank: 'Maybank',
      strength: {
        en: 'Volume leader. Standard approvals for RM 300K–RM 900K mortgages where applicant has clean CCRIS and steady employer.',
        ms: 'Peneraju volum. Kelulusan standard untuk gadai janji RM 300K–RM 900K apabila pemohon mempunyai CCRIS bersih dan majikan stabil.',
      },
    },
    {
      bank: 'Public Bank',
      strength: {
        en: 'Strong in Puchong, USJ, Kota Damansara. Tightest rates for A-grade applicants but slower when paperwork is incomplete.',
        ms: 'Kuat di Puchong, USJ, Kota Damansara. Kadar paling ketat untuk pemohon gred A tetapi lebih perlahan jika dokumen tidak lengkap.',
      },
    },
    {
      bank: 'OCBC',
      strength: {
        en: 'Often overlooked — competitive for dual-income Selangor households with combined income RM 12K+. Good appetite for refinance.',
        ms: 'Sering diabaikan — kompetitif untuk isi rumah dua pendapatan Selangor dengan gabungan pendapatan RM 12K+. Selera baik untuk pembiayaan semula.',
      },
    },
    {
      bank: 'RHB',
      strength: {
        en: 'Strong SME and business-loan appetite around Shah Alam industrial zones. Also competitive for first-time buyers under 35.',
        ms: 'Selera PKS dan pinjaman perniagaan yang kuat di sekitar zon perindustrian Shah Alam. Juga kompetitif untuk pembeli rumah pertama bawah 35.',
      },
    },
  ],
};

const SEL_CASE_STUDIES: LocalCase[] = [
  {
    label: 'Pasangan C & D',
    ageRange: '34, 32',
    profile: {
      en: 'Dual-income couple, engineer + teacher, combined RM 13,200/month. Target double-storey terrace in Shah Alam, RM 880K.',
      ms: 'Pasangan dua pendapatan, jurutera + guru, jumlah RM 13,200/bulan. Sasaran teres dua tingkat di Shah Alam, RM 880K.',
    },
    challenge: {
      en: 'Both carry car loans totalling RM 2,400/month. DSR at 66%, too high for the big three.',
      ms: 'Kedua-dua membawa pinjaman kereta berjumlah RM 2,400/bulan. DSR pada 66%, terlalu tinggi untuk tiga bank besar.',
    },
    outcome: {
      en: 'Refinanced one car to extend tenure, dropping monthly commitment by RM 600. Mortgage then approved by CIMB at 90% margin, 33-year tenure.',
      ms: 'Membiayai semula satu kereta untuk memanjangkan tempoh, mengurangkan komitmen bulanan sebanyak RM 600. Gadai janji kemudian diluluskan oleh CIMB pada margin 90%, tempoh 33 tahun.',
    },
  },
];

const PEN_MARKET_TRENDS = {
  title: { en: 'Penang market snapshot — 2026', ms: 'Gambaran pasaran Pulau Pinang — 2026' },
  bullets: [
    {
      en: 'The Bayan Lepas E&E industrial corridor is a major driver of local mortgage demand. Engineers and semiconductor-sector employees at large multinational anchors typically have strong lender appetite.',
      ms: 'Koridor perindustrian E&E Bayan Lepas adalah pendorong utama permintaan gadai janji tempatan. Jurutera dan pekerja sektor semikonduktor di jangkar multinasional besar biasanya mendapat selera pemberi pinjaman yang kuat.',
    },
    {
      en: 'George Town heritage zone has strict conservation rules. Pre-1970 shophouses generally require specialist mortgage products — only a handful of lenders maintain dedicated heritage-property workflows.',
      ms: 'Zon warisan George Town mempunyai peraturan pemuliharaan yang ketat. Rumah kedai sebelum 1970 umumnya memerlukan produk gadai janji khusus — hanya segelintir pemberi pinjaman mengekalkan aliran kerja hartanah warisan khusus.',
    },
    {
      en: 'Seberang Perai (mainland Penang) remains a strong first-time buyer market, driven by sub-RM 400K landed stock in Butterworth, Bukit Mertajam, and Nibong Tebal.',
      ms: 'Seberang Perai (tanah besar Pulau Pinang) kekal sebagai pasaran pembeli rumah pertama yang kuat, didorong oleh stok berkembar di bawah RM 400K di Butterworth, Bukit Mertajam dan Nibong Tebal.',
    },
  ],
};

const PEN_BANK_SPECIALISATION = {
  title: { en: 'Penang lender profile', ms: 'Profil pemberi pinjaman Penang' },
  lead: {
    en: 'Penang lender specialisation tracks the three distinct sub-markets: heritage island, modern island condos, and mainland landed.',
    ms: 'Pengkhususan pemberi pinjaman Pulau Pinang mengikut tiga pasaran kecil berbeza: warisan pulau, kondominium pulau moden, dan tanah besar berkembar.',
  },
  items: [
    {
      bank: 'Public Bank',
      strength: {
        en: 'Dominant on the island for RM 400K–RM 900K mortgages. Especially favourable for E&E sector employees with 3+ years tenure.',
        ms: 'Dominan di pulau untuk gadai janji RM 400K–RM 900K. Terutama sesuai untuk pekerja sektor E&E dengan tempoh 3+ tahun.',
      },
    },
    {
      bank: 'Alliance Bank',
      strength: {
        en: 'Niche strength in heritage property financing. Will underwrite conserved shophouses where most peers decline.',
        ms: 'Kekuatan khusus dalam pembiayaan hartanah warisan. Akan menilai rumah kedai terpelihara di mana kebanyakan rakan sebaya menolak.',
      },
    },
    {
      bank: 'OCBC',
      strength: {
        en: 'Preferred by Bayan Lepas engineers. Dual-income treatment is generous when both partners work in multinational E&E companies.',
        ms: 'Pilihan jurutera Bayan Lepas. Layanan dua pendapatan adalah murah hati apabila kedua-dua pasangan bekerja di syarikat multinasional E&E.',
      },
    },
  ],
};

export const regions: Record<RegionSlug, RegionData> = {
  'kuala-lumpur': {
    slug: 'kuala-lumpur',
    regionCode: 'MY-14',
    name: { en: 'Kuala Lumpur', ms: 'Kuala Lumpur' },
    shortName: 'KL',
    primaryCity: 'Kuala Lumpur',
    coordinates: { latitude: 3.139, longitude: 101.6869 },
    metrics: {
      medianHouseholdIncomeMYR: 13325,
      medianPropertyPriceMYR: 680000,
      dsrMedianPercent: 52,
      primaryLoanProducts: ['home', 'refinance', 'personal'],
    },
    lenders: ['Maybank', 'CIMB', 'Public Bank', 'RHB', 'HLB', 'AmBank'],
    localContext: {
      en: "Kuala Lumpur carries Malaysia's highest household income alongside the highest property prices. Many borrowers here are refinancing mortgages taken in 2018–2022 or consolidating multiple credit lines from earlier career years.",
      ms: 'Kuala Lumpur mempunyai pendapatan isi rumah tertinggi di Malaysia dan harga hartanah tertinggi. Ramai peminjam di sini sedang membiayai semula gadai janji yang diambil pada 2018–2022 atau menyatukan pelbagai kemudahan kredit dari tahun-tahun awal kerjaya.',
    },
    affordabilityNote: {
      en: 'At a median KL income of RM13,325 and 35-year tenure, a well-structured DSR keeps home-loan eligibility around RM1.8M. Higher commitments reduce this materially.',
      ms: 'Dengan pendapatan median KL RM13,325 dan tempoh 35 tahun, DSR yang diurus dengan baik mengekalkan kelayakan pinjaman rumah sekitar RM1.8J. Komitmen lebih tinggi mengurangkannya dengan ketara.',
    },
    faqs: [
      {
        q: {
          en: 'Which KL neighbourhoods tend to have the longest lender turnaround?',
          ms: 'Kawasan kejiranan KL mana yang mempunyai masa pemulangan bank paling lama?',
        },
        a: {
          en: "High-rise stratified developments in Mont'Kiara, Bangsar South and KLCC often require additional valuation steps, which can extend decisions to 3–4 weeks. Landed properties in Cheras or Kepong typically clear faster.",
          ms: "Pembangunan tingkat tinggi berstrata di Mont'Kiara, Bangsar South dan KLCC sering memerlukan langkah penilaian tambahan, yang boleh memanjangkan keputusan kepada 3–4 minggu. Hartanah berkembar di Cheras atau Kepong biasanya lebih cepat.",
        },
      },
      {
        q: {
          en: 'Is KL eligible for MyHome or First-Home schemes?',
          ms: 'Adakah KL layak untuk skim MyHome atau Rumah Pertama?',
        },
        a: {
          en: 'Yes, but price ceilings matter. Properties above RM500,000 are generally outside scheme support. We help you identify eligible projects and alternatives.',
          ms: 'Ya, tetapi had harga penting. Hartanah melebihi RM500,000 umumnya di luar sokongan skim. Kami bantu kenal pasti projek yang layak dan alternatif.',
        },
      },
      {
        q: {
          en: 'How do banks treat bonuses and commissions in KL?',
          ms: 'Bagaimana bank menilai bonus dan komisen di KL?',
        },
        a: {
          en: 'Most KL banks haircut variable income by 40–50% for DSR calculation. A two-year average is typical; a one-off large bonus will not move the number. EPF Statement + 6 months of bank-in is the most reliable proof.',
          ms: 'Kebanyakan bank KL memotong pendapatan berubah sebanyak 40–50% untuk pengiraan DSR. Purata dua tahun adalah biasa; bonus besar sekali sahaja tidak akan mengubah angka. Penyata KWSP + 6 bulan bank-in adalah bukti paling boleh dipercayai.',
        },
      },
      {
        q: {
          en: 'If I already have a KL home loan, how soon can I refinance?',
          ms: 'Jika saya sudah ada pinjaman rumah KL, bila saya boleh pembiayaan semula?',
        },
        a: {
          en: 'Most lock-in clauses are 3 or 5 years. After that, you refinance without penalty. Within the lock-in, expect 2–3% penalty on outstanding. We typically recommend refinance when the new rate beats current by at least 0.3%.',
          ms: 'Kebanyakan klausa lock-in ialah 3 atau 5 tahun. Selepas itu, anda boleh membiayai semula tanpa penalti. Dalam tempoh lock-in, jangka penalti 2–3% ke atas baki. Kami biasanya mengesyorkan pembiayaan semula apabila kadar baru mengalahkan yang sedia ada sekurang-kurangnya 0.3%.',
        },
      },
    ],
    marketTrends: KL_MARKET_TRENDS,
    bankSpecialisation: KL_BANK_SPECIALISATION,
    neighbourhoodGuide: KL_NEIGHBOURHOOD_GUIDE,
    localCaseStudies: KL_CASE_STUDIES,
    sources: [
      { label: 'Bank Negara Malaysia — Monetary policy statements', url: 'https://www.bnm.gov.my/monetary-policy' },
      { label: 'Department of Statistics Malaysia — Household income survey', url: 'https://www.dosm.gov.my' },
      { label: 'Valuation and Property Services Department (NAPIC)', url: 'https://napic.jpph.gov.my' },
      { label: 'AKPK — Credit counselling', url: 'https://www.akpk.org.my' },
    ],
    lastReviewed: '2026-04-18',
    reviewedBy: 'GURU Credits Senior Consultant',
  },
  selangor: {
    slug: 'selangor',
    regionCode: 'MY-10',
    name: { en: 'Selangor', ms: 'Selangor' },
    shortName: 'Selangor',
    primaryCity: 'Petaling Jaya',
    coordinates: { latitude: 3.0738, longitude: 101.5183 },
    metrics: {
      medianHouseholdIncomeMYR: 10702,
      medianPropertyPriceMYR: 495000,
      dsrMedianPercent: 48,
      primaryLoanProducts: ['home', 'car', 'personal'],
    },
    lenders: ['Maybank', 'CIMB', 'Public Bank', 'RHB', 'HLB', 'OCBC'],
    localContext: {
      en: 'Selangor is the largest mortgage market in Malaysia by volume. Buyers in Subang Jaya, Shah Alam, and Kajang typically balance dual-income affordability against car-loan commitments — making DSR fit the deciding factor.',
      ms: 'Selangor ialah pasaran gadai janji terbesar di Malaysia dari segi jumlah. Pembeli di Subang Jaya, Shah Alam dan Kajang biasanya mengimbangkan kemampuan pendapatan dua pasangan dengan komitmen pinjaman kereta — menjadikan padanan DSR faktor penentu.',
    },
    affordabilityNote: {
      en: 'Dual-income Selangor households with median combined income of ~RM10,700 typically qualify for RM950K–RM1.1M home loans when car commitments stay under RM1,500/month.',
      ms: 'Isi rumah dua pendapatan di Selangor dengan jumlah median ~RM10,700 biasanya layak untuk pinjaman rumah RM950K–RM1.1J apabila komitmen kereta kekal di bawah RM1,500/bulan.',
    },
    faqs: [
      {
        q: {
          en: 'How does a car loan affect home-loan approval in Selangor?',
          ms: 'Bagaimana pinjaman kereta mempengaruhi kelulusan pinjaman rumah di Selangor?',
        },
        a: {
          en: 'A RM1,200/month car commitment reduces your maximum mortgage by roughly RM240,000 at 35-year tenure. Selangor applicants often benefit from refinancing the car first.',
          ms: 'Komitmen kereta RM1,200/bulan mengurangkan maksimum gadai janji anda kira-kira RM240,000 pada tempoh 35 tahun. Pemohon Selangor sering mendapat manfaat daripada membiayai semula kereta terlebih dahulu.',
        },
      },
      {
        q: {
          en: 'Which Selangor banks give the best dual-income treatment?',
          ms: 'Bank Selangor mana yang memberi layanan dua pendapatan terbaik?',
        },
        a: {
          en: 'OCBC, CIMB and HLB are consistently strong. Maybank takes both incomes but applies a 90% factor on the lower earner — still worth applying but not the most aggressive.',
          ms: 'OCBC, CIMB dan HLB secara konsisten kuat. Maybank mengambil kedua-dua pendapatan tetapi menerapkan faktor 90% pada pendapatan yang lebih rendah — masih berbaloi memohon tetapi bukan yang paling agresif.',
        },
      },
      {
        q: {
          en: 'I work in Selangor but live across the KL border — which addresses matter?',
          ms: 'Saya bekerja di Selangor tetapi tinggal di sempadan KL — alamat mana yang penting?',
        },
        a: {
          en: 'For loan underwriting, the property address is what matters. Your residential and employer addresses are used for serviceability and verification, not for the lending decision itself.',
          ms: 'Untuk penjaminan pinjaman, alamat hartanah adalah yang penting. Alamat kediaman dan majikan anda digunakan untuk kebolehkhidmatan dan pengesahan, bukan untuk keputusan pinjaman itu sendiri.',
        },
      },
    ],
    marketTrends: SEL_MARKET_TRENDS,
    bankSpecialisation: SEL_BANK_SPECIALISATION,
    localCaseStudies: SEL_CASE_STUDIES,
    sources: [
      { label: 'Bank Negara Malaysia', url: 'https://www.bnm.gov.my' },
      { label: 'Selangor state planning data (MBPJ)', url: 'https://www.mbpj.gov.my' },
      { label: 'NAPIC property market reports', url: 'https://napic.jpph.gov.my' },
      { label: 'AKPK', url: 'https://www.akpk.org.my' },
    ],
    lastReviewed: '2026-04-18',
    reviewedBy: 'GURU Credits Senior Consultant',
  },
  penang: {
    slug: 'penang',
    regionCode: 'MY-07',
    name: { en: 'Penang', ms: 'Pulau Pinang' },
    shortName: 'Penang',
    primaryCity: 'George Town',
    coordinates: { latitude: 5.4141, longitude: 100.3288 },
    metrics: {
      medianHouseholdIncomeMYR: 7774,
      medianPropertyPriceMYR: 420000,
      dsrMedianPercent: 45,
      primaryLoanProducts: ['home', 'business', 'personal'],
    },
    lenders: ['Maybank', 'CIMB', 'Public Bank', 'HLB', 'Alliance', 'OCBC'],
    localContext: {
      en: "Penang's mortgage pipeline is split between George Town heritage conservation properties, Bayan Lepas E&E workforce, and Seberang Perai first-time buyers. Lender appetite varies widely by project type.",
      ms: 'Saluran gadai janji Pulau Pinang terbahagi antara hartanah pemuliharaan warisan George Town, tenaga kerja E&E Bayan Lepas, dan pembeli rumah pertama Seberang Perai. Selera pemberi pinjaman berbeza-beza mengikut jenis projek.',
    },
    affordabilityNote: {
      en: 'Penang heritage properties require specialist lenders due to property age caveats. We maintain a curated shortlist for pre-1970 conserved buildings.',
      ms: 'Hartanah warisan Pulau Pinang memerlukan pemberi pinjaman khusus disebabkan syarat usia hartanah. Kami menyelenggara senarai pendek khusus untuk bangunan terpelihara sebelum 1970.',
    },
    faqs: [
      {
        q: { en: 'Can I get a mortgage on a George Town heritage shophouse?', ms: 'Bolehkah saya dapatkan gadai janji untuk rumah kedai warisan George Town?' },
        a: {
          en: 'Yes but only a handful of banks. Expect lower LTV (70–80%) and additional condition surveys. Alliance Bank and AmBank have dedicated heritage-property workflows. Valuation is typically lower than market asking price.',
          ms: 'Ya tetapi hanya segelintir bank. Jangka LTV lebih rendah (70–80%) dan tinjauan keadaan tambahan. Alliance Bank dan AmBank mempunyai aliran kerja hartanah warisan khusus. Penilaian biasanya lebih rendah daripada harga tawaran pasaran.',
        },
      },
      {
        q: { en: 'Are E&E sector employees treated specially?', ms: 'Adakah pekerja sektor E&E diberi layanan khusus?' },
        a: {
          en: 'Most Penang banks maintain a preferred-employer list that includes Intel, ams OSRAM, B. Braun, and other multinational anchors. Employees of these firms often see faster decisions and slightly better margins.',
          ms: 'Kebanyakan bank Pulau Pinang mengekalkan senarai majikan pilihan termasuk Intel, ams OSRAM, B. Braun, dan jangkar multinasional lain. Pekerja firma-firma ini sering melihat keputusan lebih pantas dan margin sedikit lebih baik.',
        },
      },
    ],
    marketTrends: PEN_MARKET_TRENDS,
    bankSpecialisation: PEN_BANK_SPECIALISATION,
    sources: [
      { label: 'Bank Negara Malaysia', url: 'https://www.bnm.gov.my' },
      { label: 'Think City — George Town heritage research', url: 'https://thinkcity.com.my' },
      { label: 'NAPIC', url: 'https://napic.jpph.gov.my' },
    ],
    lastReviewed: '2026-04-18',
    reviewedBy: 'GURU Credits Senior Consultant',
  },
  johor: {
    slug: 'johor',
    regionCode: 'MY-01',
    name: { en: 'Johor', ms: 'Johor' },
    shortName: 'Johor',
    primaryCity: 'Johor Bahru',
    coordinates: { latitude: 1.4927, longitude: 103.7414 },
    metrics: {
      medianHouseholdIncomeMYR: 7535,
      medianPropertyPriceMYR: 395000,
      dsrMedianPercent: 47,
      primaryLoanProducts: ['home', 'business', 'car'],
    },
    lenders: ['Maybank', 'CIMB', 'Public Bank', 'OCBC', 'UOB', 'HSBC'],
    localContext: {
      en: "Johor's proximity to Singapore creates unique cross-border income patterns. Lenders increasingly accept SGD payslips but apply FX haircuts. The Forest City and Iskandar developments have their own loan offer structure.",
      ms: 'Kedekatan Johor dengan Singapura mewujudkan corak pendapatan rentas sempadan yang unik. Pemberi pinjaman semakin menerima slip gaji SGD tetapi menerapkan potongan FX. Pembangunan Forest City dan Iskandar mempunyai senarai pemberi pinjaman tersendiri.',
    },
    affordabilityNote: {
      en: 'SGD-income Johor borrowers should expect a 70–80% haircut applied to foreign income for DSR calculation. Plan accordingly.',
      ms: 'Peminjam Johor berpendapatan SGD harus menjangka potongan 70–80% terpakai kepada pendapatan asing untuk pengiraan DSR. Rancang dengan sewajarnya.',
    },
    faqs: [],
  },
  sabah: {
    slug: 'sabah',
    regionCode: 'MY-12',
    name: { en: 'Sabah', ms: 'Sabah' },
    shortName: 'Sabah',
    primaryCity: 'Kota Kinabalu',
    coordinates: { latitude: 5.9804, longitude: 116.0735 },
    metrics: {
      medianHouseholdIncomeMYR: 5745,
      medianPropertyPriceMYR: 325000,
      dsrMedianPercent: 44,
      primaryLoanProducts: ['home', 'personal', 'business'],
    },
    lenders: ['Maybank', 'CIMB', 'Public Bank', 'HLB', 'Bank Rakyat'],
    localContext: {
      en: 'Sabah borrowers frequently combine public-sector stability with supplementary business income. Native customary land title (NCR) mortgages follow distinct lender rules and documentation.',
      ms: 'Peminjam Sabah sering menggabungkan kestabilan sektor awam dengan pendapatan perniagaan tambahan. Gadai janji tanah adat anak negeri (NCR) mengikuti peraturan pemberi pinjaman dan dokumentasi yang berbeza.',
    },
    affordabilityNote: {
      en: 'For NCR title properties, only a handful of lenders in Sabah extend mortgages — often at lower LTV ceilings (80–85%).',
      ms: 'Untuk hartanah bertitle NCR, hanya segelintir pemberi pinjaman di Sabah menawarkan gadai janji — selalunya pada had LTV yang lebih rendah (80–85%).',
    },
    faqs: [],
  },
  sarawak: {
    slug: 'sarawak',
    regionCode: 'MY-13',
    name: { en: 'Sarawak', ms: 'Sarawak' },
    shortName: 'Sarawak',
    primaryCity: 'Kuching',
    coordinates: { latitude: 1.5533, longitude: 110.3592 },
    metrics: {
      medianHouseholdIncomeMYR: 5659,
      medianPropertyPriceMYR: 310000,
      dsrMedianPercent: 43,
      primaryLoanProducts: ['home', 'business', 'personal'],
    },
    lenders: ['Maybank', 'CIMB', 'Public Bank', 'RHB', 'HLB', 'Bank Rakyat'],
    localContext: {
      en: "Sarawak's state-specific land title system (including Native Area Land and Interior Area Land) affects which lenders will underwrite a mortgage. Timber and palm-oil sector employees see lender-specific income treatment.",
      ms: 'Sistem hakmilik tanah khusus negeri Sarawak (termasuk Tanah Kawasan Bumiputera dan Tanah Kawasan Pedalaman) mempengaruhi pemberi pinjaman yang akan menilai gadai janji. Pekerja sektor kayu dan kelapa sawit mendapat layanan pendapatan khusus pemberi pinjaman.',
    },
    affordabilityNote: {
      en: 'Sarawak land titles under the Land Code 1958 require specialist lender review. Tenures can differ materially from Peninsular Malaysia norms.',
      ms: 'Hakmilik tanah Sarawak di bawah Kanun Tanah 1958 memerlukan semakan pemberi pinjaman khusus. Tempoh boleh berbeza dengan ketara daripada norma Semenanjung Malaysia.',
    },
    faqs: [],
  },
  putrajaya: {
    slug: 'putrajaya',
    regionCode: 'MY-16',
    name: { en: 'Putrajaya', ms: 'Putrajaya' },
    shortName: 'Putrajaya',
    primaryCity: 'Putrajaya',
    coordinates: { latitude: 2.9264, longitude: 101.6964 },
    metrics: {
      medianHouseholdIncomeMYR: 13473,
      medianPropertyPriceMYR: 620000,
      dsrMedianPercent: 50,
      primaryLoanProducts: ['home', 'refinance', 'personal'],
    },
    lenders: ['Maybank', 'CIMB', 'Public Bank', 'RHB', 'HLB', 'Bank Rakyat'],
    localContext: {
      en: 'Putrajaya is dominated by federal government employees, which gives most applicants an employer-category advantage with public-sector-friendly lenders. LPPSA (government housing loan scheme) is common as a primary or companion facility.',
      ms: 'Putrajaya didominasi oleh pekerja kerajaan persekutuan, yang memberikan kebanyakan pemohon kelebihan kategori majikan dengan pemberi pinjaman mesra sektor awam. LPPSA (skim pinjaman perumahan kerajaan) adalah biasa sebagai kemudahan utama atau pelengkap.',
    },
    affordabilityNote: {
      en: 'Federal civil servants can access LPPSA at preferential terms. Many applicants combine an LPPSA facility with a private bank top-up loan for properties above the LPPSA cap.',
      ms: 'Penjawat awam persekutuan boleh mengakses LPPSA pada terma keutamaan. Ramai pemohon menggabungkan kemudahan LPPSA dengan pinjaman tambahan bank swasta untuk hartanah melebihi had LPPSA.',
    },
    faqs: [],
  },
  perak: {
    slug: 'perak',
    regionCode: 'MY-08',
    name: { en: 'Perak', ms: 'Perak' },
    shortName: 'Perak',
    primaryCity: 'Ipoh',
    coordinates: { latitude: 4.5975, longitude: 101.0901 },
    metrics: {
      medianHouseholdIncomeMYR: 5869,
      medianPropertyPriceMYR: 285000,
      dsrMedianPercent: 45,
      primaryLoanProducts: ['home', 'personal', 'business'],
    },
    lenders: ['Maybank', 'CIMB', 'Public Bank', 'RHB', 'HLB', 'Bank Rakyat'],
    localContext: {
      en: 'Ipoh remains the centre of Perak property activity, with mature landed stock and a strong heritage-property segment in Old Town. Outside Ipoh, Taiping, Sitiawan and Parit Buntar see steady first-time buyer demand.',
      ms: 'Ipoh kekal sebagai pusat aktiviti hartanah Perak, dengan stok berkembar matang dan segmen hartanah warisan yang kuat di Bandar Lama. Di luar Ipoh, Taiping, Sitiawan dan Parit Buntar menyaksikan permintaan pembeli rumah pertama yang stabil.',
    },
    affordabilityNote: {
      en: 'Lower median prices mean most Perak applicants clear DSR comfortably — the more common challenge is insufficient credit history for those who have relied on cash throughout their careers.',
      ms: 'Harga median yang lebih rendah bermakna kebanyakan pemohon Perak lulus DSR dengan selesa — cabaran lebih biasa ialah sejarah kredit yang tidak mencukupi bagi mereka yang bergantung kepada tunai sepanjang kerjaya.',
    },
    faqs: [],
  },
  kedah: {
    slug: 'kedah',
    regionCode: 'MY-02',
    name: { en: 'Kedah', ms: 'Kedah' },
    shortName: 'Kedah',
    primaryCity: 'Alor Setar',
    coordinates: { latitude: 6.1184, longitude: 100.3685 },
    metrics: {
      medianHouseholdIncomeMYR: 4830,
      medianPropertyPriceMYR: 235000,
      dsrMedianPercent: 44,
      primaryLoanProducts: ['home', 'personal', 'business'],
    },
    lenders: ['Maybank', 'CIMB', 'Public Bank', 'RHB', 'Bank Rakyat', 'Bank Islam'],
    localContext: {
      en: 'Kedah borrowers are often employed in agriculture, public sector, or the Kulim Hi-Tech Park industrial corridor. Islamic financing uptake is high, and Bank Rakyat / Bank Islam play an outsized role in consumer credit.',
      ms: 'Peminjam Kedah sering bekerja dalam pertanian, sektor awam, atau koridor perindustrian Taman Teknologi Tinggi Kulim. Pengambilan pembiayaan Islam adalah tinggi, dan Bank Rakyat / Bank Islam memainkan peranan yang besar dalam kredit pengguna.',
    },
    affordabilityNote: {
      en: 'Lower property prices combined with modest median income keep DSR pressure manageable, but thin credit files are a common reason for declines.',
      ms: 'Harga hartanah yang lebih rendah digabungkan dengan pendapatan median yang sederhana mengekalkan tekanan DSR yang terurus, tetapi fail kredit yang nipis adalah sebab biasa untuk penolakan.',
    },
    faqs: [],
  },
  perlis: {
    slug: 'perlis',
    regionCode: 'MY-09',
    name: { en: 'Perlis', ms: 'Perlis' },
    shortName: 'Perlis',
    primaryCity: 'Kangar',
    coordinates: { latitude: 6.4414, longitude: 100.1986 },
    metrics: {
      medianHouseholdIncomeMYR: 4713,
      medianPropertyPriceMYR: 205000,
      dsrMedianPercent: 43,
      primaryLoanProducts: ['home', 'personal', 'business'],
    },
    lenders: ['Maybank', 'CIMB', 'Public Bank', 'Bank Rakyat', 'Bank Islam'],
    localContext: {
      en: 'Malaysia\u2019s smallest state has a correspondingly compact lender footprint. Public-sector and agriculture employment drive most credit applications, and Bank Rakyat has historically been the largest consumer lender locally.',
      ms: 'Negeri terkecil Malaysia mempunyai jejak pemberi pinjaman yang kecil. Pekerjaan sektor awam dan pertanian mendorong kebanyakan permohonan kredit, dan Bank Rakyat secara sejarah adalah pemberi pinjaman pengguna terbesar di sini.',
    },
    affordabilityNote: {
      en: 'Property valuations for rural Perlis locations can come in below asking price, reducing effective LTV. Build a cash buffer of at least 15% of asking to stay flexible.',
      ms: 'Penilaian hartanah untuk lokasi luar bandar Perlis boleh lebih rendah daripada harga tawaran, mengurangkan LTV berkesan. Bina penampan tunai sekurang-kurangnya 15% daripada harga tawaran untuk kekal fleksibel.',
    },
    faqs: [],
  },
  kelantan: {
    slug: 'kelantan',
    regionCode: 'MY-03',
    name: { en: 'Kelantan', ms: 'Kelantan' },
    shortName: 'Kelantan',
    primaryCity: 'Kota Bharu',
    coordinates: { latitude: 6.1254, longitude: 102.2381 },
    metrics: {
      medianHouseholdIncomeMYR: 4874,
      medianPropertyPriceMYR: 220000,
      dsrMedianPercent: 43,
      primaryLoanProducts: ['home', 'personal', 'business'],
    },
    lenders: ['Maybank', 'CIMB', 'Bank Islam', 'Bank Rakyat', 'Agrobank', 'Public Bank'],
    localContext: {
      en: 'Kelantan has one of the highest shares of Shariah-compliant financing in Malaysia. Bank Islam, Bank Muamalat and Agrobank lead the market; conventional lenders serve a smaller share of borrowers.',
      ms: 'Kelantan mempunyai bahagian pembiayaan patuh Syariah yang paling tinggi di Malaysia. Bank Islam, Bank Muamalat dan Agrobank mendahului pasaran; pemberi pinjaman konvensional melayani sebahagian kecil peminjam.',
    },
    affordabilityNote: {
      en: 'If you prefer Islamic financing, start the conversation at Bank Islam or Bank Muamalat — their underwriting teams are experienced with Kelantan income profiles.',
      ms: 'Jika anda lebih suka pembiayaan Islam, mulakan perbincangan di Bank Islam atau Bank Muamalat — pasukan penjaminan mereka berpengalaman dengan profil pendapatan Kelantan.',
    },
    faqs: [],
  },
  terengganu: {
    slug: 'terengganu',
    regionCode: 'MY-11',
    name: { en: 'Terengganu', ms: 'Terengganu' },
    shortName: 'Terengganu',
    primaryCity: 'Kuala Terengganu',
    coordinates: { latitude: 5.3117, longitude: 103.1324 },
    metrics: {
      medianHouseholdIncomeMYR: 5590,
      medianPropertyPriceMYR: 240000,
      dsrMedianPercent: 44,
      primaryLoanProducts: ['home', 'personal', 'business'],
    },
    lenders: ['Maybank', 'CIMB', 'Bank Islam', 'Public Bank', 'RHB', 'Bank Rakyat'],
    localContext: {
      en: 'Terengganu\u2019s oil-and-gas corridor around Kertih and Paka creates a pocket of high-income technical workers with strong lender appetite. Outside O&G, public-sector employment dominates borrower profiles.',
      ms: 'Koridor minyak-dan-gas Terengganu di sekitar Kertih dan Paka mewujudkan kumpulan pekerja teknikal berpendapatan tinggi dengan selera pemberi pinjaman yang kuat. Di luar O&G, pekerjaan sektor awam mendominasi profil peminjam.',
    },
    affordabilityNote: {
      en: 'O&G contract workers should prepare 6–12 months of bank-in records and an employer confirmation letter — banks scrutinise contract stability more than headline salary.',
      ms: 'Pekerja kontrak O&G harus sediakan rekod bank-in 6–12 bulan dan surat pengesahan majikan — bank meneliti kestabilan kontrak lebih daripada gaji utama.',
    },
    faqs: [],
  },
  pahang: {
    slug: 'pahang',
    regionCode: 'MY-06',
    name: { en: 'Pahang', ms: 'Pahang' },
    shortName: 'Pahang',
    primaryCity: 'Kuantan',
    coordinates: { latitude: 3.8077, longitude: 103.326 },
    metrics: {
      medianHouseholdIncomeMYR: 5516,
      medianPropertyPriceMYR: 285000,
      dsrMedianPercent: 45,
      primaryLoanProducts: ['home', 'personal', 'business'],
    },
    lenders: ['Maybank', 'CIMB', 'Public Bank', 'RHB', 'HLB', 'Bank Rakyat'],
    localContext: {
      en: 'Pahang\u2019s largest property market is Kuantan, with the Gebeng industrial zone driving steady middle-income mortgage demand. Tourism-adjacent markets in Cameron Highlands and Bentong have their own valuation complexities.',
      ms: 'Pasaran hartanah terbesar Pahang ialah Kuantan, dengan zon perindustrian Gebeng mendorong permintaan gadai janji pertengahan yang stabil. Pasaran berdekatan pelancongan di Cameron Highlands dan Bentong mempunyai kerumitan penilaian tersendiri.',
    },
    affordabilityNote: {
      en: 'Properties in tourism-heavy areas (Cameron Highlands, Genting) are often valued conservatively by lenders — expect LTV a few points below advertised ceiling.',
      ms: 'Hartanah di kawasan banyak pelancongan (Cameron Highlands, Genting) sering dinilai secara konservatif oleh pemberi pinjaman — jangka LTV beberapa mata di bawah had yang diiklankan.',
    },
    faqs: [],
  },
  'negeri-sembilan': {
    slug: 'negeri-sembilan',
    regionCode: 'MY-05',
    name: { en: 'Negeri Sembilan', ms: 'Negeri Sembilan' },
    shortName: 'N. Sembilan',
    primaryCity: 'Seremban',
    coordinates: { latitude: 2.7258, longitude: 101.9424 },
    metrics: {
      medianHouseholdIncomeMYR: 6706,
      medianPropertyPriceMYR: 325000,
      dsrMedianPercent: 46,
      primaryLoanProducts: ['home', 'personal', 'business'],
    },
    lenders: ['Maybank', 'CIMB', 'Public Bank', 'RHB', 'HLB', 'Bank Rakyat'],
    localContext: {
      en: 'Seremban benefits from spillover demand from Klang Valley commuters via the Seremban–KL rail link. First-time buyer stock under RM 350K in Rasah and Senawang is a steady segment.',
      ms: 'Seremban mendapat manfaat daripada permintaan limpahan dari peminjam Lembah Klang melalui pautan kereta api Seremban–KL. Stok pembeli rumah pertama di bawah RM 350K di Rasah dan Senawang adalah segmen yang stabil.',
    },
    affordabilityNote: {
      en: 'Commuter profiles (work in KL, buy in Seremban) typically secure the best DSR treatment — banks view them as KL earners with NS cost of living.',
      ms: 'Profil peminjam ulang-alik (bekerja di KL, beli di Seremban) biasanya mendapat layanan DSR terbaik — bank melihat mereka sebagai pemperoleh KL dengan kos hidup NS.',
    },
    faqs: [],
  },
  melaka: {
    slug: 'melaka',
    regionCode: 'MY-04',
    name: { en: 'Melaka', ms: 'Melaka' },
    shortName: 'Melaka',
    primaryCity: 'Melaka City',
    coordinates: { latitude: 2.1896, longitude: 102.2501 },
    metrics: {
      medianHouseholdIncomeMYR: 6054,
      medianPropertyPriceMYR: 315000,
      dsrMedianPercent: 45,
      primaryLoanProducts: ['home', 'personal', 'business'],
    },
    lenders: ['Maybank', 'CIMB', 'Public Bank', 'RHB', 'HLB', 'OCBC'],
    localContext: {
      en: 'Melaka\u2019s heritage zone (Banda Hilir, Jonker) has conservation rules similar to Penang\u2019s George Town. Outside heritage, landed stock in Ayer Keroh and Batu Berendam sees regular first-time buyer activity.',
      ms: 'Zon warisan Melaka (Banda Hilir, Jonker) mempunyai peraturan pemuliharaan yang serupa dengan George Town Pulau Pinang. Di luar warisan, stok berkembar di Ayer Keroh dan Batu Berendam menyaksikan aktiviti pembeli rumah pertama yang tetap.',
    },
    affordabilityNote: {
      en: 'Heritage shophouse mortgages require specialist valuation and are not universally offered — plan a longer approval runway.',
      ms: 'Gadai janji rumah kedai warisan memerlukan penilaian khusus dan tidak ditawarkan secara universal — rancang landasan kelulusan yang lebih panjang.',
    },
    faqs: [],
  },
  labuan: {
    slug: 'labuan',
    regionCode: 'MY-15',
    name: { en: 'Labuan', ms: 'Labuan' },
    shortName: 'Labuan',
    primaryCity: 'Labuan',
    coordinates: { latitude: 5.2831, longitude: 115.2308 },
    metrics: {
      medianHouseholdIncomeMYR: 7750,
      medianPropertyPriceMYR: 290000,
      dsrMedianPercent: 45,
      primaryLoanProducts: ['home', 'personal', 'business'],
    },
    lenders: ['Maybank', 'CIMB', 'Public Bank', 'HLB', 'RHB', 'Bank Rakyat'],
    localContext: {
      en: 'Labuan\u2019s Federal Territory status and offshore financial centre create distinctive employment patterns: banking, shipping, and oil-and-gas services. Lenders apply Sabah-adjacent documentation rules.',
      ms: 'Status Wilayah Persekutuan Labuan dan pusat kewangan luar pesisir mewujudkan corak pekerjaan yang tersendiri: perbankan, perkapalan, dan perkhidmatan minyak-dan-gas. Pemberi pinjaman mengenakan peraturan dokumentasi berdekatan Sabah.',
    },
    affordabilityNote: {
      en: 'Offshore-company employees should prepare additional income-source documentation; some lenders apply a haircut to foreign-currency-denominated income.',
      ms: 'Pekerja syarikat luar pesisir harus sediakan dokumentasi sumber pendapatan tambahan; sesetengah pemberi pinjaman mengenakan potongan pada pendapatan yang dinyatakan dalam mata wang asing.',
    },
    faqs: [],
  },
};

export const regionSlugs = Object.keys(regions) as RegionSlug[];

export function getRegion(slug: string): RegionData | null {
  return regions[slug as RegionSlug] ?? null;
}

export function formatMYR(value: number) {
  return new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function regionMetaLabel(language: Language) {
  return language === 'ms' ? 'Pembiayaan di' : 'Loan Advisory in';
}
