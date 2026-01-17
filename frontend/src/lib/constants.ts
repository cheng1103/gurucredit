import { SERVICE_AREA_CODES } from './form-options';

// ========================================
// GURU Credits - Shared Constants
// ========================================

// Company Information
export const COMPANY = {
  name: 'GURU Credits',
  tagline: 'CREDITS',
  logo: '/images/optimized/logo.jpg',
  phone: '011-2748 6389',
  phoneLink: 'tel:+60112748389',
  whatsapp: '011-2748 6389',
  whatsappLink: 'https://wa.me/60112748389',
  email: 'info@gurucredits.my',
  emailLink: 'mailto:info@gurucredits.my',
  location: 'Level 5, 13A, Jalan Semantan, Damansara Heights, 50490 Kuala Lumpur',
  facebook: 'https://facebook.com/gurucredits',
  instagram: 'https://instagram.com/gurucredits',
};

// Primary service coverage (Klang Valley)
export const SERVICE_AREAS = [
  {
    name: 'Kuala Lumpur',
    regionCode: 'MY-14',
    locality: 'Kuala Lumpur',
    shortName: 'KL',
    coordinates: {
      latitude: 3.139,
      longitude: 101.6869,
    },
  },
  {
    name: 'Selangor',
    regionCode: 'MY-10',
    locality: 'Petaling Jaya / Shah Alam',
    shortName: 'Selangor',
    coordinates: {
      latitude: 3.0738,
      longitude: 101.5183,
    },
  },
] as const;

export type ServiceArea = (typeof SERVICE_AREAS)[number];
export type ServiceAreaCode = ServiceArea['regionCode'];
export { SERVICE_AREA_CODES };

export const SERVICE_AREA_LABEL = 'Kuala Lumpur & Selangor (Klang Valley)';
export const SERVICE_AREA_NOTE = 'Applications are currently open to borrowers based in Kuala Lumpur and Selangor only.';

// Slogans
export const SLOGANS = {
  en: 'Credit Made Simple',
  ms: 'Kredit Mudah, Hidup Lebih Tenang',
};

export const TRUST_BLOCK = {
  en: {
    title: 'Trust & Compliance',
    description: 'We prioritize transparency, privacy, and responsible lending guidance.',
    items: [
      {
        title: 'PDPA-first handling',
        description: 'Your documents are reviewed securely and never shared without consent.',
      },
      {
        title: 'Transparent fee notice',
        description: 'RM30 analysis fee is collected only after submission via official WhatsApp.',
      },
      {
        title: 'Bank-ready documentation',
        description: 'We align documents with lender expectations to avoid avoidable rejections.',
      },
    ],
  },
  ms: {
    title: 'Kepercayaan & Pematuhan',
    description: 'Kami utamakan ketelusan, privasi, dan panduan pinjaman yang bertanggungjawab.',
    items: [
      {
        title: 'Pengendalian PDPA',
        description: 'Dokumen anda disemak secara selamat dan tidak dikongsi tanpa kebenaran.',
      },
      {
        title: 'Notis yuran telus',
        description: 'Yuran analisis RM30 hanya dikutip selepas penghantaran melalui WhatsApp rasmi.',
      },
      {
        title: 'Dokumen siap bank',
        description: 'Kami sesuaikan dokumen ikut keperluan bank untuk elak penolakan.',
      },
    ],
  },
};

