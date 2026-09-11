import type { Language } from '@/lib/i18n/translations';
import { COMPANY, SERVICE_AREA_LABEL } from '@/lib/constants';

export interface ContactPageContent {
  eyebrow: string;
  title: string;
  breadcrumbHome: string;
  breadcrumbLabel: string;
  meta: string;
  paymentNotice: string;
  form: {
    title: string;
    description: string;
    fields: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      serviceArea: { label: string; helper: string };
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
    };
    submit: string;
    success: { title: string; description: string; button: string };
    toast: string;
    errorToast: string;
  };
  contactInfo: {
    title: string;
    mapTitle: string;
    items: { title: string; value: string; href?: string; description: string }[];
  };
  businessHours: {
    title: string;
    items: { day: string; hours: string }[];
    note: string;
  };
  social: { title: string };
  quickLinks: {
    eyebrow: string;
    title: string;
    items: { label: string; href: string; description: string }[];
    cta: string;
  };
}

export const contactContent: Record<Language, ContactPageContent> = {
  en: {
    eyebrow: 'Get In Touch',
    title: 'Contact Us',
    breadcrumbHome: 'Home',
    breadcrumbLabel: 'Contact',
    meta: '24h response time · Nationwide support · WhatsApp-first support',
    paymentNotice:
      'Reminder: RM30 eligibility fee is only collected by our consultant via WhatsApp after you submit the form. We never accept payments on this website.',
    form: {
      title: 'Send Us a Message',
      description: "Fill out the form below and we'll get back to you as soon as possible.",
      fields: {
        name: 'Full Name',
        namePlaceholder: 'Your name',
        email: 'Email Address',
        emailPlaceholder: 'your@email.com',
        phone: 'Phone Number',
        phonePlaceholder: '+60 12-345 6789',
        serviceArea: {
          label: 'Where do you live?',
          helper: 'We assist borrowers across Malaysia, including Sabah and Sarawak.',
        },
        subject: 'Subject',
        subjectPlaceholder: 'How can we help?',
        message: 'Message',
        messagePlaceholder: 'Tell us more about your inquiry...',
      },
      submit: 'Send Message',
      success: {
        title: 'Message Sent!',
        description: "Thank you for reaching out. We'll respond within 24 hours.",
        button: 'Send Another Message',
      },
      toast: 'Message sent successfully! We will get back to you soon.',
      errorToast: 'Failed to send message. Please try again.',
    },
    contactInfo: {
      title: 'Contact Information',
      mapTitle: 'Our Location',
      items: [
        { title: 'Phone', value: COMPANY.phone, href: COMPANY.phoneLink, description: 'Mon-Fri, 9am-6pm' },
        { title: 'WhatsApp', value: COMPANY.phone, href: COMPANY.whatsappLink, description: 'Quick response guaranteed' },
        { title: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}`, description: 'We reply within 24 hours' },
        { title: 'Service Coverage', value: SERVICE_AREA_LABEL, description: 'Nationwide coverage including Sabah and Sarawak.' },
        { title: 'Location', value: COMPANY.location, href: 'https://g.co/kgs/BXpEnEx', description: 'Damansara Heights, Kuala Lumpur' },
      ],
    },
    businessHours: {
      title: 'Business Hours',
      items: [
        { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
        { day: 'Saturday', hours: '10:00 AM - 2:00 PM' },
        { day: 'Sunday', hours: 'Closed' },
      ],
      note: '* WhatsApp support available outside business hours',
    },
    social: { title: 'Follow Us' },
    quickLinks: {
      eyebrow: 'Quick Links',
      title: 'Looking for Something Else?',
      items: [
        { label: 'Check Our Services', href: '/services', description: 'View pricing and packages' },
        { label: 'Try Eligibility Test', href: '/eligibility-test', description: 'Quick loan readiness check' },
        { label: 'Read FAQs', href: '/faq', description: 'Common questions answered' },
      ],
      cta: 'Learn More',
    },
  },
  ms: {
    eyebrow: 'Hubungi Kami',
    title: 'Hubungi Kami',
    breadcrumbHome: 'Utama',
    breadcrumbLabel: 'Hubungi',
    meta: 'Respons dalam 24 jam · Sokongan seluruh negara · Sokongan WhatsApp',
    paymentNotice:
      'Peringatan: Yuran kelayakan RM30 hanya dikutip oleh perunding kami melalui WhatsApp selepas borang dihantar. Tiada bayaran diterima dalam laman web ini.',
    form: {
      title: 'Hantar Mesej Kepada Kami',
      description: 'Isi borang di bawah dan kami akan menghubungi anda secepat mungkin.',
      fields: {
        name: 'Nama Penuh',
        namePlaceholder: 'Nama anda',
        email: 'Alamat E-mel',
        emailPlaceholder: 'anda@email.com',
        phone: 'Nombor Telefon',
        phonePlaceholder: '+60 12-345 6789',
        serviceArea: {
          label: 'Anda tinggal di mana?',
          helper: 'Kami membantu peminjam di seluruh Malaysia termasuk Sabah dan Sarawak.',
        },
        subject: 'Subjek',
        subjectPlaceholder: 'Bagaimana kami boleh bantu?',
        message: 'Mesej',
        messagePlaceholder: 'Beritahu kami lebih lanjut tentang pertanyaan anda...',
      },
      submit: 'Hantar Mesej',
      success: {
        title: 'Mesej Dihantar!',
        description: 'Terima kasih kerana menghubungi kami. Kami akan membalas dalam 24 jam.',
        button: 'Hantar Mesej Lain',
      },
      toast: 'Mesej berjaya dihantar! Kami akan menghubungi anda tidak lama lagi.',
      errorToast: 'Gagal menghantar mesej. Sila cuba lagi.',
    },
    contactInfo: {
      title: 'Maklumat Hubungan',
      mapTitle: 'Lokasi Kami',
      items: [
        { title: 'Telefon', value: COMPANY.phone, href: COMPANY.phoneLink, description: 'Isn-Jum, 9pg-6ptg' },
        { title: 'WhatsApp', value: COMPANY.phone, href: COMPANY.whatsappLink, description: 'Respons pantas dijamin' },
        { title: 'E-mel', value: COMPANY.email, href: `mailto:${COMPANY.email}`, description: 'Kami balas dalam 24 jam' },
        { title: 'Liputan Perkhidmatan', value: SERVICE_AREA_LABEL, description: 'Liputan seluruh Malaysia termasuk Sabah dan Sarawak.' },
        { title: 'Lokasi', value: COMPANY.location, href: 'https://g.co/kgs/BXpEnEx', description: 'Damansara Heights, Kuala Lumpur' },
      ],
    },
    businessHours: {
      title: 'Waktu Perniagaan',
      items: [
        { day: 'Isnin - Jumaat', hours: '9:00 PG - 6:00 PTG' },
        { day: 'Sabtu', hours: '10:00 PG - 2:00 PTG' },
        { day: 'Ahad', hours: 'Tutup' },
      ],
      note: '* Sokongan WhatsApp tersedia di luar waktu perniagaan',
    },
    social: { title: 'Ikuti Kami' },
    quickLinks: {
      eyebrow: 'Pautan Pantas',
      title: 'Mencari Sesuatu Yang Lain?',
      items: [
        { label: 'Semak Perkhidmatan Kami', href: '/services', description: 'Lihat harga dan pakej' },
        { label: 'Cuba Ujian Kelayakan', href: '/eligibility-test', description: 'Semakan kelayakan pinjaman pantas' },
        { label: 'Baca Soalan Lazim', href: '/faq', description: 'Soalan biasa dijawab' },
      ],
      cta: 'Ketahui Lebih Lanjut',
    },
  },
};