// Business Hours
export const BUSINESS_HOURS = [
  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 2:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

// Statistics
export const STATS = {
  clientsHelped: '1,000+',
  successRate: '85%',
  yearsExperience: '5+',
  turnaround: '24h',
};

// Loan Products
export const SERVICES = [
  {
    id: '1',
    title: 'Personal Loan',
    description: 'Quick cash for emergencies, medical bills, debt consolidation, or any personal needs.',
    price: 4.88,
    priceFormatted: '4.88%',
    duration: '24 hours',
    popular: true,
    features: [
      'Loan up to RM100,000',
      'Flexible tenure 1-7 years',
      'Fast approval within 24 hours',
      'Minimal documentation',
      'No collateral required',
      'Competitive rates from 4.88%',
      'Fixed monthly installments',
    ],
  },
  {
    id: '2',
    title: 'Car Loan',
    description: 'Finance your dream car with competitive rates and flexible repayment terms.',
    price: 3.5,
    priceFormatted: '3.5%',
    duration: '24-48 hours',
    popular: false,
    features: [
      'New & used car financing',
      'Up to 90% financing',
      'Tenure up to 9 years',
      'Competitive rates',
      'Fast approval',
    ],
  },
  {
    id: '3',
    title: 'Home Loan',
    description: 'Make your dream home a reality with our home financing solutions.',
    price: 4.0,
    priceFormatted: '4.0%',
    duration: '1-2 weeks',
    popular: false,
    features: [
      'Up to 90% financing',
      'Tenure up to 35 years',
      'Competitive rates',
      'Flexible repayment',
      'Free consultation',
    ],
  },
  {
    id: '4',
    title: 'Business Loan',
    description: 'Grow your business with our flexible financing options for SMEs.',
    price: 5.5,
    priceFormatted: '5.5%',
    duration: '3-5 days',
    popular: false,
    features: [
      'Working capital',
      'Equipment financing',
      'Business expansion',
      'Flexible terms',
      'Quick processing',
    ],
  },
];

// FAQ Categories
export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'services', label: 'Our Services' },
  { id: 'dsr', label: 'DSR & Credit' },
  { id: 'process', label: 'Process' },
  { id: 'payment', label: 'Payment' },
  { id: 'security', label: 'Security' },
];

// FAQs
export const FAQS = [
  // Services
  {
    category: 'services',
    question: 'What is included in the Eligibility Analysis Package?',
    answer: 'Our RM30 Eligibility Analysis Package includes: complete credit report analysis (CCRIS & CTOS), DSR calculation and assessment, loan approval chances evaluation, maximum loan limit estimation, issue identification with solutions, personalized bank recommendations, and full explanation with guidance. You receive a comprehensive report within 24 hours.',
  },
  {
    category: 'services',
    question: 'Do you guarantee loan approval?',
    answer: 'No, we do not guarantee loan approval as the final decision rests with the banks. However, our analysis significantly improves your chances by identifying potential issues beforehand, recommending the right banks, and helping you present a stronger application. Our clients have an 85% success rate when following our recommendations.',
  },
  {
    category: 'services',
    question: 'What other services do you offer besides the Eligibility Analysis?',
    answer: 'We offer several additional services: DSR Consultation (RM20) for focused debt ratio optimization, Loan Application Assistance (RM50) for full support from document preparation to bank liaison, and Credit Repair Consultation (RM40) for guidance on improving your credit score and resolving credit issues.',
  },
  {
    category: 'services',
    question: 'Can you help with all types of loans?',
    answer: 'Yes, we can help with various loan types including home loans/mortgages, car loans/hire purchase, personal loans, business loans, and refinancing. Our analysis covers the criteria that banks use for all these loan types.',
  },
  // DSR & Credit
  {
    category: 'dsr',
    question: 'What is DSR and why is it important?',
    answer: 'DSR (Debt Service Ratio) is the percentage of your monthly income that goes towards debt payments. Banks use DSR to assess your ability to repay loans. Most Malaysian banks require DSR below 60-70%. A lower DSR means higher borrowing capacity and better approval chances.',
  },
  {
    category: 'dsr',
    question: 'What is a good DSR percentage?',
    answer: 'Generally: Below 30% is excellent (best rates available), 30-40% is good (most banks approve), 40-50% is moderate (some restrictions may apply), 50-60% is high (limited options), and above 60% is critical (most banks will reject). We recommend keeping DSR below 50% for optimal approval chances.',
  },
  {
    category: 'dsr',
    question: 'What is CCRIS and CTOS?',
    answer: 'CCRIS (Central Credit Reference Information System) is maintained by Bank Negara Malaysia and contains your credit history with financial institutions. CTOS (Credit Tip-Off Service) is a private credit reporting agency that provides credit reports. Both are used by banks to assess your creditworthiness.',
  },
  {
    category: 'dsr',
    question: 'How can I improve my DSR?',
    answer: 'You can improve your DSR by: paying off existing debts, increasing your income, avoiding new debt commitments, consolidating multiple loans into one, settling credit card balances, and negotiating lower interest rates on existing loans. Our DSR Consultation service provides personalized strategies.',
  },
  {
    category: 'dsr',
    question: 'What affects my credit score?',
    answer: 'Your credit score is affected by: payment history (late payments, defaults), credit utilization (how much of your credit limit you use), length of credit history, types of credit accounts, recent credit applications, and outstanding debts. We analyze all these factors in our report.',
  },
  // Process
  {
    category: 'process',
    question: 'How long does the analysis take?',
    answer: 'Most analyses are completed within 24 hours after we receive your complete information. For complex cases or during peak periods, it may take up to 48 hours. We will notify you immediately once your report is ready.',
  },
  {
    category: 'process',
    question: 'What documents do I need to provide?',
    answer: 'Basic documents include: copy of IC (front and back), latest 3 months pay slips or income statements, latest EPF statement, bank statements (if required), and existing loan documents. For self-employed individuals, we may require business registration documents and bank statements.',
  },
  {
    category: 'process',
    question: 'Do I need to create an account to use your services?',
    answer: 'No account is required. Simply fill out the application form with your details, submit it, and we will send your analysis report directly to your email.',
  },
  {
    category: 'process',
    question: 'Do I pay the RM30 analysis fee on the website?',
    answer: 'No. We only collect the RM30 eligibility analysis fee after you submit the form, and strictly via our official WhatsApp chat. Wait for our consultant to say hello and share the payment link—ignore any other requests. You can track your application anytime via the Track Application page.',
  },
  {
    category: 'process',
    question: 'How will I receive my analysis report?',
    answer: 'Your analysis report will be sent to your email address within 24 hours. We will also notify you via WhatsApp if you provide your phone number. The report includes detailed explanations, recommendations, and next steps.',
  },
  {
    category: 'process',
    question: 'What happens after I receive my report?',
    answer: 'After receiving your report, you can: review the detailed analysis and recommendations, contact us for clarification if needed, proceed with loan application to recommended banks, or use our Loan Application Assistance service for full support. We are here to guide you through the entire process.',
  },
  // Payment
  {
    category: 'payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept various payment methods including online banking (FPX), credit/debit cards, e-wallets (Touch n Go, GrabPay, Boost), and bank transfer. All payments are processed securely through trusted payment gateways.',
  },
  {
    category: 'payment',
    question: 'Is there a refund policy?',
    answer: 'If we are unable to complete your analysis due to incomplete information that cannot be resolved, we offer a full refund. Once the analysis is completed and the report is delivered, the service is non-refundable. Please ensure you provide accurate information to avoid any issues.',
  },
  {
    category: 'payment',
    question: 'Are there any hidden fees?',
    answer: 'No, there are no hidden fees. The price you see is the price you pay. Our Eligibility Analysis is RM30, DSR Consultation is RM20, Loan Application Assistance is RM50, and Credit Repair Consultation is RM40. All prices are one-time fees.',
  },
  // Security
  {
    category: 'security',
    question: 'Is my personal information secure?',
    answer: 'Yes, absolutely. We take data security very seriously. All data is encrypted using industry-standard SSL encryption, handled according to PDPA (Personal Data Protection Act) guidelines, stored securely and never shared with third parties without your consent, and only used for the purpose of your analysis.',
  },
  {
    category: 'security',
    question: 'Who will see my financial information?',
    answer: 'Only our certified financial consultants will access your information, and solely for the purpose of conducting your analysis. We do not share your data with banks or any third parties unless you explicitly authorize us to do so (e.g., for Loan Application Assistance service).',
  },
  {
    category: 'security',
    question: 'How long do you keep my data?',
    answer: 'We retain your data for a maximum of 12 months after your last transaction with us, in accordance with regulatory requirements. You can request deletion of your data at any time by contacting us. We will process your request within 14 business days.',
  },
];

// Testimonials
export const TESTIMONIALS = [
  {
    name: 'Ahmad R.',
    location: 'Kuala Lumpur',
    text: 'GURU Credits helped me understand why my previous loan applications were rejected. Their analysis identified issues with my credit report I never knew about. After following their recommendations, I got approved for my home loan!',
    rating: 5,
  },
  {
    name: 'Sarah L.',
    location: 'Petaling Jaya, Selangor',
    text: 'The RM30 analysis was worth every sen. Very detailed report with clear explanations. They even recommended which banks would be more likely to approve my application based on my profile.',
    rating: 5,
  },
  {
    name: 'Raj K.',
    location: 'Shah Alam, Selangor',
    text: 'Professional service with fast turnaround. Got my report within 24 hours as promised. The DSR calculation and bank recommendations were spot on. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Mei Ling T.',
    location: 'Cyberjaya, Selangor',
    text: 'I was nervous about applying for a car loan after being rejected once. GURU Credits showed me exactly what to fix. Three months later, I got approved with a great interest rate!',
    rating: 5,
  },
];

// Values
export const COMPANY_VALUES = [
  {
    title: 'Trust & Security',
    description: 'Your personal and financial data is handled with the highest level of confidentiality. We comply with PDPA guidelines and never share your information.',
  },
  {
    title: 'Client First',
    description: 'Your financial success is our priority. We provide honest assessments and recommendations that serve your best interest, not ours.',
  },
  {
    title: 'Excellence',
    description: 'Our team consists of experienced financial consultants who deliver professional, accurate analysis backed by industry expertise.',
  },
  {
    title: 'Efficiency',
    description: 'We understand time is valuable. Get your comprehensive analysis within 24 hours without compromising on quality.',
  },
];

// Timeline
export const COMPANY_TIMELINE = [
  { year: '2019', title: 'Founded', description: 'Started with a mission to make financial consultation accessible to all Malaysians.' },
  { year: '2020', title: 'Online Launch', description: 'Launched our online platform to serve clients across Malaysia.' },
  { year: '2021', title: '500 Clients', description: 'Reached our first 500 satisfied clients milestone.' },
  { year: '2023', title: '1000+ Clients', description: 'Helped over 1000 Malaysians with their loan applications.' },
  { year: '2024', title: 'Expansion', description: 'Expanded services to include credit repair and loan application assistance.' },
];

// Navigation Links
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/calculator', label: 'DSR Calculator' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

// Footer Links
export const FOOTER_QUICK_LINKS = [
  { href: '/services', label: 'Our Services' },
  { href: '/calculator', label: 'DSR Calculator' },
  { href: '/compare', label: 'Compare Loans' },
  { href: '/documents', label: 'Document Checklist' },
  { href: '/glossary', label: 'Financial Glossary' },
];

export const FOOTER_SERVICE_LINKS = [
  { href: '/services/1/apply', label: 'Personal Loan' },
  { href: '/services/2/apply', label: 'Car Loan' },
  { href: '/services/3/apply', label: 'Home Loan' },
  { href: '/services/4/apply', label: 'Business Loan' },
];

export const FOOTER_LEGAL_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

export const FOOTER_RESOURCE_LINKS = [
  { href: '/blog', label: 'Blog' },
  { href: '/compare', label: 'Compare Loans' },
  { href: '/documents', label: 'Document Checklist' },
  { href: '/glossary', label: 'Financial Glossary' },
  { href: '/faq', label: 'FAQ' },
];

// SEO Metadata
export const SEO = {
  siteName: 'GURU Credits',
  defaultTitle: 'GURU Credits - Loan Guidance for Kuala Lumpur & Selangor (From 4.88%)',
  defaultDescription:
    'Loan consultation and DSR analysis dedicated to Kuala Lumpur & Selangor residents (Klang Valley). RM30 eligibility check, fast 24-hour turnaround, home loan, car loan, and debt consolidation guidance with curated bank shortlists.',
  keywords:
    'personal loan Kuala Lumpur, personal loan Selangor, home loan Malaysia, car loan Malaysia, debt consolidation Malaysia, credit score Malaysia, Klang Valley loan consultant, KL pinjaman peribadi, Selangor loan advice, GURU Credits',
  url: 'https://gurucredits.my',
  locale: 'en_MY',
  shareImage: '/images/optimized/logo.jpg',
  translations: {
    ms: {
      defaultTitle: 'GURU Credits - Panduan Pinjaman untuk Kuala Lumpur & Selangor (Dari 4.88%)',
      defaultDescription:
        'Perundingan pinjaman dan analisis DSR khusus untuk penduduk Kuala Lumpur & Selangor. Semakan kelayakan RM30, laporan dalam 24 jam, panduan pinjaman rumah, pinjaman kereta, dan penyatuan hutang dengan senarai bank yang sesuai.',
      keywords:
        'pinjaman peribadi Kuala Lumpur, pinjaman Selangor, pinjaman rumah Malaysia, pinjaman kereta Malaysia, penyatuan hutang Malaysia, skor kredit Malaysia, konsultasi pinjaman Lembah Klang, khidmat pinjaman KL, nasihat pinjaman Selangor, GURU Credits',
    },
  },
};
